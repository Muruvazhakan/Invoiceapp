export const addOrGetUserdetail = (value, name, type) => {
  // console.log(value + name+type + 'addOrGetUserdetail');
  // console.log(name +" name"+value + ' value ');
  if (type === "save") {
    localStorage.setItem(name, value);
  } else if (type === "get") {
    // return JSON.parse(localStorage.getItem(name));
    return localStorage.getItem(name);
  } else {
    localStorage.removeItem(name);
  }
};

export const addOrUpdateCompanyHandler = (props, type, estimateidcount) => {
  // console.log(props);
  if (type === "save") {
    let companydetail = {
      companyAddress: props.companyAddress,
      companyDeleration: props.companyDeleration,
      companyGstin: props.companyGstin,
      companyGstinStatename: props.companyGstinStatename,
      companyName: props.companyName,
      companyOwner: props.companyOwner,
      companyPhno: props.companyPhno,
      companyTagLine: props.companyTagLine,
      companydetaildesc: props.companydetaildesc,
      companymailid: props.companymailid,
      companythankyou: props.companythankyou,
      estimateidcount: estimateidcount,
      invoiceidcount: props.invoiceidcount,
      companyImage: props.companyImage,
      uploadimg: props.uploadimg,
      companymsme: props.companymsme,
    };
    // console.log(props);
    localStorage.setItem("companydetail", JSON.stringify(companydetail));
    // console.log('saved data');
    // let sto =JSON.parse(localStorage.getItem('companydetail'));
    // console.log(sto);
  } else {
    localStorage.removeItem("companydetail");
  }
};

export const getCompanyHandler = () => {
  // console.log('get CompanyTermsAndCondition ');
  return JSON.parse(localStorage.getItem("companydetail"));
};
export const addOrUpdateCompanyTermsAndConditionHandler = (props, type) => {
  // console.log(props);
  if (type === "save") {
    localStorage.setItem("companyTermsAndCondition", JSON.stringify(props));
    // console.log('saved data');
    // let sto =JSON.parse(localStorage.getItem('companyTermsAndCondition'));
    // console.log(sto);
  } else {
    localStorage.removeItem("companyTermsAndCondition");
  }
};
export const getCompanyTermsAndConditionHandler = () => {
  // console.log('get CompanyTermsAndCondition ');
  return JSON.parse(localStorage.getItem("companyTermsAndCondition"));
};

export const addOrGetCompanyBankDetailHandler = (props, type) => {
  //console.log(props);
  //console.log('saved data bank details');
  if (type === "save") {
    localStorage.setItem("companybankdetail", JSON.stringify(props));

    // let sto =JSON.parse(localStorage.getItem('companybankdetail'));
    // console.log(sto);
  } else if (type === "get") {
    return JSON.parse(localStorage.getItem("companybankdetail"));
  } else {
    localStorage.removeItem("companybankdetail");
  }
};

export const addOrGetInvoiceHistoryData = (props, type) => {
  // console.log(props);

  if (type === "save") {
    localStorage.setItem("companyinvoicehistory", JSON.stringify(props));
    //  console.log('companyinvoicehistory details');
    // let sto = JSON.parse(localStorage.getItem('companyinvoicehistory'));
    // console.log(sto);
  } else if (type === "get") {
    return JSON.parse(localStorage.getItem("companyinvoicehistory"));
  } else {
    localStorage.removeItem("companyinvoicehistory");
  }
};

export const addOrGetEstimatedInvoiceHistoryData = (props, type) => {
  // console.log(props);

  if (type === "save") {
    localStorage.setItem(
      "companyestimatedinvoicehistory",
      JSON.stringify(props)
    );
    //  console.log('companyinvoicehistory details');
    // let sto = JSON.parse(localStorage.getItem('companyinvoicehistory'));
    // console.log(sto);
  } else if (type === "get") {
    return JSON.parse(localStorage.getItem("companyestimatedinvoicehistory"));
  } else {
    localStorage.removeItem("companyestimatedinvoicehistory");
  }
};
export const addOrGetEstimateHistoryData = (props, type) => {
  // console.log('companyestimatehistory details');
  // console.log(props);

  if (type === "save") {
    localStorage.setItem("companyestimatehistory", JSON.stringify(props));

    // let sto = JSON.parse(localStorage.getItem('companyestimatehistory'));
    // console.log(sto);
  } else if (type === "get") {
    return JSON.parse(localStorage.getItem("companyestimatehistory"));
  } else {
    localStorage.removeItem("companyestimatehistory");
  }
};

