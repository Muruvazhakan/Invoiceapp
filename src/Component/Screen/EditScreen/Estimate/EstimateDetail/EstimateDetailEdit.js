import React from "react";

import EstimateGenDetails from "../EstimateGenDetails/EstimateGenDetails";
import EstimateTableForm from "../EstimateTableForm/EstimateTableForm";

const EstimateDetailEdit = (props) => {
  return (<>
    <EstimateTableForm />
    {/* <YourDetails /> */}
    <EstimateGenDetails />
  </>
  )
}

export default EstimateDetailEdit;