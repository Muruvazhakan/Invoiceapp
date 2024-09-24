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
  const [totalhsnamt, settotalhsnamt] = useState(0);
  const [hsnlist, sethsnList] = useState([]);
  const [totalhsnamtwords, settotalhsnamtwords] = useState(0);

  const calculateTotal = () => {
    if(list.length >0){
      const allItems = list.map((item) => item.amount);
      let grpby=[];
      for(let i=0;i<list.length;i++){
          for(let j=0;j<grpby.length;j++){
            if(list[i].hsn==grpby[j].hsn){
              grpby[j].amount +=list[i].amount;
            }
            else{
              grpby[j].hsn=list[i].hsn;
              list[i].amount=list[i].amount;
            }
          }
      }
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



  const context = {
    singleitem, setsingleitem, list, setList, totalamt, settotalamt, totalamtwords, settotalamtwords, singlehsnitem, setsinglehsnitem,
    totalhsnamt, settotalhsnamt, totalhsnamt, settotalhsnamt, hsnlist, sethsnList, totalhsnamtwords, settotalhsnamtwords, totalsubamt, setsubtotalamt,gstCgstitem, setgstCgstitem
  };
  return <AllState.Provider value={context}>{children}</AllState.Provider>;
}

export default AllStateContext;