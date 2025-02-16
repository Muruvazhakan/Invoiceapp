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
    <PieChart
      chartLabel={"Paymentmode"}
      chartTitle={"Payment Mode Type"}
      labels={paymentModes}
      datas={counts}
      style={{ height: "300px" }}
    />
  );
};

export default Paymentmode;
