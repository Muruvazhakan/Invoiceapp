import { Box, Card, Stack } from "@mui/material";
import React, { useContext } from "react";
import salesdashboard from "../../../Image/Dashboard/salesdashboard-rm.png";
import profitsymbbol from "../../../Image/Dashboard/profitsymbbol-rm.png";
import soldunit2 from "../../../Image/Dashboard/soldunit2.png";
import cashsymbbol from "../../../Image/Dashboard/cashsymbbol.png";
import profiticonchat from "../../../Image/Dashboard/profiticonchat.png";
import totaltranscations from "../../../Image/Dashboard/totaltranscations.png";
import toprated from "../../../Image/Dashboard/toprated-rm.png";

import DashboardTemp from "./DashboardTemp";
import LowStocks from "./LowStocks/LowStocks";
import TotalEarningScreen from "../EarningScreen/TotalEarningScreen/TotalEarningScreen";
import StockChart from "../charts/StockChart";
import TotalSalesScreen from "../EarningScreen/TotalEarningScreen/TotalSalesScreen";
import Paymentmode from "../EarningScreen/TotalEarningScreen/Paymentmode";
import { AllState } from "../../Context/allStateContext";
import TopProductScreen from "../EarningScreen/TopProductScreen/TopProductScreen";

const Dashboard = (props) => {
  const netprofitmargin = (
    (props.data.totalprofiramt / props.data.allstockssalestotalamt) *
    100
  ).toFixed(2);
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
  let soldunits = 0;
  props.data.allStockSalesList.map((stockDetail) => {
    soldunits = soldunits + stockDetail.quantity * 1;
  });
  const width = props.screen === "profit" ? 500 : 370;
  const DisplayTag = (props) => {
    if (props.screen !== "profit")
      return (
        <Stack direction={props.screen !== "profit" && "column"} gap={1}>
          {props.children}
        </Stack>
      );
    else return <>{props.children}</>;
  };
  if (props.data.allStockSalesList.length === 0) return <></>;
  return (
    <>
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        // justifyContent={"space-evenly"}
        spacing={{ xs: 1, sm: 1 }}
        sx={{ flexWrap: "wrap" }}
        marginLeft={1}
      >
        <Card>
          <Stack
            direction="row"
            // mt={3}
            alignItems="center"
            padding={5}
            // paddingRight={15}
            gap={2}
            justifyContent={"space-evenly"}
            height={props.screen !== "profit" ? 200 : 390}
          >
            <img
              src={salesdashboard}
              height={props.screen !== "profit" ? 200 : 300}
              width={props.screen !== "profit" ? 200 : 300}
              alt="sales dashbboard"
            />

            <h2>Profit Dashboard</h2>
          </Stack>
        </Card>

        <DisplayTag screen={props.screen}>
          <Box width={width}>
            {/* <DashboardTemp
              img={profitsymbbol}
              title="Total Revenue"
              value={`₹${props.data.allstockssalestotalamt.toFixed(2)}`}
            > */}
            {props.data.allstockssalestotalamt > 0 && (
              <TotalEarningScreen data={props.data} screen={props.screen} />
            )}
            {/* </DashboardTemp> */}
          </Box>
          <Box width={width}>
            <DashboardTemp
              img={totaltranscations}
              title="Total Transaction"
              value={totaltransaction ? totaltransaction : 0}
            >
              {invoicedata.invoiceHistoryData.length > 0 &&
                props.screen === "profit" && (
                  <Paymentmode
                    data={paymentModeCount}
                    totaltransaction={totaltransaction}
                  />
                )}
            </DashboardTemp>
          </Box>
        </DisplayTag>

        <DisplayTag screen={props.screen}>
          <Box width={width}>
            <DashboardTemp
              img={cashsymbbol}
              title="Net Profit"
              value={`₹${props.data.totalprofiramt}`}
            >
              {props.data.totalprofiramt && props.screen === "profit" && (
                <TotalSalesScreen data={props.data} screen="Net Profit" />
              )}
            </DashboardTemp>
          </Box>
          <Box width={width}>
            <DashboardTemp
              img={soldunit2}
              title="Sold Units"
              value={`${soldunits}`}
            >
              {props.data.allStockSalesList.length > 0 &&
                props.screen === "profit" && (
                  <StockChart
                    data={props.data.allStockSalesList}
                    title="Sold units"
                    chartlable="Sold per product"
                  />
                )}
            </DashboardTemp>
          </Box>
        </DisplayTag>

        <DisplayTag screen={props.screen}>
          <Box width={width}>
            <DashboardTemp
              img={profiticonchat}
              title="Net Profit Margin %"
              value={`${netprofitmargin}%`}
            >
              {props.data.totalprofiramt && props.screen === "profit" && (
                <TotalSalesScreen
                  data={props.data}
                  screen="Net Profit Margin %"
                />
              )}
            </DashboardTemp>
          </Box>
          <Box width={width}>
            {/* <DashboardTemp
              img={toprated}
              title="Top Product"
              value={`${maxProductId} - (${maxcount} Units)`}
            >
              {" "}
              {props.data.allStockSalesList.length > 0 &&
                props.screen === "profit" && (
                  <StockChart
                    data={props.data.allStockSalesList}
                    title="Sold units"
                    chartlable="Sold per product"
                  />
                )}
            </DashboardTemp> */}
            <TopProductScreen
              allStockSalesList={props.data.allStockSalesList}
              screen={props.screen}
            />
          </Box>
        </DisplayTag>

        <Box width={width}>
          <LowStocks data={props.data} screen={props.screen} filtercond={5} />
        </Box>

        {props.children}
      </Stack>
    </>
  );
};

export default Dashboard;
