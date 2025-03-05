import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const ServiceForm = ({ addService, editingService }) => {
  const [clientName, setclientName] = useState("");
  const [clientPhoneNo, setclientPhoneNo] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date()); // New state for the date

  // If there's an expense being edited, fill the form with its data
  useEffect(() => {
    console.log("editingService");
    console.log(editingService);
    if (editingService) {
      console.log("inside if editingService");
      setclientName(editingService.clientName);
      setclientPhoneNo(editingService.clientPhoneNo);
      setDescription(editingService.description);
      setAmount(editingService.amount);

      const formattedDate = new Date(editingService.date)
        .toISOString()
        .split("T")[0]; // Convert to YYYY-MM-DD
      setDate(formattedDate); // Set date if editing
    }
  }, [editingService]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !date || !clientName) {
      toast.warning("Please fill out all fields");
      return;
    }

    const service = {
      description,
      amount: parseFloat(amount),
      date, // Include the date in the expense object,
      clientName,
      clientPhoneNo,
      id: editingService ? editingService.id : `SR${new Date().getTime()}`, // Use existing ID for editing
    };
    addService(service);
    setDescription("");
    setAmount("");
    setDate(new Date()); // Clear the date after submitting
    setclientName("");
    setclientPhoneNo("");
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
        <TextField
          required
          id="outlined-required"
          label="Project Name"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          color={description !== "" && "success"}
          error={description === ""}
        />

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

        <TextField
          required
          id="outlined-required"
          label="Client Name"
          value={clientName}
          onChange={(e) => setclientName(e.target.value)}
          color={clientName !== "" && "success"}
          error={clientName === ""}
        />

        <TextField
          required
          id="outlined-required"
          label="Client Phone numer"
          type="number"
          value={clientPhoneNo}
          onChange={(e) => setclientPhoneNo(e.target.value)}
          color={clientPhoneNo !== "" && "success"}
          error={clientPhoneNo === ""}
        />
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

        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{ marginBottom: "5px" }}
          // endIcon={<MdLogin />}
        >
          {editingService ? "Update Service" : "Add Service"}
        </Button>
      </Stack>
    </form>
  );
};

export default ServiceForm;
