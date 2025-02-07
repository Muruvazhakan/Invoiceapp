import React, { useContext } from "react";

import "./EarningScreen.css";

import { Stocks } from "../../Context/StocksContex";
import TotalSalesScreen from "./TotalEarningScreen/TotalSalesScreen";
import TotalEarningScreen from "./TotalEarningScreen/TotalEarningScreen";
// import MonthlyEarningScreen from "./TotalEarningScreen/MonthlyEarningScreen";
import { Stack } from "@mui/material";
import StockChart from "../charts/StockChart";
import Dashboard from "../Dashboard/Dashboard";

// import Flash from 'react-reveal/Flash';
// import Spinner from '../../Spinner/Spinner';

const EarningScreen = (props) => {
  const stockdet = useContext(Stocks);
  const topprod =
    stockdet.allStockSalesList > 0 &&
    stockdet.allStockSalesList.reduce(
      (max, item) => (item.quantity > max.quantity ? item : max),
      0
    );
  return (
    <>
      <Dashboard data={stockdet} topprod={topprod} />
      <Stack
        direction="row"
        mt={1}
        alignItems="center"
        justifyContent={"center"}
        // gap={"10px"}
      >
        {stockdet.allstockssalestotalamt > 0 && (
          <TotalEarningScreen data={stockdet} />
        )}
        {stockdet.totalprofiramt > 0 && <TotalSalesScreen data={stockdet} />}
        {stockdet.allStockSalesList.length > 0 && (
          <StockChart
            data={stockdet.allStockSalesList}
            title="Sold units"
            chartlable="Sold per product"
          />
        )}

        {/* <MonthlyEarningScreen data={stockdet} /> */}
      </Stack>
    </>
  );
};
export default EarningScreen;
