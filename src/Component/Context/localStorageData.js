export const addOrGetUserdetail = (value,name,type) =>{
    // console.log(value + name+type + 'addOrGetUserdetail');
    // console.log(name +" name"+value + ' value ');
    if(type ==="save"){
        localStorage.setItem(name, value);
    }
    else if(type ==="get") {
        // return JSON.parse(localStorage.getItem(name));
        return localStorage.getItem(name);
    }
    else {
        localStorage.removeItem(name);
    }
}

export const addOrUpdateCompanyHandler = (props) => {
    // console.log(props);
    let companydetail = {
        companyAddress: props.companyAddress, companyDeleration: props.companyDeleration,
        companyGstin: props.companyGstin, companyGstinStatename: props.companyGstinStatename, companyName: props.companyName, companyOwner: props.companyOwner,
        companyPhno: props.companyPhno, companyTagLine: props.companyTagLine,
        companydetaildesc: props.companydetaildesc, companymailid: props.companymailid, companythankyou: props.companythankyou

    }
    // console.log(props);
    localStorage.setItem('companydetail', JSON.stringify(companydetail));
    // console.log('saved data');
    // let sto =JSON.parse(localStorage.getItem('companydetail'));
    // console.log(sto);

}

export const getCompanyHandler = () => {
    // console.log('get CompanyTermsAndCondition ');
    return JSON.parse(localStorage.getItem('companydetail'));
}
export const addOrUpdateCompanyTermsAndConditionHandler = (props) => {
    // console.log(props);
    localStorage.setItem('companyTermsAndCondition', JSON.stringify(props));
    // console.log('saved data');
    // let sto =JSON.parse(localStorage.getItem('companyTermsAndCondition'));
    // console.log(sto);
}
export const getCompanyTermsAndConditionHandler = () => {
    // console.log('get CompanyTermsAndCondition ');
    return JSON.parse(localStorage.getItem('companyTermsAndCondition'));
}
export const addOrGetCompanyBankDetailHandler = (props, type) => {
    // console.log(props);
    // ,companyBankdetails:props.companyBankdetails
    if (type === 'save') {
        localStorage.setItem('companybankdetail', JSON.stringify(props));
        //  console.log('saved data bank details');
        // let sto =JSON.parse(localStorage.getItem('companybankdetail'));
        // console.log(sto);
    }
    else if (type === 'get') {
        return JSON.parse(localStorage.getItem('companybankdetail'));
    }
}

export const addOrGetInvoiceHistoryData = (props, type) => {
    // console.log(props);

    if (type === 'save') {
        localStorage.setItem('companyinvoicehistory', JSON.stringify(props));
        //  console.log('companyinvoicehistory details');
        // let sto = JSON.parse(localStorage.getItem('companyinvoicehistory'));
        // console.log(sto);
    }
    else if (type === 'get') {
        return JSON.parse(localStorage.getItem('companyinvoicehistory'));
    }
}

export const addOrGetEstimateHistoryData = (props, type) => {
    // console.log(props);

    if (type === 'save') {
        localStorage.setItem('companyestimatehistory', JSON.stringify(props));
        // console.log('companyestimatehistory details');
        // let sto = JSON.parse(localStorage.getItem('companyestimatehistory'));
        // console.log(sto);
    }
    else if (type === 'get') {
        return JSON.parse(localStorage.getItem('companyestimatehistory'));
    }
}

export const addOrGetEstimateid = (props, type) => {
    // console.log(props);
    if (type === 'save') {
        localStorage.setItem('companyestimateid', JSON.stringify(props));
    }
    else if (type === 'get') {
        return JSON.parse(localStorage.getItem('companyestimateid'));
    }
}