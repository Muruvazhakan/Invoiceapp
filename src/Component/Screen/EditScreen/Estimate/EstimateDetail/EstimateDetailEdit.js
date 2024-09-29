import React from "react";

import EstimateGenDetails from "../EstimateGenDetails/EstimateGenDetails";
import EstimateTableForm from "../EstimateTableForm/EstimateTableForm";
import YourDetails from "../../Invoice/YourDetails/YourDetails";

const EstimateDetailEdit = (props) => {
  return (<>
    <YourDetails />
    <EstimateGenDetails />
  </>
  )
}

export default EstimateDetailEdit;