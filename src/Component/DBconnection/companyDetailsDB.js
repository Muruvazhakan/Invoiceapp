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