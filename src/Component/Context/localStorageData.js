

export const addOrUpdateCompanyHandler = (props) =>{
    console.log(props);
    let companydetail={companyAddress:props.companyAddress,companyBankdetails:props.companyBankdetails,companyDeleration:props.companyDeleration,
        companyGstin:props.companyGstin,companyGstinStatename:props.companyGstinStatename,companyName:props.companyName,companyOwner:props.companyOwner,companyPhno:props.companyPhno,companyTagLine :props.companyTagLine,
        companydetaildesc:props.companydetaildesc,companymailid:props.companymailid,companythankyou:props.companythankyou

    }

    console.log(props);
    localStorage.setItem('companydetail',  JSON.stringify(companydetail));
    console.log('saved data');
    let sto =JSON.parse(localStorage.getItem('companydetail'));
    console.log(sto);

//     companyAddress
// : 
// "Address: No.1/4, Mummurti Nagar Main Road, Chromepet, Chennai-600044"
// companyBankdetails
// : 
// (5) [{…}, {…}, {…}, {…}, {…}]
// companyDeleration
// : 
// "We declare that the invoice details are the actual price of the goods"
// companyGstin
// : 
// ""
// companyGstinStatename
// : 
// ""
// companyName
// : 
// "JR MODULAR ENTERPRISES"
// companyOtherDetailHandeler
// : 
// (item, type) => {…}
// length
// : 
// 2
// name
// : 
// "companyOtherDetailHandeler"
// arguments
// : 
// (...)
// caller
// : 
// (...)
// [[FunctionLocation]]
// : 
// companyDetailContext.js:176
// [[Prototype]]
// : 
// ƒ ()
// [[Scopes]]
// : 
// Scopes[4]
// companyOwner
// : 
// "Mr. JAFER HUSSAN"
// companyPhno
// : 
// "Contact: 8428952208"
// companyTagLine
// : 
// "‘YOUR HOME OUR INTERIOR’"
// companydetaildesc
// : 
// ""
// companydetails
// : 
// (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// companydetailtitle
// : 
// ""
// companymailid
// : 
// "mailto: jrmodularenterprises@gmail.com"
// companythankyou
// :
}

export const getCompanyHandler = () =>{
    // console.log('get CompanyTermsAndCondition ');
    return JSON.parse(localStorage.getItem('companydetail'));
}
export const addOrUpdateCompanyTermsAndConditionHandler = (props) =>{
    // console.log(props);
    localStorage.setItem('companyTermsAndCondition',  JSON.stringify(props));
    // console.log('saved data');
    // let sto =JSON.parse(localStorage.getItem('companyTermsAndCondition'));
    // console.log(sto);
}
export const getCompanyTermsAndConditionHandler = () =>{
    // console.log('get CompanyTermsAndCondition ');
    return JSON.parse(localStorage.getItem('companyTermsAndCondition'));
}