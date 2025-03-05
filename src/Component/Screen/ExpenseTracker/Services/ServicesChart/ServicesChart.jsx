import React from "react";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import PieChart from "../../../charts/PieChart";
import service1 from "../../../../../Image/Dashboard/service1.png";
import DashboardTemp from "../../../Dashboard/DashboardTemp";
// Register chart components (required for Chart.js to work)
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

function ServicesChart({ services }) {
  // Group services by description and calculate the total amount per description
  let totaltransaction = 0;
  const descriptions = services.reduce((acc, expense) => {
    totaltransaction = totaltransaction + expense.amount;
    if (acc[expense.description]) {
      acc[expense.description] += expense.amount;
    } else {
      acc[expense.description] = expense.amount;
    }
    return acc;
  }, {});

  return (
    <>
      <DashboardTemp
        img={service1}
        title="Total Services"
        value={totaltransaction ? `₹${totaltransaction}` : 0}
      >
        <PieChart
          chartLabel={"Services Breakdown by Project Name"}
          chartTitle={"Services Breakdown by Project Name"}
          labels={Object.keys(descriptions)}
          datas={Object.values(descriptions)}
          style={{ height: "300px" }}
          symbol="₹"
        />
      </DashboardTemp>
    </>
  );
}

export default ServicesChart;
