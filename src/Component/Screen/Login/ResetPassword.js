import {
  Box,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  FormControl,
  OutlinedInput,
  InputLabel,
} from "@mui/material";
import React, { useContext, useState } from "react";
import "./Login.css";
import { MdLockReset } from "react-icons/md";
import Card from "../../Style/Card/Card";
import { CompanyDetail } from "../../Context/companyDetailContext";
import { ToastContainer } from "react-toastify";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
const ResetPassword = (props) => {
  const logindet = useContext(CompanyDetail);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box className="displaycontent">
      <ToastContainer
        position="top-center"
        theme="colored"
        containerId="Signin"
        autoClose={1000}
      />
      <Card className="logincard displaycontent">
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1.5, width: "35ch" } }}
        >
          <h2 className="resetlogintext">Reset Password</h2>
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
          <TextField
            required
            id="outlined-required"
            label="Password"
            value={logindet.loginUserPassword}
            type="password"
            onChange={(e) => logindet.setval(e, logindet.setloginUserPassword)}
            color={logindet.setboxColors(logindet.loginUserPassword, "color")}
            error={logindet.setboxColors(logindet.loginUserPassword, "error")}
          />
          <div>
            <FormControl sx={{ m: 1.5, width: "35ch" }} variant="outlined">
              <InputLabel required htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                required
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(e) =>
                  logindet.setval(e, logindet.setloginUserConfirmPassword)
                }
                value={logindet.loginUserConfirmPassword}
                color={logindet.setboxColors(
                  logindet.loginUserConfirmPassword,
                  "color"
                )}
                error={logindet.setboxColors(
                  logindet.loginUserConfirmPassword,
                  "error"
                )}
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
                label="Confirm Password"
              />
            </FormControl>
          </div>
          <TextField
            required
            id="outlined-required"
            label="Token id"
            value={logindet.tokenid}
            onChange={(e) => logindet.setval(e, logindet.settokenid)}
            color={logindet.setboxColors(logindet.tokenid, "color")}
            error={logindet.setboxColors(logindet.tokenid, "error")}
          />

          {/* <TextField required id="outlined-required" label="Role" value={logindet.type}
                    onChange={(e) => logindet.setval(e, logindet.setrole)}
                    color={logindet.setboxColors(logindet.role, 'color')}
                    error={logindet.setboxColors(logindet.role, 'error')}
                /> */}

          <div className="loginbutton">
            <Button
              variant="contained"
              color="success"
              endIcon={<MdLockReset />}
              onClick={(e) => logindet.loginHandler("reset")}
            >
              Reset Password
            </Button>
          </div>
        </Box>
      </Card>
    </Box>
  );
};

export default ResetPassword;
