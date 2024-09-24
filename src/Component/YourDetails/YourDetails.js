
import React, { useContext } from "react";
import { FormGroup, FormControl, TextField, Box, Button } from '@mui/material';


import { CompanyDetail } from "../Context/companyDetailContext";
import './YourDetails.css';


const YourDetails = () => {

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

    todaydate = `${year}${month}${date}${compayDet.invoiceidcount}`;
    compayDet.setinvoiceid(todaydate);
    compayDet.setinvoiceidount(++compayDet.invoiceidcount);
    console.log("todaydate: " + todaydate);
    // compayDet.setinvoiceid()
  }
  return <>

    <h3>
      Form Details
    </h3>
    <FormGroup>
      <FormControl>

        <h4>Client Details</h4>

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
        <h4>Company Details</h4>
        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} >

          <TextField required id="outlined-required" label="Company Name"
            onChange={(e) => setval(e, compayDet.setcompanyName)}
            color={setboxColors(compayDet.companyName, 'color')}
            error={setboxColors(compayDet.companyName, 'error')} />

          <TextField required id="outlined-required" label="Company Tag Line"
            onChange={(e) => setval(e, compayDet.setcompanyTagLine)}
            color={setboxColors(compayDet.companyTagLine, 'color')}
            error={setboxColors(compayDet.companyTagLine, 'error')} />

          <TextField required id="outlined-required" label="Company Address" multiline
            onChange={(e) => setval(e, compayDet.setcompanyAddress)}
            color={setboxColors(compayDet.companyAddress, 'color')}
            error={setboxColors(compayDet.companyAddress, 'error')} />

          <TextField required id="outlined-required" label="Company Phone Number" type="number"
            onChange={(e) => setval(e, compayDet.setcompanyPhno)}
            color={setboxColors(compayDet.companyPhno, 'color')}
            error={setboxColors(compayDet.companyPhno, 'error')} />

          <TextField id="outlined-required" label="Company Gstin"
            onChange={(e) => setval(e, compayDet.setcompanyGstin)}
          //  color ={setboxColors(compayDet.companyGstin,'color')}
          //  error={setboxColors(compayDet.companyGstin,'error')}
          />
          <TextField id="outlined-required" label="Company Gstin state"
            onChange={(e) => setval(e, compayDet.setcompanyGstinStatename)}
          //  color ={setboxColors(compayDet.companyGstinStatename,'color')}
          //  error={setboxColors(compayDet.companyGstinStatename,'error')}
          />
          {/* error */}

        </Box>

        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} >
          <h4>Invoice Details</h4>
          {compayDet.invoiceid.length == 0 ?
            <Button className="gen-invoice" variant="outlined" onClick={dateHandler}>Generate Invoice</Button> : <div className="invoicegen"> Invoice Id Generated</div>}
          Invoice date:
          <input type="date" className="date-field" onChange={(e) => setval(e, compayDet.setinvoicedate)} title="payement" size={210} id="dateDefault" value={compayDet.invoicedate} aria-label="invoice" />

          <TextField id="outlined-required" label="Payment Mode" value={compayDet.paymentmode}
            onChange={(e) => setval(e, compayDet.setpaymentmode)}
            color={setboxColors(compayDet.paymentmode, 'color')}
          //  error={setboxColors(compayDet.paymentmode,'error')} 
          />

          Payment date:
          <input type="date" className="date-field" onChange={(e) => setval(e, compayDet.setpaymentdate)} value={compayDet.paymentdate} title="payement" size={210} />



        </Box>
      </FormControl>

    </FormGroup>


  </>
}

export default YourDetails;