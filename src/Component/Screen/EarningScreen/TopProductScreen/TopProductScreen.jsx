import {
  Container,
  Card,
  CardContent,
  Stack,
  Box,
  Typography,
  TextField,
  InputLabel,
} from "@mui/material";
import PieChart from "../../charts/PieChart";
import { FaEdit, FaSave } from "react-icons/fa";
import StockChart from "../../charts/StockChart";
import Linechart from "../../charts/LineChart";
import { useState } from "react";
import toprated from "../../../../Image/Dashboard/toprated-rm.png";
import DashboardTemp from "../../Dashboard/DashboardTemp";
const TopProductScreen = (props) => {
  // chart color

  const [filtercondtopprod, setfiltercondtopprod] = useState(5);
  const [displayfiltercondtopprod, setdisplayfiltercondtopprod] =
    useState(false);

  let topprod, maxProductId, maxcount;
  let allStockSalesList = props.allStockSalesList
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, filtercondtopprod);
  if (props.allStockSalesList.length > 0) {
    topprod = props.allStockSalesList.reduce(
      (max, item) => (item.quantity > max.quantity ? item : max),
      props.allStockSalesList[0]
    );
    maxProductId = topprod.productid;
    maxcount = topprod.quantity;
  }

  console.log("props.allStockSalesList");
  console.log(props.allStockSalesList);
  console.log("topprod");
  console.log(topprod);

  const DisplayContent = (props) => {
    return (
      <>
        <Stack direction={"row"} alignContent="center" justifyContent="center">
          <Box paddingTop={1} paddingRight={2} paddingLeft={2}>
            <InputLabel>Display Count: {props.value}</InputLabel>
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
              style={{ marginLeft: "5px", marginTop: "8px" }}
              className="editicon"
              size={20}
              onClick={() => props.setdispfunc(!props.disp)}
            />
          ) : (
            <FaSave
              style={{ marginTop: "10px" }}
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
      <DashboardTemp
        img={toprated}
        title="Top Selling Product"
        value={`${maxProductId} - (${maxcount} Units)`}
      >
        {allStockSalesList.length > 0 && props.screen === "profit" && (
          <DisplayContent
            value={filtercondtopprod}
            setvalfunc={setfiltercondtopprod}
            disp={displayfiltercondtopprod}
            setdispfunc={setdisplayfiltercondtopprod}
          >
            <StockChart
              data={allStockSalesList}
              title="Top Selling Products"
              chartlable="Top Selling Products"
            />
          </DisplayContent>
        )}
      </DashboardTemp>
    </>
  );
};

export default TopProductScreen;
