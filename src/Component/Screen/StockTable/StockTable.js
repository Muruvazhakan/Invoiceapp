import React, { useContext, useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { TransitionProps } from '@mui/material/transitions';
import { Stocks } from "../../Context/StocksContex";
import './StockTable.css';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Stack } from "@mui/material";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const StockTable = (props) => {


    const tabledetails = useContext(Stocks);

    const [open, setOpen] = useState(false);

    const [item, setItem] = useState([]);

    const handleClickOpen = (items) => {
        setOpen(true);
        setItem(items);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleYes = (item) => {
        setOpen(false);
        tabledetails.deleteStock(item, props.screen, displaylist, "delete")
    };

    useEffect(() => {
        console.log("refresh");
    }, []);
    let sum1 = 0;
    let displaylist = (props.screen == "allstocks" ?
        tabledetails.allStockList.map((item, index) => {
            if ((item.quantity === 0 || item.status === 'deleted' || item.status === 'Deleted') && props.screen === "allstocks") { }
            else {
                sum1 = sum1 + (item.quantity * 1 * item.rate)
                return item;

            }
        }).filter(x => x !== undefined)
        :
        (props.screen == "alladdedstocks" ? tabledetails.allStockAddedList
            :
            (props.screen == "allProfit" ? tabledetails.allProfitStockList
                :
                (props.screen === "add" ? tabledetails.list
                    :
                    (props.screen == "sale" ? tabledetails.saleslist
                        : tabledetails.allStockSalesList
                    )
                )))
    );
    console.log("displaylist  " + " ^^^" + displaylist);
    console.log(displaylist)
    


    let localsumqty1 = 0, localsumqty2 = 0, sumpurchaseamt = 0, purchaceAmount1 = 0, soldAmount1 = 0,sumSaleAmt=0,profitAmount1=0,sumProfitAmount=0;

    let localsumqty = displaylist.map((item, index) => {
        localsumqty1 = localsumqty1 + (item.quantity * 1);
        if (props.screen === "allProfit") {
            localsumqty2 = localsumqty2 + (item.soldquantity? item.soldquantity * 1:0);
            purchaceAmount1 = (item.rate * 1 * item.soldquantity ? item.rate * 1 * item.soldquantity : 0);
            soldAmount1 = (item.salerate * 1 * item.soldquantity ? item.salerate * 1 * item.soldquantity : 0);
            sumpurchaseamt = sumpurchaseamt + (purchaceAmount1*1);
            profitAmount1=(soldAmount1*1)-(purchaceAmount1*1);
            sumProfitAmount=(sumProfitAmount*1)+(profitAmount1*1);
            console.log("soldAmount1 "+ soldAmount1);

            sumSaleAmt = sumSaleAmt + (soldAmount1);
            console.log("sumSaleAmt 11 "+ sumSaleAmt);
        }
        // sumpurchaseamt = sumpurchaseamt + ((item.salerate * 1 * item.soldquantity) - (item.rate * 1 * item.soldquantity));

    });
    let localsum = (props.screen === "allstocks" ? sum1
        :
        (props.screen == "alladdedstocks" ? tabledetails.alladdedstockstotalamt
            :
            (props.screen === "allProfit" ? sumProfitAmount
                :
                (props.screen == "add" ? tabledetails.totalamt
                    :
                    (props.screen == "sale" ? tabledetails.totalsalesamt
                        : tabledetails.allstockssalestotalamt
                    )
                )
            )
        )
    );

    // let localtotal1 = 0;
    // let localtotal = displaylist.map((item, index) => {
    //     localtotal1 = localtotal1 + (item.quantity * 1 * item.rate);
    // });

    console.log(props.screen + " props.screen" + localsum + " localsum  " + displaylist + " displaylist", + " localsumqty ++ " + localsumqty1);


    let from = props.from;
    const digit2options = { maximumFractionDigits: 2 };



    return <>
        {tabledetails.isloading &&
            <Stack sx={{ color: 'grey.500' }} spacing={2} alignItems={"center"} className="spinnerstyle">
                <CircularProgress color="success" size={30} />
            </Stack>
        }
        <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '10px', marginTop: "10px" }}>

            <TableContainer sx={{ minWidth: 650, borderRadius: '10px' }}>

                <Table aria-label="simple table">
                    <TableHead sx={{ fontWeight: 1130, color: "white" }}>
                        <TableRow className="table-header">
                            <TableCell sx={{ fontWeight: 700 }}>S.No</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Product Id</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>HSN/SAC</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Product Description</TableCell>
                            {props.screen !== "allProfit" &&
                                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                            }
                            {props.screen !== "allProfit" && <>
                                <TableCell align='center' sx={{ fontWeight: 700 }}>Quantity</TableCell>
                            </>}

                            <TableCell sx={{ fontWeight: 700 }}>Purchace Rate</TableCell>

                            {props.screen !== "allProfit" && <>
                                <TableCell sx={{ fontWeight: 700 }}>Amount (₹)</TableCell>
                            </>}
                            {props.screen === "update" &&
                                <>
                                    <TableCell sx={{ fontWeight: 700 }} >Edit rows

                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} >Delete rows

                                    </TableCell>
                                </>
                            }
                            {props.screen === "allstocks" && props.iseditable &&
                                <>
                                    {/* <TableCell sx={{ fontWeight: 700 }} >Edit rows
                                    </TableCell> */}
                                    <TableCell sx={{ fontWeight: 700 }} >Delete rows
                                    </TableCell>
                                </>
                            }
                            {props.screen === "allProfit" && <>
                                <TableCell sx={{ fontWeight: 700 }}>Purchace Amount (₹)</TableCell>
                                <TableCell align='center' sx={{ fontWeight: 700 }}>Sold Quantity</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Sold Rate</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Sold Amount (₹)</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Profit Amount (₹)</TableCell>
                            </>}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {displaylist.map((item, index) => {
                            let sum = Intl.NumberFormat("en-IN", digit2options).format(item.amount);
                            let othersum = Intl.NumberFormat("en-IN", digit2options).format(item.quantity * item.rate * 1);
                            let purchaceAmount = 0, soldAmount = 0,profitAmount=0;
                            purchaceAmount = (item.rate * 1 * item.soldquantity ? item.rate * 1 * item.soldquantity : 0);
                            soldAmount = (item.salerate * 1 * item.soldquantity ? item.salerate * 1 * item.soldquantity : 0);
                            profitAmount=(soldAmount*1)-(purchaceAmount*1);
                            // console.log("displaylist menu");
                            // console.log(displaylist)
                            if ((item.quantity === 0 || item.status === 'deleted' || item.status === 'Deleted') && props.screen === "allstocks")
                                return null;

                            return (
                                <TableRow
                                    // className="table-header"
                                    className={index % 2 !== 0 ? "table-body table-subcolum" : "table-body "}
                                    key={item.id}
                                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align='center' className="table-header-td">{index + 1}</TableCell>
                                    <TableCell className="table-header-td">{item.productid}</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }}>{item.hsn}</TableCell>
                                    <TableCell className="table-header-td">{item.desc}</TableCell>
                                    {props.screen !== "allProfit" &&
                                        <div style={item.status === "deleted" || item.status === "Deleted" ? { color: "white", border: "2px", background: "red" }
                                            : (item.status === "Sold" ? { background: "#d6d363", color: "bisque", border: "2px" } : null)}>
                                            <TableCell sx={{ fontWeight: 700 }}  >{item.status}</TableCell></div>}
                                    {props.screen !== "allProfit" && <>
                                        <TableCell align='center' className="table-header-td">{item.quantity}</TableCell>
                                    </>}

                                    <TableCell className="table-header-td">{item.rate}</TableCell>

                                    {props.screen !== "allProfit" && <>
                                        <TableCell className="table-header-td">

                                            {sum > 0 ? sum : (othersum)}
                                            {/* ({Intl.NumberFormat("en-IN", digit2options).format(item.amount)} :
                                    {item.quantity *item.rate}) */}

                                            {/* {Intl.NumberFormat("en-IN", digit2options).format(item.amount)} */}

                                        </TableCell>
                                    </>}
                                    {props.type === "update" &&
                                        <>
                                            <TableCell className="table-edit" onClick={() => tabledetails.editListRows(item, props.screen, displaylist, "update")} >
                                                <FiEdit size={18} />
                                            </TableCell>
                                            <TableCell className="table-edit" onClick={() => tabledetails.editListRows(item, props.screen, displaylist, "delete")} >
                                                <MdDelete size={18} />
                                            </TableCell>
                                        </>}

                                    {props.screen === "allstocks" && props.iseditable &&
                                        <>
                                            {/* <TableCell sx={{ fontWeight: 700 }} >Edit rows
                                    </TableCell> */}

                                            <TableCell className="table-edit"
                                                onClick={() => handleClickOpen(item)}
                                            //  onClick={() => tabledetails.editListRows(item, props.screen, displaylist, "delete")} 
                                            >
                                                <MdDelete size={18} />
                                            </TableCell>
                                        </>
                                    }
                                    {props.screen === "allProfit" && <>

                                        <TableCell >{item.rate * 1 * item.soldquantity ? item.rate * 1 * item.soldquantity : 0}</TableCell>
                                        <TableCell align='center' >{item.soldquantity ? item.soldquantity : 0}</TableCell>
                                        <TableCell >{item.salerate}</TableCell>
                                        <TableCell >{item.salerate * 1 * item.soldquantity}</TableCell>
                                        <TableCell >{Intl.NumberFormat("en-IN", digit2options).format(profitAmount)}</TableCell>
                                    </>}
                                </TableRow>
                            )

                        })}

                        <TableRow className="table-total" key="2"
                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell></TableCell>
                            <TableCell sx={{ fontSize: 18, fontWeight: 700 }} >Total</TableCell>
                            <TableCell ></TableCell>
                            {props.screen !== "allProfit" &&
                                <TableCell ></TableCell>}

                            <TableCell ></TableCell>
                            {props.screen !== "allProfit" && <>
                                <TableCell align='center' className="table-header-td" sx={{ fontSize: 18, fontWeight: 700 }}>{localsumqty1} Qty</TableCell>
                            </>}
                            <TableCell ></TableCell>

                            {props.screen === "allProfit" && <>
                                <TableCell sx={{ fontSize: 18, fontWeight: 700 }}>₹{sumpurchaseamt}</TableCell>
                                {/* <TableCell align='center' >{tabledetails.alladdedstockstotalamt} </TableCell> */}
                                <TableCell sx={{ fontSize: 18, fontWeight: 700 }} align='center'  >{localsumqty2} Qty</TableCell>
                                <TableCell ></TableCell>
                                <TableCell sx={{ fontSize: 18, fontWeight: 700 }}  >₹{sumSaleAmt}</TableCell>

                            </>}
                            <TableCell sx={{ fontSize: 18, fontWeight: 700 }} className="table-amount">₹ {Intl.NumberFormat("en-IN", digit2options).format(localsum)}</TableCell>
                            {props.screen === "allstocks" && props.iseditable &&
                                <>
                                    {/* <TableCell sx={{ fontWeight: 700 }} >Edit rows
                                    </TableCell> */}
                                    <TableCell sx={{ fontWeight: 700 }} >
                                    </TableCell>
                                </>
                            }
                        </TableRow>
                    </TableBody>
                </Table>


            </TableContainer>

        </Paper >

        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Do you want to Delete?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    System will permanently delete this product.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>NO</Button>
                <Button onClick={() => handleYes(item)}>YES</Button>
            </DialogActions>
        </Dialog>


    </>
}

export default StockTable;