import React, { useContext } from "react";

import "./EarningScreen.css";

import { Stocks } from "../../Context/StocksContex";
import { AllState } from "../../Context/allStateContext";
import TotalSalesScreen from "./TotalEarningScreen/TotalSalesScreen";
import TotalEarningScreen from "./TotalEarningScreen/TotalEarningScreen";
// import MonthlyEarningScreen from "./TotalEarningScreen/MonthlyEarningScreen";
import { Box, Stack } from "@mui/material";
import StockChart from "../charts/StockChart";
import Dashboard from "../Dashboard/Dashboard";
import Paymentmode from "./TotalEarningScreen/Paymentmode";

// import Flash from 'react-reveal/Flash';
// import Spinner from '../../Spinner/Spinner';

const EarningScreen = (props) => {
  const stockdet = useContext(Stocks);
  const invoicedata = useContext(AllState);
  let totaltransaction = 0;
  const paymentModeCount = invoicedata.invoiceHistoryData.reduce(
    (acc, { paymentmode }) => {
      totaltransaction = totaltransaction + 1;
      // If paymentmode is empty, we treat it as 'No Payment Mode'
      const mode = paymentmode || "No Payment Mode";
      acc[mode] = (acc[mode] || 0) + 1;
      return acc;
    },
    {}
  );
  return (
    <>
      {(invoicedata.invoiceHistoryData.length > 0 ||
        stockdet.allStockSalesList.length > 0) && (
        <Dashboard
          data={stockdet}
          invoicedata={invoicedata}
          totaltransaction={totaltransaction}
        />
      )}
      <Stack
        direction="column"
        mt={3}
        // alignItems="center"
        // justifyContent={"center"}
        gap={2}
      >
        <Stack direction="row">
          {stockdet.allstockssalestotalamt > 0 && (
            <TotalEarningScreen data={stockdet} />
          )}

          {stockdet.totalprofiramt > 0 && <TotalSalesScreen data={stockdet} />}
        </Stack>
        <Stack direction="row">
          {stockdet.allStockSalesList.length > 0 && (
            <StockChart
              data={stockdet.allStockSalesList}
              title="Sold units"
              chartlable="Sold per product"
            />
          )}

          {invoicedata.invoiceHistoryData.length > 0 && (
            <Paymentmode
              data={paymentModeCount}
              totaltransaction={totaltransaction}
            />
          )}
        </Stack>
        {/* <MonthlyEarningScreen data={stockdet} /> */}
      </Stack>
    </>
  );
};
export default EarningScreen;
