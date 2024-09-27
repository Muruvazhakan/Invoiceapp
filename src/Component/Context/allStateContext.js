import React, { createContext, useState, useEffect } from "react";

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
  const [desc, setdesc] = useState('');
  const [hsn, sethsn] = useState(0);
  const [quantity, setquantity] = useState(0);
  const [rateinctax, setrateinctax] = useState(0);
  const [rate, setrate] = useState(0);
  const [per, setper] = useState('');
  const [disc, setdisc] = useState(15);
  const [amount, setamount] = useState(0);
  const [gstCgstitem, setgstCgstitem] = useState([{
    desc: 'OUTPUTCGST9%',
    name: 'cgst',
    amount: 0
  }, {
    desc: 'OUTPUTSGST9%',
    name: 'sgst',
    amount: 0
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
  const [isinstallationcharge, setisinstallationcharge] = useState(false);
  const [otherchargedetail, setOtherchargedetail] = useState([]);
  const [otherdesc, setotherdesc] = useState('');
  const [ischargedinhsn, setischargedinhsn] = useState(true);
  const [otherdescamt, setotherdescamt] = useState(0);
  const calculateTotal = () => {
    if (list.length > 0) {
      const allItems = list.map((item) => item.amount);

      // setsinglehsnitem({
      //   ...singlehsnitem,

      // })
      setsubtotalamt(collect(allItems).sum().toFixed(2));
      //   setgstCgstitem({
      //     amount:collect(allItems).sum()});
    }

  };

  const editListRows = (item, type) => {
    console.log("item " );
    console.log(item);
    const removedist = list.filter((alllist) => {
      return alllist.id != item.id;
    })
    const selected = hsnlist.filter((hsnlist) => {
      return hsnlist.hsndesc == item.hsn;
    });

    const otherhsn = hsnlist.filter((hsnlist) => {
      return hsnlist.hsndesc !== item.hsn;
    });
    let diff = (selected[0].taxvalue)*1 - (item.amount)*1;
    console.log("diff " + diff);
    console.log(removedist);
    console.log(selected[0].taxvalue + " item.taxvalue " + item.amount);
    console.log(selected);
    if (type === "update") {
      setdesc(item.desc);
      sethsn(item.hsn);
      setquantity(item.quantity);
      setrateinctax(item.rateinctax);
      setrate(item.rate);
      setper(item.per);
      setdisc(item.disc);
      setamount(item.amount);

    }
    if (diff > 0) {
      console.log("inside diff");
      let singlehsn = {
        id: selected[0].id,
        hsndesc: selected[0].hsndesc,
        taxvalue: diff,
        ctrate: (selected[0].ctrate)*1,
        ctamount: (selected[0].ctamount)*1 - (item.ctamount)*1,
        strate: (selected[0].strate)*1,
        stamount: (selected[0].stamount)*1 - (item.stamount)*1,
        amount: (selected[0].amount)*1 - (item.amount)*1,
      };
      let finallist = {...otherhsn,...singlehsn};
     
      // sethsnList(finallist);
    //   sethsnList({...otherhsn,
          
    //     ...singlehsn
    // });
    }
    else {
      sethsnList(
        otherhsn,
      );
    }
    setList(removedist);
  };

  useEffect(() => {
    calculateTotal();
  });

  const calculateHsn = () => {
    let stamt = 0, ctamt = 0;
    if (hsnlist.length > 0) {


      // console.log(" hsnlist before "+hsnlist);
      hsnlist.map((item) => {
        // otheritemdesc: otherdesc,
        // otherdescamt: otherdescamt,
        // ischargedinhsn:ischargedinhsn
        item.hsndesc = item.hsndesc;
        item.taxvalue = item.taxvalue;
        item.ctrate = ctrate;

        item.ctamount = (((item.taxvalue * 1) * ctrate * 1) / 100).toFixed(2);
        item.strate = strate;
        item.stamount = (((item.taxvalue * 1) * strate * 1) / 100).toFixed(2);

        item.amount = ((((item.taxvalue * 1) * ctrate * 1) / 100) + (((item.taxvalue * 1) * strate * 1) / 100)).toFixed(2)

      });
      // console.log(" hsnlist after "+hsnlist);

      console.log(" otherchargedetail before " + otherchargedetail);
      otherchargedetail.map((item) => {


        item.otheritemdesc = item.otheritemdesc;
        item.otherdesctaxamt = item.otherdesctaxamt;
        item.ctrate = ctrate;

        item.ctamount = (((item.otherdesctaxamt * 1) * ctrate * 1) / 100).toFixed(2);
        item.strate = strate;
        item.stamount = (((item.otherdesctaxamt * 1) * strate * 1) / 100).toFixed(2);

        item.otherdescamt = ((((item.otherdesctaxamt * 1) * ctrate * 1) / 100) + (((item.otherdesctaxamt * 1) * strate * 1) / 100)).toFixed(2)


      });
      console.log(" otherchargedetail after " + otherchargedetail);

      const allItemsexclueshsn = otherchargedetail.map((item) => item.otherdescamt);
      const allItemamount = otherchargedetail.map((item) => item.otherdesctaxamt);
      const allItemsinclueshsn = otherchargedetail.filter((item) => item.ischargedinhsn).map((item) => item.otherdescamt);
      const allItemstaxinclueshsn = otherchargedetail.filter((item) => item.ischargedinhsn).map((item) => item.otherdesctaxamt);
      const allItemscentralinclueshsn = otherchargedetail.filter((item) => item.ischargedinhsn).map((item) => item.ctamount);
      const allItemsstateinclueshsn = otherchargedetail.filter((item) => item.ischargedinhsn).map((item) => item.stamount);

      console.log(" allItemsinclues  " + allItemsinclueshsn);
      console.log(" allItemsexclueshsn  " + allItemsexclueshsn);

      settotalhsnamt(((collect(hsnlist.map((item) => item.amount)).sum()) + (collect(allItemsinclueshsn).sum())).toFixed(2));
      settotalcentaxamt((collect(hsnlist.map((item) => item.ctamount)).sum() + (collect(allItemscentralinclueshsn).sum())).toFixed(2));
      settotalstatetaxamt((collect(hsnlist.map((item) => item.stamount)).sum() + (collect(allItemsstateinclueshsn).sum())).toFixed(2));
      settotaltaxvalueamt(((collect(hsnlist.map((item) => item.taxvalue)).sum()) + (collect(allItemstaxinclueshsn).sum())).toFixed(2));
      // settotalamt(((totalhsnamt)+(totalsubamt)).toFixed(2));
      settotalamt(((collect(hsnlist.map((item) => item.amount)).sum()) + (collect(list.map((item) => item.amount)).sum()) + (collect(allItemamount).sum()) + (collect(allItemsinclueshsn).sum())).toFixed(2));
      // settotalamt(((collect(hsnlist.map((item) => item.amount)).sum())+(collect(list.map((item) => item.amount)).sum())+(collect(allItemsexclueshsn).sum())).toFixed(2));
      // settotalhsnamt(((collect(hsnlist.map((item) => item.amount)).sum())+(collect(allItemsinclueshsn.map((item) => item.taxvalue)).sum())).toFixed(2));
      // settotalcentaxamt(((collect(hsnlist.map((item) => item.ctamount)).sum())+(collect(allItemsinclueshsn.map((item) => item.ctamount)).sum())).toFixed(2));
      // settotalstatetaxamt(((collect(hsnlist.map((item) => item.ctamount)).sum())+(collect(allItemsinclueshsn.map((item) => item.ctamount)).sum())).toFixed(2));
      // settotaltaxvalueamt(((collect(hsnlist.map((item) => item.taxvalue)).sum())+(collect(allItemsinclueshsn.map((item) => item.taxvalue)).sum())).toFixed(2));
      // settotalamt(((totalhsnamt)+(totalsubamt)+(collect(allOtheritem).sum())).toFixed(2));
      console.log(" value " + totalsubamt);
      console.log(totalamt + " " + " totalhsnamt " + totalhsnamt + " totalcentaxamt " + totalcentaxamt + " totalstatetaxamt " + totalstatetaxamt);
    }
  }

  useEffect(() => {
    calculateHsn();
  }, [list, otherchargedetail]);
  const context = {
    singleitem, setsingleitem, list, setList, totalamt, settotalamt, totalamtwords, settotalamtwords, singlehsnitem, setsinglehsnitem,
    desc, setdesc, hsn, sethsn, quantity, setquantity, rateinctax, setrateinctax, rate, setrate, per, setper, disc, setdisc, amount, setamount, otherdesc, setotherdesc, ischargedinhsn, setischargedinhsn, otherdescamt, setotherdescamt,
    totalhsnamt, settotalhsnamt, hsnlist, sethsnList, totalhsnamtwords, settotalhsnamtwords, totalsubamt,
    setsubtotalamt, gstCgstitem, setgstCgstitem, ctrate, setctrate, strate, setstrate, ctatm, setctatm, statm, setstatm, totaltaxvalueamt, settotaltaxvalueamt,
    totalcentaxamt, settotalcentaxamt, totalstatetaxamt, settotalstatetaxamt, isinstallationcharge, setisinstallationcharge, otherchargedetail, setOtherchargedetail, editListRows
  };
  return <AllState.Provider value={context}>{children}</AllState.Provider>;
}

export default AllStateContext;