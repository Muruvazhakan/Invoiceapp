import React, { useContext } from "react";
import { FormGroup, FormControl, TextField, Box, Button } from '@mui/material';


import { estimateState } from "../../../../Context/EstimatestateContext";
// import '../YourDetails.css';
import Card from "../../../../Style/Card/Card";


const EstimateGenDetails = (props) => {

    const estimateDet = useContext(estimateState);

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

        todaydate = `ES${year}${month}${date}${estimateDet.estimateidcount}`;
        estimateDet.setestimateid(todaydate);
        estimateDet.setestimateidcount(++estimateDet.estimateidcount);
        console.log("todaydate: " + todaydate);
        // estimateDet.setinvoiceid()
    }

    return <>
        <FormGroup>
            <FormControl>
                <Card>
                    <h3>Client Details</h3>

                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} >
                        <TextField required id="outlined-required" label="Client Name" value={estimateDet.clientName}
                            // onChange={(e)=>estimateDet.setclientName(e.target.value)}
                            onChange={(e) => setval(e, estimateDet.setclientName)}
                            color={setboxColors(estimateDet.clientName, 'color')}
                            error={setboxColors(estimateDet.clientName, 'error')}

                        // error={estimateDet.clientName.length ==0?'true':'false'} 
                        />
                        <TextField id="outlined-required" label="Client Phone Number"
                            onChange={(e) => setval(e, estimateDet.setclientPhno)}
                            color={setboxColors(estimateDet.clientPhno, 'color')}
                        //  error={setboxColors(estimateDet.clientPhno,'error')} 
                        />

                        <TextField id="outlined-required" label="Client Address" multiline
                            onChange={(e) => setval(e, estimateDet.setclientAdd)}
                            color={setboxColors(estimateDet.clientAdd, 'color')}
                        //  error={setboxColors(estimateDet.clientAdd,'error')} 
                        />

                    </Box>

                    <h3>
                        Estimate Details
                    </h3>
                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '15ch', height: '5ch' } }} >

                        {estimateDet.estimateid.length == 0 ?
                            <div><Button className="gen-invoice" variant="outlined" onClick={dateHandler}>Generate Estimate Id</Button> </div> : <div className="invoicegen"> Estimate Id Generated</div>}
                        Estimate date:
                        <input type="date" className="date-field" onChange={(e) => setval(e, estimateDet.setestimatedate)} title="estimatedate" size={210} id="dateDefault" value={estimateDet.estimatedate} aria-label="invoice" />

                    </Box>
                </Card>
            </FormControl>
        </FormGroup>
    </>
}

export default EstimateGenDetails;