import React, { useContext } from "react";

import "./EarningScreen.css";

import { Stocks } from "../../Context/StocksContex";
import { AllState } from "../../Context/allStateContext";
// import MonthlyEarningScreen from "./TotalEarningScreen/MonthlyEarningScreen";

import Dashboard from "../Dashboard/Dashboard";

// import Flash from 'react-reveal/Flash';
// import Spinner from '../../Spinner/Spinner';

const EarningScreen = (props) => {
  const stockdet = useContext(Stocks);
  const invoicedata = useContext(AllState);
  let totaltransaction = 0;
  invoicedata.invoiceHistoryData.reduce((acc, { paymentmode }) => {
    totaltransaction = totaltransaction + 1;
    // If paymentmode is empty, we treat it as 'No Payment Mode'
    const mode = paymentmode || "No Payment Mode";
    acc[mode] = (acc[mode] || 0) + 1;
    return acc;
  }, {});
  return (
    <>
      {(invoicedata.invoiceHistoryData.length > 0 ||
        stockdet.allStockSalesList.length > 0) && (
        <Dashboard
          data={stockdet}
          invoicedata={invoicedata}
          totaltransaction={totaltransaction}
          screen="profit"
        ></Dashboard>
      )}
    </>
  );
};
export default EarningScreen;
