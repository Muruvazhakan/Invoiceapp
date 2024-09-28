import React, { useContext } from "react";
import { FormGroup, FormControl, TextField, Box, Button } from '@mui/material';


import { CompanyDetail } from "../../../../Context/companyDetailContext";
// import '../YourDetails.css';
import Card from "../../../../Style/Card/Card";


const InvoiceGenDetails = () => {

  const compayDet = useContext(CompanyDetail);
  const setval = (e, fun) => {
    fun(e.target.value);
  }

  const setboxColors = (item, field) => {
    if (field == 'color') {
      return item.length == 0 ? 'error' : 'success';
    }

    else {
      return item.length == 0 ? true : false;
    }

  }

  const dateHandler = () => {
    const today = new Date();
    let todaydate;

    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();

    todaydate = `IN${year}${month}${date}${compayDet.invoiceidcount}`;
    compayDet.setinvoiceid(todaydate);
    compayDet.setinvoiceidount(++compayDet.invoiceidcount);
    console.log("todaydate: " + todaydate);
    // compayDet.setinvoiceid()
  }
  return <>
    <FormGroup>
      <FormControl>
        <Card>
          <h3>Client Details</h3>

          <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} >
            <TextField required id="outlined-required" label="Client Name" value={compayDet.clientName}
              // onChange={(e)=>compayDet.setclientName(e.target.value)}
              onChange={(e) => setval(e, compayDet.setclientName)}
              color={setboxColors(compayDet.clientName, 'color')}
              error={setboxColors(compayDet.clientName, 'error')}

            // error={compayDet.clientName.length ==0?'true':'false'} 
            />
            <TextField id="outlined-required" label="Client Phone Number"
              onChange={(e) => setval(e, compayDet.setclientPhno)}
              color={setboxColors(compayDet.clientPhno, 'color')}
            //  error={setboxColors(compayDet.clientPhno,'error')} 
            />

            <TextField id="outlined-required" label="Client Address" multiline
              onChange={(e) => setval(e, compayDet.setclientAdd)}
              color={setboxColors(compayDet.clientAdd, 'color')}
            //  error={setboxColors(compayDet.clientAdd,'error')} 
            />

          </Box>

          <h3>
            Invoice Details
          </h3>
          <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '15ch', height: '5ch' } }} >

            {compayDet.invoiceid.length == 0 ?
              <div><Button className="gen-invoice" variant="outlined" onClick={dateHandler}>Generate Invoice</Button> </div> : <div className="invoicegen"> Invoice Id Generated</div>}
            Invoice date:
            <input type="date" className="date-field" onChange={(e) => setval(e, compayDet.setinvoicedate)} title="payement" size={210} id="dateDefault" value={compayDet.invoicedate} aria-label="invoice" />
            Payment date:
            <input type="date" className="date-field" onChange={(e) => setval(e, compayDet.setpaymentdate)} value={compayDet.paymentdate} title="payement" size={210} />

            <TextField id="outlined-required" label="Payment Mode" value={compayDet.paymentmode}
              onChange={(e) => setval(e, compayDet.setpaymentmode)}
              color={setboxColors(compayDet.paymentmode, 'color')}
            //  error={setboxColors(compayDet.paymentmode,'error')} 
            />

          </Box>
        </Card>
      </FormControl>

    </FormGroup>


  </>
}

export default InvoiceGenDetails;