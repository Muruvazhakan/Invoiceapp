import React, { useContext, useEffect, useState } from "react";
import {
  FormGroup,
  FormControl,
  TextField,
  Box,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { FaRegIdCard } from "react-icons/fa6";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import { AllState } from "../../../../Context/allStateContext";
import { Stocks } from "../../../../Context/StocksContex";
// import '../YourDetails.css';
import Card from "../../../../Style/Card/Card";

const filter = createFilterOptions();
const InvoiceGenDetails = () => {
  const invoicedet = useContext(AllState);
  const stockdet = useContext(Stocks);
  const [value, setValue] = useState(null);

  const [tit, setit] = useState([]);
  let title;

  useEffect(() => {
    console.log("invoicedet data");
    console.log(invoicedet);
    autocompleTitle();
    // console.log('top100Films');
    // console.log(top100Films);

    // let title =
  }, []);

  const filterProdIdAndGetDesc = (clname) => {
    let filterdata = stockdet.clientList.find((data) => {
      return data.clientName == clname;
    });
    console.log("filterProdIdAndGetDesc");
    console.log(filterdata);
    if (filterdata) {
      invoicedet.setclientPhno(filterdata.clientPhno);
      invoicedet.setclientAdd(filterdata.clientAdd);
      invoicedet.setclientid(filterdata.clientid);
    }
  };
  const autocompleTitle = () => {
    if (stockdet.clientList !== null && stockdet.clientList.length > 0) {
      // console.log('autocompleTitle title');
      let clientName = stockdet.clientList.map((row) => {
        return { clientName: row.clientName };
      });
      // console.log(clientName);
      clientName = [].concat.apply([], clientName);

      setit(clientName);
    }
  };

  const onChangeOnAutoComplete = (event, newValue, type) => {
    // console.log("newValue");
    // console.log(newValue);
    // console.log("event");

    // console.log(event);
    if (newValue && newValue.inputValue) {
      // Create a new value from the user input
      setValue({
        clientName: newValue.inputValue,
      });
      invoicedet.setclientName(newValue.inputValue);
      // filterProdIdAndGetDesc(newValue.inputValue);
    } else {
      if (newValue.clientName != null) {
        setValue(newValue.clientName);
        invoicedet.setclientName(newValue.clientName);
        filterProdIdAndGetDesc(newValue.clientName);
      }
    }
  };

  const filterOptionOnAutoComplete = (options, params) => {
    // console.log("filterOptionOnAutoComplete");
    // console.log(options);

    // let filtered;
    const filtered = filter(options, params);
    // // let filtered;
    const { inputValue } = params;
    // console.log("inputValue");
    // console.log(inputValue);
    // console.log("params");
    // console.log(params);
    // Suggest the creation of a new value
    const isExisting = options.some((option) => inputValue === option.title);
    // console.log(isExisting);
    if (inputValue !== "" && !isExisting) {
      filtered.push({
        inputValue,
        clientName: `Add "${inputValue}"`,
      });
      stockdet.setclientPhno("");
      stockdet.setclientAdd("");
      stockdet.setclientid(null);
    }

    return filtered;
  };

  const getOptionLabelOnAutoComplete = (option) => {
    // Value selected with enter, right from the input
    if (typeof option == "string") {
      return option;
    }
    // Add "xxx" option created dynamically
    if (option.inputValue) {
      return option.inputValue;
    }
    // Regular option
    return option.clientName;
  };

  const renderOptionOnAutoComplete = (props, option) => {
    const { key, ...optionProps } = props;
    return (
      <li key={key} {...optionProps}>
        {option.clientName}
      </li>
    );
  };

  return (
    <>
      <FormGroup>
        <FormControl>
          <Card>
            <h3>Client Details</h3>

            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
            >
              {/* <TextField required id="outlined-required" label="Client Name" value={invoicedet.clientName}
              // onChange={(e)=>invoicedet.setclientName(e.target.value)}
              onChange={(e) => invoicedet.setval(e, invoicedet.setclientName)}
              color={invoicedet.setboxColors(invoicedet.clientName, 'color')}
              error={invoicedet.setboxColors(invoicedet.clientName, 'error')}

            // error={invoicedet.clientName.length ==0?'true':'false'} 
            /> */}

              <Autocomplete
                // value={value}
                value={invoicedet.clientName}
                onChange={(event, newValue) =>
                  onChangeOnAutoComplete(event, newValue)
                }
                filterOptions={(options, params) =>
                  filterOptionOnAutoComplete(options, params)
                }
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text"
                options={tit}
                getOptionLabel={(option) =>
                  getOptionLabelOnAutoComplete(option)
                }
                renderOption={(props, option) =>
                  renderOptionOnAutoComplete(props, option)
                }
                // sx={{ width: 300 }}
                freeSolo
                renderInput={(params) => (
                  // <TextField label="Title" />
                  <TextField
                    required
                    id="outlined-required"
                    label="Client Name"
                    onChange={(e) =>
                      invoicedet.setval(e, invoicedet.setclientName)
                    }
                    color={invoicedet.setboxColors(
                      invoicedet.clientName,
                      "color"
                    )}
                    error={invoicedet.setboxColors(
                      invoicedet.clientName,
                      "error"
                    )}
                    {...params}
                  />
                )}
              />
              <TextField
                id="outlined-required"
                label="Client Phone Number"
                value={invoicedet.clientPhno}
                onChange={(e) => invoicedet.setval(e, invoicedet.setclientPhno)}
                color={invoicedet.setboxColors(invoicedet.clientPhno, "color")}
                //  error={invoicedet.setboxColors(invoicedet.clientPhno,'error')}
              />

              <TextField
                id="outlined-required"
                label="Client Address"
                multiline
                value={invoicedet.clientAdd}
                onChange={(e) => invoicedet.setval(e, invoicedet.setclientAdd)}
                color={invoicedet.setboxColors(invoicedet.clientAdd, "color")}
                //  error={invoicedet.setboxColors(invoicedet.clientAdd,'error')}
              />

              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={invoicedet.displayClientGST}
                      onChange={() =>
                        invoicedet.setdisplayClientGST(
                          !invoicedet.displayClientGST
                        )
                      }
                      name="displayClientGST"
                    />
                  }
                  label="Display Client GST"
                />
              </Box>
              {invoicedet.displayClientGST
                ? "Client GST will display"
                : "Client GST will not display"}
              <TextField
                id="outlined-required"
                label="Client GST"
                value={invoicedet.clientGST}
                onChange={(e) => invoicedet.setval(e, invoicedet.setclientGST)}
                color={invoicedet.setboxColors(invoicedet.clientGST, "color")}
                //  error={invoicedet.setboxColors(invoicedet.clientAdd,'error')}
              />
            </Box>

            <h3>Invoice Details</h3>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "15ch", height: "5ch" },
              }}
            >
              {invoicedet.invoiceid.length == 0 ? (
                <div>
                  <Button
                    className="gen-invoice"
                    variant="outlined"
                    endIcon={<FaRegIdCard />}
                    onClick={invoicedet.dateHandler}
                  >
                    Generate Invoice Id
                  </Button>{" "}
                </div>
              ) : (
                <div className="invoicegen"> Invoice Id Generated</div>
              )}
              Invoice date:
              <input
                type="date"
                className="date-field"
                onChange={(e) =>
                  invoicedet.setval(e, invoicedet.setinvoicedate)
                }
                title="payement"
                size={210}
                id="dateDefault"
                value={invoicedet.invoicedate}
                aria-label="invoice"
              />
              Payment date:
              <input
                type="date"
                className="date-field"
                onChange={(e) =>
                  invoicedet.setval(e, invoicedet.setpaymentdate)
                }
                value={invoicedet.paymentdate}
                title="payement"
                size={210}
              />
              <TextField
                id="outlined-required"
                label="Payment Mode"
                value={invoicedet.paymentmode}
                onChange={(e) =>
                  invoicedet.setval(e, invoicedet.setpaymentmode)
                }
                color={invoicedet.setboxColors(invoicedet.paymentmode, "color")}
                //  error={invoicedet.setboxColors(invoicedet.paymentmode,'error')}
              />
            </Box>
          </Card>
        </FormControl>
      </FormGroup>
    </>
  );
};

export default InvoiceGenDetails;
