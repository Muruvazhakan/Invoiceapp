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
                console.log("companyBankdetails items");
                console.log(item.length);
                console.log(item);
                return (
                    <>
                        {item ?
                            <div key={index} className="items">
                                {(item.isvisible === true || item.isvisible === "true") &&
                                    <div classname="singlebankitem">
                                       <>{item.title}  : </> <>{item.value} </> 
                                    </div>
                                }
                            </div>
                            :
                            null
                        }
                    </>
                )
            })}
           
        </Card>

    )
}

export default CompanyBankDetail;