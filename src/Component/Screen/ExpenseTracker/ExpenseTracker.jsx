import React, { useContext, useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm/ExpenseForm";
import ExpenseList from "./ExpenseList/ExpenseList";
import "./ExpenseTracker.css";
import Card from "../../Style/Card/Card";
import ExpenseChart from "./ExpenseChart/ExpenseChart";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import StyleHeader from "../Header/StyleHeader";
import {
  deleteExpenseDB,
  deleteServiceDB,
  getExpenseDB,
  getServiceDB,
  saveExpenseDB,
  saveServiceDB,
} from "../../DBconnection/expenseDetailsDB";
import * as localstorage from "../../Context/localStorageData";
import { toast, ToastContainer } from "react-toastify";
import { GrOverview } from "react-icons/gr";
import { BiHide } from "react-icons/bi";
import ServiceForm from "./Services/ServiceForm";
import ServicesList from "./Services/ServicesList/ServicesList";
import SingleServicesList from "./Services/ServicesList/SingleServicesList";
import ServicesChart from "./Services/ServicesChart/ServicesChart";
import TotalEarningScreen from "../EarningScreen/TotalEarningScreen/TotalEarningScreen";
import TotalServiceEarningScreen from "./Services/ServicesChart/TotalServiceEarningScreen";
import { Stocks } from "../../Context/StocksContex";
const ExpenseTracker = (props) => {
  const stockdata = useContext(Stocks);

  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [viewExpenseForm, setviewExpenseForm] = useState(false);
  const [viewExpenseList, setviewExpenseList] = useState(false);
  const [services, setservices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [viewServiceForm, setviewServiceForm] = useState(false);
  const [viewServiceList, setviewServiceList] = useState(false);
  const [selectedService, setselectedService] = useState(null);
  const [loading, setloading] = useState(false);
  const [segregatedMonthData, setSegregatedMonthData] = useState({});
  const [inptdata, setinptdata] = useState(null);
  let loginuserid = localstorage.addOrGetUserdetail("", "userid", "get");

  const addExpense = async (expense) => {
    setloading(true);
    console.log("expense");
    console.log(expense);
    let response = await saveExpenseDB(expense, loginuserid);
    console.log("response");
    console.log(response);

    if (response.status === 200) {
      if (editingExpense) {
        toast.success("Expanse Updated");
      } else toast.success("Expanse added");
      if (editingExpense) {
        // If we're editing an expense, we replace it in the list
        setExpenses((prevExpenses) =>
          prevExpenses.map((exp) =>
            exp.id === editingExpense.id ? expense : exp
          )
        );
        setEditingExpense(null); // Clear editing state
      } else {
        // Otherwise, we add a new expense
        setExpenses((prevExpenses) => [...prevExpenses, expense]);
      }
    } else {
      toast.warn(response.data);
    }
    setloading(false);
    getExpense();
    getService();
    //need to add db code
  };
  const deleteExpense = async (id) => {
    setloading(true);
    console.log("id");
    console.log(id);
    let response = await deleteExpenseDB(id, loginuserid);
    console.log("response");
    console.log(response);

    if (response.status === 200) {
      toast.success(response.data.message);
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
    } else toast.warn(response.response.data.message);
    setloading(false);
  };

  const editExpense = (expense) => {
    setEditingExpense(expense); // Set the expense to be edited
    setviewExpenseForm(true);
  };

  const getExpense = async () => {
    setloading(true);
    let response = await getExpenseDB(loginuserid);
    console.log("response");
    console.log(response);

    if (response.status === 200) {
      setExpenses(response.data);
      segregateDataByMonth(response.data);
    } else {
      toast.warn(response.data);
    }
    setloading(false);
  };

  const addService = async (service) => {
    setloading(true);
    console.log("service");
    console.log(service);
    let response = await saveServiceDB(service, loginuserid);
    console.log("response");
    console.log(response);

    if (response.status === 200) {
      if (editingService) {
        toast.success("Service Updated");
      } else toast.success("Service added");
      if (editingService) {
        // If we're editing an service, we replace it in the list
        setservices((prevService) =>
          prevService.map((exp) =>
            exp.id === editingService.id ? service : exp
          )
        );
        setEditingService(null); // Clear editing state
      } else {
        // Otherwise, we add a new service
        setservices((prevService) => [...prevService, service]);
      }
    } else {
      toast.warn(response.data);
    }
    setloading(false);
    //need to add db code
  };
  const deleteService = async (id) => {
    setloading(true);
    console.log("id");
    console.log(id);
    let response = await deleteServiceDB(id, loginuserid);
    console.log("response");
    console.log(response);

    if (response.status === 200) {
      toast.success(response.data.message);
      setservices((prevService) =>
        prevService.filter((service) => service.id !== id)
      );
    } else toast.warn(response.response.data.message);
    setloading(false);
  };

  const editService = (services) => {
    setEditingService(services); // Set the expense to be edited
    setviewServiceForm(true);
  };

  const getService = async () => {
    setloading(true);
    let response = await getServiceDB(loginuserid);
    console.log("response getService");
    console.log(response);

    if (response.status === 200) {
      setservices(response.data);
    } else {
      toast.warn(response.data);
    }
    setloading(false);
  };

  const matchingExpenses = expenses.filter((expense) =>
    services.some((service) => service.id === expense.linkedTo)
  );

  // Calculate total matching expenses amount
  const totalMatchingExpenses = matchingExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  // Calculate total service amount (all services, for comparison)
  const totalServiceAmount = services.reduce(
    (total, service) => total + service.amount,
    0
  );

  // Calculate profit for matched services and expenses
  const profit = totalServiceAmount - totalMatchingExpenses;

  // console.log("matchingExpenses");
  // console.log(matchingExpenses);
  // console.log(profit);
  // console.log(totalMatchingExpenses);
  // console.log(totalMatchingExpenses);

  // 2. Group expenses by service id
  const groupbyexpensedata = services.map((service) => {
    const serviceExpenses = matchingExpenses.filter(
      (expense) => expense.linkedTo === service.id
    );
    const totalExpense = serviceExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
    return {
      serviceId: service.id,
      serviceAmount: service.amount,
      totalExpense: totalExpense,
      totalProfit: service.amount - totalExpense,
    };
  });

  const segregateDataByMonth = (inpexpenses) => {
    // console.log("segregateDataByMonth");
    let totalsum = 0;
    let data = inpexpenses.filter((data) => data.date !== "");
    // console.log("after segregateDataByMonth");
    // console.log(data);
    let valudata = [];
    data.reduce((acc, item) => {
      // Get the month and year from the date
      // console.log("item segra");
      // console.log(item);
      if (item.date && item.date !== "") {
        const monthYear = new Date(item.date).toLocaleString("default", {
          month: "short",
          year: "numeric",
        });
        // console.log("item monthYear");
        // console.log(monthYear);
        if (monthYear != null) {
          // console.log(acc[monthYear]);
          // Initialize the month entry if not exists
          if (!acc[monthYear]) {
            acc[monthYear] = {
              totalProfit: 0,
            };
          }
          // console.log("item acc");
          // console.log(acc);
          // Add the totalsalesamt to the respective month
          acc[monthYear].totalProfit += item.amount * 1;
          totalsum = item.amount * 1;
          // Assuming profit is the same as totalsalesamt for simplicity; adjust as necessary
          console.log("item acc");
          console.log(acc);
          valudata = acc;
          return acc;
        }
      }
    }, {});
    console.log("after resultsegregateDataByMonth");
    console.log(valudata);

    valudata = stockdata.sortBydate(valudata);
    console.log("sortedDates valudata");
    console.log(valudata);
    setSegregatedMonthData(valudata);
    setinptdata({
      segregatedMonthData: valudata,
      allstockssalestotalamt: totalsum,
    });
  };

  const viewExpenseHandler = (props) => {
    setselectedService(props);
    setviewServiceList(false);
    setviewExpenseList(false);
  };
  useEffect(() => {
    getService();
    getExpense();
  }, []);

  return (
    <>
      {loading && (
        <Stack
          sx={{ color: "grey.500" }}
          spacing={2}
          alignItems={"center"}
          className="spinnerstyle"
        >
          <CircularProgress color="success" size={30} />
        </Stack>
      )}
      <ToastContainer
        position="top-center"
        theme="colored"
        containerId="Login"
        autoClose={10}
      />
      <StyleHeader>Service & Expense Tracker</StyleHeader>
      <Stack
        //   sx={{ color: "grey.500" }}
        direction={"row"}
        spacing={1}
        alignItems={"center"}
        justifyContent={"center"}
        marginBottom={"10px"}
        flexWrap={"wrap"}
        //   className="spinnerstyle"
      >
        <Button
          variant="contained"
          color={!viewExpenseForm ? "success" : "black"}
          // endIcon={<RiUserAddLine />}
          onClick={() => setviewExpenseForm(!viewExpenseForm)}
        >
          {viewExpenseForm ? (
            <>
              {"Hide Expense Form "} <BiHide size={20} />
            </>
          ) : (
            <>
              {"Expense Form "} <GrOverview size={20} />
            </>
          )}
        </Button>
        <Button
          variant="contained"
          color={!viewServiceForm ? "success" : "black"}
          onClick={() => setviewServiceForm(!viewServiceForm)}
        >
          {viewServiceForm ? (
            <>
              {"Hide Service Form "} <BiHide size={20} />
            </>
          ) : (
            <>
              {"Service Form "} <GrOverview size={20} />
            </>
          )}
        </Button>
        <Button
          variant="contained"
          color={!viewExpenseList ? "success" : "black"}
          onClick={() => setviewExpenseList(!viewExpenseList)}
        >
          {viewExpenseList ? (
            <>
              {"Hide Expense List "} <BiHide size={20} />
            </>
          ) : (
            <>
              {"Expense List "} <GrOverview size={20} />
            </>
          )}
        </Button>
        <Button
          variant="contained"
          color={!viewServiceList ? "success" : "black"}
          onClick={() => setviewServiceList(!viewServiceList)}
        >
          {viewServiceList ? (
            <>
              {"Hide Service List "} <BiHide size={20} />
            </>
          ) : (
            <>
              {"Service List "} <GrOverview size={20} />
            </>
          )}
        </Button>
      </Stack>
      <Stack
        direction={"row"}
        //   sx={{ color: "grey.500" }}
        spacing={1}
        alignItems={"center"}
        justifyContent={"center"}
        gap={2}
        flexWrap={"wrap"}
        //   className="spinnerstyle"
      >
        {viewExpenseForm && (
          <Box width={"350px"}>
            <Card>
              <h3>Expense Form</h3>
              <ExpenseForm
                addExpense={addExpense}
                editingExpense={editingExpense}
              />
            </Card>
          </Box>
        )}
        {viewServiceForm && (
          <Box width={"350px"}>
            <Card>
              <h3>Service Form</h3>
              <ServiceForm
                addService={addService}
                editingService={editingService}
              />
            </Card>
          </Box>
        )}
        {expenses.length > 0 && (
          <Box>
            <ExpenseChart expenses={expenses} />
          </Box>
        )}
        {services.length > 0 && (
          <>
            <Box>
              <ServicesChart services={services} />
            </Box>
            {inptdata !== null && inptdata.allstockssalestotalamt > 0 && (
              <Box>
                <TotalEarningScreen data={inptdata} screen="profit" />
              </Box>
            )}
          </>
        )}
      </Stack>
      <Stack
        // sx={{ color: "grey.500" }}
        spacing={1}
        // alignItems={"center"}
        justifyContent={"center"}
        // gap={2}
        margin={2}
        // padding={2}
      >
        <Box>
          <TotalServiceEarningScreen
            data={groupbyexpensedata}
            screen="profit"
          />
        </Box>
      </Stack>
      {expenses.length > 0 && viewExpenseList && (
        <Card>
          <StyleHeader>Expense List</StyleHeader>
          <ExpenseList
            expenses={expenses}
            deleteExpense={deleteExpense}
            editExpense={editExpense}
          />
        </Card>
      )}
      {services.length > 0 && viewServiceList && (
        <Card>
          <ServicesList
            services={services}
            expenses={expenses}
            deleteServices={deleteService}
            editServices={editService}
            viewExpenseHandler={viewExpenseHandler}
          />
        </Card>
      )}
      {selectedService && (
        <Card>
          <SingleServicesList
            selectedService={selectedService}
            expenses={expenses}
            deleteServices={deleteService}
            editServices={editService}
            deleteExpense={deleteExpense}
            editExpense={editExpense}
          />
        </Card>
      )}
    </>
  );
};

export default ExpenseTracker;
