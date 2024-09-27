import React from "react";
import Header from "../Header/Header";
import GeneralDetails from "../GeneralDetails/GeneralDetails";
import Tables from "../Table/Table";
import TableFooters from "../Table/TableFooter";

const InvoiceDetails = (props) =>{

    return(<>
        <Header/>
      <GeneralDetails />
      <Tables screen="new" />
    
      <TableFooters/>
      </>
    )
}

export default InvoiceDetails;