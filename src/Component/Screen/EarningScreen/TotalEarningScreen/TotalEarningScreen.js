import {
  Container,
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  Stack,
} from "@mui/material";
// import { IconArrowUpLeft } from "@tabler/icons";
// import { IconArrowDownRight } from "@tabler/icons";
import { FaEdit, FaSave } from "react-icons/fa";
import { useState } from "react";
import Barchart from "../../charts/BarChart";

const TotalEarningScreen = (props) => {
  // chart color
  const secondary = "rgb(27, 85, 121)";
  console.log("totalvalueamt props.data.segregatedMonthData");
  console.log(props.data.segregatedMonthData);
  const [filteritemcount, setfilteritemcount] = useState(5);
  const [displayfilteritemcount, setdisplayfilteritemcount] = useState(false);
  const totalProfitArray = Object.values(props.data.segregatedMonthData)
    .map((item) => item.totalProfit)
    .slice(0, filteritemcount);
  const totalProfit = Object.values(props.data.segregatedMonthData)
    .slice(0, filteritemcount)
    .reduce(
      (accum, item) => accum + (item.totalProfit ? item.totalProfit : 0),
      0
    );

  const totalMonthArray = Object.keys(props.data.segregatedMonthData);
  console.log("totalvalueamt totalMonthArray");
  console.log(totalMonthArray);
  return (
    <Container maxWidth="lg">
      <Card variant="elevation">
        <CardContent>
          <Typography variant="subtitle2" color="textSecondary">
            Total Revenue
          </Typography>
          <Typography variant="h5">₹ {totalProfit.toFixed(2)}</Typography>
          <Stack direction={"row"} alignContent="center">
            <Box style={{ marginLeft: "5px", marginTop: "5px" }}>
              No of Months:
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
          <Box mt={1}>
            <Barchart
              labels={totalMonthArray}
              datas={totalProfitArray}
              chartLabel={"Bar Chart"}
              chartTitle={"Total Revenue per month"}
              style={{ height: "300px" }}
              enableLineChart={true}
              lineChartLabel={"Line Chart"}
            />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TotalEarningScreen;
