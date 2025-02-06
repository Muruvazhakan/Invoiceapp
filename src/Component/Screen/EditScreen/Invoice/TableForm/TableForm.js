import React, { useContext, useEffect, useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import { GrClearOption } from "react-icons/gr";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa";
import { BsSave } from "react-icons/bs";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import "react-toastify/dist/ReactToastify.css";
import Card from "../../../../Style/Card/Card";
import { AllState } from "../../../../Context/allStateContext";
import { Stocks } from "../../../../Context/StocksContex";
import "./TableForm.css";

const filter = createFilterOptions();
const TableForm = (props) => {
  // const [singleDesc, setSingleDesc] = useState();
  const tabledet = useContext(AllState);
  const stockedet = useContext(Stocks);
  const [value, setValue] = useState(null);
  const [isbuttonClicked, setisbuttonClicked] = useState(false);

  const [tit, setit] = useState([]);
  useEffect(() => {
    console.log("tabledet TableForm");
    console.log(tabledet);
    autocompleTitle();
    // console.log('top100Films');
    // console.log(top100Films);

    // let title =
  }, [tabledet, stockedet]);

  const filterProdIdAndGetDesc = (prodid) => {
    let filterdata = stockedet.allStockData.find((data) => {
      return data.productid == prodid;
    });
    console.log("filterdata");
    // console.log('top100Films');
    console.log(filterdata);
    if (filterdata) {
      tabledet.setdesc(filterdata.desc);
      tabledet.setavailablestock(filterdata.quantity);
      tabledet.sethsn(filterdata.hsn);
      tabledet.setrateinctax(filterdata.salerate);
    }
  };
  const autocompleTitle = () => {
    if (stockedet.allStockData !== null && stockedet.allStockData.length > 0) {
      // console.log('autocompleTitle title');
      let productid = stockedet.allStockData.map((row) => {
        return { productid: row.productid };
      });
      // console.log(productid);
      productid = [].concat.apply([], productid);
      // console.log(productid);
      // var distinct = [];
      // const unique = [...new Set(productid.map((item) => item))];
      // const ti = unique.map((allrows) => { return { productid: allrows } });

      // tabledet.setproductIdList(productid);

      // console.log(productid);
      // console.log('unique');

      setit(productid);
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
        productid: newValue.inputValue,
      });
      tabledet.setproductid(newValue.inputValue);
      // filterProdIdAndGetDesc(newValue.inputValue);
    } else {
      if (newValue.productid != null) {
        setValue(newValue.productid);
        tabledet.setproductid(newValue.productid);
        filterProdIdAndGetDesc(newValue.productid);
      }
    }
  };

  const filterOptionOnAutoComplete = (options, params) => {
    const filtered = filter(options, params);
    // // let filtered;
    const { inputValue } = params;
    // Suggest the creation of a new value
    const isExisting = options.some((option) => inputValue === option.title);
    // console.log(isExisting);
    if (inputValue !== "" && !isExisting) {
      filtered.push({
        inputValue,
        productid: `Add "${inputValue}"`,
      });
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
    return option.productid;
  };

  const renderOptionOnAutoComplete = (props, option) => {
    const { key, ...optionProps } = props;
    return (
      <li key={key} {...optionProps}>
        {option.productid}
      </li>
    );
  };

  const onSaveHander = async () => {
    setisbuttonClicked(true);
    if (props.isEstimate) tabledet.saveEstimateInvoice();
    else stockedet.saveInvoiceFromStock();

    setTimeout(() => {
      setisbuttonClicked(false);
    }, [5000]);
  };

  return (
    <>
      <Card>
        <ToastContainer
          position="top-center"
          theme="colored"
          containerId="Invoice"
        />
        <h3>Invoice Data</h3>
        <FormGroup>
          <FormControl>
            <Card>
              <h3>HSN Tax Rate</h3>
              <Box
                component="form"
                sx={{ "& .MuiTextField-root": { m: 1, width: "20ch" } }}
              >
                <TextField
                  required
                  id="outlined-required"
                  label="Central Tax Rate %"
                  value={tabledet.ctrate}
                  type="number"
                  onChange={(e) => tabledet.setval(e, tabledet.setctrate)}
                  color={tabledet.setboxColors(tabledet.ctrate, "color")}
                  error={tabledet.setboxColors(tabledet.ctrate, "error")}
                />

                <TextField
                  required
                  id="outlined-required"
                  label="State Tax Rate %"
                  value={tabledet.strate}
                  type="number"
                  onChange={(e) => tabledet.setval(e, tabledet.setstrate)}
                  color={tabledet.setboxColors(tabledet.strate, "color")}
                  error={tabledet.setboxColors(tabledet.strate, "error")}
                />
              </Box>

              <h3>Add Goods details below</h3>
              <Box
                component="form"
                sx={{ "& .MuiTextField-root": { m: 1, width: "20ch" } }}
              >
                <Autocomplete
                  // value={value}
                  value={tabledet.productid}
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
                  disabled={tabledet.isEditInvoice && tabledet.invoiceid !== ""}
                  renderInput={(params) => (
                    // <TextField label="Title" />
                    <TextField
                      required
                      id="outlined-required"
                      label="Product Id"
                      onChange={(e) =>
                        tabledet.setval(e, tabledet.setproductid)
                      }
                      color={tabledet.setboxColors(tabledet.productid, "color")}
                      error={tabledet.setboxColors(tabledet.productid, "error")}
                      {...params}
                    />
                  )}
                />

                <TextField
                  required
                  id="outlined-required"
                  label="Item description"
                  value={tabledet.desc}
                  onChange={(e) => tabledet.setval(e, tabledet.setdesc)}
                  color={tabledet.setboxColors(tabledet.desc, "color")}
                  error={tabledet.setboxColors(tabledet.desc, "error")}
                />

                <TextField
                  required
                  id="outlined-required"
                  label="HSN"
                  value={tabledet.hsn}
                  onChange={(e) => tabledet.setval(e, tabledet.sethsn)}
                  color={tabledet.setboxColors(tabledet.hsn, "color")}
                  error={tabledet.setboxColors(tabledet.hsn, "error")}
                />

                <TextField
                  id="outlined-required"
                  label="Available Quantity"
                  value={tabledet.availablestock}
                  type="number"
                  // onChange={(e) => tabledet.setval(e, tabledet.setavailablestock)}
                  disabled
                  color={tabledet.setboxColors(
                    tabledet.availablestock,
                    "color"
                  )}
                  error={tabledet.setboxColors(
                    tabledet.availablestock,
                    "error"
                  )}
                />

                <TextField
                  required
                  id="outlined-required"
                  label="Quantity"
                  value={tabledet.quantity}
                  type="number"
                  onChange={(e) => tabledet.setval(e, tabledet.setquantity)}
                  color={tabledet.setboxColors(tabledet.quantity, "color")}
                  error={tabledet.setboxColors(tabledet.quantity, "error")}
                />

                <TextField
                  required
                  id="outlined-required"
                  label="Rate inc Tax"
                  value={tabledet.rateinctax}
                  type="number"
                  onChange={(e) => tabledet.setval(e, tabledet.setrateinctax)}
                  color={tabledet.setboxColors(tabledet.rateinctax, "color")}
                  error={tabledet.setboxColors(tabledet.rateinctax, "error")}
                />

                <TextField
                  required
                  id="outlined-required"
                  label="Rate"
                  value={tabledet.rate}
                  type="number"
                  onChange={(e) => tabledet.setval(e, tabledet.setrate)}
                  color={tabledet.setboxColors(tabledet.rate, "color")}
                  error={tabledet.setboxColors(tabledet.rate, "error")}
                />

                {/* <TextField required id="outlined-required" label="Per" value={tabledet.per}
                                onChange={(e) => tabledet.setval(e, tabledet.setper)}
                                color={tabledet.setboxColors(tabledet.per, 'color')}
                                error={tabledet.setboxColors(tabledet.per, 'error')}
                            /> */}

                <TextField
                  id="outlined-required"
                  label="Discount"
                  value={tabledet.disc}
                  type="number"
                  onChange={(e) => tabledet.setval(e, tabledet.setdisc)}
                  color={tabledet.setboxColors(tabledet.disc, "color")}
                  error={tabledet.setboxColors(tabledet.disc, "error")}
                />

                <TextField
                  required
                  id="outlined-required"
                  label="Amount"
                  value={tabledet.amount}
                  type="number"
                  onChange={(e) => tabledet.setval(e, tabledet.setamount)}
                  color={tabledet.setboxColors(tabledet.amount, "color")}
                  error={tabledet.setboxColors(tabledet.amount, "error")}
                />

                <div>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={tabledet.cleardetailoption}
                        onChange={() =>
                          tabledet.setcleardetailoption(
                            !tabledet.cleardetailoption
                          )
                        }
                        name="Othercharges"
                      />
                    }
                    label="Clear Form Details?"
                  />

                  {tabledet.cleardetailoption ? (
                    <div className="notcharge">
                      {" "}
                      "Form will be cleared after adding"{" "}
                    </div>
                  ) : (
                    "This section is to avoid the clearing the details in the form"
                  )}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={tabledet.gstincluded}
                        onChange={() =>
                          tabledet.setgstincluded(!tabledet.gstincluded)
                        }
                        name="gstaddeditem"
                      />
                    }
                    label="GST added Item"
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={tabledet.displayhsntable}
                        onChange={() =>
                          tabledet.setdisplayhsntable(!tabledet.displayhsntable)
                        }
                        name="displayhsntable"
                      />
                    }
                    label="Display HSN Table"
                  />
                </div>

                <div className="button-warn">
                  <Button
                    variant="contained"
                    color="success"
                    size="medium"
                    endIcon={<BsSave />}
                    onClick={() => tabledet.addOrUpdateItemHandler("Add")}
                  >
                    Add Item
                  </Button>
                </div>
                <Button
                  variant="contained"
                  color="warning"
                  size="medium"
                  endIcon={<GrClearOption />}
                  onClick={() => tabledet.clearlistcontent()}
                >
                  Clear Form
                </Button>
              </Box>
              <h3>Value in Words</h3>
              <Box
                component="form"
                sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
              >
                <TextField
                  required
                  id="outlined-required"
                  label="Total Amount Chargeable"
                  value={tabledet.totalamtwords}
                  onChange={(e) =>
                    tabledet.setval(e, tabledet.settotalamtwords)
                  }
                  color={tabledet.setboxColors(tabledet.totalamtwords, "color")}
                  error={tabledet.setboxColors(tabledet.totalamtwords, "error")}
                />

                <TextField
                  required
                  id="outlined-required"
                  label="Total Tax Amount"
                  value={tabledet.totalhsnamtwords}
                  onChange={(e) =>
                    tabledet.setval(e, tabledet.settotalhsnamtwords)
                  }
                  color={tabledet.setboxColors(
                    tabledet.totalhsnamtwords,
                    "color"
                  )}
                  error={tabledet.setboxColors(
                    tabledet.totalhsnamtwords,
                    "error"
                  )}
                />

                <div className="button-warn">
                  <Button
                    variant="contained"
                    color="success"
                    size="medium"
                    endIcon={<FaFileInvoice />}
                    disabled={isbuttonClicked}
                    onClick={onSaveHander}
                  >
                    {props.isEstimate ? "Save Estimate" : "Save Invoice"}
                  </Button>
                </div>

                <div className="button-warn buttonspace">
                  <Button
                    variant="contained"
                    color="warning"
                    size="medium"
                    endIcon={<GrClearOption />}
                    onClick={tabledet.cleartallInvoice}
                  >
                    {" "}
                    Reset Invoice Screen
                  </Button>
                </div>
              </Box>
            </Card>
            <Card>
              <h3>Other items need to add?</h3>

              <Box
                component="form"
                sx={{ "& .MuiTextField-root": { m: 1, width: "20ch" } }}
              >
                <div>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={tabledet.isinstallationcharge}
                        onChange={() =>
                          tabledet.setisinstallationcharge(
                            !tabledet.isinstallationcharge
                          )
                        }
                        name="Othercharges"
                      />
                    }
                    label="Add Other charges?"
                  />
                  This section is to add Installation or Labour or Other charge
                  which will not be add Quantity, Rate, PCS, Discount
                </div>
                {tabledet.isinstallationcharge && (
                  <>
                    <TextField
                      required
                      id="outlined-required"
                      label="Other item Description"
                      value={tabledet.otherdesc}
                      onChange={(e) =>
                        tabledet.setval(e, tabledet.setotherdesc)
                      }
                      color={tabledet.setboxColors(tabledet.otherdesc, "color")}
                      error={tabledet.setboxColors(tabledet.otherdesc, "error")}
                    />

                    <TextField
                      required
                      id="outlined-required"
                      label="Other item Chargeable"
                      value={tabledet.otherdescamt}
                      type="number"
                      onChange={(e) =>
                        tabledet.setval(e, tabledet.setotherdescamt)
                      }
                      color={tabledet.setboxColors(
                        tabledet.otherdescamt,
                        "color"
                      )}
                      error={tabledet.setboxColors(
                        tabledet.otherdescamt,
                        "error"
                      )}
                    />

                    <FormControlLabel
                      control={
                        <Switch
                          checked={tabledet.ischargedinhsn}
                          onChange={() =>
                            tabledet.setischargedinhsn(!tabledet.ischargedinhsn)
                          }
                          name="includehsn"
                        />
                      }
                      label="Can include in HSN/Tax"
                    />
                    {!tabledet.ischargedinhsn && (
                      <div className="notcharge">
                        Items will not be added in the Tax List
                      </div>
                    )}

                    {tabledet.cleardetailoption ? (
                      <div className="notcharge">
                        {" "}
                        "Form will be cleared after adding"{" "}
                      </div>
                    ) : null}
                    <div className="button-warn">
                      <Button
                        variant="outlined"
                        color="success"
                        size="medium"
                        endIcon={<MdOutlineAddToPhotos />}
                        onClick={tabledet.addOtherItems}
                      >
                        Add Other Item
                      </Button>
                    </div>
                    <Button
                      variant="outlined"
                      color="warning"
                      size="medium"
                      endIcon={<GrClearOption />}
                      onClick={tabledet.clearOtherDetails}
                    >
                      Clear Form
                    </Button>
                  </>
                )}
              </Box>
            </Card>
          </FormControl>
        </FormGroup>
      </Card>
    </>
  );
};

export default TableForm;
