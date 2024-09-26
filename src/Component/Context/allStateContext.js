import React, { createContext, useState,useEffect } from "react";

import { v4 as uuidv4 } from "uuid";
import collect from "collect.js";
export const AllState = createContext();

const AllStateContext = ({ children }) => {


  const [width] = useState(641);

  const [singleitem, setsingleitem] = useState({
    id: 1,
    desc: '',
    hsn: '',
    quantity: 0,
    rateinctax: 0,
    rate: 0,
    per: '',
    disc: 1,
    amount: 0
  });
  const [list, setList] = useState([]);
  const [totalsubamt, setsubtotalamt] = useState(0);
  const [totalamt, settotalamt] = useState(0);
  const [totaltaxvalueamt, settotaltaxvalueamt] = useState(0);
  const [totalamtwords, settotalamtwords] = useState('words');
  const [gstCgstitem, setgstCgstitem] = useState([{
    desc:'OUTPUTCGST9%',
    name:'cgst',
    amount:0
  },{
    desc:'OUTPUTSGST9%',
    name:'sgst',
    amount:0
  }]);
  const [singlehsnitem, setsinglehsnitem] = useState({
    id: 1,
    hsndesc: '',
    taxvalue: 0,
    ctrate: 0,
    ctamount: 0,
    strate: 0,
    stamount: 0,
    amount: 0
  });
  const [ctrate, setctrate] = useState(0);
  const [ctatm, setctatm] = useState(0);
  const [strate, setstrate] = useState(0);
  const [statm, setstatm] = useState(0);

  const [totalhsnamt, settotalhsnamt] = useState(0);

  const [totalcentaxamt, settotalcentaxamt] = useState(0);
  const [totalstatetaxamt, settotalstatetaxamt] = useState(0);
  const [hsnlist, sethsnList] = useState([]);
  const [totalhsnamtwords, settotalhsnamtwords] = useState('');
  const [isinstallationcharge,setisinstallationcharge]=useState(false);
  const [installationchargeamt,setinstallationchargeamt]=useState(0);
  const calculateTotal = () => {
    if(list.length >0){
      const allItems = list.map((item) => item.amount);
      
      // console.log('calculate');
      // console.log(grpby);
      // setsinglehsnitem({
      //   ...singlehsnitem,

      // })
      setsubtotalamt(collect(allItems).sum());
    //   setgstCgstitem({
    //     amount:collect(allItems).sum()});
    }
    
  };

  useEffect(() => {
    calculateTotal();
  });

  const calculateHsn = ()=>{
    let stamt=0,ctamt=0;
    if(hsnlist.length>0){
      
      // id: 1,
      // hsndesc: '',
      // taxvalue: 0,
      // ctrate: 0,
      // ctamount: 0,
      // strate: 0,
      // stamount: 0,
      // amount: 0
      console.log(" hsnlist before "+hsnlist);
     hsnlist.map((item)=>{
      item.hsndesc= item.hsndesc;
      item.taxvalue=item.taxvalue ;
      item.ctrate=ctrate;
      
        item.ctamount= (((item.taxvalue*1)*ctrate*1 )/100).toFixed(2);
        item.strate=strate;
        item.stamount= (((item.taxvalue*1)*strate*1 )/100).toFixed(2);
        
        item.amount=((((item.taxvalue*1)*ctrate*1 )/100 ) + (((item.taxvalue*1)*strate*1 )/100)).toFixed(2)
      
      });
      console.log(" hsnlist after "+hsnlist);
      settotalamt(((collect(hsnlist.map((item) => item.amount)).sum())+(collect(list.map((item) => item.amount)).sum())).toFixed(2));
      settotalhsnamt((collect(hsnlist.map((item) => item.amount)).sum()));
      settotalcentaxamt((collect(hsnlist.map((item) => item.ctamount)).sum()));
      settotalstatetaxamt((collect(hsnlist.map((item) => item.stamount)).sum()));
      settotaltaxvalueamt((collect(hsnlist.map((item) => item.taxvalue)).sum()));
      console.log(" value "+totalsubamt);
      console.log(totalamt+ " "+" totalhsnamt "+totalhsnamt+" totalcentaxamt "+totalcentaxamt + " totalstatetaxamt "+totalstatetaxamt);
    }
  }

  useEffect(() => {
    calculateHsn();
  },[list]);
  const context = {
    singleitem, setsingleitem, list, setList, totalamt, settotalamt, totalamtwords, settotalamtwords, singlehsnitem, setsinglehsnitem,
    totalhsnamt, settotalhsnamt,  hsnlist, sethsnList, totalhsnamtwords, settotalhsnamtwords, totalsubamt, 
    setsubtotalamt,gstCgstitem, setgstCgstitem, ctrate, setctrate,strate, setstrate,ctatm, setctatm,statm, setstatm,totaltaxvalueamt, settotaltaxvalueamt,
    totalcentaxamt, settotalcentaxamt,totalstatetaxamt, settotalstatetaxamt ,isinstallationcharge,setisinstallationcharge,installationchargeamt,setinstallationchargeamt
  };
  return <AllState.Provider value={context}>{children}</AllState.Provider>;
}

export default AllStateContext;