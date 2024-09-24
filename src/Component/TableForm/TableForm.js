import React, { useState, useContext, useEffect } from "react";
import { AllState } from "../Context/allStateContext";
import { Box, Button, FormControl, FormGroup, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import collect from "collect.js";
import "react-toastify/dist/ReactToastify.css";

const TableForm = () => {

    const [singleDesc, setSingleDesc] = useState();
    const tabledet = useContext(AllState);

    const [desc, setdesc] = useState('');
    const [hsn, sethsn] = useState(0);
    const [quantity, setquantity] = useState(0);
    const [rateinctax, setrateinctax] = useState(0);
    const [rate, setrate] = useState(0);
    const [per, setper] = useState('');
    const [disc, setdisc] = useState(1);
    const [amount, setamount] = useState(0);
    const [grp, setgrp] = useState('');

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
        if (quantity !== 0 || rateinctax !== 0 || disc !== 0) {
            val = (rateinctax - ((disc * rateinctax) / 100));
            setrate(val.toFixed(2));
        }
        // console.log(rate + " rate " + val);
    }, [disc, rateinctax]);

    useEffect(() => {
        // console.log('amount');
        // console.log(tabledet);
        let val;
        if (quantity !== 0 || rateinctax !== 0 || disc !== 0 || rate !== 0) {
            val = (rate * quantity);
            setamount(val.toFixed(2));
        }
        // console.log(rate + " rate " + val);
    }, [rate, quantity])

    const addOrUpdateItemHandler = (opt) => {
        if (desc.length !== 0 && hsn > 0 && quantity > 0 && rateinctax > 0 && rate > 0 && per.length !== 0 && disc > 0 && amount > 0) {
            if (opt === 'Update') {
                toast.success("Item updated");
            } else {
               
                let singleitem={
                    id: uuidv4(),
                    desc: desc,
                    hsn: hsn,
                    quantity: quantity,
                    rateinctax: rateinctax,
                    rate: rate,
                    per: per,
                    disc: disc,
                    amount: amount
                };
                tabledet.setList([
                    ...tabledet.list,
                    singleitem
                ]  
                );
                let singlehsn={
                    id: 1,
                    hsndesc: '',
                    taxvalue: 0,
                    ctrate: 0,
                    ctamount: 0,
                    strate: 0,
                    stamount: 0,
                    amount: 0
                  };
                  let currentsinglehsnitem= tabledet.hsnlist;
                //   console.log("currentsinglehsnitem" + currentsinglehsnitem);
                //   console.log(currentsinglehsnitem);
                  if(currentsinglehsnitem.length>0){
                    let found=0;
                    for(let i =0;i<currentsinglehsnitem.length;i++){
                        // console.log('inside1');
                        console.log(currentsinglehsnitem[i].hsndesc + " item " + singleitem.hsn);
                        if(currentsinglehsnitem[i].hsndesc==singleitem.hsn){
                            console.log("before inside" + currentsinglehsnitem[i].taxvalue + " singleitem.amount : "+singleitem.amount);
                            let ingvalue=singleitem.amount;
                             currentsinglehsnitem[i].taxvalue = ( ingvalue) + ( currentsinglehsnitem[i].taxvalue);
                            // currentsinglehsnitem[i].taxvalue = 4 +currentsinglehsnitem[i].taxvalue;
                            console.log("after inside" + currentsinglehsnitem[i].taxvalue + " singleitem.amount : "+singleitem.amount);
                            found=1;
                        }
                    }
                    if(found==0){
                        singlehsn={
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
                    else {

                    }
                    console.log("compl");
                    console.log(currentsinglehsnitem);
                  }
                  else{
                    singlehsn={
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

                //   singlehsnitem, setsinglehsnitem
                let singlehsn1=[];
                const map1 = new Map();
                const allItems = tabledet.list.map((item) =>{
                    console.log("item.amount "+ item.amount)
                    console.log("item.hsn "+ item.hsn);
                    map1.set(item.hsn);
                    
                    
                } );
                // const allItems1 = tabledet.list.map((item) => item.amount);
                
                // console.log(collect(allItems1).sum());
                // const groupedTimesheetMap = Map.groupBy(allItems, entry => {
                        
                //     return hoursWorked >= 7 ? longHours : shortHours;
                //   });
                console.log("map1" );
                console.log(map1 );
                // console.log(singlehsn);
                toast.success("Item added");
                // console.log(tabledet);
                // console.log(tabledet.hsnlist);
            }

        }
        else {
            toast.error("Please fill in all inputs");
        }
    }

    // useEffect(()=>{
    //     const res=Object.groupBy(tabledet.list,({hsn})=>hsn);
    //     console.log('res ');
    //     console.log( res);
    //     if(res){
    //         // res.212.map((item)=>{
    //         //     console.log( item + 'item');
    //         // })
    //     }
        
    //     // let val=res.map((item,ind)=>{
    //     //     console.log( item);
    //     //     (collect(item).sum());
    //     // })
    // },tabledet.list)
    return <>
        <form >
            <ToastContainer position="top-center" theme="colored" />
            <h3>
                Invoice Data
               
            </h3>
            <FormGroup>
                <FormControl>
                    <h3>Add Goods details below</h3>
                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}>

                        <TextField required id="outlined-required" label="Item description" value={desc}
                            onChange={(e) => setval(e, setdesc)}
                            color={setboxColors(desc, 'color')}
                            error={setboxColors(desc, 'error')}
                        />

                        <TextField required id="outlined-required" label="HSN" value={hsn} type="number"
                            onChange={(e) => setval(e, sethsn)}
                            color={setboxColors(hsn, 'color')}
                            error={setboxColors(hsn, 'error')}
                        />

                        <TextField required id="outlined-required" label="Quantity" value={quantity} type="number"
                            onChange={(e) => setval(e, setquantity)}
                            color={setboxColors(quantity, 'color')}
                            error={setboxColors(quantity, 'error')}
                        />

                        <TextField required id="outlined-required" label="Rate inc Tax" value={rateinctax} type="number"
                            onChange={(e) => setval(e, setrateinctax)}
                            color={setboxColors(rateinctax, 'color')}
                            error={setboxColors(rateinctax, 'error')}
                        />

                        <TextField required id="outlined-required" label="Rate" value={rate} type="number"
                            onChange={(e) => setval(e, setrate)}
                            color={setboxColors(rate, 'color')}
                            error={setboxColors(rate, 'error')}
                        />

                        <TextField required id="outlined-required" label="Per" value={per}
                            onChange={(e) => setval(e, setper)}
                            color={setboxColors(per, 'color')}
                            error={setboxColors(per, 'error')}
                        />

                        <TextField required id="outlined-required" label="Discount" value={disc} type="number"
                            onChange={(e) => setval(e, setdisc)}
                            color={setboxColors(disc, 'color')}
                            error={setboxColors(disc, 'error')}
                        />

                        <TextField required id="outlined-required" label="Amount" value={amount} type="number"
                            onChange={(e) => setval(e, setamount)}
                            color={setboxColors(amount, 'color')}
                            error={setboxColors(amount, 'error')}
                        />

                        {/* singleitem,setsingleitem,list, setList,totalamt,settotalamt,totalamtwords,settotalamtwords,singlehsnitem,setsinglehsnitem,
totalhsnamt,settotalhsnamt,totalhsnamt,settotalhsnamt,hsnlist, sethsnList,totalhsnamtwords,settotalhsnamtwords */}
                        <div>
                            <Button variant="contained" color="success" size="medium" onClick={() => addOrUpdateItemHandler('Add')}>Add Item</Button>
                        </div>

                    </Box>

                </FormControl>
            </FormGroup>

        </form>
    </>
}

export default TableForm;