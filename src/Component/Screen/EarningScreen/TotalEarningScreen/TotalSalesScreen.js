import {
  Container,
  Card,
  CardContent,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import PieChart from "../../charts/PieChart";
// import { IconArrowUpLeft } from "@tabler/icons";
// import { IconArrowDownRight } from "@tabler/icons";

const TotalSalesScreen = (props) => {
  // chart color
  const chartDatas = props.data.allProfitStockList.map(
    (stockDetail) => stockDetail.profit
  );
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
            {/* <Box>
              {netprofitmargin > 0 && (
                <>
                  <Typography variant="subtitle2" color="textSecondary">
                    Net Profit Margin
                  </Typography>
                  <Typography variant="h5">{netprofitmargin} %</Typography>
                </>
              )}
            </Box> */}
          </Stack>
          {/* <Linechart
            chartLabel={"Profit per product"}
            labels={chartDatas}
            datas={chartDatas}
            style={{ height: "300px" }}
          /> */}

          <PieChart
            chartLabel={"Profit per product"}
            chartTitle={"Profit per product"}
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
