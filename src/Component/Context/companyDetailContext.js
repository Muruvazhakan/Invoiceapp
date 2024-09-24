import React,{createContext, useContext,useState} from "react";


export const CompanyDetail = createContext();

 const  CompanyDetailContext = ({children})=>{

    const[clientName,setclientName]=useState('coma');
    const[clientPhno,setclientPhno]=useState('');
    const[clientAdd,setclientAdd]=useState('');
    const[companyName,setcompanyName]=useState('');
    const[companyTagLine,setcompanyTagLine]=useState('');
    const[companyAddress,setcompanyAddress]=useState('');
    const[companyPhno,setcompanyPhno]=useState('');
    const[companyGstin,setcompanyGstin]=useState('');
    const[companyGstinStatename,setcompanyGstinStatename]=useState('');

    const[invoiceid,setinvoiceid]=useState('');
    
    const[invoiceidcount,setinvoiceidount]=useState(1000);
    const[invoicedate,setinvoicedate]=useState('');
    const[paymentmode,setpaymentmode]=useState('');
    const[paymentdate,setpaymentdate]=useState('');
//     Invoice id
// Invoice date
// Payment mode
// Payment Date

    const compDet={clientName,setclientName,clientPhno,setclientPhno,clientAdd,setclientAdd,companyName,setcompanyName,
        companyTagLine,setcompanyTagLine,companyAddress,setcompanyAddress,companyPhno,setcompanyPhno,companyGstin,setcompanyGstin,companyGstinStatename,setcompanyGstinStatename,
        invoiceid,setinvoiceid,invoicedate,setinvoicedate,paymentmode,setpaymentmode,paymentdate,setpaymentdate,invoiceidcount,setinvoiceidount
    };


    // sno:1,
    // desc:"Description of Goods",
    // hsn:"200",
    // quantity:20,
    // rateoftax:2,
    // rate:100,
    // per:"PCS",
    // disc:"15%",
    // amount:"1000"

    return <CompanyDetail.Provider value={compDet} >{children}</CompanyDetail.Provider>; 
   
}

export default CompanyDetailContext;