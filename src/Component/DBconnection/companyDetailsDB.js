import * as dbprop from './dbproperties';
import axios from 'axios';
const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};
export const loginUser = async (username, userpassword) => {
    console.log(dbprop.userLoginUrl + ' dbprop.userLoginUrl');
    const data = {
        username: username,
        password: userpassword
    };
    console.log(data);
    let response;
    try {
        response = await axios.post(dbprop.userLoginUrl, data, config);
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
};



export const siginUser = async (username, userpassword) => {
    console.log(username, userpassword);
    // fetch(dbprop.userSigninUrl,
    //     {
    //         // mode: 'no-cors',
    //         method: 'post',
    //         header: {
    //             'Accept': 'application/json',
    //             'Content-Type' : 'application/json',
    //         }, body: JSON.stringify({
    //             username: username,
    //             password: userpassword,
    //             type: 'modify'
    //         })
    //     }
    // ).then(res => res.json()).then(res => {
    //     console.log("res siginUser");
    //     console.log(res);
    // }).catch((error) => {
    //     console.error(error);
    // });

    const data = {
        username: username,
        password: userpassword
    };
    console.log(data);
    let response
    try {
        response = await axios.post(dbprop.userSigninUrl, data, config);
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const getCompanyBasicDetails = async (userid) => {
    console.log(`${dbprop.getCompanyBasicDetailsUrl}/${userid}` + 'dbprop.getCompanyBasicDetails');
    let response;
    try {
        response = await axios.get(`${dbprop.getCompanyBasicDetailsUrl}/${userid}}`, config);
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export const saveCompanyBasicDetails = async (basicdetail, userid) => {
    console.log(`${dbprop.saveCompanyBasicDetailsUrl}/${userid}` + ' dbprop.getCompanyBasicDetails');
    const data = {
        companyName: basicdetail.companyName,
        companyTagLine: basicdetail.companyTagLine,
        companyAddress: basicdetail.companyAddress,
        companyPhno: basicdetail.companyPhno,
        companymailid: basicdetail.companymailid,
        companyGstin: basicdetail.companyGstin,
        companyGstinStatename: basicdetail.companyGstinStatename,
        companyOwner: basicdetail.companyOwner,
        companyDeleration: basicdetail.companyDeleration,
        companythankyou: basicdetail.companythankyou,
    };
    console.log(data);
    let response;
    try {
        response = await axios.post(`${dbprop.saveCompanyBasicDetailsUrl}/${userid}}`, data, config);
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
        return err;
    }
};