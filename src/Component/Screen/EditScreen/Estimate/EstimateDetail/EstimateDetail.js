
import React from "react";
import Header from "../../../Header/Header";

import EstimateTable from "../EstimateTable/EstimateTable";
import EstimateHeader from "../../../ViewScreen/EstimateComponent/EstimateHeader";
import CompanyotherDetail from "../../../ViewScreen/CompanyotherDetail/CompanyotherDetail";
import CompanyBankDetail from "../../../ViewScreen/CompanyotherDetail/CompanyBankDetail";


const EstimateDetail = (props) =>{

    return(<>
        
        <EstimateHeader />
        <Header name="Estimation"/>
      <EstimateTable screen="new" />
        <CompanyotherDetail/>
        <CompanyBankDetail/>
      {/* <TableFooters/> */}
      </>
    )
}

export default EstimateDetail;