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
                    <ul className="details" key={index}>
                        {item.isvisible === true &&
                            < >
                                <li >
                                    <div className="companyname  itemtitle">
                                        {item.title}

                                    </div>
                                </li>
                                <li>
                                    {item.desc}
                                </li>
                            </>
                        }
                    </ul>
                )
            })}



        </Card>)
}

export default CompanyotherDetail;