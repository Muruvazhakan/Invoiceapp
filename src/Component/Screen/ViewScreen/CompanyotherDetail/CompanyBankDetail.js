import React, { useContext } from "react";


import { CompanyDetail } from "../../../Context/companyDetailContext";
import './CompanyDetails.css';
import Card from "../../../Style/Card/Card";
const CompanyBankDetail = () => {

    const companydet = useContext(CompanyDetail);
    return (

        <Card className="  ">
            <div className="header">Bank Details</div>
            {companydet.companyBankdetails.map((item, index) => {
                return (
                    <div key={index} className="items">
                        {item.isvisible === true &&
                            <>
                                {item.title} :  {item.value}
                            </>
                        }
                    </div>
                )
            })}
        </Card>)
}

export default CompanyBankDetail;