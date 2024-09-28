import React,{useContext} from "react";


import './GeneralDetails.css';
import { CompanyDetail } from "../../Context/companyDetailContext";
const GeneralDetails = () =>{

    const companydet=useContext(CompanyDetail);
    return <div className="generaldetails">
        <ul className="details">
            <div className="companyname">Buyer:
            <li> 
                {companydet.clientName}               
            </li>
            <li> 
                {companydet.clientPhno}               
            </li>
            <li>
                {companydet.clientAdd} 
            </li>
            </div>
        </ul>
       
        <ul className="details">
            <li className="companyname">
                {companydet.companyName}
            </li>
            <li>
            {companydet.companyTagLine}
            </li>
            <li>
            {companydet.companyAddress}
            </li>
            <li>
            {companydet.companyName}
            </li>
            <li>
            {companydet.companyPhno}
            </li>
            <li>
             {companydet.companyGstin ? 'Gstin: '+companydet.companyGstin:null }
            </li>
            <li>
             {companydet.companyGstinStatename ? 'StateName: '+companydet.companyGstinStatename:null }
            </li>

        </ul>
       
        <ul className="details invoicedetails">
            <li>
            Invoice ID: {companydet.invoiceid}
            </li>
            <li>
            Invoice date: {companydet.invoicedate}
            </li>
            <li>
            Payment mode: {companydet.paymentmode}
            </li>
            <li>
            Payment Date: {companydet.paymentdate}
            </li>
        </ul>
    </div>
}

export default GeneralDetails;