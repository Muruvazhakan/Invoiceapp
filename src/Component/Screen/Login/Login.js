import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import React, { useContext } from "react";
import './Login.css';
import { MdLogin } from "react-icons/md";


import Card from "../../Style/Card/Card";
import { CompanyDetail } from "../../Context/companyDetailContext";
import { ToastContainer } from "react-toastify";

const Login = (props) => {

    const logindet = useContext(CompanyDetail);
    if (!logindet.isloaded) {

        return (
            <Stack sx={{ color: 'grey.500' }} spacing={2} alignItems={"center"} className="spinnerstyle">
                <CircularProgress color="success" size={30}  />
            </Stack>
            )
    }

    return (<div className="displaycontent">
        <ToastContainer position="top-center" theme="colored" containerId="Login" autoClose={50} />
        <Card className="logincard displaycontent">
            <Box component="form" sx={{ '& .MuiTextField-root': { m: 1.5, width: '35ch' } }}>
                <h2 className="logintext">Login</h2>
                <div>
                    <TextField required id="outlined-required" label="User Name" value={logindet.loginuser}
                        onChange={(e) => logindet.setval(e, logindet.setloginuser)}
                        color={logindet.setboxColors(logindet.loginuser, 'color')}
                        error={logindet.setboxColors(logindet.loginuser, 'error')}
                    /></div>
                <TextField required id="outlined-required" label="Password" value={logindet.loginUserPassword} type="password"
                    onChange={(e) => logindet.setval(e, logindet.setloginUserPassword)}
                    color={logindet.setboxColors(logindet.loginUserPassword, 'color')}
                    error={logindet.setboxColors(logindet.loginUserPassword, 'error')}
                />
                <div className="loginbutton">
                    <Button variant="contained" color="success" endIcon={< MdLogin />}
                        onClick={(e) => logindet.loginHandler('login')}

                    >Login</Button>
                </div>
            </Box>
        </Card>

    </div>)
}

export default Login;