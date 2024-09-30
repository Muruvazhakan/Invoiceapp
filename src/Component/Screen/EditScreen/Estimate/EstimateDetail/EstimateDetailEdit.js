import React from "react";

import EstimateGenDetails from "../EstimateGenDetails/EstimateGenDetails";
import EstimateTableForm from "../EstimateTableForm/EstimateTableForm";
import YourDetails from "../../Invoice/YourDetails/YourDetails";
import CompanyOtherDetailEdit from "../../Company/CompanyOtherDetailEdit";

const EstimateDetailEdit = (props) => {
  return (<>
    <YourDetails />
    <EstimateGenDetails />
    {/* <CompanyOtherDetailEdit /> */}
  </>
  )
}

export default EstimateDetailEdit;