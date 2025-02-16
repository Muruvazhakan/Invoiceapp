import { Container, Card, CardContent, Typography, Stack } from "@mui/material";
import Linechart from "../../charts/LineChart";
import DashboardTemp from "../../Dashboard/DashboardTemp";
import totaltranscations from "../../../../Image/Dashboard/totaltranscations.png";

const InvoiceChart = (props, title, chartlable) => {
  // chart color
  console.log("InvoiceChart");
  console.log(props);
  const chartDatas = props.data.map((stockDetail) => {
    return stockDetail.quantity;
  });
  const chartLabels = props.data.map((stockDetail) => stockDetail.productid);

  return (
    <>
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        justifyContent={"center"}
        margin={2}
        spacing={{ xs: 2, sm: 1 }}
        sx={{ flexWrap: "wrap" }}
      >
        <DashboardTemp
          img={totaltranscations}
          title="Total Transaction"
          value={`${props.data.length} `}
        >
          {/* {allStockSalesList.length > 0 && props.screen === "profit" && (
          <DisplayContent
            value={filtercondtopprod}
            setvalfunc={setfiltercondtopprod}
            disp={displayfiltercondtopprod}
            setdispfunc={setdisplayfiltercondtopprod}
          >
            <StockChart
              data={allStockSalesList}
              title="Top Products"
              chartlable="Top Products"
            />
          </DisplayContent>
        )} */}
        </DashboardTemp>

        {/* <Linechart
        chartLabel={props.chartlable}
        labels={chartLabels}
        datas={chartDatas}
        style={{ height: "300px" }}
      /> */}
      </Stack>
    </>
  );
};

export default InvoiceChart;
