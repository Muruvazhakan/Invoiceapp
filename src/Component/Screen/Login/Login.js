import {
  Box,
  Button,
  CircularProgress,
  OutlinedInput,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useContext, useState } from "react";
import "./Login.css";
import { MdLogin } from "react-icons/md";

import Card from "../../Style/Card/Card";
import { CompanyDetail } from "../../Context/companyDetailContext";
import { ToastContainer } from "react-toastify";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
const Login = (props) => {
  const logindet = useContext(CompanyDetail);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  if (!logindet.isloaded) {
    return (
      <Stack
        sx={{ color: "grey.500" }}
        spacing={2}
        alignItems={"center"}
        className="spinnerstyle"
      >
        <CircularProgress color="success" size={30} />
      </Stack>
    );
  }

  return (
    <Box className="displaycontent">
      <ToastContainer
        position="top-center"
        theme="colored"
        containerId="Login"
        autoClose={50}
      />
      <Card className="logincard displaycontent">
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1.5, width: "35ch" } }}
        >
          <h2 className="logintext">Login</h2>
          <div>
            <TextField
              required
              id="outlined-required"
              label="User Name"
              value={logindet.loginuser}
              onChange={(e) => logindet.setval(e, logindet.setloginuser)}
              color={logindet.setboxColors(logindet.loginuser, "color")}
              error={logindet.setboxColors(logindet.loginuser, "error")}
            />
          </div>

          <FormControl sx={{ m: 1.5, width: "35ch" }} variant="outlined">
            <InputLabel required htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              required
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={(e) =>
                logindet.setval(e, logindet.setloginUserPassword)
              }
              value={logindet.loginUserPassword}
              color={logindet.setboxColors(logindet.loginUserPassword, "color")}
              error={logindet.setboxColors(logindet.loginUserPassword, "error")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    // onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <div className="loginbutton">
            <Button
              variant="contained"
              color="success"
              endIcon={<MdLogin />}
              onClick={(e) => logindet.loginHandler("login")}
            >
              Login
            </Button>
          </div>
        </Box>
      </Card>
    </Box>
  );
};

export default Login;
