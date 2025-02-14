import { Container, Card, CardContent, Typography } from "@mui/material";
import Linechart from "./LineChart";

const StockChart = (props, title, chartlable) => {
  // chart color

  const chartDatas = props.data.map((stockDetail) => {
    return stockDetail.quantity;
  });
  const chartLabels = props.data.map((stockDetail) => stockDetail.productid);

  return (
    <>
      <Linechart
        chartLabel={props.chartlable}
        labels={chartLabels}
        datas={chartDatas}
        style={{ height: "300px" }}
      />
    </>
  );
};

export default StockChart;
