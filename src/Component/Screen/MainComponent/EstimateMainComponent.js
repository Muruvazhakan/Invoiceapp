
import React, { useRef } from "react";
import Card from "../../Style/Card/Card";
import ReactToPrint from "react-to-print";
import { Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


import EstimateDetailEdit from "../EditScreen/Estimate/EstimateDetail/EstimateDetailEdit";
import EstimateDetail from "../EditScreen/Estimate/EstimateDetail/EstimateDetail";
import EstimateTable from "../EditScreen/Estimate/EstimateTable/EstimateTable";


const EstimateMainComponent = (props) => {
    const componentRef = useRef();
    return <>
     <h2>Estimate Generator</h2>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={7}>

                    <Card >
                        <h2>Edit/Preview Section</h2>
                        <EstimateTable screen="update" />
                    </Card>
                </Grid>
                <Grid item xs={5}>
                    < >
                        <EstimateDetailEdit />
                    </>
                </Grid>

            </Grid>
            <Card>
                <ReactToPrint
                    trigger={() => (
                        <Button variant="outlined" color="success" >
                            Print / Download
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