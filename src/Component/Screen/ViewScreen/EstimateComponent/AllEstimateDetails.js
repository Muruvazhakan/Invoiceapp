import React, { useContext, useEffect } from "react";

import { CompanyDetail } from "../../../Context/companyDetailContext";

import "../../GeneralDetails/GeneralDetails.css";
import { estimateState } from "../../../Context/EstimatestateContext";
import Card from "../../../Style/Card/Card";
import NoData from "../../NoData/NoData";
import { Button, CircularProgress, Stack } from "@mui/material";
import { RiEditCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { BsFiletypeXlsx } from "react-icons/bs";
import { TbFileInvoice } from "react-icons/tb";
import { RiAiGenerate } from "react-icons/ri";
import StyleHeader from "../../Header/StyleHeader";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
// import img  from '.'

const AllEstimateDetails = () => {
  const estimatedet = useContext(estimateState);
  const companydet = useContext(CompanyDetail);

  useEffect(() => {
    console.log("AllEstimateDetails");
    console.log(estimatedet.estimateHistoryData);
  }, []);
  const deleteEstimates = async (item, screen) => {
    companydet.setisloaded(false);
    try {
      await estimatedet.deleteEstimate(item);
    } finally {
      companydet.setisloaded(true);
    }
  };
  const showConfirmationToast = (row, screen) => {
    const confirmToast = toast(
      <Stack gap={0.5}>
        <p>Are you sure you want to delete Estimate?</p>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => deleteEstimates(row, screen)}
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

  if (!companydet.isloaded) {
    return (
      <Stack
        sx={{ color: "grey.500" }}
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
    );
  }
  return (
    <>
      <StyleHeader>Estimate Details</StyleHeader>
      <div className="displayelements">
        <Link
          className="nav-links"
          to={{ pathname: "/genestimate" }}
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
            endIcon={<TbFileInvoice />}
            startIcon={<RiAiGenerate />}
          >
            Generate Estimate{" "}
          </Button>
        </Link>
      </div>
      {estimatedet.estimateHistoryData.length &&
      estimatedet.estimateHistoryData.length === 0 ? (
        <>
          <NoData details="Estimation Found" />
        </>
      ) : (
        <>
          <div className="listofstickexcelbtn">
            <Button
              variant="contained"
              color="success"
              size="medium"
              endIcon={<BsFiletypeXlsx />}
              onClick={() => estimatedet.handleExportXlsx()}
            >
              Export Estimation to Excel
            </Button>
          </div>
          <div className="displayelements">
            {estimatedet.estimateHistoryData.map((item, index) => {
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
                          Estimate ID: {item.estimateid}
                        </div>
                      </li>
                      <li>
                        <div className="companyname">
                          {" "}
                          Estimate Date: {item.estimatedate}
                        </div>
                      </li>
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
                        <h3>Estimated Details</h3>
                        <li className="">Total Sq.ft</li> {item.granttotalsqft}
                        <li>Total PVC Cost</li> {item.grandtotalpvccost}
                        <li>Total UPVC Cost</li> {item.grandtotalupvccost}
                        <li>Total Wood Cost</li>
                        {item.grandtotalwoodcost}
                      </div>
                    </ul>
                    <ul>
                      <Link
                        to={{
                          pathname: `/genestimate`,
                        }}
                      >
                        <Button
                          className="gen-invoice"
                          variant="outlined"
                          onClick={() => estimatedet.allEstimateEdit(item)}
                          endIcon={<RiEditCircleFill />}
                        >
                          Edit Estimate
                        </Button>
                      </Link>
                    </ul>
                    <ul>
                      <Button
                        className="gen-invoice"
                        variant="outlined"
                        color="error"
                        onClick={() => showConfirmationToast(item, "estimate")}
                        endIcon={<MdDelete />}
                      >
                        Delete Estimate
                      </Button>
                    </ul>
                    {/* </div> */}
                  </Card>
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default AllEstimateDetails;
