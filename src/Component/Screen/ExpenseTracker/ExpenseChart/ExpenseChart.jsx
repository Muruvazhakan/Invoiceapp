import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import PieChart from "../../charts/PieChart";
import expenselist5 from "../../../../Image/Dashboard/expenselist5.png";
import DashboardTemp from "../../Dashboard/DashboardTemp";
// Register chart components (required for Chart.js to work)
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

function ExpenseChart({ expenses }) {
  // Group expenses by category and calculate the total amount per category
  let totaltransaction = 0;
  const categories = expenses.reduce((acc, expense) => {
    totaltransaction = totaltransaction + expense.amount;
    if (acc[expense.category]) {
      acc[expense.category] += expense.amount;
    } else {
      acc[expense.category] = expense.amount;
    }
    return acc;
  }, {});

  return (
    <>
      <DashboardTemp
        img={expenselist5}
        title="Total Expense"
        value={totaltransaction ? `₹${totaltransaction}` : 0}
      >
        <PieChart
          chartLabel={"Expense Breakdown by Category"}
          chartTitle={"Expense Breakdown by Category"}
          labels={Object.keys(categories)}
          datas={Object.values(categories)}
          style={{ height: "300px" }}
          symbol="₹"
        />
      </DashboardTemp>
    </>
  );
}

export default ExpenseChart;
