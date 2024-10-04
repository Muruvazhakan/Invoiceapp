

export const addOrUpdateCompanyHandler = (props) =>{
    console.log(props);
    let companydetail={companyAddress:props.companyAddress,companyDeleration:props.companyDeleration,
        companyGstin:props.companyGstin,companyGstinStatename:props.companyGstinStatename,companyName:props.companyName,companyOwner:props.companyOwner,
        companyPhno:props.companyPhno,companyTagLine :props.companyTagLine,
        companydetaildesc:props.companydetaildesc,companymailid:props.companymailid,companythankyou:props.companythankyou

    }
    // console.log(props);
    localStorage.setItem('companydetail',  JSON.stringify(companydetail));
    // console.log('saved data');
    // let sto =JSON.parse(localStorage.getItem('companydetail'));
    // console.log(sto);

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
export const addOrGetCompanyBankDetailHandler = (props,type) =>{
    // console.log(props);
    // ,companyBankdetails:props.companyBankdetails
    if(type ==='save'){
        localStorage.setItem('companybankdetail',JSON.stringify(props));
    //  console.log('saved data bank details');
    // let sto =JSON.parse(localStorage.getItem('companybankdetail'));
    // console.log(sto);
    }
    else if(type==='get'){
        return JSON.parse(localStorage.getItem('companybankdetail'));
    }
}
