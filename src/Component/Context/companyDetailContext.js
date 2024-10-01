import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CompanyDetail = createContext();

const CompanyDetailContext = ({ children }) => {

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

    const companytitle = (id,value, type) => {
        
          const   getresul = companydetails.map((items) => {
                // console.log(items.id + ' ids ' + id);
                if (items.id == id){
                    // console.log(items.id + ' inside ids ' + id);
                    if (type === "title") {
                        items.title = value;
                    }
                    else{
                        items.desc = value;
                    }
                }
                return items;
            })

            // console.log(getresul);
            setcompanydetails(getresul);
    
    }
    const bankdet = [
        { title: 'Bank Name', isvisible: true, value: 'AXIS BANK' },
        { title: 'Branch', isvisible: true, value: 'Chromepet' },
        { title: 'IFS Ccode', isvisible: true, value: 'UTIB0003905' },
        { title: 'Account Number', isvisible: true, value: '923020005067138' },
        { title: 'Account Holder Name', isvisible: true, value: 'JR MODULAR ENTERPRISES' },
    ];
    const [companyBankdetails, setcompanyBankdetails] = useState(bankdet);
    const [companythankyou, setcompanythankyou] = useState('Thanking you and assuring our best services at all times.');
    //     Invoice id
    // Invoice date
    // Payment mode
    // Payment Date

    const companyOtherDetailHandeler = (item, title, desc, editid, type) => {
        //console.log(title + ' ' + desc + ' ' + type + ' item' +item);
        if (item != editid && type != "delete") {
            toast.warn("Item is not updated, you are saving different data");
            return;
        }
        if(title.length ===0 && desc.length ===0 && type !== "save"){
            toast.error("Both Details are Empty");
            return;
        }
        // console.log('type ' + type);
        let getresul;
        if (type === "save") {
            getresul = companydetails.map((item) => {
                // console.log(item)
                if (item.id == editid) {
                    if (desc.length > 0) {
                        item.desc = desc;
                    }
                    if (title.length > 0) {
                        item.title = title;
                    }

                }
                return item;

            });
            //console.log(getresul);
            setcompanydetails(getresul);
            toast.success("Details are Updated");
        }
        else if (type === "delete") {
            getresul = companydetails.filter((items) => {
                //console.log(items.id + ' ids ' + item);
                return items.id != item;
            })

            //console.log(getresul);
            setcompanydetails(getresul);
            toast.success("Details deleted");
        }
      

       

    }

    // useEffect(() => {
    //     console.log(companydetails);
    // }, [companydetails])

    const compDet = {
        clientName, setclientName, clientPhno, setclientPhno, clientAdd, setclientAdd, companyName, setcompanyName,
        companyTagLine, setcompanyTagLine, companyAddress, setcompanyAddress, companyPhno, setcompanyPhno, companyGstin, setcompanyGstin, companyGstinStatename, setcompanyGstinStatename,
        invoiceid, setinvoiceid, invoicedate, setinvoicedate, paymentmode, setpaymentmode, paymentdate, setpaymentdate, invoiceidcount, setinvoiceidount,
        companyDeleration, setcompanyDeleration, cleardetailoption, setcleardetailoption, companymailid, setcompanymailid, companyOwner, setcompanyOwner, companydetails, setcompanydetails, companyBankdetails, setcompanyBankdetails,
        companythankyou, setcompanythankyou, companytitle, companyOtherDetailHandeler
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