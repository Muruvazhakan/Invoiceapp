import React, { useContext } from "react";

import "./EarningScreen.css";

import { Stocks } from "../../Context/StocksContex";
import { AllState } from "../../Context/allStateContext";
import TotalSalesScreen from "./TotalEarningScreen/TotalSalesScreen";
import TotalEarningScreen from "./TotalEarningScreen/TotalEarningScreen";
import MonthlyEarningScreen from "./TotalEarningScreen/MonthlyEarningScreen";
import { Stack } from "@mui/material";
import StockChart from "../charts/StockChart";
import Card from "../../Style/Card/Card";

// import Flash from 'react-reveal/Flash';
// import Spinner from '../../Spinner/Spinner';

const EarningScreen = (props) => {
  const stockdet = useContext(Stocks);
  const otherdet = useContext(AllState);
  return (
    <>
      <Stack
        direction="row"
        mt={1}
        alignItems="center"
        justifyContent={"center"}
        // gap={"10px"}
      >
        <TotalEarningScreen data={stockdet} />
        <TotalSalesScreen data={stockdet} />
        <Card>
          <StockChart
            data={stockdet.allStockSalesList}
            title="Sales Count"
            chartlable="Sales per product"
          />
        </Card>

        {/* <MonthlyEarningScreen data={stockdet} /> */}
      </Stack>
    </>
  );
};
export default EarningScreen;
