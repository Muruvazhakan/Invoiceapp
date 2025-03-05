import React from "react";
import Card from "../../../../Style/Card/Card";
import { Box, Button, Stack } from "@mui/material";
import StyleHeader from "../../../Header/StyleHeader";
import { toast } from "react-toastify";

function ServicesList({
  services,
  deleteServices,
  editServices,
  viewExpenseHandler,
}) {
  const sortedServices = services.sort((a, b) => {
    return new Date(a.date) - new Date(b.date); // Ascending order (oldest first)
  });

  const showConfirmationToast = (id) => {
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

  return (
    <>
      <StyleHeader>Services List</StyleHeader>
      <Box className="displayelements">
        {sortedServices.map((service, index) => (
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
              <strong>Service Id </strong>
              {service.id}
              <strong>Date </strong>{" "}
              <span> {new Date(service.date).toLocaleDateString()}</span>
              <strong className="">Project Name</strong>
              {service.description}
              <strong>Category </strong> {service.category}
              <strong>Client Name </strong>
              {service.clientName}
              {service.clientPhoneNo && (
                <>
                  {" "}
                  <strong>Client Phone Numer </strong> {service.clientPhoneNo}{" "}
                </>
              )}
              <strong>Project Amount </strong>₹{service.amount}
              {/* <strong>Expense Amount </strong>₹0 */}
              <Button
                variant="outlined"
                color="primary"
                // endIcon={<RiUserAddLine />}
                onClick={() => editServices(service)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                // endIcon={<RiUserAddLine />}
                onClick={() => showConfirmationToast(service.id)}
              >
                Delete
              </Button>
              {/* </Box> */}
              <Button
                variant="outlined"
                color="inherit"
                // endIcon={<RiUserAddLine />}
                onClick={() => viewExpenseHandler(service)}
              >
                View Expense
              </Button>
            </Stack>
          </Card>
        ))}
      </Box>
    </>
  );
}

export default ServicesList;
