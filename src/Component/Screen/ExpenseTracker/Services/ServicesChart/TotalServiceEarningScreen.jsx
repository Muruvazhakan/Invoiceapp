import { Box, TextField, Stack } from "@mui/material";
// import { IconArrowUpLeft } from "@tabler/icons";
// import { IconArrowDownRight } from "@tabler/icons";
import { FaEdit, FaSave } from "react-icons/fa";
import { useState } from "react";
import Barchart from "../../../charts/BarChart";
import profitsymbbol from "../../../../Image/Dashboard/profitsymbbol-rm.png";
import DashboardTemp from "../../../Dashboard/DashboardTemp";

const TotalServiceEarningScreen = (props) => {
  // chart color
  console.log("totalvalueamt props.data.segregatedMonthData");
  console.log(props.data.segregatedMonthData);
  const [filteritemcount, setfilteritemcount] = useState(5);
  const [displayfilteritemcount, setdisplayfilteritemcount] = useState(false);

  const totalProfitArray = Object.values(props.data.segregatedMonthData)
    .map((item) => item.totalProfit.toFixed(2))
    .slice(0, filteritemcount)
    .filter((x) => x !== undefined);
  const totalProfit = Object.values(props.data.segregatedMonthData)
    .slice(0, filteritemcount)
    .reduce(
      (accum, item) => accum + (item.totalProfit ? item.totalProfit : 0),
      0
    );
  const totalProfitArraySum =
    props.screen === "profit"
      ? totalProfitArray.reduce((accum, profit) => accum + profit * 1, 0)
      : props.data.allstockssalestotalamt;

  const totalMonthArray = Object.keys(props.data.segregatedMonthData);
  console.log("totalvalueamt totalMonthArray");
  console.log(totalMonthArray);
  return (
    <>
      <DashboardTemp
        img={profitsymbbol}
        title="Total Revenue"
        value={`₹${totalProfitArraySum.toFixed(2)}`}
      >
        {props.screen === "profit" && (
          <>
            <Stack
              direction={"row"}
              alignContent="center"
              justifyContent="center"
            >
              <Box style={{ marginLeft: "5px", marginTop: "5px" }}>
                No of Months:{" "}
                {filteritemcount < totalProfitArray.length
                  ? filteritemcount
                  : totalProfitArray.length}
              </Box>
              {displayfilteritemcount && (
                <TextField
                  className="alltextfiled"
                  type="number"
                  id="outlined-required"
                  label="No of Months"
                  value={filteritemcount}
                  onChange={(e) => setfilteritemcount(e.target.value)}
                  size="small"
                  style={{ margin: "5px" }}
                />
              )}
              {!displayfilteritemcount ? (
                <FaEdit
                  style={{ marginLeft: "5px", marginTop: "5px" }}
                  className="editicon"
                  size={20}
                  onClick={() =>
                    setdisplayfilteritemcount(!displayfilteritemcount)
                  }
                />
              ) : (
                <FaSave
                  style={{ marginTop: "8px" }}
                  className="editicon"
                  size={25}
                  onClick={() =>
                    setdisplayfilteritemcount(!displayfilteritemcount)
                  }
                />
              )}
            </Stack>

            <Barchart
              labels={totalMonthArray}
              datas={totalProfitArray}
              chartLabel={"Bar Chart"}
              chartTitle={"Total Revenue per month"}
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
