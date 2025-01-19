
import React, { useRef, useEffect } from "react";
import Card from "../../Style/Card/Card";
import ReactToPrint from "react-to-print";
import { Button, Stack } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { BsFileEarmarkPdfFill } from "react-icons/bs";


import EstimateDetailEdit from "../EditScreen/Estimate/EstimateDetail/EstimateDetailEdit";
import EstimateDetail from "../EditScreen/Estimate/EstimateDetail/EstimateDetail";
import EstimateTable from "../EditScreen/Estimate/EstimateTable/EstimateTable";
import EstimateTableForm from "../EditScreen/Estimate/EstimateTableForm/EstimateTableForm";
import StyleHeader from "../Header/StyleHeader";


const EstimateMainComponent = (props) => {

    useEffect(() => {
        // console.log('EstimateMainComponent');



        // console.log(props); 
        // console.log(location.state);
        // console.log(location.state.estimate);

    }, [])

    const componentRef = useRef();
    return <>
        <StyleHeader>
            Estimate Generator
        </StyleHeader>

        <Box sx={{ flexGrow: 1 }}>

            <Stack direction={{ xs: 'column', sm: 'row' }}
                useFlexGap
                spacing={{ xs: 1, sm: 1, md: 0 }}>
                <Stack width={window.innerWidth <= 960 ? "100%" : "70%"}
                >
                    <Card>
                        <h2>Edit/Preview Section</h2>
                        <EstimateTable screen="update"

                        />
                    </Card>
                </Stack>
                <Stack item width={window.innerWidth <= 960 ? "100%" : "30%"}>
                    <EstimateTableForm />
                </Stack>
            </Stack>
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