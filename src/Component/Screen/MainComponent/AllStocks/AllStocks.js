import React, { useContext, useEffect, useRef, useState } from "react";
import { BsFileEarmarkPdfFill, BsFiletypeXlsx } from "react-icons/bs";

import { FaRegListAlt } from "react-icons/fa";
import { MdAddChart } from "react-icons/md";
import Card from "../../../Style/Card/Card";
import ReactToPrint from "react-to-print";
import { Box, Button } from "@mui/material";
import { RiTableView } from "react-icons/ri";
import { Stocks } from "../../../Context/StocksContex";
import StockTable from "../../StockTable/StockTable";
import './AllStocks.css';
import { Link } from "react-router-dom";
import Header from "../../Header/Header";
import StyleHeader from "../../Header/StyleHeader";
import { CompanyDetail } from "../../../Context/companyDetailContext";
import * as Datas from '../../../Context/Datas';
import { FiEdit } from "react-icons/fi";




const AllStocks = (props) => {
    const tabledet = useContext(Stocks);
    const [viewAllAddedStock, setviewAllAddedStock] = useState(false);

    const logindet = useContext(CompanyDetail);
    const [iseditable, setiseditable] = useState(false);
   

    useEffect(() => {
        console.log(" useEffect AllStocks ");
        tabledet.getAllStocks("allstocks");
    }, [tabledet.allStockData, tabledet.allstockstotalamt, tabledet.stockHistoryData, tabledet.allStockList]);
    const componentRef = useRef();
    if (logindet.tier && logindet.tier !== "platinum")
        return <StyleHeader>No Access for this User</StyleHeader>
    return <>
        <Box className="allstocksdisplaytable" sx={{ flexGrow: 1 }}>

            {/* <StockTable screen="allstocks" /> */}
            <Card className="listofbuttons">
                <Link to={{
                    pathname: `/addstock`
                }}
                >
                    <Button variant="outlined" color="success" endIcon={<MdAddChart />}
                    >
                        Add Stocks</Button>
                </Link>

            </Card>

            <Card className="listofbuttons">
                <Link to={{
                    pathname: `/listofaddedstocks`
                }}
                >
                    <Button variant="outlined" color="secondary" endIcon={<FaRegListAlt />} >
                        View List of added Stocks
                    </Button>
                </Link>

            </Card>

            <Card className="listofbuttons">

                <Button variant="text" color={viewAllAddedStock ? "primary" : "warning"}
                    onClick={() => setviewAllAddedStock(!viewAllAddedStock)} endIcon={<RiTableView />}
                >
                    {viewAllAddedStock ? "Click to hide All Added Stocks" : "Click to Expand All Added Stocks"
                    }
                </Button>
            </Card>
            {viewAllAddedStock &&
                <Card>
                    <div className="exportExcelbttn " >
                        <ReactToPrint
                            trigger={() => (
                                <div >
                                    <Button variant="contained" color="info" endIcon={<BsFileEarmarkPdfFill />} >
                                        Download All Stocks
                                    </Button>
                                </div>
                            )}
                            content={() => componentRef.current}
                        />

                        <Button variant="contained" color="success" size="medium" endIcon={<BsFiletypeXlsx />}
                            onClick={() => tabledet.handleExportXlsx("alladdedstocks")}>Export All Stocks to Excel</Button>

                    </div>
                    <div ref={componentRef}>
                        {/* <Header name="All Stocks" /> */}
                        <StyleHeader>
                            All Stocks
                        </StyleHeader>
                        {/* <div> All Stocks   </div> */}
                        <StockTable screen="alladdedstocks" from="add" />

                    </div>
                </Card>
            }
            <Card>
                <div className="exportExcelbttn" >
                    <ReactToPrint
                        trigger={() => (
                            <div className="" >
                                <Button variant="contained" color="info" endIcon={<BsFileEarmarkPdfFill />} >
                                    Download Current Stocks
                                </Button>
                            </div>
                        )}
                        content={() => componentRef.current}
                    />

                    <Button variant="contained" color="success" size="medium" endIcon={<BsFiletypeXlsx />}
                        onClick={() => tabledet.handleExportXlsx("allstocks")}>Export Current Stocks to Excel</Button>

                    <Button variant= {iseditable?"outlined":"contained" } color="warning" size="medium" 
                    endIcon={<FiEdit size={18} />} 
                        onClick={() => setiseditable(!iseditable)}
                       
                        >Edit Stocks</Button>

                </div>
                <div ref={componentRef}>
                    {/* <Header name="Current Stocks" /> */}
                    <StyleHeader>
                        Current Stocks
                    </StyleHeader>
                    <StockTable screen="allstocks" from="add" iseditable={iseditable} />

                </div>
            </Card>

            
        </Box>
    </>


}

export default AllStocks;