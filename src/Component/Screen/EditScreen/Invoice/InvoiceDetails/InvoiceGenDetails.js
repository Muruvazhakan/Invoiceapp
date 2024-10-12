import React, { useContext } from "react";
import { FormGroup, FormControl, TextField, Box, Button } from '@mui/material';
import { FaRegIdCard } from "react-icons/fa6";

import { CompanyDetail } from "../../../../Context/companyDetailContext";
import { AllState } from "../../../../Context/allStateContext";
// import '../YourDetails.css';
import Card from "../../../../Style/Card/Card";


const InvoiceGenDetails = () => {

  const compayDet = useContext(CompanyDetail);
  const invoicedet = useContext(AllState);
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

    todaydate = `IN${year}${month}${date}${invoicedet.invoiceidcount}`;
    invoicedet.setinvoiceid(todaydate);
    invoicedet.setinvoiceidount(++invoicedet.invoiceidcount);
    // console.log("invoiceidcount: " + invoicedet.invoiceidcount);
    // console.log("todaydate: " + todaydate);
    // invoicedet.setinvoiceid()
  }
  return <>
    <FormGroup>
      <FormControl>
        <Card>
          <h3>Client Details</h3>

          <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} >
            <TextField required id="outlined-required" label="Client Name" value={invoicedet.clientName}
              // onChange={(e)=>invoicedet.setclientName(e.target.value)}
              onChange={(e) => setval(e, invoicedet.setclientName)}
              color={setboxColors(invoicedet.clientName, 'color')}
              error={setboxColors(invoicedet.clientName, 'error')}

            // error={invoicedet.clientName.length ==0?'true':'false'} 
            />
            <TextField id="outlined-required" label="Client Phone Number"
              onChange={(e) => setval(e, invoicedet.setclientPhno)}
              color={setboxColors(invoicedet.clientPhno, 'color')}
            //  error={setboxColors(invoicedet.clientPhno,'error')} 
            />

            <TextField id="outlined-required" label="Client Address" multiline
              onChange={(e) => setval(e, invoicedet.setclientAdd)}
              color={setboxColors(invoicedet.clientAdd, 'color')}
            //  error={setboxColors(invoicedet.clientAdd,'error')} 
            />

          </Box>

          <h3>
            Invoice Details
          </h3>
          <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '15ch', height: '5ch' } }} >

            {invoicedet.invoiceid.length == 0 ?
              <div><Button className="gen-invoice" variant="outlined" endIcon={<FaRegIdCard />}  onClick={dateHandler}>Generate Invoice Id</Button> </div> : <div className="invoicegen"> Invoice Id Generated</div>}
            Invoice date:
            <input type="date" className="date-field" onChange={(e) => setval(e, invoicedet.setinvoicedate)} title="payement" size={210} id="dateDefault" value={invoicedet.invoicedate} aria-label="invoice" />
            Payment date:
            <input type="date" className="date-field" onChange={(e) => setval(e, invoicedet.setpaymentdate)} value={invoicedet.paymentdate} title="payement" size={210} />

            <TextField id="outlined-required" label="Payment Mode" value={invoicedet.paymentmode}
              onChange={(e) => setval(e, invoicedet.setpaymentmode)}
              color={setboxColors(invoicedet.paymentmode, 'color')}
            //  error={setboxColors(invoicedet.paymentmode,'error')} 
            />

          </Box>
        </Card>
      </FormControl>

    </FormGroup>


  </>
}

export default InvoiceGenDetails;