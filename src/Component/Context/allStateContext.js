import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { ToWords } from "to-words";
import { v4 as uuidv4 } from "uuid";
import collect from "collect.js";
import * as XLSX from "xlsx";

import * as localstorage from "../Context/localStorageData";
import * as invoiceDb from "../DBconnection/invoiceDetailBD";

export const AllState = createContext();

const AllStateContext = ({ children }) => {
  const [width] = useState(641);

  const [singleitem, setsingleitem] = useState({
    id: 1,
    desc: "",
    hsn: "",
    quantity: 0,
    rateinctax: 0,
    rate: 0,
    per: "",
    disc: 1,
    amount: 0,
  });
  const [list, setList] = useState([]);
  const [totalsubamt, setsubtotalamt] = useState(0);
  const [totalamt, settotalamt] = useState(0);
  const [productid, setproductid] = useState("");
  const [totaltaxvalueamt, settotaltaxvalueamt] = useState(0);
  const [availablestock, setavailablestock] = useState(0);
  const [totalamtwords, settotalamtwords] = useState("");
  const [desc, setdesc] = useState("");
  const [hsn, sethsn] = useState(0);
  const [quantity, setquantity] = useState(0);
  const [rateinctax, setrateinctax] = useState(0);
  const [rate, setrate] = useState(0);
  const [per, setper] = useState("");
  const [disc, setdisc] = useState(0);
  const [amount, setamount] = useState(0);
  const [header, setheader] = useState("invoicerequest");
  const [clientName, setclientName] = useState("");
  const [clientPhno, setclientPhno] = useState("");
  const [clientAdd, setclientAdd] = useState("");
  const [clientid, setclientid] = useState(null);
  const [clientGST, setclientGST] = useState("");
  const [displayClientGST, setdisplayClientGST] = useState(false);
  const [invoiceid, setinvoiceid] = useState("");
  const [cleardetailoption, setcleardetailoption] = useState(true);
  const [gstincluded, setgstincluded] = useState(true);
  const [displayhsntable, setdisplayhsntable] = useState(false);
  const [invoiceidcount, setinvoiceidount] = useState(1000);
  const [invoicedate, setinvoicedate] = useState("");
  const [paymentmode, setpaymentmode] = useState("");
  const [paymentdate, setpaymentdate] = useState("");
  const [isEditInvoice, setisEditInvoice] = useState(false);

  const [gstCgstitem, setgstCgstitem] = useState([
    {
      desc: "OUTPUTCGST9%",
      name: "cgst",
      amount: 0,
    },
    {
      desc: "OUTPUTSGST9%",
      name: "sgst",
      amount: 0,
    },
  ]);
  const [singlehsnitem, setsinglehsnitem] = useState({
    id: 1,
    hsndesc: "",
    taxvalue: 0,
    ctrate: 0,
    ctamount: 0,
    strate: 0,
    stamount: 0,
    amount: 0,
  });
  const [ctrate, setctrate] = useState(9);
  const [ctatm, setctatm] = useState(0);
  const [strate, setstrate] = useState(9);
  const [statm, setstatm] = useState(0);

  const [totalhsnamt, settotalhsnamt] = useState(0);

  const [totalcentaxamt, settotalcentaxamt] = useState(0);
  const [totalstatetaxamt, settotalstatetaxamt] = useState(0);
  const [hsnlist, sethsnList] = useState([]);
  const [totalhsnamtwords, settotalhsnamtwords] = useState("");
  const [isinstallationcharge, setisinstallationcharge] = useState(false);
  const [otherchargedetail, setOtherchargedetail] = useState([]);
  const [otherdesc, setotherdesc] = useState("");
  const [ischargedinhsn, setischargedinhsn] = useState(true);
  const [otherdescamt, setotherdescamt] = useState(0);

  const [invoiceHistoryData, setinvoiceHistoryData] = useState([]);
  const [estimateinvoiceHistoryData, setestimateinvoiceHistoryData] = useState(
    []
  );
  const [invoiceHistroyUpdateFlag, setinvoiceHistroyUpdateFlag] =
    useState(false);

  const toWords = new ToWords({
    localeCode: "en-IN",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
        // can be used to override defaults for the selected locale
        name: "Rupee",
        plural: "Rupees",
        symbol: "₹",
        fractionalUnit: {
          name: "Paisa",
          plural: "Paise",
          symbol: "",
        },
      },
    },
  });

  const setval = (e, fun) => {
    fun(e.target.value);
  };

  const setboxColors = (item, field) => {
    if (field === "color") {
      return item == "" || item === 0 || (item && item.length === 0)
        ? "error"
        : "success";
    } else {
      return item == "" || item === 0 || (item && item.length === 0)
        ? true
        : false;
    }
  };

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
    console.log("item ");
    console.log(item);
    const removedist = list.filter((alllist) => {
      return alllist.id != item.id;
    });
    const selected = hsnlist.filter((hsnlist) => {
      return hsnlist.hsndesc == item.hsn;
    });

    const otherhsn = hsnlist.filter((hsnlist) => {
      return hsnlist.hsndesc !== item.hsn;
    });
    let diff = selected[0].taxvalue * 1 - item.amount * 1;
    // console.log("diff " + diff);
    // console.log(removedist);
    // console.log(selected[0].taxvalue + " item.taxvalue " + item.amount);
    // console.log(selected);
    // console.log("otherhsn");
    // console.log(otherhsn);
    if (type === "update") {
      setdesc(item.desc);
      sethsn(item.hsn);
      setquantity(item.quantity);
      setrateinctax(item.rateinctax);
      if (item.productid) setproductid(item.productid);
      if (gstincluded) {
        let orgctrate = (
          (item.rate * 1) /
          (1 + ctrate / 100 + strate / 100)
        ).toFixed(2);
        setrate(orgctrate);
      } else {
        setrate(item.rate);
      }

      setper(item.per);
      setdisc(item.disc);
      setamount(item.amount);
      toast.info("Item is added in edit section");
    }
    if (diff > 0) {
      // console.log("inside diff");
      let currentsinglehsnitem = selected[0];
      // console.log("currentsinglehsnitem"); console.log(currentsinglehsnitem);

      if (currentsinglehsnitem.hsndesc == item.hsn) {
        // console.log("before inside" + currentsinglehsnitem.taxvalue + " item.amount : " + item.amount);
        let ingvalue = item.amount;
        currentsinglehsnitem.taxvalue =
          currentsinglehsnitem.taxvalue * 1 - ingvalue * 1;
        // currentsinglehsnitem.taxvalue = 4 +currentsinglehsnitem.taxvalue;
        // console.log("after inside" + currentsinglehsnitem.taxvalue + " item.amount : " + item.amount);
        // currentsinglehsnitem[i].ctrate
      }
    } else if (otherhsn.length > 0) {
      sethsnList(otherhsn);
    } else {
      sethsnList([]);
    }
    setList(removedist);
    if (type === "delete") {
      toast.warning("Item Deleted");
    }
    // console.log(hsnlist.length + "list.length " +list.length + "otherchargedetail " + otherchargedetail.length );
  };

  const addOrEditOtherItems = (item, type) => {
    const removedist = otherchargedetail.filter((alllist) => {
      return alllist.id != item.id;
    });

    if (type === "update") {
      // console.log("addOrEditOtherItems ");

      // console.log("removalitem ");

      // console.log(item);
      // setotherdesc()
      setotherdesc(item.otheritemdesc);
      setotherdescamt(item.otherdesctaxamt);
      setischargedinhsn(item.ischargedinhsn);
      setOtherchargedetail(removedist);
      toast.info("Other Item added to edit section");
    } else if (type === "delete") {
      setOtherchargedetail(removedist);
      toast.success("Other Item Deleted");
    } else if (type === "add") {
      if (
        otherdesc.length > 0 &&
        otherdescamt > 0 &&
        ctrate > 0 &&
        strate > 0
      ) {
        let singleOtherItem = {
          id: uuidv4(),
          otheritemdesc: otherdesc,
          otherdescamt: otherdescamt,
          otherdesctaxamt: otherdescamt,
          ischargedinhsn: ischargedinhsn,
        };

        setOtherchargedetail([...otherchargedetail, singleOtherItem]);

        toast.success("Other Item added");
      } else if (ctrate <= 0 && strate <= 0) {
        toast.error("Please fill HSN Tax rate");
      } else {
        toast.error("Please fill in all inputs in Other details");
      }
    }
  };

  useEffect(() => {
    calculateTotal();
  });

  useEffect(() => {
    if (
      hsnlist.length == 0 &&
      list.length == 0 &&
      otherchargedetail.length == 0
    ) {
      settotalamt(0);
      setsubtotalamt(0);
      settotalcentaxamt(0);
      settotalhsnamt(0);
      settotalstatetaxamt(0);
      settotaltaxvalueamt(0);
      settotalamtwords("");
      settotalhsnamtwords("");
    }
    if (list.length == 0) {
      setsubtotalamt(0);
    }
  }, [list, otherchargedetail]);

  const calculateHsn = () => {
    if (hsnlist.length > 0 || otherchargedetail.length > 0) {
      // console.log(" hsnlist before "+hsnlist);
      hsnlist.map((item) => {
        // otheritemdesc: otherdesc,
        // otherdescamt: otherdescamt,
        // ischargedinhsn:ischargedinhsn
        item.hsndesc = item.hsndesc;
        item.taxvalue = item.taxvalue;
        item.ctrate = ctrate;
        item.strate = strate;
        if (gstincluded) {
          // let orgctrate = (
          //   (item.taxvalue * 1) /
          //   (1 + ctrate / 100 + strate / 100)
          // ).toFixed(2);
          let orgctrate = (
            item.taxvalue *
            1 *
            (ctrate / 100 + strate / 100)
          ).toFixed(2);
          // console.log(" orgctrate after "+orgctrate);
          item.ctamount = ((item.taxvalue * 1 * ctrate * 1) / 100).toFixed(2);
          // console.log(" ctamount after "+item.ctamount);
          item.stamount = ((item.taxvalue * 1 * strate * 1) / 100).toFixed(2);
          // console.log(" stamount after "+item.stamount);
          // item.amount = (
          //   (orgctrate * 1 * ctrate * 1) / 100 +
          //   (orgctrate * 1 * strate * 1) / 100
          // ).toFixed(2);
          item.amount = item.ctamount * 1 + item.stamount * 1;
          console.log(" item + amount ");
          console.log(item);
        } else {
          item.ctamount = ((item.taxvalue * 1 * ctrate * 1) / 100).toFixed(2);
          item.stamount = ((item.taxvalue * 1 * strate * 1) / 100).toFixed(2);
          item.amount = (
            (item.taxvalue * 1 * ctrate * 1) / 100 +
            (item.taxvalue * 1 * strate * 1) / 100
          ).toFixed(2);
        }
      });
      console.log(" hsnlist after " + hsnlist);

      // console.log(" otherchargedetail before " + otherchargedetail);
      otherchargedetail.map((item) => {
        item.otheritemdesc = item.otheritemdesc;
        item.otherdesctaxamt = item.otherdesctaxamt;
        item.ctrate = ctrate;
        item.strate = strate;
        if (gstincluded) {
          let orgctrate = (
            (item.otherdesctaxamt * 1) /
            (1 + ctrate / 100 + strate / 100)
          ).toFixed(2);
          item.ctamount = ((orgctrate * 1 * ctrate * 1) / 100).toFixed(2);
          item.stamount = ((orgctrate * 1 * strate * 1) / 100).toFixed(2);
          item.otherdescamt = (
            (orgctrate * 1 * ctrate * 1) / 100 +
            (orgctrate * 1 * strate * 1) / 100
          ).toFixed(2);
        } else {
          item.ctamount = (
            (item.otherdesctaxamt * 1 * ctrate * 1) /
            100
          ).toFixed(2);
          item.stamount = (
            (item.otherdesctaxamt * 1 * strate * 1) /
            100
          ).toFixed(2);
          item.otherdescamt = (
            (item.otherdesctaxamt * 1 * ctrate * 1) / 100 +
            (item.otherdesctaxamt * 1 * strate * 1) / 100
          ).toFixed(2);
        }
      });
      // console.log(" otherchargedetail after " + otherchargedetail);

      const allItemsexclueshsn = otherchargedetail.map(
        (item) => item.otherdescamt
      );
      const allItemamount = otherchargedetail.map(
        (item) => item.otherdesctaxamt
      );
      const allItemsinclueshsn = otherchargedetail
        .filter((item) => item.ischargedinhsn)
        .map((item) => item.otherdescamt);
      const allItemstaxinclueshsn = otherchargedetail
        .filter((item) => item.ischargedinhsn)
        .map((item) => item.otherdesctaxamt);
      const allItemscentralinclueshsn = otherchargedetail
        .filter((item) => item.ischargedinhsn)
        .map((item) => item.ctamount);
      const allItemsstateinclueshsn = otherchargedetail
        .filter((item) => item.ischargedinhsn)
        .map((item) => item.stamount);

      // console.log(" allItemsinclues  " + allItemsinclueshsn);
      // console.log(" allItemsexclueshsn  " + allItemsexclueshsn);
      let totalhsnamts = (
        collect(hsnlist.map((item) => item.amount)).sum() +
        collect(allItemsinclueshsn).sum()
      ).toFixed(2);
      settotalhsnamt(totalhsnamts);

      let words = toWords.convert(totalhsnamts);
      console.log(totalhsnamts + " : totalhsnamts , " + " words  " + words);
      settotalhsnamtwords(words);

      settotalcentaxamt(
        (
          collect(hsnlist.map((item) => item.ctamount)).sum() +
          collect(allItemscentralinclueshsn).sum()
        ).toFixed(2)
      );
      settotalstatetaxamt(
        (
          collect(hsnlist.map((item) => item.stamount)).sum() +
          collect(allItemsstateinclueshsn).sum()
        ).toFixed(2)
      );
      settotaltaxvalueamt(
        (
          collect(hsnlist.map((item) => item.taxvalue)).sum() +
          collect(allItemstaxinclueshsn).sum()
        ).toFixed(2)
      );
      // settotalamt(((totalhsnamt)+(totalsubamt)).toFixed(2));
      let totlamt = 0;
      if (gstincluded) {
        totlamt = (
          collect(list.map((item) => item.amount)).sum() +
          collect(hsnlist.map((item) => item.amount)).sum() +
          collect(allItemamount).sum()
        ).toFixed(2);
      } else {
        totlamt = (
          collect(hsnlist.map((item) => item.amount)).sum() +
          collect(list.map((item) => item.amount)).sum() +
          collect(allItemamount).sum() +
          collect(allItemsinclueshsn).sum()
        ).toFixed(2);
      }
      settotalamt(totlamt);
      let amtwords = toWords.convert(totlamt);
      console.log(totlamt + " : totalhsnamts , " + " words  " + amtwords);
      settotalamtwords(amtwords);
      // settotalamt(((collect(hsnlist.map((item) => item.amount)).sum())+(collect(list.map((item) => item.amount)).sum())+(collect(allItemsexclueshsn).sum())).toFixed(2));
      // settotalhsnamt(((collect(hsnlist.map((item) => item.amount)).sum())+(collect(allItemsinclueshsn.map((item) => item.taxvalue)).sum())).toFixed(2));
      // settotalcentaxamt(((collect(hsnlist.map((item) => item.ctamount)).sum())+(collect(allItemsinclueshsn.map((item) => item.ctamount)).sum())).toFixed(2));
      // settotalstatetaxamt(((collect(hsnlist.map((item) => item.ctamount)).sum())+(collect(allItemsinclueshsn.map((item) => item.ctamount)).sum())).toFixed(2));
      // settotaltaxvalueamt(((collect(hsnlist.map((item) => item.taxvalue)).sum())+(collect(allItemsinclueshsn.map((item) => item.taxvalue)).sum())).toFixed(2));
      // settotalamt(((totalhsnamt)+(totalsubamt)+(collect(allOtheritem).sum())).toFixed(2));
      // console.log(" value " + totalsubamt);
      // console.log(totalamt + " " + " totalhsnamt " + totalhsnamt + " totalcentaxamt " + totalcentaxamt + " totalstatetaxamt " + totalstatetaxamt);
    }
  };

  useEffect(() => {
    // console.log('tabledet');
    let val;
    // let orgctrate = ((val * 1)/(1+(((ctrate*1)+(strate*1))/100))).toFixed(2);
    //     console.log('orgctrate');
    //     console.log(orgctrate);
    // console.log(tabledet);

    if (quantity !== 0 || rateinctax !== 0 || disc !== 0) {
      val = rateinctax - (disc * rateinctax) / 100;
      let calamt = quantity * val;
      if (gstincluded) {
        let orgctrate = ((val * 1) / (1 + ctrate / 100 + strate / 100)).toFixed(
          2
        );
        console.log("orgctrate222%%%%");
        console.log(orgctrate);
        setrate(orgctrate);
        calamt = quantity * orgctrate;
        setamount(calamt.toFixed(2));
      } else {
        setrate(val.toFixed(2));
        setamount(calamt.toFixed(2));
      }
    } else if (disc == 0 && rateinctax !== 0) {
      let calamt = quantity * rate;
      if (gstincluded) {
        let orgctrate = ((val * 1) / (1 + ctrate / 100 + strate / 100)).toFixed(
          2
        );
        //     console.log('orgctrate');
        // console.log(orgctrate);
        setrate(orgctrate);
        setamount(calamt.toFixed(2));
      } else {
        setrate(rateinctax.toFixed(2));
        setamount(calamt.toFixed(2));
      }
    }

    // console.log(rate + " rate " + val);
  }, [disc, rateinctax, quantity]);

  const addOrUpdateItemHandler = (opt) => {
    if (
      desc.length !== 0 &&
      hsn.length !== 0 &&
      quantity > 0 &&
      rateinctax > 0 &&
      rate > 0 &&
      amount > 0
      // && ctrate > 0 && strate > 0
    ) {
      if (opt === "Update") {
        toast.success("Item updated");
      } else {
        let singleitem = {
          id: uuidv4(),
          productid: productid,
          desc: desc,
          hsn: hsn,
          quantity: quantity,
          rateinctax: rateinctax,
          rate: rate,
          per: per,
          disc: disc,
          amount: amount,
        };
        setList([...list, singleitem]);
        let singlehsn = {
          id: 1,
          hsndesc: "",
          taxvalue: 0,
          ctrate: 0,
          ctamount: 0,
          strate: 0,
          stamount: 0,
          amount: 0,
        };
        let currentsinglehsnitem = hsnlist;
        //   console.log("currentsinglehsnitem" + currentsinglehsnitem);
        //   console.log(currentsinglehsnitem);
        if (currentsinglehsnitem.length > 0) {
          let found = 0;
          for (let i = 0; i < currentsinglehsnitem.length; i++) {
            // console.log('inside1');
            console.log(
              currentsinglehsnitem[i].hsndesc + " item " + singleitem.hsn
            );
            if (currentsinglehsnitem[i].hsndesc == singleitem.hsn) {
              console.log(
                "before inside" +
                  currentsinglehsnitem[i].taxvalue +
                  " singleitem.amount : " +
                  singleitem.amount
              );
              let ingvalue = singleitem.amount;
              currentsinglehsnitem[i].taxvalue =
                ingvalue * 1 + currentsinglehsnitem[i].taxvalue * 1;
              // currentsinglehsnitem[i].taxvalue = 4 +currentsinglehsnitem[i].taxvalue;
              console.log(
                "after inside" +
                  currentsinglehsnitem[i].taxvalue +
                  " singleitem.amount : " +
                  singleitem.amount
              );
              // currentsinglehsnitem[i].ctrate
              found = 1;
            }
          }
          if (found == 0) {
            // singlehsn = {
            //     id: uuidv4(),
            //     hsndesc: singleitem.hsn,
            //     taxvalue: singleitem.amount,
            //     ctrate: ctrate,
            //     ctamount: ((singleitem.amount*1)*ctrate*1 )/100,
            //     strate: strate,
            //     stamount: ((singleitem.amount*1)*strate*1 )/100,
            //     amount:((((singleitem.amount*1)*ctrate*1 )/100 ) + (((singleitem.amount*1)*strate*1 )/100) + (singleitem.amount*1)).toFixed(2)
            // };
            singlehsn = {
              id: uuidv4(),
              hsndesc: singleitem.hsn,
              taxvalue: singleitem.amount,
              ctrate: 0,
              ctamount: 0,
              strate: 0,
              stamount: 0,
              amount: singleitem.amount,
            };
            sethsnList([...hsnlist, singlehsn]);
          }
          console.log("compl");
          console.log(currentsinglehsnitem);
        } else {
          singlehsn = {
            id: uuidv4(),
            hsndesc: singleitem.hsn,
            taxvalue: singleitem.amount,
            ctrate: 0,
            ctamount: 0,
            strate: 0,
            stamount: 0,
            amount: singleitem.amount,
          };

          sethsnList([...hsnlist, singlehsn]);
        }

        toast.success("Item added");
        if (cleardetailoption) {
          clearlistcontent();
        }
      }
    } else {
      toast.error("Please fill in all inputs in HSN and Add Goods tab");
    }
  };

  const clearlistcontent = () => {
    setdesc("");
    sethsn("");
    setquantity(0);
    setavailablestock(0);
    setproductid("");
    setrateinctax("");
    setrate(0);
    setper("");
    setdisc(0);
    setamount(0);
  };

  const addOtherItems = () => {
    addOrEditOtherItems("", "add");
    if (cleardetailoption) {
      clearOtherDetails();
    }
  };

  const clearOtherDetails = () => {
    setotherdesc("");
    setotherdescamt(0);
    setischargedinhsn(true);
  };

  const saveLocalInvoice = (singleinvoice) => {
    let localinv = invoiceHistoryData;
    if (invoiceHistoryData !== null) {
      let iscontains = false;
      invoiceHistoryData.map((item) => {
        if (item.invoiceid === invoiceid) {
          item.invoicedate = invoicedate;
          item.paymentdate = paymentdate;
          item.paymentmode = paymentmode;
          item.list = list;
          item.hsnlist = hsnlist;
          item.otherchargedetail = otherchargedetail;
          item.totalcentaxamt = totalcentaxamt;
          item.totalstatetaxamt = totalstatetaxamt;
          item.totalsubamt = totalsubamt;
          item.totalamt = totalamt;
          item.totalamtwords = totalamtwords;
          item.totaltaxvalueamt = totaltaxvalueamt;
          item.totalhsnamt = totalhsnamt;
          item.totalhsnamtwords = totalhsnamtwords;
          item.clientAdd = clientAdd;
          item.clientName = clientName;
          item.clientPhno = clientPhno;
          item.clientid = clientid;
          item.clientGST = clientGST;
          iscontains = true;
        }
        return item;
      });
      if (iscontains === false) {
        setinvoiceHistoryData([...invoiceHistoryData, singleinvoice]);
        localinv = [...invoiceHistoryData, singleinvoice];
        toast.success("Invoice Details are added");
      } else {
        toast.success("Invoice Details are updated");
      }
      // console.log('estimateHistoryData');
      // console.log(estimateHistoryData);
    } else {
      // console.log('inside else');
      setinvoiceHistoryData([singleinvoice]);
      localinv = [singleinvoice];
    }
    localstorage.addOrGetInvoiceHistoryData(localinv, "save");
    // segregateDataByMonth(localinv);
    // deriveProfitStock(localinv);
  };
  const saveInvoice = async () => {
    console.log("saveInvoice");
    let loginuserid = localstorage.addOrGetUserdetail("", "userid", "get");
    console.log("loginuserid + loginuserid");

    if (list.length < 1) {
      toast.error("Please include Product in Invoice ");
      return false;
    }
    if (invoiceid === "") {
      toast.error("Invoice Id is not Generate");
      return false;
    }
    if (paymentdate === "") {
      toast.error("Please provide Paymentdate in Invoice");
      return false;
    }
    let clientidtemp;
    if (clientid == null) {
      clientidtemp = uuidv4();
      setclientid(clientidtemp);
    } else {
      clientidtemp = clientid;
    }
    let datas = {
      authorization: header,
      ctrate: ctrate,
      strate: strate,
      invoiceid: invoiceid,
      invoicedate: invoicedate,
      invoicedate1: invoicedate,
      paymentdate: paymentdate,
      paymentdate1: paymentdate,
      paymentmode: paymentmode,
      list: list,
      hsnlist: hsnlist,
      otherchargedetail: otherchargedetail,
      totalcentaxamt: totalcentaxamt,
      totalstatetaxamt: totalstatetaxamt,
      totalsubamt: totalsubamt,
      totalamt: totalamt,
      totalamtwords: totalamtwords,
      totaltaxvalueamt: totaltaxvalueamt,
      totalhsnamt: totalhsnamt,
      totalhsnamtwords: totalhsnamtwords,
      clientAdd: clientAdd,
      clientName: clientName,
      clientPhno: clientPhno,
      clientid: clientidtemp,
      clientGST: clientGST,
    };
    console.log(datas);
    saveLocalInvoice(datas);

    let savedataresponse = await invoiceDb.saveInvoiceBD(datas, loginuserid);
    if (savedataresponse.status !== 200) {
      toast.warn("Issue in saving Invoice");
      return;
    }
    console.log("savedataresponse");
    console.log(savedataresponse);

    localstorage.addOrGetInvoiceid(invoiceidcount, "save");
    console.log(invoiceidcount + " invoiceidcount");
    let saveinvoiceidcountdataresponse = await invoiceDb.saveInvoiceId(
      invoiceidcount,
      loginuserid
    );
    if (saveinvoiceidcountdataresponse.status !== 200) {
      toast.warn("Issue in Update");
      return;
    }
    console.log("saveinvoiceidcountdataresponse");
    console.log(saveinvoiceidcountdataresponse);

    toast.success("Invoice saved");
  };

  const saveEstimateInvoice = async () => {
    console.log("saveInvoice");
    let loginuserid = localstorage.addOrGetUserdetail("", "userid", "get");
    console.log("loginuserid + loginuserid");

    let clientidtemp;
    if (clientid == null) {
      clientidtemp = uuidv4();
      setclientid(clientidtemp);
    } else {
      clientidtemp = clientid;
    }
    let datas = {
      authorization: header,
      ctrate: ctrate,
      strate: strate,
      invoiceid: invoiceid,
      invoicedate: invoicedate,
      invoicedate1: invoicedate,
      paymentdate: paymentdate,
      paymentdate1: paymentdate,
      paymentmode: paymentmode,
      list: list,
      hsnlist: hsnlist,
      otherchargedetail: otherchargedetail,
      totalcentaxamt: totalcentaxamt,
      totalstatetaxamt: totalstatetaxamt,
      totalsubamt: totalsubamt,
      totalamt: totalamt,
      totalamtwords: totalamtwords,
      totaltaxvalueamt: totaltaxvalueamt,
      totalhsnamt: totalhsnamt,
      totalhsnamtwords: totalhsnamtwords,
      clientAdd: clientAdd,
      clientName: clientName,
      clientPhno: clientPhno,
      clientid: clientidtemp,
      clientGST: clientGST,
    };
    console.log(datas);
    // saveLocalInvoice(datas);

    let savedataresponse = await invoiceDb.saveEstimatedInvoiceBD(
      datas,
      loginuserid
    );
    if (savedataresponse.status !== 200) {
      toast.warn("Issue in saving Invoice");
      return;
    }
    console.log("savedataresponse");
    console.log(savedataresponse);

    localstorage.addOrGetInvoiceid(invoiceidcount, "save");
    console.log(invoiceidcount + " invoiceidcount");
    let saveinvoiceidcountdataresponse = await invoiceDb.saveInvoiceId(
      invoiceidcount,
      loginuserid
    );
    if (saveinvoiceidcountdataresponse.status !== 200) {
      toast.warn("Issue in Update");
      return;
    }
    console.log("saveinvoiceidcountdataresponse");
    console.log(saveinvoiceidcountdataresponse);

    toast.success("Estimated Invoice saved");
  };

  const selectedInvoiceEdit = (props) => {
    console.log(props);
    setisEditInvoice(true);
    let singleinvoice = props;
    setinvoicedate(singleinvoice.invoicedate);
    setinvoiceid(singleinvoice.invoiceid);
    // setinvoicedate1(singleinvoice.invoicedate1);
    setpaymentdate(singleinvoice.paymentdate);
    // setpaymentdate1(singleinvoice.paymentdate1);
    setpaymentmode(singleinvoice.paymentmode);
    setList(singleinvoice.list);
    sethsnList(singleinvoice.hsnlist);
    setOtherchargedetail(singleinvoice.otherchargedetail);
    settotalcentaxamt(singleinvoice.totalcentaxamt);
    settotalstatetaxamt(singleinvoice.totalstatetaxamt);
    setsubtotalamt(singleinvoice.totalsubamt);
    settotalamt(singleinvoice.totalamt);
    settotalamtwords(singleinvoice.totalamtwords);
    settotaltaxvalueamt(singleinvoice.totaltaxvalueamt);
    settotalhsnamt(singleinvoice.totalhsnamt);
    settotalhsnamtwords(singleinvoice.totalhsnamtwords);
    setclientAdd(singleinvoice.clientAdd);
    setclientName(singleinvoice.clientName);
    setclientPhno(singleinvoice.clientPhno);
    setclientid(singleinvoice.clientid);
    setclientGST(singleinvoice.clientGST);
    // setproductid(singleinvoice.productid);
    console.log("inside ctrate ");
    if (singleinvoice.ctrate) {
      let ctratelocal = singleinvoice.ctrate * 1;
      console.log("inside ctrate " + ctratelocal);
      setctrate(ctratelocal);
    }
    if (singleinvoice.strate) {
      let stratelocal = singleinvoice.strate * 1;
      console.log("inside ctrate " + stratelocal);
      setstrate(stratelocal);
    }

    // setcolumns(singleinvoice.columns);
  };

  const deleteselectedInvoice = async (props) => {
    console.log("deleteselectedInvoice");
    console.log(props);
    let filterinvoice = invoiceHistoryData.filter(
      (data) => data.invoiceid !== props.invoiceid
    );
    let loginuserid = localstorage.addOrGetUserdetail("", "userid", "get");

    let response = await invoiceDb.deleteInvoiceDB(props, loginuserid);
    console.log("response");
    console.log(response);

    if (response.status === 200) {
      toast.success(response.data.message);
      setinvoiceHistoryData(filterinvoice);
    } else toast.warn(response.response.data.message);
  };

  const deleteInvoiceEstimate = async (props) => {
    console.log("deleteInvoiceEstimate");
    console.log(props);
    let filterinvoiceest = estimateinvoiceHistoryData.filter(
      (data) => data.invoiceid !== props.invoiceid
    );
    let loginuserid = localstorage.addOrGetUserdetail("", "userid", "get");

    let response = await invoiceDb.deleteInvoiceEstimateDB(props, loginuserid);
    console.log("response");
    console.log(response);

    if (response.status === 200) {
      toast.success(response.data.message);
      setestimateinvoiceHistoryData(filterinvoiceest);
    } else toast.warn(response.response.data.message);
  };

  const handleInvoiceExportXlsx = () => {
    let filtercolumn = invoiceHistoryData.map((data) => {
      return {
        Invoice_id: data.invoiceid,
        Invoice_date: data.invoicedate,
        Payment_date: data.paymentdate,
        Payment_mode: data.paymentmode,
        Client_Name: data.clientName,
        Client_PhoneNo: data.clientPhno,
        Client_Address: data.clientAdd,
        Client_GST: data.clientGST,
        Central_taxrate: data.ctrate,
        State_taxrate: data.strate,
        Total_centralaxamt: data.totalcentaxamt,
        Total_statetaxamt: data.totalstatetaxamt,
        Total_amount: data.totalamt,
        Total_amountwords: data.totalamtwords,
        Total_taxvalueamount: data.totalamt * 1 - data.totalhsnamt * 1,
        Total_Tax_amount: data.totalhsnamt,
        Total_hsnamountwords: data.totalhsnamtwords,
      };
    });
    console.log(filtercolumn);
    // console.log(estimateHistoryData);
    // console.log(estimateHistoryData.length);
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(filtercolumn);

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    let date = new Date();
    console.log(date);
    var invoiceDate =
      date.getDate() + "_" + date.getMonth() + "_" + date.getFullYear();
    XLSX.writeFile(wb, `MyInvoice_${invoiceDate}.xlsx`);
  };
  const dateHandler = () => {
    const today = new Date();
    let todaydate;

    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();

    todaydate = `IN${year}${month}${date}${invoiceidcount}`;
    let count = invoiceidcount * 1;
    setinvoiceid(todaydate);
    setinvoiceidount(++count);
    // console.log("invoiceidcount: " + count);
    // console.log("todaydate: " + todaydate);
    // setinvoiceid()
  };

  const cleartallInvoice = () => {
    setinvoicedate("");
    setinvoiceid("");
    // setinvoicedate1(singleinvoice.invoicedate1);
    setpaymentdate("");
    // setpaymentdate1(singleinvoice.paymentdate1);
    setpaymentmode("");
    setList([]);
    sethsnList([]);
    setOtherchargedetail([]);
    settotalcentaxamt("");
    settotalstatetaxamt("");
    setsubtotalamt("");
    settotalamt("");
    settotalamtwords("");
    settotaltaxvalueamt("");
    settotalhsnamt("");
    settotalhsnamtwords("");
    setclientAdd("");
    setclientName("");
    setclientPhno("");
    setclientGST("");
    setclientid("");
    setisEditInvoice(false);
  };

  //   useEffect(() => {
  //     if (invoiceHistoryData !== null) {
  //         localstorage.addOrGetEstimateHistoryData(invoiceHistoryData, "save");
  //         if (invoiceHistroyUpdateFlag) {
  //             updateestimate(estimateHistoryData);
  //         }

  //         //console.log("localstorage: ");
  //         //console.log(localstorage.addOrGetEstimateHistoryData(estimateHistoryData, "get"));
  //     }

  // }, [invoiceHistroyUpdateFlag]);

  useEffect(() => {
    // //console.log('local invoice history');
    let count = localstorage.addOrGetInvoiceid("", "get");
    if (count !== null) {
      setinvoiceidount(count);
    }
    // console.log(count + 'invoice count');
  }, []);

  // useEffect(() => {
  //   // console.log('amount');
  //   // console.log(tabledet);
  //   if (!gstincluded) {
  //     let val;
  //     if (quantity !== 0 || rateinctax !== 0 || disc !== 0 || rate !== 0) {
  //       if (gstincluded) {
  //         val = rateinctax * quantity;
  //       } else {
  //         val = rate * quantity;
  //       }

  //       setamount(val.toFixed(2));
  //     }
  //   }

  //   // console.log(rate + " rate " + val);
  // }, [rate, quantity]);

  useEffect(() => {
    calculateHsn();
  }, [list, otherchargedetail]);
  const context = {
    singleitem,
    setsingleitem,
    list,
    setList,
    totalamt,
    settotalamt,
    totalamtwords,
    settotalamtwords,
    singlehsnitem,
    setsinglehsnitem,
    setval,
    setboxColors,
    cleardetailoption,
    setcleardetailoption,
    desc,
    setdesc,
    hsn,
    sethsn,
    quantity,
    setquantity,
    rateinctax,
    setrateinctax,
    rate,
    setrate,
    per,
    setper,
    disc,
    setdisc,
    amount,
    setamount,
    otherdesc,
    setotherdesc,
    ischargedinhsn,
    setischargedinhsn,
    otherdescamt,
    setotherdescamt,
    totalhsnamt,
    settotalhsnamt,
    hsnlist,
    sethsnList,
    totalhsnamtwords,
    settotalhsnamtwords,
    totalsubamt,
    saveInvoice,
    saveEstimateInvoice,
    addOrUpdateItemHandler,
    clearlistcontent,
    clearOtherDetails,
    addOtherItems,
    setsubtotalamt,
    gstCgstitem,
    setgstCgstitem,
    ctrate,
    setctrate,
    strate,
    setstrate,
    ctatm,
    setctatm,
    statm,
    setstatm,
    totaltaxvalueamt,
    settotaltaxvalueamt,
    dateHandler,
    gstincluded,
    setgstincluded,
    totalcentaxamt,
    settotalcentaxamt,
    totalstatetaxamt,
    settotalstatetaxamt,
    isinstallationcharge,
    setisinstallationcharge,
    otherchargedetail,
    setOtherchargedetail,
    editListRows,
    addOrEditOtherItems,
    invoiceid,
    setinvoiceid,
    invoicedate,
    setinvoicedate,
    paymentmode,
    setpaymentmode,
    paymentdate,
    setpaymentdate,
    invoiceidcount,
    setinvoiceidount,
    clientName,
    setclientName,
    clientPhno,
    setclientPhno,
    clientAdd,
    setclientAdd,
    invoiceHistoryData,
    setinvoiceHistoryData,
    invoiceHistroyUpdateFlag,
    setinvoiceHistroyUpdateFlag,
    selectedInvoiceEdit,
    cleartallInvoice,
    handleInvoiceExportXlsx,
    displayhsntable,
    setdisplayhsntable,
    availablestock,
    setavailablestock,
    productid,
    setproductid,
    clientid,
    setclientid,
    isEditInvoice,
    setisEditInvoice,
    clientGST,
    setclientGST,
    displayClientGST,
    setdisplayClientGST,
    estimateinvoiceHistoryData,
    setestimateinvoiceHistoryData,
    deleteselectedInvoice,
    deleteInvoiceEstimate,
  };
  return <AllState.Provider value={context}>{children}</AllState.Provider>;
};

export default AllStateContext;
