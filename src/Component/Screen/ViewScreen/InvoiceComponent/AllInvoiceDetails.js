import React, { useContext, useEffect } from "react";

import "../../GeneralDetails/GeneralDetails.css";
import { AllState } from "../../../Context/allStateContext";
import Card from "../../../Style/Card/Card";
import NoData from "../../NoData/NoData";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { RiEditCircleFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { CompanyDetail } from "../../../Context/companyDetailContext";
import { BsFiletypeXlsx } from "react-icons/bs";
import { FaFileInvoice } from "react-icons/fa";
import { RiAiGenerate } from "react-icons/ri";
import StyleHeader from "../../Header/StyleHeader";
import * as localstorage from "../../../Context/localStorageData";
import * as invoiceDetailsDb from "../../../DBconnection/invoiceDetailBD";
import InvoiceChart from "../../EarningScreen/InvoiceChart/InvoiceChart";
import { toast } from "react-toastify";
// import img  from '.'

const AllInvoiceDetails = () => {
  const invoiceDet = useContext(AllState);
  const companydet = useContext(CompanyDetail);

  const getEstimatedInvoiceHistoryData = async () => {
    // setisloading(true);
    let getestimateinvoicefromdb = await invoiceDetailsDb.getEstimatedInvoiceDB(
      localstorage.addOrGetUserdetail("", "userid", "get")
    );
    if (getestimateinvoicefromdb.status === 200) {
      localstorage.addOrGetEstimatedInvoiceHistoryData(
        getestimateinvoicefromdb.data,
        "save"
      );
      invoiceDet.setestimateinvoiceHistoryData(getestimateinvoicefromdb.data);
      console.log("inside setestimateinvoiceHistoryData call");
      console.log(getestimateinvoicefromdb);
    }
    // setisloading(false);
  };

  useEffect(() => {
    console.log("invoiceHistoryData");
    console.log(invoiceDet.invoiceHistoryData);
    console.log(
      process.env.REACT_APP_NODE_ENV + "process.env.REACT_APP_NODE_ENV"
    );
    getEstimatedInvoiceHistoryData();
  }, [invoiceDet.invoiceHistoryData]);

  const deleteInvoice = async (item, screen) => {
    companydet.setisloaded(false);
    try {
      if (screen === "invoice") await invoiceDet.deleteselectedInvoice(item);
      else await invoiceDet.deleteInvoiceEstimate(item);
    } finally {
      companydet.setisloaded(true);
    }
  };
  if (
    companydet.tier &&
    companydet.tier !== "gold" &&
    companydet.tier !== "platinum"
  )
    return <StyleHeader>No Access for this User</StyleHeader>;

  const showConfirmationToast = (row, screen) => {
    const confirmToast = toast(
      <Stack gap={0.5}>
        <p>Are you sure you want to delete Invoice?</p>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => deleteInvoice(row, screen)}
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
      <StyleHeader>Invoice Details</StyleHeader>
      {!companydet.isloaded && (
        <>
          <Stack
            sx={{
              color: "grey.500",
              transform: "translate(-50%, -50%)",
              position: "fixed",
            }}
            spacing={2}
            alignItems={"center"}
            className="spinnerstyle"
          >
            <CircularProgress
              color="success"
              size={30}
              sx={{
                color: "grey.500",
                transform: "translate(-50%, -50%)",
                position: "fixed",
              }}
            />
          </Stack>
        </>
      )}
      <Box className="displayelements">
        <Link
          className="nav-links"
          to={{ pathname: "/geninvoice" }}
          duration={1000}
          activeClass="nav-active"
          spy={true}
          offset={-50}
          smooth
        >
          <Button
            variant="outlined"
            color="warning"
            size="medium"
            endIcon={<FaFileInvoice />}
            startIcon={<RiAiGenerate />}
          >
            Generate Invoice{" "}
          </Button>
        </Link>
      </Box>
      {invoiceDet.invoiceHistoryData.length === 0 ? (
        <>
          <NoData details="Invoice Found" />
        </>
      ) : (
        <>
          <Box className="listofstickexcelbtn">
            <Button
              variant="contained"
              color="success"
              size="medium"
              endIcon={<BsFiletypeXlsx />}
              onClick={() => invoiceDet.handleInvoiceExportXlsx()}
            >
              Export Invoice to Excel
            </Button>
          </Box>
          <InvoiceChart data={invoiceDet.invoiceHistoryData} />
          <Box className="displayelements">
            {invoiceDet.invoiceHistoryData.map((item, index) => {
              // console.log('item');
              // console.log(item);
              // console.log(item.estimateid + ' estimateid ' + item.clientName + ' companydet.loginuserid ' +companydet.loginuserid + 'item.userid ' + item.userid );
              return (
                <>
                  <Card className="  allestimatedisplay" key={index}>
                    {/* <div className="generaldetails "> */}

                    <ul className="details invoicedetails details ">
                      <li>
                        <div className="companyname">
                          {" "}
                          Invoice ID: {item.invoiceid}
                        </div>
                      </li>
                      <li>
                        <div className="companyname">
                          {" "}
                          Invoice Date: {item.invoicedate}
                        </div>
                      </li>
                      {item.paymentdate && (
                        <li>
                          <div className="companyname">
                            {" "}
                            Payment Date: {item.paymentdate}
                          </div>
                        </li>
                      )}
                      {item.paymentmode && (
                        <li>
                          <div className="companyname">
                            {" "}
                            Payment Mode: {item.paymentmode}
                          </div>
                        </li>
                      )}
                    </ul>
                    <ul className="details">
                      <div className=" ">
                        <h3>Client Details</h3>
                        <li>Client Name</li>{" "}
                        <div className="nameheigh">{item.clientName} </div>
                        <li>Client Phone Number</li>
                        {item.clientPhno}
                        <li>Client Address</li> {item.clientAdd}
                      </div>
                    </ul>
                    <ul className="details  ">
                      <div className="">
                        <h3>Invoice Details</h3>
                        <li className="">Total Amount</li>
                        <div className="nameheigh">{item.totalamt} </div>
                        <li>Total Tax Amount</li> {item.totaltaxvalueamt}
                      </div>
                    </ul>
                    <ul>
                      <Link
                        to={{
                          pathname: `/geninvoice`,
                          screen: "editscreen",
                        }}
                      >
                        <Button
                          className="gen-invoice"
                          variant="outlined"
                          onClick={() => invoiceDet.selectedInvoiceEdit(item)}
                          endIcon={<RiEditCircleFill />}
                        >
                          Edit Invoice
                        </Button>
                      </Link>
                      {/* </div> */}
                    </ul>
                    <ul>
                      <Button
                        className="gen-invoice"
                        variant="outlined"
                        color="error"
                        onClick={() => showConfirmationToast(item, "invoice")}
                        endIcon={<MdDelete />}
                      >
                        Delete Invoice
                      </Button>
                    </ul>
                  </Card>
                </>
              );
            })}
          </Box>
        </>
      )}

      {invoiceDet.estimateinvoiceHistoryData.length > 0 && (
        <Box>
          <StyleHeader>Estimated Invoice</StyleHeader>
          <Box className="displayelements">
            {invoiceDet.estimateinvoiceHistoryData.map((item, index) => {
              // console.log('item');
              // console.log(item);
              // console.log(item.estimateid + ' estimateid ' + item.clientName + ' companydet.loginuserid ' +companydet.loginuserid + 'item.userid ' + item.userid );
              return (
                <>
                  <Card className="  allestimatedisplay" key={index}>
                    {/* <div className="generaldetails "> */}

                    <ul className="details invoicedetails details ">
                      <li>
                        <div className="companyname">
                          {" "}
                          Estimate ID: {item.invoiceid}
                        </div>
                      </li>
                      <li>
                        <div className="companyname">
                          {" "}
                          Estimate Date: {item.invoicedate}
                        </div>
                      </li>
                      {item.paymentdate && (
                        <li>
                          <div className="companyname">
                            {" "}
                            Payment Date: {item.paymentdate}
                          </div>
                        </li>
                      )}
                      {item.paymentmode && (
                        <li>
                          <div className="companyname">
                            {" "}
                            Payment Mode: {item.paymentmode}
                          </div>
                        </li>
                      )}
                    </ul>
                    <ul className="details">
                      <div className=" ">
                        <h3>Client Details</h3>
                        <li>Client Name</li>{" "}
                        <div className="nameheigh">{item.clientName} </div>
                        <li>Client Phone Number</li>
                        {item.clientPhno}
                        <li>Client Address</li> {item.clientAdd}
                      </div>
                    </ul>
                    <ul className="details  ">
                      <div className="">
                        <h3>Estimated Invoice Details</h3>
                        <li className="">Total Amount</li>
                        <div className="nameheigh">{item.totalamt} </div>
                        <li>Total Tax Amount</li> {item.totaltaxvalueamt}
                      </div>
                    </ul>
                    <ul>
                      <Link
                        to={{
                          pathname: `/geninvoice`,
                          screen: "editscreen",
                        }}
                      >
                        <Button
                          className="gen-invoice"
                          variant="outlined"
                          onClick={() => invoiceDet.selectedInvoiceEdit(item)}
                          endIcon={<RiEditCircleFill />}
                        >
                          Edit Estimated Invoice
                        </Button>
                      </Link>
                      {/* </div> */}
                    </ul>
                    <ul>
                      <Button
                        className="gen-invoice"
                        variant="outlined"
                        color="error"
                        onClick={() => showConfirmationToast(item, "estimate")}
                        endIcon={<MdDelete />}
                      >
                        Delete Invoice Estimate
                      </Button>
                    </ul>
                  </Card>
                </>
              );
            })}
          </Box>
        </Box>
      )}
    </>
  );
};

export default AllInvoiceDetails;
