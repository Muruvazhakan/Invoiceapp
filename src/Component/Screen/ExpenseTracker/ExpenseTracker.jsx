import React, { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm/ExpenseForm";
import ExpenseList from "./ExpenseList/ExpenseList";
import "./ExpenseTracker.css";
import Card from "../../Style/Card/Card";
import ExpenseChart from "./ExpenseChart/ExpenseChart";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import StyleHeader from "../Header/StyleHeader";
import {
  deleteExpenseDB,
  getExpenseDB,
  saveExpenseDB,
} from "../../DBconnection/expenseDetailsDB";
import * as localstorage from "../../Context/localStorageData";
import { toast, ToastContainer } from "react-toastify";
import { GrOverview } from "react-icons/gr";
import { BiHide } from "react-icons/bi";
const ExpenseTracker = (props) => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [viewExpenseForm, setviewExpenseForm] = useState(false);
  const [loading, setloading] = useState(false);
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
  };

  const getExpense = async () => {
    setloading(true);
    let response = await getExpenseDB(loginuserid);
    console.log("response");
    console.log(response);

    if (response.status === 200) {
      setExpenses(response.data);
    } else {
      toast.warn(response.data);
    }
    setloading(false);
  };
  useEffect(() => {
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
      <StyleHeader>Expense Tracker</StyleHeader>
      <Stack
        //   sx={{ color: "grey.500" }}
        spacing={1}
        alignItems={"center"}
        justifyContent={"center"}
        marginBottom={"5px"}
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
              {"View Expense Form "} <GrOverview size={20} />
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
        {expenses.length > 0 && (
          <Box>
            <ExpenseChart expenses={expenses} />
          </Box>
        )}
      </Stack>
      {expenses.length > 0 && (
        <Card>
          <ExpenseList
            expenses={expenses}
            deleteExpense={deleteExpense}
            editExpense={editExpense}
          />
        </Card>
      )}
    </>
  );
};

export default ExpenseTracker;
