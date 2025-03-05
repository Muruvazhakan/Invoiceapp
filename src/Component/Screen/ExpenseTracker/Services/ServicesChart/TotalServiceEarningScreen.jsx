import {
  Box,
  TextField,
  Stack,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
// import { IconArrowUpLeft } from "@tabler/icons";
// import { IconArrowDownRight } from "@tabler/icons";
import { FaEdit, FaSave } from "react-icons/fa";
import { useState } from "react";
import Barchart from "../../../charts/BarChart";
import serv1 from "../../../../../Image/Dashboard/serv1.png";
import DashboardTemp from "../../../Dashboard/DashboardTemp";

const TotalServiceEarningScreen = (props) => {
  // chart color
  console.log("totalvalueamt ");
  console.log(props.data);
  const [filteritemcount, setfilteritemcount] = useState(5);
  const [displayfilteritemcount, setdisplayfilteritemcount] = useState(false);
  const [type, settype] = useState("Profit");

  const totalProfitArray = Object.values(props.data)
    // .map((item) => item.totalProfit.toFixed(2))
    .map((item) =>
      type === "Profit"
        ? item.totalProfit.toFixed(2)
        : type === "Service"
        ? item.serviceAmount.toFixed(2)
        : item.totalExpense.toFixed(2)
    )
    .slice(0, filteritemcount)
    .filter((x) => x !== undefined);

  const totalProfit = Object.values(props.data)
    .slice(0, filteritemcount)
    .reduce(
      (accum, item) =>
        accum +
        (type === "Profit"
          ? item.totalProfit
            ? item.totalProfit
            : 0
          : type === "Service"
          ? item.serviceAmount
            ? item.serviceAmount
            : 0
          : item.totalExpense
          ? item.totalExpense
          : 0),
      0
    );

  const lales = Object.values(props.data)
    .map((item) => item.serviceId)
    .slice(0, filteritemcount)
    .filter((x) => x !== undefined);
  console.log("totalvalueamt totalMonthArray");
  console.log(lales);
  return (
    <>
      <DashboardTemp
        img={serv1}
        title={`Total ${type}`}
        value={`₹${totalProfit.toFixed(2)}`}
      >
        {props.screen === "profit" && (
          <>
            <Stack
              direction={"row"}
              alignContent="center"
              justifyContent="center"
            >
              <Box paddingTop={1} paddingRight={2} paddingLeft={2}>
                <InputLabel>
                  No of Services:{" "}
                  {filteritemcount < totalProfitArray.length
                    ? filteritemcount
                    : totalProfitArray.length}
                </InputLabel>
              </Box>
              {displayfilteritemcount && (
                <TextField
                  className="alltextfiled"
                  type="number"
                  id="outlined-required"
                  label="No of Services"
                  value={filteritemcount}
                  onChange={(e) => setfilteritemcount(e.target.value)}
                  size="small"
                  style={{ margin: "5px" }}
                />
              )}
              {!displayfilteritemcount ? (
                <FaEdit
                  style={{ marginLeft: "5px", marginTop: "8px" }}
                  className="editicon"
                  size={20}
                  onClick={() =>
                    setdisplayfilteritemcount(!displayfilteritemcount)
                  }
                />
              ) : (
                <FaSave
                  style={{ marginTop: "10px" }}
                  className="editicon"
                  size={25}
                  onClick={() =>
                    setdisplayfilteritemcount(!displayfilteritemcount)
                  }
                />
              )}

              <Stack
                direction={"row"}
                alignContent="center"
                justifyContent="center"
              >
                <Box paddingTop={1} paddingRight={2} paddingLeft={2}>
                  <InputLabel>Type</InputLabel>
                </Box>
                <Box>
                  <Select
                    labelId="Type"
                    id="Type"
                    value={type}
                    label="Type"
                    onChange={(e) => settype(e.target.value)}
                    size="small"
                  >
                    <MenuItem value={"Profit"}>Total Profit</MenuItem>
                    <MenuItem value={"Service"}>Total Service</MenuItem>
                    <MenuItem value={"Expense"}>Total Expense</MenuItem>
                  </Select>
                </Box>
              </Stack>
            </Stack>

            <Barchart
              labels={lales}
              datas={totalProfitArray}
              chartLabel={"Bar Chart"}
              chartTitle={`Total ${type} per month`}
              style={{ height: "300px" }}
              enableLineChart={true}
              lineChartLabel={"Line Chart"}
            />
          </>
        )}
      </DashboardTemp>
    </>
  );
};

export default TotalServiceEarningScreen;
