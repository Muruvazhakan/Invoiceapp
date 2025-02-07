import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Stack,
  Box,
  Typography,
  Avatar,
  Alert,
} from "@mui/material";
import Linechart from "../../charts/LineChart";
import PieChart from "../../charts/PieChart";
// import { IconArrowUpLeft } from "@tabler/icons";
// import { IconArrowDownRight } from "@tabler/icons";

const TotalSalesScreen = (props) => {
  // chart color
  const secondary = "rgb(73,190,255)";
  const errorlight = "rgb(253,237,232)";
  const primary = "rgb(93, 135, 255)";
  const primarylight = "rgb(236,242,255)";
  const successlight = "rgb(230,255,250)";

  const chartDatas = props.data.allProfitStockList.map(
    (stockDetail) => stockDetail.profit
  );
  const chartDatas1 = [1, 20, 20, 50, 60];
  const chartLabels1 = ["aa", "asd", "qwe", "qwe", "qwe"];
  console.log("chartDatas");
  console.log(chartDatas);
  const chartLabels = props.data.allProfitStockList.map(
    (stockDetail) => stockDetail.hsn
  );
  const netprofitmargin = (
    (props.data.totalprofiramt / props.data.allstockssalestotalamt) *
    100
  ).toFixed(2);
  console.log("chartLabels");
  console.log(chartLabels);
  return (
    <Container maxWidth="lg">
      <Card variant="elevation">
        <CardContent>
          <Stack
            direction="row"
            mt={1}
            alignItems="center"
            justifyContent={"space-around"}
          >
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Net Profit
              </Typography>
              <Typography variant="h5">
                ₹ {props.data.totalprofiramt}
              </Typography>
            </Box>
            <Box>
              {netprofitmargin > 0 && (
                <>
                  <Typography variant="subtitle2" color="textSecondary">
                    Net Profit Margin
                  </Typography>
                  <Typography variant="h5">{netprofitmargin} %</Typography>
                </>
              )}
            </Box>
          </Stack>
          {/* <Linechart
            chartLabel={"Profit per product"}
            labels={chartDatas}
            datas={chartDatas}
            style={{ height: "300px" }}
          /> */}

          <PieChart
            chartLabel={"Profit per product"}
            labels={chartLabels}
            datas={chartDatas}
            style={{ height: "300px" }}
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default TotalSalesScreen;
