import { Box, Card, Stack, TextField } from "@mui/material";
import React from "react";
import low3 from "../../../../Image/Dashboard/low3.png";
import { FaEdit, FaSave } from "react-icons/fa";
import DashboardTemp from "../DashboardTemp";
import { useState } from "react";
import "./LowStocks.css";
import Linechart from "../../charts/LineChart";
const LowStocks = (props) => {
  let topprod, maxProductId, maxcount;
  const [filtercond, setfiltercond] = useState(15);
  const [displayfiltercond, setdisplayfiltercond] = useState(false);
  const [filteritemcount, setfilteritemcount] = useState(5);
  const [displayfilteritemcount, setdisplayfilteritemcount] = useState(false);
  //   props.data.allStockData.map((stockDetail) => {
  //     soldunits = soldunits + stockDetail.quantity * 1;
  //   });
  console.log("props.data.allStockList");
  console.log(props);
  let filterlowstocks = props.data.allStockList
    .filter((data) => data.quantity < filtercond)
    .sort((a, b) => a.quantity - b.quantity) // Sort in ascending order
    .slice(0, filteritemcount);
  console.log("filterlowstocks");
  console.log(filterlowstocks);
  //   if (props.data.allStockData.length === 0) return <></>;
  let localsumqty1 = 0;
  const chartDatas =
    filterlowstocks &&
    filterlowstocks.map((stockDetail) => {
      localsumqty1 = localsumqty1 + stockDetail.quantity * 1;
      return stockDetail.quantity;
    });
  const chartLabels =
    filterlowstocks &&
    filterlowstocks.map((stockDetail) => stockDetail.productid);
  return (
    <>
      <Box>
        <DashboardTemp
          img={low3}
          title="Low Stocks"
          value={`${filterlowstocks.length} Stocks`}
        >
          {props.screen === "profit" && (
            <>
              <Stack direction={"row"} alignContent="center">
                <Box style={{ marginLeft: "5px", marginTop: "5px" }}>
                  Threshold value : {filtercond}
                </Box>
                {displayfiltercond && (
                  <TextField
                    className="alltextfiled"
                    type="number"
                    id="outlined-required"
                    label="Filer Threshold value"
                    value={filtercond}
                    onChange={(e) => setfiltercond(e.target.value)}
                    size="small"
                    style={{ margin: "5px" }}
                  />
                )}
                {!displayfiltercond ? (
                  <FaEdit
                    style={{ marginLeft: "5px", marginTop: "5px" }}
                    className="editicon"
                    size={20}
                    onClick={() => setdisplayfiltercond(!displayfiltercond)}
                  />
                ) : (
                  <FaSave
                    style={{ marginTop: "8px" }}
                    className="editicon"
                    size={25}
                    onClick={() => setdisplayfiltercond(!displayfiltercond)}
                  />
                )}

                <Box style={{ marginLeft: "5px", marginTop: "5px" }}>
                  Display Count : {filteritemcount}
                </Box>
                {displayfilteritemcount && (
                  <TextField
                    className="alltextfiled"
                    type="number"
                    id="outlined-required"
                    label="Display Count value"
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
              <Linechart
                chartLabel="Low Stocks Count"
                labels={chartLabels}
                datas={chartDatas}
                style={{ height: "300px" }}
              />
            </>
          )}
        </DashboardTemp>
      </Box>
    </>
  );
};

export default LowStocks;
