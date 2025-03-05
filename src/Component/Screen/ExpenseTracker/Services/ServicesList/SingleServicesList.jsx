import React from "react";
import Card from "../../../../Style/Card/Card";
import { Box, Button, Stack } from "@mui/material";
import StyleHeader from "../../../Header/StyleHeader";
import { toast } from "react-toastify";
import ExpenseList from "../../ExpenseList/ExpenseList";
import NoData from "../../../NoData/NoData";

function SingleServicesList({
  selectedService,
  deleteServices,
  editServices,
  expenses,
  deleteExpense,
  editExpense,
}) {
  const showConfirmationToastForService = (id) => {
    const confirmToast = toast(
      <Stack gap={0.5}>
        <p>Are you sure you want to delete Service?</p>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => deleteServices(id)}
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

  const filterexpense = expenses.filter(
    (expense) => expense.linkedTo === selectedService.id
  );
  const sumofexpense = filterexpense.reduce(
    (total, item) => total + item.amount,
    0
  );
  return (
    <>
      <StyleHeader>Selected Services</StyleHeader>
      <Box className="displayelements">
        <Card>
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
            <strong>Service Id </strong>
            {selectedService.id}
            <strong>Date </strong>{" "}
            <span> {new Date(selectedService.date).toLocaleDateString()}</span>
            <strong className="">Project Name</strong>
            {selectedService.description}
            <strong>Category </strong> {selectedService.category}
            <strong>Client Name </strong>
            {selectedService.clientName}
            {selectedService.clientPhoneNo && (
              <>
                {" "}
                <strong>Client Phone Numer </strong>{" "}
                {selectedService.clientPhoneNo}{" "}
              </>
            )}
            <strong>Project Amount </strong>₹{selectedService.amount}
            <strong>Expense Amount </strong>₹{sumofexpense}
            <strong>Profit Amount </strong>{" "}
            <strong>₹{selectedService.amount * 1 - sumofexpense * 1} </strong>
            <Button
              variant="outlined"
              color="primary"
              // endIcon={<RiUserAddLine />}
              onClick={() => editServices(selectedService)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              // endIcon={<RiUserAddLine />}
              onClick={() =>
                showConfirmationToastForService(selectedService.id)
              }
            >
              Delete
            </Button>
          </Stack>
        </Card>
      </Box>
      <Stack
        display={"grid"}
        direction={"row"}
        minWidth={"200px"}
        //   sx={{ color: "grey.500" }}
        spacing={1}
        //   alignItems={"center"}
        //   className="spinnerstyle"
      >
        {filterexpense.length > 0 ? (
          <>
            {" "}
            <StyleHeader>Expense List</StyleHeader>
            <ExpenseList
              expenses={filterexpense}
              deleteExpense={deleteExpense}
              editExpense={editExpense}
            />{" "}
          </>
        ) : (
          <NoData details="Expense is Lined" />
        )}
      </Stack>
    </>
  );
}

export default SingleServicesList;
