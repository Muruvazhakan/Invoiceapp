import React from "react";
import Card from "../../../Style/Card/Card";
import { Box, Button, Stack } from "@mui/material";
import StyleHeader from "../../Header/StyleHeader";
import { toast } from "react-toastify";

function ExpenseList({ expenses, deleteExpense, editExpense }) {
  const sortedExpenses = expenses.sort((a, b) => {
    return new Date(a.date) - new Date(b.date); // Ascending order (oldest first)
  });

  const showConfirmationToast = (id) => {
    const confirmToast = toast(
      <Stack gap={0.5}>
        <p>Are you sure you want to delete?</p>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => deleteExpense(id)}
        >
          Confirm
        </Button>
        <Button variant="outlined" color="primary">
          Cancel
        </Button>
      </Stack>,
      {
        position: "top-center",
        autoClose: true, // Keep the toast open until action is taken
        closeOnClick: true, // Disable closing by clicking the toast
        draggable: true, // Disable dragging
        hideProgressBar: true, // Hide the progress bar
      }
    );
  };

  return (
    <>
      <StyleHeader>Expense List</StyleHeader>
      <Box className="displayelements">
        {sortedExpenses.map((expense, index) => (
          <Card key={index}>
            <Stack
              display={"grid"}
              direction={"column"}
              minWidth={"200px"}
              //   sx={{ color: "grey.500" }}
              spacing={1}
              //   alignItems={"center"}
              //   className="spinnerstyle"
            >
              {/* <Box className="details  "> */}
              <strong>Date </strong>{" "}
              <span> {new Date(expense.date).toLocaleDateString()}</span>
              <strong className="">Description</strong>
              {expense.description}
              <strong>Amount </strong>₹{expense.amount}
              <strong>Category </strong> {expense.category}
              <Button
                variant="outlined"
                color="primary"
                // endIcon={<RiUserAddLine />}
                onClick={() => editExpense(expense)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                // endIcon={<RiUserAddLine />}
                onClick={() => showConfirmationToast(expense.id)}
              >
                Delete
              </Button>
              {/* </Box> */}
            </Stack>
          </Card>
        ))}
      </Box>
    </>
  );
}

export default ExpenseList;
