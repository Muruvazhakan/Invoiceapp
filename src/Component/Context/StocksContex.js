import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

import { v4 as uuidv4 } from "uuid";
import collect from "collect.js";
import * as XLSX from "xlsx";

import * as localstorage from "../Context/localStorageData";
import * as stockDb from "../DBconnection/stockDetailBD";
import * as invoiceDetailsDb from "../DBconnection/invoiceDetailBD";
import { AllState } from "./allStateContext";

export const Stocks = createContext();
const StocksContext = ({ children }) => {
  const invociedetail = useContext(AllState);
  const [width] = useState(641);

  const [singlestockitem, setsinglestockitem] = useState({
    id: 1,
    productid: "",
    desc: "",
    quantity: 0,
    rate: 0,
    amount: 0,
  });
  const [productid, setproductid] = useState("");
  const [isloading, setisloading] = useState(true);
  const [list, setList] = useState([]);
  const [saleslist, setSalesList] = useState([]);
  const [allStockList, setallStockList] = useState([]);
  const [allProfitStockList, setAllProfitStockList] = useState([]);
  const [allStockAddedList, setallStockAddedList] = useState([]);
  const [allStockSalesList, setallStockSalesList] = useState([]);
  const [totalamt, settotalamt] = useState(0);
  const [totalsalesamt, settotalsalesamt] = useState(0);
  const [totalprofiramt, settotalprofiramt] = useState(0);
  const [allstockstotalamt, setallstockstotalamt] = useState(0);
  const [alladdedstockstotalamt, setaddedallstockstotalamt] = useState(0);
  const [allstockssalestotalamt, setallstockssalestotalamt] = useState(0);
  const [desc, setdesc] = useState("");
  const [availablestock, setavailablestock] = useState(0);
  const [quantity, setquantity] = useState(0);
  const [rate, setrate] = useState(0);
  const [salerate, setsalerate] = useState(0);
  const [amount, setamount] = useState(0);
  const [productIdList, setproductIdList] = useState([]);
  const [clientList, setclientList] = useState([]);
  const [totalsubamt, setsubtotalamt] = useState(0);

  const [totaltaxvalueamt, settotaltaxvalueamt] = useState(0);
  const [totalamtwords, settotalamtwords] = useState("");

  const [hsn, sethsn] = useState(0);

  const [rateinctax, setrateinctax] = useState(0);

  const [per, setper] = useState("");
  const [disc, setdisc] = useState(15);

  const [header, setheader] = useState("stockrequest");
  const [clientName, setclientName] = useState("");
  const [clientPhno, setclientPhno] = useState("");
  const [clientAdd, setclientAdd] = useState("");

  const [stockid, setstockid] = useState("");
  const [salestockid, setsalestockid] = useState("");
  const [clientid, setclientid] = useState(null);
  const [cleardetailoption, setcleardetailoption] = useState(true);
  const [gstincluded, setgstincluded] = useState(true);
  const [displayhsntable, setdisplayhsntable] = useState(false);
  const [stockidcount, setstockidcount] = useState(1000);
  const [salestockidcount, setsalestockidcount] = useState(1000);
  const [stockdate, setstockdate] = useState("");
  const [salestockdate, setsalestockdate] = useState("");
  const [paymentmode, setpaymentmode] = useState("");
  const [paymentdate, setpaymentdate] = useState("");
  const [clientGST, setclientGST] = useState("");
  const [loginuser, setloginuser] = useState(
    localstorage.addOrGetUserdetail("", "userid", "get")
  );
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
  const [ctrate, setctrate] = useState(0);
  const [ctatm, setctatm] = useState(0);
  const [strate, setstrate] = useState(0);
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
  const [allStockData, setallStockData] = useState([]);
  const [stockHistoryData, setstockHistoryData] = useState([]);
  const [salesStockHistoryData, setSalesstockHistoryData] = useState([]);
  const [invoiceHistroyUpdateFlag, setinvoiceHistroyUpdateFlag] =
    useState(false);
  const [isEditStock, setisEditStock] = useState(false);
  const [segregatedMonthData, setSegregatedMonthData] = useState({});
  const setval = (e, fun) => {
    fun(e.target.value);
  };

  const setboxColors = (item, field) => {
    if (field === "color") {
      return item.length === 0 || item === 0 ? "error" : "success";
    } else {
      return item.length === 0 || item === 0 ? true : false;
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

  const saveInvoiceFromStock = () => {
    invociedetail.saveInvoice();
    console.log("saveInvoiceFromStock");
    setTimeout(() => {
      getAllStockData(loginuser, "refresh");
      console.log("after timeout");
    }, [2000]);
  };
  const editListRows = (item, screen, displaylist, type) => {
    // console.log("item ");
    // console.log(item);
    const removedist = displaylist.filter((alllist) => {
      return alllist.id != item.id;
    });

    if (type === "update") {
      setproductid(item.productid);
      sethsn(item.hsn);
      setdesc(item.desc);
      setquantity(item.quantity);
      setrate(item.rate);
      setsalerate(item.salerate);
      setamount(item.amount);
      let filterdata = allStockData.find((data) => {
        return data.productid == item.productid;
      });
      console.log("filterdata^^^&&");
      console.log(filterdata);
      if (filterdata) {
        setavailablestock(filterdata.quantity * 1 + item.quantity * 1);
      }
      toast.info("Item is added in edit section");
    }
    if (screen == "allstocks" || screen == "add") {
      setList(removedist);
    } else {
      setSalesList(removedist);
    }

    if (type === "delete") {
      toast.warning("Item Deleted");
    }
    // console.log(hsnlist.length + "list.length " +list.length + "otherchargedetail " + otherchargedetail.length );
  };

  const getAllStocks = (props) => {
    console.log("allStockData");
    console.log(allStockData);
    console.log(props);

    if (props === "allstocks") {
      if (allStockData && allStockData.length > 0) {
        // setList(allStockData);
        setallStockList(allStockData);
        let localsum = calculateSum(allStockData, "allstocks");
        // setallstockstotalamt(localsum);
      }
    }
  };

  const calculateSum = (alllistdata, screen) => {
    let localsum = 0,
      sum = 0;
    let val;
    let singleval = alllistdata;
    if (singleval.length > 0) {
      // console.log("****calculateSum****");
      // console.log(singleval[0].rate);
      for (let i = 0; i < singleval.length; i++) {
        console.log("singleval***** + screen " + screen);
        console.log(singleval[i]);
        // if(singleval[i].rate){
        if (
          (singleval[i].quantity === 0 ||
            singleval[i].quantity === "deleted" ||
            singleval[i].status === "Deleted") &&
          screen === "allstocks"
        ) {
          console.log("inside calcum deleted");
          console.log(singleval[i]);
        } else {
          val = singleval[i].rate * singleval[i].quantity * 1;
          localsum = localsum + val;
        }

        // }
      }
      // console.log("localsum****");
      // console.log(localsum);
      // settotalamt(localsum);
      return localsum;
    }
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
    if (list.length == 0) {
      settotalamt(0);
    }
  }, [list]);

  const addOrUpdateItemHandler = (opt, screen) => {
    if (
      desc.length !== 0 &&
      quantity > 0 &&
      rate > 0 &&
      amount > 0
      // && ctrate > 0 && strate > 0
    ) {
      if (opt === "Update") {
        toast.success("Item updated");
      } else {
        console.log("screen");
        console.log(screen);
        // console.log(singleitem);
        if (screen !== "sale") {
          let singleitem = {
            id: uuidv4(),
            productid: productid,
            hsn: hsn,
            desc: desc,
            quantity: quantity,
            rate: rate,
            salerate: salerate,
            amount: amount,
            status: "Active",
          };

          let found = false;
          let prev = list.map((data) => {
            let avgrate = rate * 1;
            let avgsalerate = salerate * 1;
            let avgquantity = quantity * 1;
            let avgamt = amount * 1;

            if (data.productid == productid) {
              avgrate = (
                (data.rate * 1 * data.quantity * 1 + rate * 1 * quantity * 1) /
                (quantity * 1 + data.quantity * 1)
              ).toFixed(2);
              avgsalerate = (
                (data.salerate * 1 * data.quantity * 1 +
                  salerate * 1 * quantity * 1) /
                (quantity * 1 + data.quantity * 1)
              ).toFixed(2);
              avgquantity = data.quantity * 1 + quantity * 1;
              found = true;
              avgamt = avgrate * 1 * avgquantity;
              data.rate = avgrate;
              data.salerate = avgsalerate;
              data.quantity = avgquantity;
              data.amount = avgamt;
            }
            return data;
          });

          if (found) {
            setList([...prev]);
          } else {
            setList([...list, singleitem]);
          }
        } else {
          let singleitem = {
            id: uuidv4(),
            productid: productid,
            hsn: hsn,
            desc: desc,
            quantity: quantity,
            rate: rate,
            amount: amount,
            status: "Active",
          };
          let found = false;
          let highquantity = false;
          if (availablestock < quantity * 1) {
            toast.error("Entered Quantity is more than available quantity!");
            return false;
          }
          let prev = saleslist.map((data) => {
            let avgrate = rate * 1;
            let avgquantity = quantity * 1;
            let avgamt = amount * 1;

            if (data.productid == productid) {
              avgrate = (
                (data.rate * 1 * data.quantity * 1 + rate * 1 * quantity * 1) /
                (quantity * 1 + data.quantity * 1)
              ).toFixed(2);
              avgquantity = data.quantity * 1 + quantity * 1;
              found = true;
              avgamt = avgrate * 1 * avgquantity;
              if (availablestock < avgquantity * 1) {
                highquantity = true;
                return data;
              }
              data.rate = avgrate;
              data.quantity = avgquantity;
              data.amount = avgamt;
              data.status = data.status ? data.status : "Active";
            }
            return data;
          });

          if (found || highquantity) {
            setSalesList([...prev]);
            if (highquantity) {
              toast.error("Entered Quantity is more than available quantity!");
              return false;
            }
          } else {
            setSalesList([...saleslist, singleitem]);
          }
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
    setproductid("");
    sethsn("");
    setquantity(0);
    setrate(0);
    setsalerate(0);
    setamount(0);
    setavailablestock(0);
  };

  const addOtherItems = () => {
    addOrEditOtherItems("", "add");
    if (cleardetailoption) {
      clearOtherDetails();
    }
  };

  const getStockIdCounter = async (loginuserid) => {
    let stockidcounter = localstorage.addOrGetStockid("", "get");
    console.log(stockidcounter + " addOrGetStockid");
    let getStockfromDb = await stockDb.getStockidDB(loginuserid);
    console.log("getStockfromDb.data");
    console.log(getStockfromDb);
    if (getStockfromDb.status === 200 && stockidcounter < getStockfromDb.data) {
      localstorage.addOrGetStockid(getStockfromDb.data, "save");
      setstockidcount(getStockfromDb.data);
      console.log("saving setinvoiceidount " + getStockfromDb.data);
      return true;
    }
    return false;
  };

  const clearOtherDetails = () => {
    setotherdesc("");
    setotherdescamt(0);
    setischargedinhsn(true);
  };

  const saveLocalStock = (singlestock, screen) => {
    if (screen === "add") {
      if (stockHistoryData !== null) {
        let iscontains = false;
        stockHistoryData.map((item) => {
          if (item.stockid === stockid) {
            item.stockdate = stockdate;
            item.paymentmode = paymentmode;
            item.list = list;
            item.totalamt = totalamt;
            item.clientAdd = clientAdd;
            item.clientName = clientName;
            item.clientid = clientid;
            item.clientPhno = clientPhno;
            item.userid = loginuser;
            iscontains = true;
          }
          return item;
        });
        if (iscontains === false) {
          setstockHistoryData([...stockHistoryData, singlestock]);
          toast.success("Stock Details are added");
        } else {
          toast.success("Stock Details are updated");
        }
        // console.log('estimateHistoryData');
        // console.log(estimateHistoryData);
      } else {
        // console.log('inside else');
        setstockHistoryData([singlestock]);
      }
      localstorage.addOrGetstockHistoryData(stockHistoryData, "save");
    } else {
      if (salesStockHistoryData !== null) {
        let iscontains = false;
        salesStockHistoryData.map((item) => {
          if (item.salestockid === salestockid) {
            item.salestockdate = salestockdate;
            item.saleslist = saleslist;
            item.totalsalesamt = totalsalesamt;
            item.clientAdd = clientAdd;
            item.clientName = clientName;
            item.clientid = clientid;
            item.clientPhno = clientPhno;
            item.userid = loginuser;
            iscontains = true;
          }
          return item;
        });
        if (iscontains === false) {
          setSalesstockHistoryData([...salesStockHistoryData, singlestock]);
          toast.success("Stock Details are added");
        } else {
          toast.success("Stock Sales Details are updated");
        }
        // console.log('estimateHistoryData');
        // console.log(estimateHistoryData);
      } else {
        // console.log('inside else');
        setSalesstockHistoryData([singlestock]);
      }
      localstorage.addOrGetSaleStockHistoryData(salesStockHistoryData, "save");
    }
    // if (item.salestockid === salestockid) {
    //   item.salestockdate = salestockdate;

    //   item.saleslist = saleslist;
  };
  const saveStock = async (screen) => {
    setisloading(true);
    console.log("saveStock");
    console.log("loginuserid + loginuserid");
    // if(screen ==="add"){

    // }
    if (screen === "add") {
      if (stockid == "" || list.length == 0) {
        toast.warn("Please add the stock or Generate the Stockid");
        return;
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
        stockid: stockid,
        stocklist: list,
        clientid: clientidtemp,
        totalamt: totalamt,
        clientAdd: clientAdd,
        clientName: clientName,
        clientPhno: clientPhno,
        stockidcount: stockidcount,
        stockdate: stockdate,
      };
      console.log(datas);
      saveLocalStock(datas, "add");

      let savedataresponse = await stockDb.saveStockBD(datas, loginuser);
      if (savedataresponse.status !== 200) {
        toast.warn("Issue in saving Stock");
        return;
      }
      console.log("savedataresponse");
      console.log(savedataresponse);
      // getAllClientList(loginuser, "add");

      // getAllHistoryStockData(loginuser);
      // toast.success("New Stock saved");
    } else {
      if (salestockid == "" || saleslist.length == 0) {
        toast.warn("Please add the sale stock or Generate the Sale Stockid");
        return;
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
        salestockid: salestockid,
        salestocklist: saleslist,
        clientid: clientidtemp,
        totalsalesamt: totalsalesamt,
        clientAdd: clientAdd,
        clientName: clientName,
        clientPhno: clientPhno,
        salestockidcount: salestockidcount,
        salestockdate: salestockdate,
      };
      console.log("sales datas");
      console.log(datas);

      saveLocalStock(datas, "sale");

      let savedataresponse = await stockDb.saveSalesStockBD(datas, loginuser);
      if (savedataresponse.status !== 200) {
        toast.warn("Issue in saving Stock");
        return;
      }
      console.log("savedataresponse");
      console.log(savedataresponse);
      // getAllClientList(loginuser, "sale");
      // getAllStockData(loginuser);
      // getAllHistorySalesStockData(loginuser);

      // toast.success("New Sale Stock saved");
    }
    getAllStockData(loginuser, screen);
    setisloading(false);
  };

  const allStockHistoryEdit = (props) => {
    console.log(props);

    let stockhistorydetail = props;

    let clientdetail = clientList.find((data) => {
      console.log("data.clientid");
      console.log(data.clientid + " //// " + props.clientid);
      if (data.clientid === props.clientid) return data;
    });
    console.log("clientList");
    console.log(clientList);

    console.log("clientdetail");
    console.log(clientdetail);
    settotalamt(stockhistorydetail.totalamt);
    setclientid(stockhistorydetail.clientid);
    setstockdate(stockhistorydetail.stockdate);
    setList(stockhistorydetail.rows);
    if (clientdetail) {
      setclientName(clientdetail.clientName);
      setclientPhno(clientdetail.clientPhno);
      setclientAdd(clientdetail.clientAdd);
    } else {
      setclientName("");
      setclientPhno("");
      setclientAdd("");
    }
    setstockid(stockhistorydetail.stockid);
    setisEditStock(true);
  };

  const allSaleStockHistoryEdit = (props) => {
    console.log("allSaleStockHistoryEdit ");
    console.log(props);
    console.log("clientList");
    console.log(clientList);
    let salesStockhistorydetail = props;
    let clientdetail = clientList.find((data) => {
      console.log("data.clientid");
      console.log(data.clientid + " //// " + props.clientid);
      if (data.clientid === props.clientid) return data;
    });
    settotalsalesamt(salesStockhistorydetail.totalsalesamt);
    setclientid(salesStockhistorydetail.clientid);
    setsalestockdate(salesStockhistorydetail.salestockdate);
    setsalestockid(salesStockhistorydetail.salestockid);
    setSalesList(salesStockhistorydetail.rows);
    if (clientdetail) {
      setclientName(clientdetail.clientName);
      setclientPhno(clientdetail.clientPhno);
      setclientAdd(clientdetail.clientAdd);
    } else {
      setclientName("");
      setclientPhno("");
      setclientAdd("");
    }
  };

  const getAllClientList = async (loginuserid, type, stockdetail) => {
    setisloading(true);
    let allClientData = localstorage.addOrGetAllClientData("", "get");
    console.log("loginuserid &&&& " + loginuserid);
    if (loginuserid != "" || loginuserid != null) setloginuser(loginuserid);
    let getallClientDatafromdb = await stockDb.getClientDB(loginuserid);
    console.log("allClientData " + allClientData);
    // setclientList(allClientData);
    console.log("**** getallClientDatafromdb &&&& ");
    console.log(getallClientDatafromdb);
    setisloading(false);
    if (getallClientDatafromdb.status === 200) {
      // localstorage.addOrGetAllClientData(getallClientDatafromdb.data, 'save');
      setclientList(getallClientDatafromdb.data);
      console.log("getallClientDatafromdb ****");
      console.log(clientList);
      if (type === "add") {
        getAllHistoryStockData(loginuserid, getallClientDatafromdb.data);
      } else {
        // getAllHistorySalesStockData(loginuserid, getallClientDatafromdb.data);
        getAllHistoryStockData(
          loginuserid,
          getallClientDatafromdb.data,
          stockdetail
        );
      }

      return true;
    }
    return false;
  };

  const handleExportXlsx = (screen) => {
    let filtercolumn = [];
    let localsumqty1 = 0,
      localsumqty2 = 0,
      sumpurchaseamt = 0,
      expectedprofitsum = 0;

    let displaylist =
      screen === "allstocks"
        ? allStockList
            .map((item, index) => {
              if (
                (item.quantity === 0 ||
                  item.status === "deleted" ||
                  item.status === "Deleted") &&
                screen === "allstocks"
              ) {
              } else return item;
            })
            .filter((x) => x !== undefined)
        : screen === "alladdedstocks"
        ? allStockAddedList
        : screen === "allProfit"
        ? allProfitStockList
        : screen === "add"
        ? list
        : screen === "sale"
        ? saleslist
        : allStockSalesList;
    let localsum =
      screen === "allstocks"
        ? allstockstotalamt
        : screen === "alladdedstocks"
        ? alladdedstockstotalamt
        : screen === "allProfit"
        ? totalprofiramt
        : screen === "add"
        ? totalamt
        : screen === "sale"
        ? totalsalesamt
        : allstockssalestotalamt;
    let localsumqty = displaylist.map((item, index) => {
      localsumqty1 = localsumqty1 + item.quantity * 1;
      if (screen === "allProfit") {
        localsumqty2 = localsumqty2 + item.salequantity * 1;
        sumpurchaseamt = sumpurchaseamt + item.purchaceamount * 1;
      }
      expectedprofitsum =
        expectedprofitsum + item.quantity * item.salerate * 1 * 1;
    });

    if (screen === "allstocks") {
      filtercolumn = displaylist.map((data, index) => {
        return {
          Sno: index + 1,
          Productid: data.productid,
          HSN: data.hsn,
          ProductDescription: data.desc,
          Status: data.status,
          Quantity: data.quantity,
          Rate: data.rate,
          SaleRate: data.salerate,
          Amount: data.amount * 1,
          ExpectedProfit: data.quantity * 1 * data.salerate,
        };
      });
      let lastcolumn = {
        Sno: "Total",
        Productid: "",
        HSN: "",
        ProductDescription: "",
        Status: "",
        Quantity: localsumqty1,
        Rate: "",
        SaleRate: "",
        Amount: localsum,
        ExpectedProfit: expectedprofitsum,
      };
      filtercolumn.push(lastcolumn);
      console.log("filtercolumn");
      console.log(filtercolumn);
    } else if (screen === "allsalestocks") {
      let filtercolumn = allStockSalesList.map((data, index) => {
        return {
          Sno: index + 1,
          Productid: data.productid,
          ProductDescription: data.desc,
          Quantity: data.quantity,
          Sale_Rate: data.rate,
          Sale_Amount: data.quantity * data.rate * 1,
        };
      });
      let lastcolumn = {
        Sno: "Total Sale Amount",
        Productid: "",
        ProductDescription: "",
        Quantity: localsumqty1,
        Sale_Rate: "",
        Sale_Amount: localsum,
      };
      filtercolumn.push(lastcolumn);
      console.log("filtercolumn");
      console.log(filtercolumn);
    } else if (screen === "alladdedstocks") {
      let filtercolumn = allStockAddedList.map((data, index) => {
        return {
          Sno: index + 1,
          Productid: data.productid,
          ProductDescription: data.desc,
          Status: data.status,
          Quantity: data.quantity,
          Rate: data.rate,
          Amount: data.quantity * data.rate * 1,
        };
      });
      let lastcolumn = {
        Sno: "Total",
        Productid: "",
        ProductDescription: "",
        Status: "",
        Quantity: localsumqty1,
        Rate: "",
        Amount: localsum,
      };
      filtercolumn.push(lastcolumn);
      console.log("filtercolumn");
      console.log(filtercolumn);
    } else if (screen === "allProfit") {
      let localsumqty2 = 0,
        sumpurchaseamt = 0,
        purchaceAmount1 = 0,
        soldAmount1 = 0,
        sumSaleAmt = 0,
        profitAmount1 = 0,
        sumProfitAmount = 0;

      filtercolumn = allProfitStockList.map((data, index) => {
        localsumqty2 =
          localsumqty2 + (data.soldquantity ? data.soldquantity * 1 : 0);
        purchaceAmount1 =
          data.rate * 1 * data.soldquantity
            ? data.rate * 1 * data.soldquantity
            : 0;
        soldAmount1 =
          data.salerate * 1 * data.soldquantity
            ? data.salerate * 1 * data.soldquantity
            : 0;
        sumpurchaseamt = sumpurchaseamt + purchaceAmount1 * 1;
        profitAmount1 = soldAmount1 * 1 - purchaceAmount1 * 1;
        sumProfitAmount = sumProfitAmount * 1 + profitAmount1 * 1;
        console.log("soldAmount1 " + soldAmount1);

        sumSaleAmt = sumSaleAmt + soldAmount1;
        return {
          Sno: index + 1,
          Productid: data.productid,
          HSN: data.hsn,
          ProductDescription: data.desc,
          TotalQuantity: data.quantity,
          PurchaceRate: data.rate,
          TotalPurchaceAmount: data.quantity * 1 * (data.rate * 1),
          SaleRate: data.salerate,
          SaleQuantity: data.soldquantity,
          SaleAmount: soldAmount1,
          PurchaceAmount: purchaceAmount1,
          Profit: profitAmount1,
        };
      });
      let lastcolumn = {
        Sno: "Total",
        Productid: "",
        HSN: "",
        ProductDescription: "",
        TotalQuantity: localsumqty1 + " Qty",
        PurchaceRate: "",
        TotalPurchaceAmount: "₹" + alladdedstockstotalamt,
        SaleRate: "",
        SaleQuantity: localsumqty2 + " Qty",
        SaleAmount: "₹" + sumSaleAmt,
        PurchaceAmount: "₹" + sumpurchaseamt,
        Profit: "₹" + sumProfitAmount,
      };
      filtercolumn.push(lastcolumn);
    }
    console.log("filtercolumn");
    console.log(filtercolumn);
    // console.log(estimateHistoryData);
    // console.log(estimateHistoryData.length);
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(filtercolumn);

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    let date = new Date();
    console.log(date);
    var stockDate =
      date.getDate() + "_" + date.getMonth() + "_" + date.getFullYear();
    XLSX.writeFile(wb, `My${screen}_${stockDate}.xlsx`);
  };

  const handleHistoryExportXlsx = (props) => {
    let filtercolumn,
      filename = props === "sale" ? "SalesStock" : "Stocks";
    let lastcolumn,
      totaladdedamt = 0;
    // deriveClientDetail(salesStockHistoryData);
    console.log(props);
    if (props === "sale") {
      filtercolumn = salesStockHistoryData.map((data, index) => {
        totaladdedamt += data.totalsalesamt * 1;
        return {
          Sno: index + 1,
          Sale_Stock_Id: data.salestockid,
          Sale_Stock_Date: data.salestockdate,
          Client_Name: data.clientName,
          Client_Phone_No: data.clientPhno,
          Client_Address: data.clientAdd,
          Total_Sales_Amount: data.totalsalesamt * 1,
        };
      });
      console.log("filtercolumn");
      console.log(filtercolumn);
      lastcolumn = {
        Sno: "Total Amount",
        Sale_Stock_Id: "",
        Sale_Stock_Date: "",
        Client_Name: "",
        Client_Phone_No: "",
        Client_Address: "",
        Total_Sales_Amount: totaladdedamt,
      };
    } else {
      filtercolumn = stockHistoryData.map((data, index) => {
        totaladdedamt += data.totalamt * 1;
        return {
          Sno: index + 1,
          Stock_Id: data.stockid,
          Stock_Date: data.stockdate,
          Client_Name: data.clientName,
          Client_Phone_No: data.clientPhno,
          Client_Address: data.clientAdd,
          Total_Amount: data.totalamt * 1,
        };
      });
      lastcolumn = {
        Sno: "Total Amount",
        Stock_Id: "",
        Stock_Date: "",
        Client_Name: "",
        Client_Phone_No: "",
        Client_Address: "",
        Total_Amount: totaladdedamt,
      };
    }
    filtercolumn.push(lastcolumn);
    console.log("filtercolumn");
    console.log(filtercolumn);
    // console.log(estimateHistoryData);
    // console.log(estimateHistoryData.length);
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(filtercolumn);

    XLSX.utils.book_append_sheet(wb, ws, filename);
    let date = new Date();
    console.log(date);
    var stockDate =
      date.getDate() + "_" + date.getMonth() + "_" + date.getFullYear();
    XLSX.writeFile(wb, `My${filename}_${stockDate}.xlsx`); // use to generate files
  };

  const getAllStockData = async (loginuserid, type) => {
    setisloading(true);
    let allStockData = localstorage.addOrGetAllStockData("", "get");
    if (loginuserid != "" || loginuserid != null) setloginuser(loginuserid);
    let getstockfromdb = await stockDb.getStockDB(loginuserid);
    console.log("getAllStockData !!!!!");
    console.log(allStockData);
    console.log(getstockfromdb);
    setisloading(false);
    getAllClientList(loginuserid, type, getstockfromdb.data);
    await getInvoiceHistoryData(getstockfromdb.data, loginuserid);
    if (getstockfromdb.status === 200) {
      // if (allStockData === null || (allStockData.length <= getstockfromdb.data.length)) {
      //console.log(getstockfromdb.data);
      //console.log('inside setallStockData');
      localstorage.addOrGetAllStockData(getstockfromdb.data, "save");
      setallStockData(getstockfromdb.data);
      setallStockList(getstockfromdb.data);
      let localsum = calculateSum(getstockfromdb.data, "allstocks");
      setallstockstotalamt(localsum);
      // deriveProfitStock(getstockfromdb.data);
      // }
      // else {
      //     estdetail.setstockHistoryData(getstockfromdb.data);
      // }

      // let invoicedetailscontext = localstorage.addOrGetstockHistoryData('', 'get');
      // console.log('getstockfromdb ****');
      // console.log(allStockData);

      return true;
    }
    return false;
  };

  const getAllHistoryStockData = async (
    loginuserid,
    clientdata,
    stockdetail
  ) => {
    setisloading(true);
    let allHistoryStockData = localstorage.addOrGetAllHistoryStockData(
      "",
      "get"
    );
    if (loginuserid != "" || loginuserid != null) setloginuser(loginuserid);
    let getstockfromdb = await stockDb.getAllHistoryStockDB(loginuserid);
    console.log("getAllHistoryStockDB !!!!!");
    console.log(allHistoryStockData);
    console.log(getstockfromdb);
    setisloading(false);
    if (getstockfromdb.status === 200) {
      console.log(getstockfromdb.data);
      console.log("inside allHistoryStockData");
      let deriveClientDetailValue = deriveClientDetail(
        getstockfromdb.data,
        clientdata,
        "add"
      );
      localstorage.addOrGetAllHistoryStockData(deriveClientDetailValue, "save");
      setstockHistoryData(deriveClientDetailValue);
      deriveStockAddedFromHistory(deriveClientDetailValue, stockdetail);
      return true;
    }

    return false;
  };

  const selectedStockEdit = (props) => {
    console.log(props);

    let singlestock = props;
    setstockdate(singlestock.stockdate);
    setstockid(singlestock.stockid);
    // setstockdate1(singlestock.stockdate1);
    // setpaymentdate1(singlestock.paymentdate1);
    setpaymentmode(singlestock.paymentmode);
    setList(singlestock.list);
    settotalamt(singlestock.totalamt);
    setclientAdd(singlestock.clientAdd);
    setclientName(singlestock.clientName);
    setclientPhno(singlestock.clientPhno);
    console.log("inside ctrate ");
    setisEditStock(true);
    // setcolumns(singleinvoice.columns);
  };

  const dateHandler = (type) => {
    const today = new Date();
    let todaydate;

    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    let idcounttype = type === "stock" ? stockidcount : salestockidcount;

    let count = idcounttype * 1;
    console.log(
      "idcounttype " +
        count +
        " type " +
        type +
        " salestockidcount " +
        salestockidcount
    );
    if (type === "stock") {
      todaydate = `ST${year}${month}${date}${idcounttype}`;
      setstockid(todaydate);
      setstockidcount(++count);
    } else {
      todaydate = `SA${year}${month}${date}${idcounttype}`;
      setsalestockid(todaydate);
      setsalestockidcount(++count);
    }

    // console.log("stockidcount: " + count);
    // console.log("todaydate: " + todaydate);
    // setstockid()
  };

  const cleartallStock = (screen) => {
    if (screen === "add") {
      setstockdate("");
      setstockid("");
      setList([]);
      settotalamt("");
    } else {
      setsalestockid("");
      setSalesList([]);
      settotalsalesamt("");
      setsalestockdate("");
    }
    setclientAdd("");
    setclientName("");
    setclientPhno("");
    setisEditStock(false);
  };

  const deriveClientDetail = (details, clientdata, type) => {
    setisloading(true);
    let salestocks = details;
    let newvalues = salestocks.map((item, index) => {
      let clientdetail = clientdata.find((data) => {
        // console.log("data.clientid");
        // console.log(data.clientid + " //// "+ item.clientid);
        if (data.clientid == item.clientid) {
          // console.log("^^^found data.clientid&&&&");
          // console.log(data);
          return data;
        }
      });
      // console.log("%%% client datas $$%%%%");
      // console.log(clientdetail);
      let datas;
      if (type === "sale") {
        datas = {
          salestockid: item.salestockid,
          userid: item.userid,
          rows: item.rows,
          totalsalesamt: item.totalsalesamt,
          salestockid: item.salestockid,
          clientid: item.clientid,
          lastupdatedsalestockdate: item.lastupdatedsalestockdate,
          salestockdate: item.salestockdate,
          clientName:
            clientdetail !== undefined ? clientdetail.clientName : null,
          clientPhno:
            clientdetail !== undefined ? clientdetail.clientPhno : null,
          clientAdd: clientdetail !== undefined ? clientdetail.clientAdd : null,
        };
      } else {
        datas = {
          stockid: item.stockid,
          userid: item.userid,
          rows: item.rows,
          totalamt: item.totalamt,
          stockid: item.stockid,
          clientid: item.clientid,
          lastupdatedstockdate: item.lastupdatedstockdate,
          stockdate: item.stockdate,
          clientName:
            clientdetail !== undefined ? clientdetail.clientName : null,
          clientPhno:
            clientdetail !== undefined ? clientdetail.clientPhno : null,
          clientAdd: clientdetail !== undefined ? clientdetail.clientAdd : null,
        };
      }

      //   console.log("%%% salestocks datas $$%%%%");
      // console.log(datas);
      return datas;
    });
    // console.log("%%% newvalues $$%%%%");
    // console.log(newvalues);
    setisloading(false);
    return newvalues;
  };
  const deriveProfitStock = (allStockListdata) => {
    console.log("allStockAddedList");
    console.log(allStockAddedList);
    //  let profitsum = 0;
    if (allStockListdata.length > 0) {
      allStockListdata = allStockListdata
        ?.map((item, index) => {
          item.amt = (item.rate * 1 * item.quantity).toFixed(2);
          if (item.soldquantity > 0 && item.soldquantity) {
            item.purchaceamount =
              item.rate * 1 * item.soldquantity
                ? item.rate * 1 * item.soldquantity
                : 0;
            item.saleamount = (item.salerate * 1 * item.soldquantity).toFixed(
              2
            );
            item.soldquantity = item.soldquantity ? item.soldquantity : 0;
            item.profit = (item.saleamount - item.purchaceamount).toFixed(2);
            return { ...item, id: index + 1 };
          }
        })
        .filter((x) => x !== undefined);
      setAllProfitStockList(allStockListdata);
      // settotalprofiramt(profitsum.toFixed(2));
    }
  };

  const getInvoiceHistoryData = async (props, loginuser) => {
    setisloading(true);
    let getinvoicefromdb = await invoiceDetailsDb.getInvoiceDB(loginuser);
    if (getinvoicefromdb.status === 200) {
      localstorage.addOrGetInvoiceHistoryData(getinvoicefromdb.data, "save");
      invociedetail.setinvoiceHistoryData(getinvoicefromdb.data);
      console.log("inside setinvoiceHistoryData call segregateDataByMonth");
      deriveSaleStockFromHistory(props, getinvoicefromdb.data);
      segregateDataByMonth(getinvoicefromdb.data);
    }
    setisloading(false);
  };

  const sortBydate = (data) => {
    return Object.fromEntries(
      Object.entries(data).sort((a, b) => {
        const [monthA, yearA] = a[0].split(" ");
        const [monthB, yearB] = b[0].split(" ");

        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const monthAIndex = months.indexOf(monthA);
        const monthBIndex = months.indexOf(monthB);

        if (yearA !== yearB) {
          return yearA - yearB; // Sort by year
        }
        return monthAIndex - monthBIndex; // Sort by month if years are the same
      })
    );
  };
  const deleteStock = async (item, screen, displaylist, type) => {
    setisloading(true);
    console.log("deleteStock");
    console.log(item);
    let datas = {
      authorization: header,
      stocklist: item,
    };
    console.log(datas);
    saveLocalStock(datas, "add");

    let savedataresponse = await stockDb.deleteStockBD(datas, loginuser);
    console.log("savedataresponse");
    console.log(savedataresponse);
    getAllStockData(loginuser);
    setisloading(false);
  };
  const deriveStockAddedFromHistory = (prop, stockdetail) => {
    console.log("props");
    let accumalatevalue = [];
    let totalamt = 0;
    if (stockdetail !== undefined) {
      prop.map((data) => {
        let singllistofsales = data.rows.map((innerrows) => {
          let found = false;
          console.log("stockdetail obj2");
          console.log(stockdetail);
          const obj2 = stockdetail.find(
            (item) => item.productid === innerrows.productid
          );
          console.log("innerrows obj2");
          console.log(obj2);
          if (obj2 !== undefined) {
            innerrows.status = obj2.status ? obj2.status : "Active";
            if (obj2.quantity === 0) innerrows.status = "Sold";
          }
          console.log("innerrows after status");
          console.log(innerrows);
          totalamt = totalamt * 1 + innerrows.amount * 1;
          if (accumalatevalue.length > 0) {
            for (let i = 0; i < accumalatevalue.length; i++) {
              if (accumalatevalue[i].productid === innerrows.productid) {
                found = true;
                accumalatevalue[i].quantity =
                  accumalatevalue[i].quantity * 1 + innerrows.quantity * 1;
                accumalatevalue[i].amount =
                  accumalatevalue[i].amount * 1 + innerrows.amount * 1;
                accumalatevalue[i].rate = (
                  (accumalatevalue[i].amount * 1) /
                  (accumalatevalue[i].quantity * 1)
                ).toFixed(2);
                console.log(" found &&&");
                console.log(accumalatevalue);
              }
            }
            if (!found) {
              accumalatevalue = [...accumalatevalue, innerrows];

              console.log("nt found &&&");
            }
          } else {
            accumalatevalue = [innerrows];
            console.log("else &&&");
          }
          console.log("accumalatevalue &&&");
          console.log(accumalatevalue);
          // return accumalatevalue;
        });
      });

      console.log("deriveStockAddedFromHistory");
      console.log(accumalatevalue);
      setallStockAddedList(accumalatevalue);
      let localsum = calculateSum(accumalatevalue);
      setaddedallstockstotalamt(localsum);
    }
    setisloading(false);
    // setallstockssalestotalamt(totalsaleamt);
  };
  const getAllSalesCount = async (loginuserid) => {
    let salesstockidcounter = localstorage.addOrGetSaleStockid("", "get");
    console.log(salesstockidcounter + " addOrGetStockid");
    let getSalesStockfromDb = await stockDb.getSalesStockidDB(loginuserid);
    console.log("getSalesStockfromDb.data");
    console.log(getSalesStockfromDb);
    if (getSalesStockfromDb.status === 200) {
      localstorage.addOrGetSaleStockid(getSalesStockfromDb.data, "save");
      setsalestockidcount(getSalesStockfromDb.data);
      console.log("saving setinvoiceidount " + getSalesStockfromDb.data);
    }
  };

  const deriveSaleStockFromHistory = (
    allStockAddedList,
    salesStockHistoryData
  ) => {
    setisloading(true);
    let accumalatevalue = [];
    let totalsaleamt = 0;
    salesStockHistoryData = salesStockHistoryData.map((data) => data.list);
    salesStockHistoryData = salesStockHistoryData.flat();
    salesStockHistoryData = salesStockHistoryData.filter(
      (data) => data.productid
    );
    console.log("props deriveSaleStockFromHistory");
    console.log(salesStockHistoryData);
    let singllistofsales = salesStockHistoryData.map((innerrows) => {
      console.log("innerrows deriveSaleStockFromHistory");
      console.log(innerrows);
      let found = false;
      totalsaleamt = totalsaleamt * 1 + innerrows.amount * 1;
      console.log("totalsaleamt derived " + totalsaleamt);
      if (accumalatevalue.length > 0) {
        for (let i = 0; i < accumalatevalue.length; i++) {
          if (accumalatevalue[i].productid === innerrows.productid) {
            found = true;
            accumalatevalue[i].amount =
              accumalatevalue[i].amount * 1 + innerrows.amount * 1;
            accumalatevalue[i].quantity =
              accumalatevalue[i].quantity * 1 + innerrows.quantity * 1;
            accumalatevalue[i].rateinctax =
              accumalatevalue[i].rateinctax * 1 + innerrows.rateinctax * 1;
            accumalatevalue[i].rate = (
              (accumalatevalue[i].rateinctax * 1) /
              (accumalatevalue[i].quantity * 1)
            ).toFixed(2);
            console.log(" found &&&");
            console.log(accumalatevalue);
          }
        }
        if (!found) {
          accumalatevalue = [...accumalatevalue, innerrows];

          console.log("nt found &&&");
        }
      } else {
        accumalatevalue = [innerrows];
        console.log("else &&&");
      }
      console.log("accumalatevalue &&&");
      console.log(accumalatevalue);
      // return accumalatevalue;
    });

    console.log("deriveSaleStockFromHistory");
    console.log(accumalatevalue);
    setallStockSalesList(accumalatevalue);
    setallstockssalestotalamt(totalsaleamt);
    deriveCalculatedProfitStock(allStockAddedList, accumalatevalue);
    setisloading(false);
    // allstockssalestotalamt
  };

  const deriveCalculatedProfitStock = (allStockAddedList, invoicedata) => {
    setisloading(true);
    console.log("profit cal of deriveCalculatedProfitStock");

    console.log(invoicedata);
    console.log(allStockAddedList);
    let profitsum = 0;
    if (invoicedata.length > 0 && allStockAddedList.length > 0) {
      const mergedArray = invoicedata
        .map((obj1) => {
          // Find the corresponding object in array2 by Productid
          const obj2 = allStockAddedList.find(
            (item) => item.productid === obj1.productid
          );
          console.log("obj1");
          console.log(obj1);
          console.log("obj2");
          console.log(obj2);
          console.log("obj1.rate + " + obj1.rate + " obj2.rate " + obj2.rate);
          if (obj2 !== undefined) {
            let purchaceamount1 = (obj1.quantity * 1 * obj2.rate).toFixed(2);
            let saleamount = (obj1.amount * 1).toFixed(2);
            let profits = (saleamount - purchaceamount1).toFixed(2);
            profitsum = profitsum * 1 + profits * 1;
            return {
              productid: obj2.productid,
              desc: obj2.desc,
              hsn: obj2.hsn,
              quantity: obj2.quantity * 1,
              rate: obj2.rate * 1,
              amount: (obj2.amount * 1).toFixed(2),
              // If a match is found in array2, merge its properties
              salerate: ((obj1.amount * 1) / (obj1.quantity * 1)).toFixed(2),
              saleamount: saleamount,
              purchaceamount: purchaceamount1,
              salequantity: obj1 ? obj1.quantity * 1 : undefined,
              profit: profits,
            };
          }
        })
        .filter((x) => x !== undefined);
      console.log("mergedArray");
      console.log(mergedArray);
      console.log("profitsum");
      console.log(profitsum);
      setAllProfitStockList(mergedArray);
      // profitsum = (Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(profitsum));
      settotalprofiramt(profitsum);
    }
    setisloading(false);
  };

  const segregateDataByMonth = (data) => {
    setisloading(true);
    console.log("segregateDataByMonth");
    console.log(data);
    data = data.filter((data) => data.invoicedate !== "");
    console.log("after segregateDataByMonth");
    console.log(data);
    let valudata = [];
    data.reduce((acc, item) => {
      // Get the month and year from the invoicedate
      console.log("item segra");
      console.log(item);
      if (item.invoicedate && item.invoicedate !== "") {
        const monthYear = new Date(item.invoicedate).toLocaleString("default", {
          month: "short",
          year: "numeric",
        });
        console.log("item monthYear");
        console.log(monthYear);
        if (monthYear != null) {
          console.log(acc[monthYear]);
          // Initialize the month entry if not exists
          if (!acc[monthYear]) {
            acc[monthYear] = {
              totaltaxvalueamt: 0,
              totalProfit: 0,
            };
          }
          console.log("item acc");
          console.log(acc);
          // Add the totalsalesamt to the respective month
          acc[monthYear].totaltaxvalueamt += item.totaltaxvalueamt * 1;
          // Assuming profit is the same as totalsalesamt for simplicity; adjust as necessary
          acc[monthYear].totalProfit += item.totaltaxvalueamt * 1;
          console.log("item acc");
          console.log(acc);
          valudata = acc;
          return acc;
        }
      }
    }, {});
    console.log("after resultsegregateDataByMonth");
    console.log(valudata);

    valudata = sortBydate(valudata);
    console.log("sortedDates valudata");
    console.log(valudata);
    setSegregatedMonthData(valudata);
    setisloading(false);
  };

  useEffect(() => {
    // //console.log('local invoice history');
    let count = localstorage.addOrGetStockid("", "get");
    if (count !== null) {
      setstockidcount(count);
    }
    // console.log(count + 'invoice count');
  }, []);

  useEffect(() => {
    // console.log('amount');

    let val;
    val = rate * quantity;
    setamount(val.toFixed(2));
    // console.log(rate + " rate " + val);
  }, [rate, quantity]);

  useEffect(() => {
    settotalamt(
      collect(list.map((item) => item.amount))
        .sum()
        .toFixed(2)
    );
  }, [list]);

  useEffect(() => {
    settotalsalesamt(
      collect(saleslist.map((item) => item.amount))
        .sum()
        .toFixed(2)
    );
  }, [saleslist]);
  //

  // useEffect(() => {
  //   setTimeout(() => {
  //     deriveProfitStock();
  //   }, 1000)
  // }, [allStockSalesList, allStockAddedList]);

  const context = {
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
    saveStock,
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
    stockid,
    setstockid,
    stockdate,
    setstockdate,
    paymentmode,
    setpaymentmode,
    paymentdate,
    setpaymentdate,
    stockidcount,
    setstockidcount,
    clientName,
    setclientName,
    clientPhno,
    setclientPhno,
    clientAdd,
    setclientAdd,
    stockHistoryData,
    setstockHistoryData,
    invoiceHistroyUpdateFlag,
    setinvoiceHistroyUpdateFlag,
    selectedStockEdit,
    cleartallStock,
    displayhsntable,
    setdisplayhsntable,

    singlestockitem,
    setsinglestockitem,
    desc,
    setdesc,
    productid,
    setproductid,
    allStockData,
    setallStockData,
    productIdList,
    setproductIdList,
    clientid,
    setclientid,
    clientList,
    setclientList,
    getAllStocks,
    allStockList,
    setallStockList,
    allstockstotalamt,
    setallstockstotalamt,
    calculateSum,
    getAllStockData,
    handleExportXlsx,
    getAllHistoryStockData,
    allStockHistoryEdit,
    saleslist,
    setSalesList,
    allStockSalesList,
    setallStockSalesList,
    allstockssalestotalamt,
    setallstockssalestotalamt,
    totalsalesamt,
    settotalsalesamt,
    salestockidcount,
    setsalestockidcount,
    salestockid,
    setsalestockid,
    getAllClientList,
    availablestock,
    setavailablestock,
    salestockdate,
    setsalestockdate,
    getAllSalesCount,
    salesStockHistoryData,
    setSalesstockHistoryData,
    allSaleStockHistoryEdit,
    handleHistoryExportXlsx,
    allStockAddedList,
    setallStockAddedList,
    alladdedstockstotalamt,
    setaddedallstockstotalamt,
    isloading,
    setisloading,
    allProfitStockList,
    setAllProfitStockList,
    totalprofiramt,
    settotalprofiramt,
    salerate,
    setsalerate,
    getStockIdCounter,
    deleteStock,
    isEditStock,
    setisEditStock,
    saveInvoiceFromStock,
    segregatedMonthData,
    setSegregatedMonthData,
    deriveCalculatedProfitStock,
    clientGST,
    setclientGST,
  };
  return <Stocks.Provider value={context}>{children}</Stocks.Provider>;
};

export default StocksContext;
