import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import * as Datas from '../Context/Datas';
import * as localstore from './localStorageData';
import { estimateState } from "./EstimatestateContext";
export const CompanyDetail = createContext();


const CompanyDetailContext = ({ children }) => {
    const estimateDet = useContext(estimateState);
    
    const [clientName, setclientName] = useState('');
    const [clientPhno, setclientPhno] = useState('');
    const [clientAdd, setclientAdd] = useState('');
    const [companyName, setcompanyName] = useState('JR MODULAR ENTERPRISES');
    const [companyTagLine, setcompanyTagLine] = useState('‘YOUR HOME OUR INTERIOR’');
    const [companyAddress, setcompanyAddress] = useState('Address: No.1/4, Mummurti Nagar Main Road, Chromepet, Chennai-600044');
    const [companyPhno, setcompanyPhno] = useState('Contact: 8428952208');
    const [companymailid, setcompanymailid] = useState('mailto: jrmodularenterprises@gmail.com');
    const [companyOwner, setcompanyOwner] = useState('Mr. JAFER HUSSAN');
    const [companyGstin, setcompanyGstin] = useState('');
    const [companyGstinStatename, setcompanyGstinStatename] = useState('');

    const [invoiceid, setinvoiceid] = useState('');

    const [invoiceidcount, setinvoiceidount] = useState(1000);
    const [invoicedate, setinvoicedate] = useState('');
    const [paymentmode, setpaymentmode] = useState('');
    const [paymentdate, setpaymentdate] = useState('');
    const [companyDeleration, setcompanyDeleration] = useState('We declare that the invoice details are the actual price of the goods');
    const [cleardetailoption, setcleardetailoption] = useState(true);
    let companydet = [
        { id: 1, title: 'Prices', isvisible: true, desc: 'Prices quoted are strictly as per the size, quantity and design SPECIFIED only, Any change in either one will result in change in quoted price, If any change in Government taxes & regulations it will be implicated in pricing as per actual.' },
        { id: 2, title: 'Billing format', isvisible: true, desc: 'Billing will be done for individual items & rates specified for individual items only tolerance of (+/-) 25mm will not affect the rate per Sqft quoted.' },
        { id: 3, title: 'Payment & Supply of Materials', isvisible: true, desc: '50% Advance' },
        { id: 4, title: '', isvisible: true, desc: '30% after start work' },
        { id: 5, title: '', isvisible: true, desc: '20% after completion' },
        { id: 6, title: '', isvisible: true, desc: 'Supply of materials will be done within 15 days from the date of receipt order and advance payments along with confirmed sizes & Design.' },
        { id: 7, title: '', isvisible: true, desc: 'The materials will be taken for production once the Order and advance payments are received. Work order & Payments to be made. We can also work in line with your schedule of works.' },
        { id: 8, title: 'Installation', isvisible: true, desc: 'We carry out the work once the materials reach the site. The Sequence of work will however have to be mutually agreed upon.' },
        { id: 9, title: 'Warranty', isvisible: true, desc: 'All the Extrusions used will carry a warranty of 15 years. All the accessories used will have a warranty of one year under any manufacturing defects. The above warranty does not include mishandling of products & natural calamities like fire, earth quake etc.,' },
    ];
    const [companydetails, setcompanydetails] = useState(companydet);

    const [companydetailtitle, setcompanydetailtitle] = useState('');
    const [companydetaildesc, setcompanydetaildesc] = useState('');
    const [companydetailIsVisible, setcompanydetailIsVisible] = useState(false);

    const [companyBankdetailtitle, setcompanyBankdetailtitle] = useState('');
    const [companyBankdetailvalue, setcompanyBankdetailvalue] = useState('');
    const [companyBankdetailIsVisible, setcompanyBankdetailIsVisible] = useState(false);
    // const [loginuser, setloginuser] = useState(localStorage.getItem('loginuser').length> 0 ? localStorage.getItem('loginuser'): '');
    const [loginuser, setloginuser] = useState('');
    const [loginuserid, setloginuserid] = useState('');
    const [loginUserPassword, setloginUserPassword] = useState('');
    const [loginUserConfirmPassword, setloginUserConfirmPassword] = useState('');

    // const [loginstatus, setloginstatus] = useState(localStorage.getItem('loginuser').length> 0 ? true: false);
    const [loginstatus, setloginstatus] = useState(false);

    const [loginId, setloginId] = useState('');
    const [tokenid, settokenid] = useState('');
    const companytitle = (id, value, type) => {

        const getresul = companydetails.map((items) => {
            // console.log(items.id + ' ids ' + id);
            if (items.id === id) {
                // console.log(items.id + ' inside ids ' + id);
                if (type === "title") {
                    items.title = value;
                }
                else if (type === "desc") {
                    items.desc = value;
                }
                else {
                    items.isvisible = !items.isvisible;
                }
            }
            return items;
        });

        // console.log(getresul);
        setcompanydetails(getresul);

    }
    const updateBankDetailHandler = (id, value, type) => {
        // console.log(value + ' ids ' + id);
        // console.log(value );

        const getresul = companyBankdetails.map((items) => {
            // console.log(items.id + ' ids ' + id);
            if (items.id === id) {
                // console.log(items.id + ' inside ids ' + id);
                if (type === "title") {
                    items.title = value;
                }
                else if (type === "value") {
                    items.value = value;
                }
                else {
                    items.isvisible = !items.isvisible;
                }
            }
            return items;
        })

        // console.log(getresul);
        setcompanyBankdetails(getresul);
    }
    const bankdet = [
        { id: 1, title: 'Bank Name', isvisible: true, value: 'AXIS BANK' },
        { id: 2, title: 'Branch', isvisible: true, value: 'Chromepet' },
        { id: 3, title: 'IFS Ccode', isvisible: true, value: 'UTIB0003905' },
        { id: 4, title: 'Account Number', isvisible: true, value: '923020005067138' },
        { id: 5, title: 'Account Holder Name', isvisible: true, value: 'JR MODULAR ENTERPRISES' },
    ];
    const [companyBankdetails, setcompanyBankdetails] = useState(bankdet);
    const [companythankyou, setcompanythankyou] = useState('Thanking you and assuring our best services at all times.');
    //     Invoice id
    // Invoice date
    // Payment mode
    // Payment Date

    const setval = (e, fun) => {
        fun(e.target.value);
    }

    const setboxColors = (item, field) => {
        if (field === 'color') {
            return item.length === 0 || item === 0 ? 'error' : 'success';
        }

        else {
            return item.length === 0 || item === 0 ? true : false;
        }

    }

    const loginHandler = (type) => {
        //console.log('login handler' + loginuser.length +'loginuser.length ' +loginUserPassword.length );

        if (loginuser.length > 0 && loginUserPassword.length > 0) {
            let userExsist = false
            userExsist = Datas.userLoginname.filter((item) => {
                //console.log(item);
                if (item.username === loginuser && item.userPass === loginUserPassword) {
                    return true;
                }
                else return false;
            });
            //console.log(userExsist);
            if (type === 'login') {
                if (userExsist.length > 0) {
                    // toast.success(" Welcome " + loginuser + "!");
                    // localStorage.setItem('loginuser', loginuser);
                    //console.log(userExsist[0].userid + ' userExsist.userid');
                    setloginuserid(userExsist[0].userid);
                    localstore.addOrGetUserdetail(loginuser,'loginuser',"save");
                    localstore.addOrGetUserdetail(userExsist[0].userid,'userid',"save");
                    setloginstatus(true);
                    // window.location.href = '/';
                    getAlldataOnLogin();

                } else {
                    toast.warning("Password mismatch");
                }
            } else {
                if (loginUserPassword !== loginUserConfirmPassword) {
                    toast.error("Password is not match iwth Confirm Password");
                    return;
                }
                if (userExsist.length > 0) {
                    toast.error(" User already exist");
                    // setloginstatus(true);
                } else if (tokenid === 'muru123') {
                    toast.success("User registered");
                } else {
                    toast.error(" Token Id is not matched");
                }
            }

            // if(loginuser ==="JR modular" && loginUserPassword ==="jrmodular123"){
            //     toast.success(" Welcome " + loginuser + "!");   
            //     setloginstatus(true);
            // }
            // else{
            //     toast.warning("Password mismatch");
            // }
        }
        else {

            toast.error("Please fill both User Name and Password");
            return;
        }


    }

    const logoutHandler = () => {
        localstore.addOrGetUserdetail('','loginuser','remove');
        localstore.addOrGetUserdetail('','userid','remove');
        setloginstatus(false);
        setloginuserid(null);
        setloginuser('');
        window.location.href = '/';
        toast.success("You have successfully logedout");
    }
    const getAlldataOnLogin = () => {
        let companyTermsAndCondition = localstore.getCompanyTermsAndConditionHandler();
        
        if (companyTermsAndCondition !== null) {
            // console.log(companyTermsAndCondition);
            setcompanydetails(companyTermsAndCondition);
        }
        let companydetail = localstore.getCompanyHandler();
        // console.log(companydetail);
        if (companydetail !== null) {
            setcompanyName(companydetail.companyName);
            setcompanyAddress(companydetail.companyAddress);

            setcompanyDeleration(companydetail.companyDeleration);
            setcompanyGstin(companydetail.companyGstin);
            setcompanyGstinStatename(companydetail.companyGstinStatename);
            setcompanyOwner(companydetail.companyOwner);
            setcompanyPhno(companydetail.companyPhno);
            setcompanyTagLine(companydetail.companyTagLine);
            setcompanydetaildesc(companydetail.companydetaildesc);
            setcompanymailid(companydetail.companymailid);
            setcompanythankyou(companydetail.companythankyou);
        }


        let companyBankdetail = localstore.addOrGetCompanyBankDetailHandler('', 'get');
        if (companyBankdetail != null) {
            // console.log('companyBankdetail');
            // console.log(companyBankdetail);
            setcompanyBankdetails(companyBankdetail);
        }

       
           


    }
    const companyOtherDetailHandeler = (item, type) => {
        //console.log(companydetailtitle + ' ' + companydetaildesc + ' ' + type + ' item' +item);

        if (companydetailtitle.length === 0 && companydetaildesc.length === 0 && type !== "delete") {
            toast.error("Both Details are Empty");
            return;
        }
        //console.log('type ' + type);
        let getresul;
        if (type === "new") {
            getresul = { id: uuidv4(), title: companydetailtitle, isvisible: companydetailIsVisible, desc: companydetaildesc };
            //console.log('getresul');
            //console.log(getresul);
            //console.log(companydetails);
            if (companydetails.length > 0) {

                setcompanydetails([
                    ...companydetails, getresul
                ]);

            } else {

                setcompanydetails([
                    getresul
                ]);
            };
            toast.success("Details are Added");
            setcompanydetailtitle('');
            setcompanydetaildesc('');
            setcompanydetailIsVisible(false);
        }
        else if (type === "delete") {
            getresul = companydetails.filter((items) => {
                //console.log(items.id + ' ids ' + item);
                return items.id !== item;
            })

            //console.log(getresul);
            setcompanydetails(getresul);
            toast.success("Details deleted");
        }

    }

    const saveHandler = (funcs, item, type) => {
        if (funcs === 'addOrUpdateCompanyTermsAndConditionHandler') {
            localstore.addOrUpdateCompanyTermsAndConditionHandler(item, type);
        }
        if (funcs === 'addOrGetCompanyBankDetailHandler') {
            localstore.addOrGetCompanyBankDetailHandler(item, type);
        }
        if (funcs === 'addOrUpdateCompanyHandler') {
            localstore.addOrUpdateCompanyHandler(item, type);
        }

        toast.success("Details are saved");
    }

    const companyBankDetailHandler = (item, type) => {
        //  console.log(companyBankdetailtitle + ' ' + companyBankdetailvalue + ' ' + type + ' item' +item);
        if (companyBankdetailtitle.length === 0 && companyBankdetailvalue.length === 0 && type !== "delete") {
            toast.error("Both Details are Empty");
            return;
        }
        //console.log('type ' + type);
        let getresul;
        if (type === "new") {
            getresul = { id: uuidv4(), title: companyBankdetailtitle, isvisible: companyBankdetailIsVisible, value: companyBankdetailvalue };
            //console.log('getresul');
            //console.log(getresul);
            //console.log(companydetails);
            setcompanyBankdetails([
                ...companyBankdetails, getresul
            ]);

            toast.success("New Bank Details are Added");
            setcompanyBankdetailtitle('');
            setcompanyBankdetailvalue('');
            setcompanyBankdetailIsVisible(false);
        }
        else if (type === "delete") {
            getresul = companyBankdetails.filter((items) => {
                //console.log(items.id + ' ids ' + item);
                return items.id !== item;
            })

            //console.log(getresul);
            setcompanyBankdetails(getresul);
            toast.success("Selected Bank detail is deleted");
        }
    }
    useEffect(() => {
        let useralreadyloggedin= localstore.addOrGetUserdetail('','loginuser',"get");
        let loginuserids= localstore.addOrGetUserdetail('','userid',"get");
       
           console.log(useralreadyloggedin);
        if (useralreadyloggedin !== null && useralreadyloggedin !== '') {
            setloginstatus(true);
            setloginuserid(loginuserids);
            setloginuser(useralreadyloggedin);
            // toast.success('Welcome Back ' +useralreadyloggedin);
        }
        //    console.log(useralreadyloggedin);
        // const [loginstatus, setloginstatus] = useState(localStorage.getItem('loginuser').length> 0 ? true: false);
    }, []);

    useEffect(() => {
        getAlldataOnLogin()
    }, [])

    const compDet = {
        clientName, setclientName, clientPhno, setclientPhno, clientAdd, setclientAdd, companyName, setcompanyName,
        companyTagLine, setcompanyTagLine, companyAddress, setcompanyAddress, companyPhno, setcompanyPhno, companyGstin, setcompanyGstin, companyGstinStatename, setcompanyGstinStatename,
        invoiceid, setinvoiceid, invoicedate, setinvoicedate, paymentmode, setpaymentmode, paymentdate, setpaymentdate, invoiceidcount, setinvoiceidount, updateBankDetailHandler, companyBankDetailHandler,
        companyDeleration, setcompanyDeleration, cleardetailoption, setcleardetailoption, companymailid, setcompanymailid, companyOwner, setcompanyOwner, companydetails, setcompanydetails, companyBankdetails, setcompanyBankdetails,
        companythankyou, setcompanythankyou, companytitle, companyOtherDetailHandeler, companydetailtitle, setcompanydetailtitle, companydetaildesc, setcompanydetaildesc, setval, setboxColors,
        loginuser, setloginuser, loginUserPassword, setloginUserPassword, loginHandler, loginstatus, setloginstatus, loginId, setloginId, loginUserConfirmPassword, setloginUserConfirmPassword, tokenid, settokenid, logoutHandler,
        companyBankdetailtitle, setcompanyBankdetailtitle, companyBankdetailvalue, setcompanyBankdetailvalue, companyBankdetailIsVisible, setcompanyBankdetailIsVisible, companydetailIsVisible, setcompanydetailIsVisible,
        loginuserid, setloginuserid, saveHandler
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