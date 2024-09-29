import React, { useContext } from "react";

import { CompanyDetail } from "../../../Context/companyDetailContext";
import Card from "../../../Style/Card/Card";
const CompanyotherDetail = () => {

    const companydet = useContext(CompanyDetail);
    return (

        <Card>
           <div className="header">Terms And Conditions</div>
                {companydet.companydetails.map((item, index) => {
                    return (
                        <>
                            {item.isvisible === true &&
                                <ul className="details" key={index}>

                                    <li >
                                        <div className="companyname  itemtitle">
                                            {item.title}

                                        </div>
                                    </li>
                                    <li>
                                        {item.desc}
                                    </li>
                                </ul>
                            }
                        </>
                    )
                })}

           

        </Card>)
}

export default CompanyotherDetail;