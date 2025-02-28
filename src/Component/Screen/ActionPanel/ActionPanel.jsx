import React, { useContext } from "react";
import ActionPanelTemplate from "./ActionPanelTemplate";
import { Stack } from "@mui/material";
import addicon from "../../../Image/Dashboard/addicon.png";
import estimateicon from "../../../Image/Dashboard/estimateicon.png";
import availablecount2 from "../../../Image/Dashboard/availablecount2.png";
import invoiceicon from "../../../Image/Dashboard/invoiceicon.png";
import { AllState } from "../../Context/allStateContext";
import { estimateState } from "../../Context/EstimatestateContext";
const ActionPanel = () => {
  const invoiceDet = useContext(AllState);
  const estimatedet = useContext(estimateState);
  return (
    <>
      <ActionPanelTemplate
        img={addicon}
        title="Add Stocks"
        link={"/addstock"}
      />
      <ActionPanelTemplate
        img={availablecount2}
        title="Stock History"
        link={"/listofaddedstocks"}
        type=""
      />

      <ActionPanelTemplate
        img={invoiceicon}
        title="Generate Invoice"
        link={"/geninvoice"}
        type=""
      />

      <ActionPanelTemplate
        img={estimateicon}
        title="Generate Estimate"
        link={"/genestimate"}
        type=""
      />

      {/* <ActionPanelTemplate
        img={low3}
        title="Generate Invoice Report"
        link={"/"}
        type="report"
        report="invoice"
      />

      <ActionPanelTemplate
        img={low3}
        title="Generate Estimate Report"
        link={"/"}
        type="report"
        report="estimate"
      /> */}
    </>
  );
};

export default ActionPanel;
