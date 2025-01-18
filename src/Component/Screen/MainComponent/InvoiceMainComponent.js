import React, { useContext, useRef } from "react";
import Card from "../../Style/Card/Card";
import ReactToPrint from "react-to-print";
import { Button, Stack } from "@mui/material";
import Box from '@mui/material/Box';
import { BsFileEarmarkPdfFill } from "react-icons/bs";

import InvoiceDetails from "../InvoiceDetails/InvoiceDetails";
import InvoiceDeatilsEdit from "../InvoiceDetails/InvoiceDeatilsEdit";
import Tables from "../Table/InvoiceTable/Table";
import StyleHeader from "../Header/StyleHeader";
import { CompanyDetail } from "../../Context/companyDetailContext";

const InvoiceMainComponent = (props) => {
    const componentRef = useRef();
    const logindet = useContext(CompanyDetail);
    // const { screen } = props.location?props.location:null;
   
    if (logindet.tier && (logindet.tier !=="gold" && logindet.tier !=="platinum")) 
       return <StyleHeader>No Access for this User</StyleHeader>
    return <>
        <StyleHeader>
            {/* <Header name="Current Stocks" /> */}
            Generate Invoice
        </StyleHeader>

        <Box sx={{ flexGrow: 1 }}>

            <Stack direction={{ xs: 'column', sm: 'row' }}
                useFlexGap
                spacing={{ xs: 1, sm: 1, md: 0 }}>
                <Stack width={window.innerWidth <= 960 ? "100%" : "70%"}
                >
                    <Card>
                        <h2>Edit/Preview Section</h2>
                        <Tables screen="update" />
                    </Card>
                </Stack>
                <Stack item width={window.innerWidth <= 960 ? "100%" : "30%"}>
                    <InvoiceDeatilsEdit />
                </Stack>
            </Stack>
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
                    <InvoiceDetails screen="display" />

                </div>
            </Card>
        </Box>
    </>
}

export default InvoiceMainComponent;