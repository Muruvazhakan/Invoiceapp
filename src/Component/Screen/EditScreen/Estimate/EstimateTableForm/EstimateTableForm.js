import React, { useContext } from "react";

import { Box, Button, FormControl, FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { GrClearOption } from "react-icons/gr";
import "react-toastify/dist/ReactToastify.css";
import Card from "../../../../Style/Card/Card";
import { BsSave } from "react-icons/bs";
import { estimateState } from "../../../../Context/EstimatestateContext";
import { FaFileInvoice } from "react-icons/fa";

const EstimateTableForm = (props) => {

    const estdetail = useContext(estimateState);

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

    return <>
        <Card>
            <ToastContainer position="top-center" theme="colored" containerId="EstimateTableForm" />
            <h3>Estimate Data </h3>
            <FormGroup>
                <FormControl>
                    <Card>
                        <h3>Add details below for Estimation</h3>
                        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '20ch' } }}>

                            <TextField required id="outlined-required" label="Item Title" value={estdetail.title}
                                onChange={(e) => setval(e, estdetail.settitle)}
                                color={setboxColors(estdetail.title, 'color')}
                                error={setboxColors(estdetail.title, 'error')}
                            />
                            <h4>Sub Details</h4>
                            <TextField required id="outlined-required" label="Sub description" value={estdetail.subdesc}
                                onChange={(e) => setval(e, estdetail.setsubdesc)}
                                color={setboxColors(estdetail.subdesc, 'color')}
                                error={setboxColors(estdetail.subdesc, 'error')}
                            />
                            <TextField required id="outlined-required" label="Order number" value={estdetail.orderno} type="number"
                                onChange={(e) => setval(e, estdetail.setorderno)}
                                color={setboxColors(estdetail.orderno, 'color')}
                                error={setboxColors(() => estdetail.setisotheritem(!estdetail.isotheritem).orderno, 'error')}
                            />
                            <h4 className="tagline">'Switch to Special item feature to add other than raw material' </h4>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={estdetail.isotheritem}
                                        onChange={estdetail.specialItemHandler}

                                        name="isotheritem" />
                                }
                                label="Special Item"
                            />
                            {estdetail.isotheritem && <>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={estdetail.hideotheritem}
                                            onChange={() => estdetail.sethideotheritem(!estdetail.hideotheritem)}

                                            name="isotheritem" />
                                    }
                                    label="Hide other details"
                                />
                            </>}

                            <h4 className="tagline">{estdetail.isotheritem ? 'Specail Item activated' : null}</h4>
                            <h4 className="tagline">{estdetail.hideotheritem ? 'Length, Height, Area, Total sq.ft will be hidden' : null}</h4>
                            <TextField required id="outlined-required" label="Length" value={estdetail.length} type="number"
                                onChange={(e) => setval(e, estdetail.setlength)}
                                color={setboxColors(estdetail.length, 'color')}
                                error={setboxColors(estdetail.length, 'error')}
                            />
                            <TextField required id="outlined-required" label="Height" value={estdetail.height} type="number"
                                onChange={(e) => setval(e, estdetail.setheight)}
                                color={setboxColors(estdetail.height, 'color')}
                                error={setboxColors(estdetail.height, 'error')}
                            />
                            <TextField required id="outlined-required" label="Area" value={estdetail.area} type="number"
                                // onChange={(e) => setval(e, estdetail.setsubdesc)}
                                disabled
                                color={setboxColors(estdetail.area, 'color')}
                                error={setboxColors(estdetail.area, 'error')}
                            />
                            <TextField required id="outlined-required" label="Total Sq. feet" value={estdetail.perqsft}
                                onChange={(e) => setval(e, estdetail.setperqsft)}

                                color={setboxColors(estdetail.perqsft, 'color')}
                                error={setboxColors(estdetail.perqsft, 'error')}
                            />
                            <TextField required id="outlined-required" label="Pvc cost psf" value={estdetail.pvccostpsf} type="number"
                                onChange={(e) => setval(e, estdetail.setpvccostpsf)}
                                color={setboxColors(estdetail.pvccostpsf, 'color')}
                                error={setboxColors(estdetail.pvccostpsf, 'error')}
                            />
                            <TextField required id="outlined-required" label="Total Pvc cost" value={estdetail.totalpvccost} type="number"
                                onChange={(e) => setval(e, estdetail.settotalpvccost)}

                                color={setboxColors(estdetail.totalpvccost, 'color')}
                                error={setboxColors(estdetail.totalpvccost, 'error')}
                            />
                            <TextField required id="outlined-required" label="Upvc cost psf" value={estdetail.upvccostpsf} type="number"
                                onChange={(e) => setval(e, estdetail.setupvccostpsf)}
                                color={setboxColors(estdetail.upvccostpsf, 'color')}
                                error={setboxColors(estdetail.upvccostpsf, 'error')}
                            />

                            <TextField required id="outlined-required" label="Total Upvc cost" value={estdetail.totalupvccost} type="number"
                                onChange={(e) => setval(e, estdetail.settotalupvccost)}

                                color={setboxColors(estdetail.totalupvccost, 'color')}
                                error={setboxColors(estdetail.totalupvccost, 'error')}
                            />

                            <TextField required id="outlined-required" label="Wood cost psf" value={estdetail.woodcostpsf} type="number"
                                onChange={(e) => setval(e, estdetail.setwoodcostpsf)}
                                color={setboxColors(estdetail.woodcostpsf, 'color')}
                                error={setboxColors(estdetail.woodcostpsf, 'error')}
                            />

                            <TextField required id="outlined-required" label="Total Wood cost" value={estdetail.totalwoodcost} type="number"
                                onChange={(e) => setval(e, estdetail.settotalwoodcost)}

                                color={setboxColors(estdetail.totalwoodcost, 'color')}
                                error={setboxColors(estdetail.totalwoodcost, 'error')}
                            />
                            <TextField id="outlined-required" label="Remarks" value={estdetail.remarks}
                                onChange={(e) => setval(e, estdetail.setremarks)}
                                color={setboxColors(estdetail.remarks, 'color')}
                            // error={setboxColors(estdetail.remarks, 'error')}
                            />

                            <div className="button-warn">
                                {estdetail.isNewDataSaveType ? <>
                                    <Button variant="contained" color="success" size="medium" endIcon={<BsSave />}
                                        onClick={() => estdetail.addOrUpdateEstimateItemHandler('', '', 'New')}>Add Item</Button>
                                </>
                                    :
                                    <>


                                        <Button variant="contained" color="success" size="medium" endIcon={<BsSave />}
                                            onClick={() => estdetail.addOrUpdateEstimateItemHandler('', '', 'Cancelupdate')}>Cancel Update</Button>
                                    </>
                                }
                            </div>


                        </Box>
                    </Card>

                    <Card>
                        <h3>Add details below for Estimation</h3>
                        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '15ch' } }}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={estdetail.columns[6].display}
                                        onChange={() => estdetail.updateTableView('pvc')}
                                        //   onChange={() => tabledet.setischargedinhsn(!tabledet.ischargedinhsn)} 
                                        name="includePVC" />
                                }
                                label="Can include PVC"
                            />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={estdetail.columns[8].display}
                                        onChange={() => estdetail.updateTableView('upvc')}
                                        //  checked={tabledet.ischargedinhsn} onChange={() => tabledet.setischargedinhsn(!tabledet.ischargedinhsn)} 
                                        name="includeUPVC" />
                                }
                                label="Can include UPVC"
                            />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={estdetail.columns[10].display}
                                        onChange={() => estdetail.updateTableView('wood')}
                                        name="includewood" />
                                }
                                label="Can include wood"
                            />
                            <div className="companyname tagline ">
                                <div>
                                    {!estdetail.columns[6].display && <> " PVC cost Psf & Total PVC Cost colums will not be visible "</>}</div>
                                <div> {!estdetail.columns[8].display && <> "UPVC cost Psf & Total UPVC Cost colums will not be visible"</>}</div>
                                <div>  {!estdetail.columns[10].display && <>"Wood cost Psf & Total Wood Cost colums will not be visible"</>}</div>
                            </div>
                            {/* <div className="button-warn">
                                <Button variant="contained" color="success" size="medium" onClick={() => estdetail.addOrUpdateEstimateItemHandler('', '', 'New')}>Update Table</Button>

                            </div> */}
                        </Box>
                    </Card>

                    <div className="button-warn buttonspace">
                      
                        <Button variant="contained" color="success" size="medium" endIcon={<FaFileInvoice />}
                            onClick={() => estdetail.addOrGetEstimateHistoryData('', '', 'New')}>Save Complete Estimate</Button>

                        {estdetail.estimateid.length === 0 && <div className="displaysmalldata"> Estimate Id is not generates</div>}

                    </div>
                    <div className="button-warn buttonspace">
                      
                      <Button variant="contained" color="warning" size="medium" endIcon={<GrClearOption />}
                          onClick={() => estdetail.cleartallEstimateotal()}>Reset Estimate Screen</Button>
                  </div>
                </FormControl>
            </FormGroup>
        </Card>
    </>
}

export default EstimateTableForm;