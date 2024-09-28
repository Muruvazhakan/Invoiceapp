
import React from "react";
import Header from "../../../Header/Header";

import EstimateTable from "../EstimateTable/EstimateTable";


const EstimateDetail = (props) =>{

    return(<>
        <Header name="Estimate App"/>
        {/* <GeneralDetails /> */}
      <EstimateTable screen="new" />
    
      {/* <TableFooters/> */}
      </>
    )
}

export default EstimateDetail;