export const addOrGetEstimateid = (props, type) => {
  // console.log(props);
  if (type === "save") {
    localStorage.setItem("companyestimateid", JSON.stringify(props));
  } else if (type === "get") {
    return JSON.parse(localStorage.getItem("companyestimateid"));
  }
};

export const addOrGetInvoiceid = (props, type) => {
  //console.log(props);
  if (type === "save") {
    localStorage.setItem("companyinvoiceid", JSON.stringify(props));
  } else if (type === "get") {
    return JSON.parse(localStorage.getItem("companyinvoiceid"));
  }
};

export const addOrGetCompanyImage = (props, type) => {
  //console.log(props);
  if (type === "save") {
    localStorage.setItem("companyinvoiceid", JSON.stringify(props));
  } else if (type === "get") {
    return JSON.parse(localStorage.getItem("companyinvoiceid"));
  }
};

export const addOrGetstockHistoryData = (props, type) => {
  // console.log(props);

  if (type === "save") {
    localStorage.setItem("companystockhistory", JSON.stringify(props));
    //  console.log('companyinvoicehistory details');
    // let sto = JSON.parse(localStorage.getItem('companyinvoicehistory'));
    // console.log(sto);
  } else if (type === "get") {
    return JSON.parse(localStorage.getItem("companystockhistory"));
  } else {
    localStorage.removeItem("companystockhistory");
  }
};

export const addOrGetSaleStockHistoryData = (props, type) => {
  // console.log(props);

  if (type === "save") {
    localStorage.setItem("companysalestockhistory", JSON.stringify(props));
    //  console.log('companyinvoicehistory details');
    // let sto = JSON.parse(localStorage.getItem('companyinvoicehistory'));
    // console.log(sto);
  } else if (type === "get") {
    return JSON.parse(localStorage.getItem("companysalestockhistory"));
  } else {
    localStorage.removeItem("companysalestockhistory");
  }
};

export const addOrGetAllClientData = (props, type) => {
  // console.log(props);

  if (type === "save") {
    localStorage.setItem("allClientData", JSON.stringify(props));
    //  console.log('companyinvoicehistory details');
    // let sto = JSON.parse(localStorage.getItem('companyinvoicehistory'));
    // console.log(sto);
  } else if (type === "get") {
    return JSON.parse(localStorage.getItem("allClientData"));
  } else {
    localStorage.removeItem("allClientData");
  }
};

export const addOrGetAllStockData = (props, type) => {
  // console.log(props);

  if (type === "save") {
    localStorage.setItem("allStockData", JSON.stringify(props));
    //  console.log('companyinvoicehistory details');
    // let sto = JSON.parse(localStorage.getItem('companyinvoicehistory'));
    // console.log(sto);
  } else if (type === "get") {
    return JSON.parse(localStorage.getItem("allStockData"));
  } else {
    localStorage.removeItem("allStockData");
  }
};

export const addOrGetAllHistoryStockData = (props, type) => {
  // console.log(props);

  if (type === "save") {
    localStorage.setItem("allHistoryStockData", JSON.stringify(props));
    //  console.log('companyinvoicehistory details');
    // let sto = JSON.parse(localStorage.getItem('companyinvoicehistory'));
    // console.log(sto);
  } else if (type === "get") {
    return JSON.parse(localStorage.getItem("allHistoryStockData"));
  } else {
    localStorage.removeItem("allHistoryStockData");
  }
};

export const addOrGetAllHistorySalesStockData = (props, type) => {
  // console.log(props);

  if (type === "save") {
    localStorage.setItem("allHistorySalesStockData", JSON.stringify(props));
    //  console.log('companyinvoicehistory details');
    // let sto = JSON.parse(localStorage.getItem('companyinvoicehistory'));
    // console.log(sto);
  } else if (type === "get") {
    return JSON.parse(localStorage.getItem("allHistorySalesStockData"));
  } else {
    localStorage.removeItem("allHistorySalesStockData");
  }
};

export const addOrGetSaleStockid = (props, type) => {
  //console.log(props);
  if (type === "save") {
    localStorage.setItem("salestocksid", JSON.stringify(props));
  } else if (type === "get") {
    return JSON.parse(localStorage.getItem("salestocksid"));
  }
};

export const addOrGetStockid = (props, type) => {
  //console.log(props);
  if (type === "save") {
    localStorage.setItem("stocksid", JSON.stringify(props));
  } else if (type === "get") {
    return JSON.parse(localStorage.getItem("stocksid"));
  }
};
