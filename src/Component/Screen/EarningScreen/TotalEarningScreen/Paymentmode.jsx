import {
  Container,
  Card,
  CardContent,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import PieChart from "../../charts/PieChart";

const Paymentmode = (props) => {
  const paymentModes = Object.keys(props.data); // Labels
  const counts = Object.values(props.data);

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
                Total Transaction
              </Typography>
              <Typography variant="h5">{props.totaltransaction}</Typography>
            </Box>
          </Stack>

          <PieChart
            chartLabel={"Paymentmode"}
            chartTitle={"Paymentmode"}
            labels={paymentModes}
            datas={counts}
            style={{ height: "300px" }}
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default Paymentmode;
