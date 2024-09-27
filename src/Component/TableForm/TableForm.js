import React, { useState, useContext, useEffect } from "react";
import { AllState } from "../Context/allStateContext";
import { Box, Button,  FormControl, FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import collect from "collect.js";
import "react-toastify/dist/ReactToastify.css";
import Card from "../Card/Card";

import './TableForm.css';
const TableForm = () => {

    // const [singleDesc, setSingleDesc] = useState();
    const tabledet = useContext(AllState);

    const setval = (e, fun) => {
        fun(e.target.value);
    }

    const setboxColors = (item, field) => {
        if (field == 'color') {
            return item.length == 0 || item == 0 ? 'error' : 'success';
        }

        else {
            return item.length == 0 || item == 0 ? true : false;
        }

    }

    useEffect(() => {
        // console.log('tabledet');
        // console.log(tabledet);
        let val;
        if (tabledet.quantity !== 0 || tabledet.rateinctax !== 0 || tabledet.disc !== 0) {
            val = (tabledet.rateinctax - ((tabledet.disc * tabledet.rateinctax) / 100));
            tabledet.setrate(val.toFixed(2));
        }
        // console.log(rate + " rate " + val);
    }, [tabledet.disc, tabledet.rateinctax]);

    useEffect(() => {
        // console.log('amount');
        // console.log(tabledet);
        let val;
        if (tabledet.quantity !== 0 || tabledet.rateinctax !== 0 || tabledet.disc !== 0 || tabledet.rate !== 0) {
            val = (tabledet.rate * tabledet.quantity);
            tabledet.setamount(val.toFixed(2));
        }
        // console.log(rate + " rate " + val);
    }, [tabledet.rate, tabledet.quantity])

    const addOrUpdateItemHandler = (opt) => {
        if (tabledet.desc.length !== 0 && tabledet.hsn.length !== 0 && tabledet.quantity > 0 && tabledet.rateinctax > 0 && tabledet.rate > 0 && tabledet.per.length !== 0 && tabledet.disc > 0 && tabledet.amount > 0 && tabledet.ctrate > 0 && tabledet.strate > 0) {
            if (opt === 'Update') {
                toast.success("Item updated");
            } else {

                let singleitem = {
                    id: uuidv4(),
                    desc: tabledet.desc,
                    hsn: tabledet.hsn,
                    quantity: tabledet.quantity,
                    rateinctax: tabledet.rateinctax,
                    rate: tabledet.rate,
                    per: tabledet.per,
                    disc: tabledet.disc,
                    amount: tabledet.amount
                };
                tabledet.setList([
                    ...tabledet.list,
                    singleitem
                ]
                );
                let singlehsn = {
                    id: 1,
                    hsndesc: '',
                    taxvalue: 0,
                    ctrate: 0,
                    ctamount: 0,
                    strate: 0,
                    stamount: 0,
                    amount: 0
                };
                let currentsinglehsnitem = tabledet.hsnlist;
                //   console.log("currentsinglehsnitem" + currentsinglehsnitem);
                //   console.log(currentsinglehsnitem);
                if (currentsinglehsnitem.length > 0) {
                    let found = 0;
                    for (let i = 0; i < currentsinglehsnitem.length; i++) {
                        // console.log('inside1');
                        console.log(currentsinglehsnitem[i].hsndesc + " item " + singleitem.hsn);
                        if (currentsinglehsnitem[i].hsndesc == singleitem.hsn) {
                            console.log("before inside" + currentsinglehsnitem[i].taxvalue + " singleitem.amount : " + singleitem.amount);
                            let ingvalue = singleitem.amount;
                            currentsinglehsnitem[i].taxvalue = (ingvalue) * 1 + (currentsinglehsnitem[i].taxvalue) * 1;
                            // currentsinglehsnitem[i].taxvalue = 4 +currentsinglehsnitem[i].taxvalue;
                            console.log("after inside" + currentsinglehsnitem[i].taxvalue + " singleitem.amount : " + singleitem.amount);
                            // currentsinglehsnitem[i].ctrate
                            found = 1;
                        }
                    }
                    if (found == 0) {
                        // singlehsn = {
                        //     id: uuidv4(),
                        //     hsndesc: singleitem.hsn,
                        //     taxvalue: singleitem.amount,
                        //     ctrate: tabledet.ctrate,
                        //     ctamount: ((singleitem.amount*1)*tabledet.ctrate*1 )/100,
                        //     strate: tabledet.strate,
                        //     stamount: ((singleitem.amount*1)*tabledet.strate*1 )/100,
                        //     amount:((((singleitem.amount*1)*tabledet.ctrate*1 )/100 ) + (((singleitem.amount*1)*tabledet.strate*1 )/100) + (singleitem.amount*1)).toFixed(2)
                        // };
                        singlehsn = {
                            id: uuidv4(),
                            hsndesc: singleitem.hsn,
                            taxvalue: singleitem.amount,
                            ctrate: 0,
                            ctamount: 0,
                            strate: 0,
                            stamount: 0,
                            amount: singleitem.amount
                        };
                        tabledet.sethsnList([
                            ...tabledet.hsnlist,
                            singlehsn
                        ])
                    }
                    console.log("compl");
                    console.log(currentsinglehsnitem);
                }
                else {
                    singlehsn = {
                        id: uuidv4(),
                        hsndesc: singleitem.hsn,
                        taxvalue: singleitem.amount,
                        ctrate: 0,
                        ctamount: 0,
                        strate: 0,
                        stamount: 0,
                        amount: singleitem.amount
                    };

                    tabledet.sethsnList([
                        ...tabledet.hsnlist,
                        singlehsn
                    ])
                }
              
                toast.success("Item added");


            }

        }
        else {
            toast.error("Please fill in all inputs in HSN and Add Goods tab");
        }
    }

   
    return <>
        <Card >
            <ToastContainer position="top-center" theme="colored" />
            <h3>
                Invoice Data

            </h3>
            <FormGroup>
                <FormControl>
                    <Card>
                    <h3>HSN Tax Rate</h3>
                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
                        <TextField required id="outlined-required" label="Central Tax Rate %" value={tabledet.ctrate} type="number"
                            onChange={(e) => setval(e, tabledet.setctrate)}
                            color={setboxColors(tabledet.ctrate, 'color')}
                            error={setboxColors(tabledet.ctrate, 'error')} />



                        <TextField required id="outlined-required" label="State Tax Rate %" value={tabledet.strate} type="number"
                            onChange={(e) => setval(e, tabledet.setstrate)}
                            color={setboxColors(tabledet.strate, 'color')}
                            error={setboxColors(tabledet.strate, 'error')} />



                    </Box>
                   
                    <h3>Add Goods details below</h3>
                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>

                        <TextField required id="outlined-required" label="Item description" value={tabledet.desc}
                            onChange={(e) => setval(e, tabledet.setdesc)}
                            color={setboxColors(tabledet.desc, 'color')}
                            error={setboxColors(tabledet.desc, 'error')}
                        />

                        <TextField required id="outlined-required" label="HSN" value={tabledet.hsn}
                            onChange={(e) => setval(e, tabledet.sethsn)}
                            color={setboxColors(tabledet.hsn, 'color')}
                            error={setboxColors(tabledet.hsn, 'error')}
                        />

                        <TextField required id="outlined-required" label="Quantity" value={tabledet.quantity} type="number"
                            onChange={(e) => setval(e, tabledet.setquantity)}
                            color={setboxColors(tabledet.quantity, 'color')}
                            error={setboxColors(tabledet.quantity, 'error')}
                        />

                        <TextField required id="outlined-required" label="Rate inc Tax" value={tabledet.rateinctax} type="number"
                            onChange={(e) => setval(e, tabledet.setrateinctax)}
                            color={setboxColors(tabledet.rateinctax, 'color')}
                            error={setboxColors(tabledet.rateinctax, 'error')}
                        />

                        <TextField required id="outlined-required" label="Rate" value={tabledet.rate} type="number"
                            onChange={(e) => setval(e, tabledet.setrate)}
                            color={setboxColors(tabledet.rate, 'color')}
                            error={setboxColors(tabledet.rate, 'error')}
                        />

                        <TextField required id="outlined-required" label="Per" value={tabledet.per}
                            onChange={(e) => setval(e, tabledet.setper)}
                            color={setboxColors(tabledet.per, 'color')}
                            error={setboxColors(tabledet.per, 'error')}
                        />

                        <TextField required id="outlined-required" label="Discount" value={tabledet.disc} type="number"
                            onChange={(e) => setval(e, tabledet.setdisc)}
                            color={setboxColors(tabledet.disc, 'color')}
                            error={setboxColors(tabledet.disc, 'error')}
                        />

                        <TextField required id="outlined-required" label="Amount" value={tabledet.amount} type="number"
                            onChange={(e) => setval(e, tabledet.setamount)}
                            color={setboxColors(tabledet.amount, 'color')}
                            error={setboxColors(tabledet.amount, 'error')}
                        />

                        {/* singleitem,setsingleitem,list, setList,totalamt,settotalamt,totalamtwords,settotalamtwords,singlehsnitem,setsinglehsnitem,
totalhsnamt,settotalhsnamt,totalhsnamt,settotalhsnamt,hsnlist, sethsnList,totalhsnamtwords,settotalhsnamtwords */}
                        <div>
                            <Button variant="contained" color="success" size="medium" onClick={() => addOrUpdateItemHandler('Add')}>Add Item</Button>
                        </div>

                    </Box>
                    <h3>Value in Words</h3>
                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>

                        <TextField required id="outlined-required" label="Total Amount Chargeable" value={tabledet.totalamtwords}
                            onChange={(e) => setval(e, tabledet.settotalamtwords)}
                            color={setboxColors(tabledet.totalamtwords, 'color')}
                            error={setboxColors(tabledet.totalamtwords, 'error')}
                        />

                        <TextField required id="outlined-required" label="Total Tax Amount" value={tabledet.totalhsnamtwords}
                            onChange={(e) => setval(e, tabledet.settotalhsnamtwords)}
                            color={setboxColors(tabledet.totalhsnamtwords, 'color')}
                            error={setboxColors(tabledet.totalhsnamtwords, 'error')}
                        />
                    </Box>
                    </Card>
                    <Card>
                    <h3>Other items need to add?</h3>
                    
                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>
                  
                        <div>
                            <FormControlLabel
                                control={
                                    <Switch checked={tabledet.isinstallationcharge} onChange={() => tabledet.setisinstallationcharge(!tabledet.isinstallationcharge)} name="Othercharges" />
                                }
                                label="Add Other charges?"
                            />
                            This section is to add Installation or Labour or Other charge which will not be add Quantity, Rate, PCS, Discount
                        </div>
                        {tabledet.isinstallationcharge &&
                            <>


                                <TextField required id="outlined-required" label="Other item Description" value={tabledet.otherdesc}
                                    onChange={(e) => setval(e, tabledet.setotherdesc)}
                                    color={setboxColors(tabledet.otherdesc, 'color')}
                                    error={setboxColors(tabledet.otherdesc, 'error')}
                                />

                                <TextField required id="outlined-required" label="Other item Chargeable" value={tabledet.otherdescamt} type="number"
                                    onChange={(e) => setval(e, tabledet.setotherdescamt)}
                                    color={setboxColors(tabledet.otherdescamt, 'color')}
                                    error={setboxColors(tabledet.otherdescamt, 'error')}
                                />

                                <FormControlLabel
                                    control={
                                        <Switch checked={tabledet.ischargedinhsn} onChange={() => tabledet.setischargedinhsn(!tabledet.ischargedinhsn)} name="includehsn" />
                                    }
                                    label="Can include in HSN/Tax"
                                />

                                <div>
                                    <Button variant="outlined" color="success" size="medium" onClick={() => tabledet.addOrEditOtherItems("",'add')}>Add Other Item</Button>
                                </div>
                            </>
                        }
                        
                    </Box>
                    </Card>
                </FormControl>
            </FormGroup>

        </Card>
    </>
}

export default TableForm;