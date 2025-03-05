import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { expenseList } from "../../../Context/Datas";

const ExpenseForm = ({ addExpense, editingExpense }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [linkedTo, setlinkedTo] = useState("");
  const [date, setDate] = useState(new Date()); // New state for the date

  // If there's an expense being edited, fill the form with its data
  useEffect(() => {
    console.log("editingExpense");
    console.log(editingExpense);
    if (editingExpense) {
      setDescription(editingExpense.description);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      const formattedDate = new Date(editingExpense.date)
        .toISOString()
        .split("T")[0]; // Convert to YYYY-MM-DD
      setlinkedTo(editingExpense.linkedTo ? editingExpense.linkedTo : "");
      setDate(formattedDate); // Set date if editing
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !category || !date) {
      toast.warning("Please fill out all fields");
      return;
    }

    const expense = {
      description,
      amount: parseFloat(amount),
      category,
      date, // Include the date in the expense object
      linkedTo,
      id: editingExpense ? editingExpense.id : new Date().getTime(), // Use existing ID for editing
    };
    addExpense(expense);
    setDescription("");
    setAmount("");
    setCategory("");
    setlinkedTo("");
    setDate(new Date().getTime()); // Clear the date after submitting
  };

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer
        position="top-center"
        theme="colored"
        containerId="Login"
        autoClose={10}
      />
      <Stack alignItems={"center"} justifyContent={"flex-start"} gap={1}>
        {/* <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          /> */}
        <TextField
          required
          id="outlined-required"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          color={description !== "" && "success"}
          error={description === ""}
        />
        {/* <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          /> */}
        <TextField
          required
          id="outlined-required"
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          color={amount !== "" && "success"}
          error={amount === ""}
        />
        <Box>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {expenseList.map((data, index) => {
              return (
                <option value={data} key={data}>
                  {data}
                </option>
              );
            })}
            {/* <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
            <option value="Others">Others</option> */}
          </select>
        </Box>
        <TextField
          required
          id="outlined-required"
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          color={date !== "" && "success"}
          error={date === ""}
        />
        <TextField
          required
          id="outlined-required"
          label="Linked To"
          value={linkedTo}
          onChange={(e) => setlinkedTo(e.target.value)}
          color={linkedTo !== "" && "success"}
          error={linkedTo === ""}
        />
        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{ marginBottom: "5px" }}
          // endIcon={<MdLogin />}
        >
          {editingExpense ? "Update Expense" : "Add Expense"}
        </Button>
      </Stack>
    </form>
  );
};

export default ExpenseForm;
