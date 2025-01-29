import { Container, Card, CardContent, Box, Typography } from "@mui/material";
// import { IconArrowUpLeft } from "@tabler/icons";
// import { IconArrowDownRight } from "@tabler/icons";
import Barchart from "../../charts/BarChart";

const TotalEarningScreen = (props) => {
  // chart color
  const secondary = "rgb(27, 85, 121)";
  console.log("totalvalueamt props.data.segregatedMonthData");
  console.log(props.data.segregatedMonthData);

  const totalvalueamt = Object.values(props.data.segregatedMonthData).map(
    (item) => item.totaltaxvalueamt
  );
  console.log("totalvalueamt TotalEarningScreen");
  console.log(totalvalueamt);
  const totalMonthArray = Object.keys(props.data.segregatedMonthData);
  console.log("totalvalueamt totalMonthArray");
  console.log(totalMonthArray);
  return (
    <Container maxWidth="lg">
      <Card variant="elevation">
        <CardContent>
          <Typography variant="subtitle2" color="textSecondary">
            Total Earning
          </Typography>
          <Typography variant="h5">
            ₹ {props.data.allstockssalestotalamt}
          </Typography>
          <Box mt={1}>
            {/* {totalMonthArray.length > 0 && (
              <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                // height="100px"
              />
            )} */}

            <Barchart
              labels={totalMonthArray}
              datas={totalvalueamt}
              chartLabel={"Bar Chart"}
              chartTitle={"Total Earning per month"}
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
