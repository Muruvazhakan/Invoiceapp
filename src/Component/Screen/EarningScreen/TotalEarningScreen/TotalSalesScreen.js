import { Stack, Box, TextField } from "@mui/material";
import PieChart from "../../charts/PieChart";
import { FaEdit, FaSave } from "react-icons/fa";
import StockChart from "../../charts/StockChart";
import Linechart from "../../charts/LineChart";
import { useState } from "react";

const TotalSalesScreen = (props) => {
  // chart color

  const [filtercondnetprofit, setfiltercondnetprofit] = useState(15);
  const [displayfiltercondnetprofit, setdisplayfiltercondnetprofit] =
    useState(false);

  const [filtercondnetprofitmargin, setfiltercondnetprofitmargin] =
    useState(15);
  const [
    displayfiltercondnetprofitmargin,
    setdisplayfiltercondnetprofitmargin,
  ] = useState(false);

  const chartDatas = props.data.allProfitStockList
    .map((stockDetail) => stockDetail.profit)
    .slice(0, filtercondnetprofit);

  let chartDatasMargin = props.data.allProfitStockList
    .map((stockDetail) =>
      (
        ((stockDetail.profit * 1) /
          (stockDetail.salequantity * 1 * stockDetail.salerate)) *
        100
      ).toFixed(2)
    )
    .slice(0, filtercondnetprofitmargin);

  const chartLabels = props.data.allProfitStockList.map(
    (stockDetail) => stockDetail.productid
  );
  const chartLabelsMargin = props.data.allProfitStockList.map(
    (stockDetail) => stockDetail.productid
  );
  const netprofitmargin = (
    (props.data.totalprofiramt / props.data.allstockssalestotalamt) *
    100
  ).toFixed(2);

  const DisplayContent = (props) => {
    return (
      <>
        <Stack direction={"row"} alignContent="center" justifyContent="center">
          <Box style={{ marginLeft: "5px", marginTop: "5px" }}>
            Display Count: {props.value}
          </Box>
          {props.disp && (
            <TextField
              className="alltextfiled"
              type="number"
              id="outlined-required"
              label="Display Count value"
              value={props.value}
              onChange={(e) => props.setvalfunc(e.target.value)}
              size="small"
              style={{ margin: "5px" }}
            />
          )}
          {!props.disp ? (
            <FaEdit
              style={{ marginLeft: "5px", marginTop: "5px" }}
              className="editicon"
              size={20}
              onClick={() => props.setdispfunc(!props.disp)}
            />
          ) : (
            <FaSave
              style={{ marginTop: "8px" }}
              className="editicon"
              size={25}
              onClick={() => props.setdispfunc(!props.disp)}
            />
          )}
        </Stack>
        {props.children}
      </>
    );
  };

  return (
    <>
      {props.screen === "Net Profit" ? (
        <DisplayContent
          value={filtercondnetprofit}
          setvalfunc={setfiltercondnetprofit}
          disp={displayfiltercondnetprofit}
          setdispfunc={setdisplayfiltercondnetprofit}
        >
          <PieChart
            chartLabel={"Profit per product"}
            chartTitle={"Profit per product"}
            labels={chartLabels}
            datas={chartDatas}
            style={{ height: "300px" }}
            symbol="₹"
          />
        </DisplayContent>
      ) : (
        <DisplayContent
          value={filtercondnetprofitmargin}
          setvalfunc={setfiltercondnetprofitmargin}
          disp={displayfiltercondnetprofitmargin}
          setdispfunc={setdisplayfiltercondnetprofitmargin}
        >
          <Linechart
            chartLabel="Net Profit Margin per product"
            labels={chartLabelsMargin}
            datas={chartDatasMargin}
            style={{ height: "300px" }}
          />
        </DisplayContent>
      )}
    </>
  );
};

export default TotalSalesScreen;
