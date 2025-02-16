import {
  Container,
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import Linechart from "../../charts/LineChart";
import DashboardTemp from "../../Dashboard/DashboardTemp";
import toprated from "../../../../Image/Dashboard/toprated-rm.png";
import availablecount from "../../../../Image/Dashboard/availablecount.png";
import billvalue from "../../../../Image/Dashboard/billvalue.png";
import StockChart from "../../charts/StockChart";
import LowStocks from "../../Dashboard/LowStocks/LowStocks";
import { useState } from "react";
const StocksScreenChart = (props, title, chartlable) => {
  // chart color
  console.log("StocksScreenChart");
  console.log(props);

  // const chartLabels = props.data.map((stockDetail) => stockDetail.productid);
  let localsumqty1 = 0;

  let availableqyt = props.data.allStockList
    .map((item, index) => {
      if (
        item.quantity === 0 ||
        item.status === "deleted" ||
        item.status === "Deleted"
      ) {
      } else {
        // sum1 = sum1 + (item.quantity * 1 * item.rate)
        return item;
      }
    })
    .filter((x) => x !== undefined)
    .filter((x) => x.quantity > 0);

  const chartDatas =
    availableqyt &&
    availableqyt.map((stockDetail) => {
      localsumqty1 = localsumqty1 + stockDetail.quantity * 1;
      return stockDetail.quantity;
    });
  const totalvaluestock = availableqyt.reduce((acc, item) => {
    return acc + item.rate * 1 * item.quantity;
  }, 0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  return (
    <>
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        justifyContent={"center"}
        spacing={{ xs: 1, sm: 1 }}
        sx={{ flexWrap: "wrap" }}
        margin={2}
      >
        <Box width={screenWidth > 700 ? screenWidth / 2.1 : screenWidth}>
          <DashboardTemp
            img={availablecount}
            title="Available Stock Count"
            value={`${localsumqty1}`}
          >
            <StockChart
              data={availableqyt}
              title="Available Stock Count"
              chartlable="Stock Available per product"
            />
          </DashboardTemp>
        </Box>
        <Box width={screenWidth > 700 ? screenWidth / 2.1 : screenWidth}>
          <LowStocks
            data={props.data}
            screen="profit"
            filtercond={props.data.allStockList.length}
          />
        </Box>
      </Stack>
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        justifyContent={"center"}
        spacing={{ xs: 1, sm: 1 }}
        sx={{ flexWrap: "wrap" }}
        margin={2}
      >
        <DashboardTemp
          img={billvalue}
          title="Available Stock Value"
          value={`₹${totalvaluestock}`}
        ></DashboardTemp>
      </Stack>
    </>
  );
};

export default StocksScreenChart;
