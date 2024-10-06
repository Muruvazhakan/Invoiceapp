
import React, { useRef,useEffect, useContext } from "react";
import Card from "../../Style/Card/Card";
import ReactToPrint from "react-to-print";
import { Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";

import EstimateDetailEdit from "../EditScreen/Estimate/EstimateDetail/EstimateDetailEdit";
import EstimateDetail from "../EditScreen/Estimate/EstimateDetail/EstimateDetail";
import EstimateTable from "../EditScreen/Estimate/EstimateTable/EstimateTable";
import EstimateTableForm from "../EditScreen/Estimate/EstimateTableForm/EstimateTableForm";

import { estimateState } from "../../Context/EstimatestateContext";
import { CompanyDetail } from "../../Context/companyDetailContext";

const EstimateMainComponent = (props) => {
    const estimateDet = useContext(estimateState);
    const companydet = useContext(CompanyDetail);
    const location = useLocation();
    const estdetailrows =  location.state  ? location.state.fromscreen:"null";
    useEffect(()=>{
        console.log('EstimateMainComponent');
       
        if(estdetailrows!== null ){
            if(estdetailrows==='allestimate'){
                let estimatedetails = location.state.estimate;
                estimateDet.setgranttotalsqft(estimatedetails.granttotalsqft);
                estimateDet.setgrandtotalpvccost(estimatedetails.grandtotalpvccost);
                estimateDet.setgrandtotalupvccost(estimatedetails.grandtotalupvccost);
                estimateDet.setgrandtotalwoodcost(estimatedetails.grandtotalwoodcost);
    
                estimateDet.setrows(estimatedetails.rows);
                estimateDet.setclientName(estimatedetails.clientName);
                estimateDet.setclientPhno(estimatedetails.clientPhno);
                estimateDet.setclientAdd(estimatedetails.clientAdd);
    
                estimateDet.setestimateid(estimatedetails.estimateid);
                estimateDet.setestimatedate(estimatedetails.estimatedate );
                estimateDet.setestimatedate1(estimatedetails.estimatedate1);
                if(estimatedetails.columns){
                    console.log('inside columns');
                    estimateDet.setcolumns(estimatedetails.columns);
                }
                if(estimatedetails.companytermsandcondition){
                    console.log('inside columns');
                    companydet.setcompanydetails(estimatedetails.companytermsandcondition);
                }
                if(estimatedetails.companybankdet){
                    console.log('inside columns');
                    estimateDet.setcompanyBankdetails(estimatedetails.companybankdet);
                }
            }
            

         
        }
      

        // console.log(props); 
        // console.log(location.state);
        // console.log(location.state.estimate);

    },[])

    const componentRef = useRef();
    return <>
     <h2>Estimate Generator</h2>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={7}>

                    <Card >
                        <h2>Edit/Preview Section</h2>
                        <EstimateTable screen="update" 
                        fromscreen={location.state  ? location.state.fromscreen:"null"} 
                        estimate={location.state ? location.state.estimate :"null"}
                         />
                    </Card>
                </Grid>
                <Grid item xs={5}>
                    < >
                    <EstimateTableForm />
                       
                    </>
                </Grid>

            </Grid>
            <EstimateDetailEdit />
            <Card>
                <ReactToPrint
                    trigger={() => (
                        <Button variant="contained" color="info" endIcon={<BsFileEarmarkPdfFill />} >
                            Download
                        </Button>
                    )}
                    content={() => componentRef.current}
                />
                <div ref={componentRef}>
                    <EstimateDetail screen="display" />

                </div>
            </Card>
        </Box>
    </>
}

export default EstimateMainComponent;