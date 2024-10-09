export const isbackendconnect = "Yes";
export const backendUrl = "http://localhost:4000";

export const userLoginUrl = `${backendUrl}/user/login`;
export const userSigninUrl = `${backendUrl}/user/signin`;

export const getCompanyBasicDetailsUrl = `${backendUrl}/user/getcompanybasic`;
export const saveCompanyBasicDetailsUrl = `${backendUrl}/user/savecompanybasic`;

export const getCompanyBankDetailsUrl = `${backendUrl}/user/getcompanybank`;
export const saveCompanyBankDetailsUrl = `${backendUrl}/user/savecompanybank`;

export const getCompanyTermsAndConditionDetailsUrl = `${backendUrl}/user/gettermsandconditioncompany`;
export const saveCompanyTermsAndConditionDetailsUrl = `${backendUrl}/user/savetermsandconditioncompany`;

export const getEstimateUrl = `${backendUrl}/estimate`;
export const saveEstimateUrl = `${backendUrl}/estimate/createorupateestimate`;

export const getEstimationIdUrl = `${backendUrl}/estimate/getestimationid`;
export const saveEstimationIdUrl = `${backendUrl}/estimate/saveestimationid`;


// app.use('/user/',userRoure);

// app.use('/invoice/',invoicegenRoute);
// app.use('/estimate/',estimategenRoute);

// router.get('/:userid',estimateCont.getallestimate);
// router.post('/createorupateestimate/:userid',estimateCont.createorupdateestimate);

// router.post('/login',userRoute.loginUser);
// router.post('/signin',userRoute.signIn);
// router.get('/getcompanybasic/:userid',userRoute.getCompanyBasicDetails);
// router.get('/gettermsandconditioncompany/:userid',userRoute.getCompanyTermsAndConditionDetail);
// router.get('/getcompanybank/:userid',userRoute.getCompanyBankDetails);

// router.post('/savecompanybasic/:userid',userRoute.addOrModifyCompanyBasicDetails);
// router.post('/savetermsandconditioncompany/:userid',userRoute.addOrModifyCompanyTermsAndConditionDetail);
// router.post('/savecompanybank/:userid',userRoute.addOrModifyCompanyBankDetails);