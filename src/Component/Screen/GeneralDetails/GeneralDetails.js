import React,{useContext} from "react";


import './GeneralDetails.css';
import { AllState } from "../../Context/allStateContext";
const GeneralDetails = () =>{

    const invoicedet=useContext(AllState);
    return <div className="generaldetails">
        <ul className="details">
            <div className="companyname">Buyer:
            <li> 
                {invoicedet.clientName}               
            </li>
            <li> 
                {invoicedet.clientPhno}               
            </li>
            <li>
                {invoicedet.clientAdd} 
            </li>
            </div>
        </ul>
       
        <ul className="details">
            <li className="companyname">
                {invoicedet.companyName}
            </li>
            <li>
            {invoicedet.companyTagLine}
            </li>
            <li>
            {invoicedet.companyAddress}
            </li>
            <li>
            {invoicedet.companyName}
            </li>
            <li>
            {invoicedet.companyPhno}
            </li>
            <li>
             {invoicedet.companyGstin ? 'Gstin: '+invoicedet.companyGstin:null }
            </li>
            <li>
             {invoicedet.companyGstinStatename ? 'StateName: '+invoicedet.companyGstinStatename:null }
            </li>

        </ul>
       
        <ul className="details invoicedetails">
            <li>
            Invoice ID: {invoicedet.invoiceid}
            </li>
            <li>
            Invoice date: {invoicedet.invoicedate}
            </li>
            <li>
            Payment mode: {invoicedet.paymentmode}
            </li>
            <li>
            Payment Date: {invoicedet.paymentdate}
            </li>
        </ul>
    </div>
}

export default GeneralDetails;