
import React, { useContext } from "react";
import { FormGroup, FormControl, TextField, Box, Button } from '@mui/material';


import { CompanyDetail } from "../../../../Context/companyDetailContext";
import './YourDetails.css';
import Card from "../../../../Style/Card/Card";


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
    <FormGroup>
      <FormControl>
        <Card>
          <h3>Company Details</h3>
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

            <TextField id="outlined-required" label="Company Declaration" value={compayDet.companyDeleration} multiline rows={4}
              onChange={(e) => setval(e, compayDet.setcompanyDeleration)}
              color={setboxColors(compayDet.companyDeleration, 'color')}
              error={setboxColors(compayDet.companyDeleration, 'error')}
            />
            <h5>
              System will automatically update..
            </h5>
          </Box>
        </Card>
      </FormControl>

    </FormGroup>


  </>
}

export default YourDetails;