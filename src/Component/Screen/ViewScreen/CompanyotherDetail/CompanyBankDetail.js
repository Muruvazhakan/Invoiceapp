import React, { useContext } from "react";


import { CompanyDetail } from "../../../Context/companyDetailContext";
import './CompanyDetails.css';
import Card from "../../../Style/Card/Card";
const CompanyBankDetail = () => {

    const companydet = useContext(CompanyDetail);
    return (

        <Card>
            <div className="header">Bank Details</div>
            {companydet.companyBankdetails.map((item, index) => {
                return (
                    <>
                        {item.isvisible === true &&

                            <>
                                <div className="items  ">
                                    {item.title} :  {item.value}
                                </div>
                            </>

                        }
                    </>
                )
            })}
        </Card>)
}

export default CompanyBankDetail;