import React from "react";
import YourDetails from "../../EditScreen/Invoice/YourDetails/YourDetails";
import CompanyOtherDetailEdit from "../../EditScreen/Company/CompanyOtherDetailEdit";
import CompanyBankDetailEdit from "../../EditScreen/Company/CompanyBankDetailEdit";

const CompanyEditeScreen = () => {


    return (

        <>
        <YourDetails/>
        <CompanyBankDetailEdit />
        <CompanyOtherDetailEdit/>
        </>)
}

export default CompanyEditeScreen;