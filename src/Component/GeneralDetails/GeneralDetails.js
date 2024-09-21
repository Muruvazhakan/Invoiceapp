import React from "react";


import './GeneralDetails.css';
const GeneralDetails = () =>{

    return <div className="generaldetails">
        <ul className="details">
            <li>
                Client name
            </li>
            <li>
                Phone number
            </li>

        </ul>
        <ul className="details">
            <li className="companyname">
                JR Enter
            </li>
            <li>
                Tag line
            </li>
            <li>
                Address
            </li>
            <li>
                Phone number
            </li>
            <li>
                GSTIN/UIN
            </li>

        </ul>

        <ul className="details invoicedetails">
            <li>
                Invoice id
            </li>
            <li>
            Invoice date
            </li>
            <li>
            Payment mode
            </li>
            <li>
            Payment Date
            </li>
        </ul>
    </div>
}

export default GeneralDetails;