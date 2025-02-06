import React from "react";
import Header from "../Header/Header";
import GeneralDetails from "../GeneralDetails/GeneralDetails";
import Tables from "../Table/InvoiceTable/Table";
import TableFooters from "../Table/InvoiceTable/TableFooter";
import StyleHeader from "../Header/StyleHeader";
import CompanyBankDetail from "../ViewScreen/CompanyotherDetail/CompanyBankDetail";

const InvoiceDetails = (props) => {
  return (
    <>
      <Header name={props.isEstimate ? "Estimate" : "Invoice"} />
      {/* <StyleHeader>
      Invoice
    </StyleHeader> */}
      <GeneralDetails />
      <Tables screen="new" />
      <CompanyBankDetail />
      <TableFooters />
    </>
  );
};

export default InvoiceDetails;
