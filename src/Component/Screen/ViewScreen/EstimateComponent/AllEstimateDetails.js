import React, { useContext } from "react";

import { CompanyDetail } from "../../../Context/companyDetailContext";

import '../../GeneralDetails/GeneralDetails.css';
import { estimateState } from "../../../Context/EstimatestateContext";
import Card from "../../../Style/Card/Card";
import NoData from "../../NoData/NoData";
import { Button } from "@mui/material";
import { RiEditCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
// import img  from '.'

const AllEstimateDetails = () => {

    const estimatedet = useContext(estimateState);
    const companydet = useContext(CompanyDetail);
    return (

        <>

            {estimatedet.estimateHistoryData === null ?
                <>

                    <NoData details="Estimation Found" />

                </>
                :
                <div className="displayelements">
                    {estimatedet.estimateHistoryData.map((item) => {

                        // item.estimatedate 
                        // item.estimatedate1 
                        // item.clientName
                        // item.clientPhno 
                        // item.clientAdd 
                        // item.rows 
                        // item.granttotalsqft 
                        // item.grandtotalpvccost
                        // item.grandtotalupvccost 
                        // item.grandtotalwoodcost 

                        return (<>
                            {item.userid === companydet.loginuserid ?
                                (<Card className="  allestimatedisplay">
                                    {/* <div className="generaldetails "> */}

                                    <ul className="details invoicedetails details ">

                                        <li >
                                            <div className="companyname"> Estimate ID: {item.estimateid}</div>
                                        </li>
                                        <li>
                                            <div className="companyname"> Estimate Date: {item.estimatedate}</div>

                                        </li>
                                    </ul>
                                    <ul className="details">
                                        <div className=" ">
                                            <h3>Client Details</h3>
                                            <li>
                                                Client Name
                                            </li> <div className="nameheigh">{item.clientName} </div>
                                            <li>
                                                Client Phone Number
                                            </li>{item.clientPhno}
                                            <li>
                                                Client Address
                                            </li> {item.clientAdd}
                                        </div>
                                    </ul>
                                    <ul className="details  ">
                                        <div className="">
                                            <h3>Estimated Details</h3>
                                            <li className="">
                                                Total Sq.ft
                                            </li> {item.granttotalsqft}
                                            <li>
                                                Total PVC Cost
                                            </li> {item.grandtotalpvccost}
                                            <li>
                                                Total UPVC Cost
                                            </li> {item.grandtotalupvccost}
                                            <li>
                                                Total Wood Cost
                                            </li>{item.grandtotalwoodcost}
                                        </div>
                                    </ul>
                                    <Link  to={{
                                        pathname: `/genestimate`
                                    }}  
                                    >
                                        <Button className="gen-invoice" variant="outlined"
                                            onClick={() => estimatedet.allEstimateEdit(item)} endIcon={<RiEditCircleFill />}  >

                                            Edit Estimate</Button>
                                    </Link>
                                    {/* </div> */}

                                </Card>)
                                :
                                null}</>)
                    })}

                </div>
            }
        </>)
}

export default AllEstimateDetails;