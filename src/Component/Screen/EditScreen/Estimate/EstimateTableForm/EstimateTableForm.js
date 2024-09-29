import React, { useState, useContext, useEffect } from "react";

import { Box, Button, FormControl, FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import Card from "../../../../Style/Card/Card";

import { estimateState } from "../../../../Context/EstimatestateContext";

import './EstimateTableForm.css';

const EstimateTableForm = (props) => {

    const estdetail = useContext(estimateState);

    const setval = (e, fun) => {
        fun(e.target.value);
    }

    const setboxColors = (item, field) => {
        if (field == 'color') {
            return item.length == 0 || item == 0 ? 'error' : 'success';
        }

        else {
            return item.length == 0 || item == 0 ? true : false;
        }

    }

    return <>
        <Card>
            <ToastContainer position="top-center" theme="colored" />
            <h3>Estimate Data </h3>
            <FormGroup>
                <FormControl>
                    <Card>
                        <h3>Add details below for Estimation</h3>
                        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '15ch' } }}>

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
                            <TextField required id="outlined-required" label="Length" value={estdetail.length}
                                onChange={(e) => setval(e, estdetail.setlength)}
                                color={setboxColors(estdetail.length, 'color')}
                                error={setboxColors(estdetail.length, 'error')}
                            />
                            <TextField required id="outlined-required" label="Height" value={estdetail.height}
                                onChange={(e) => setval(e, estdetail.setheight)}
                                color={setboxColors(estdetail.height, 'color')}
                                error={setboxColors(estdetail.height, 'error')}
                            />
                            <TextField required id="outlined-required" label="Area" value={estdetail.area}
                                // onChange={(e) => setval(e, estdetail.setsubdesc)}
                                disabled
                                color={setboxColors(estdetail.area, 'color')}
                                error={setboxColors(estdetail.area, 'error')}
                            />
                            <TextField required id="outlined-required" label="Total Sq. feet" value={estdetail.perqsft}
                                // onChange={(e) => setval(e, estdetail.setsubdesc)}
                                disabled
                                color={setboxColors(estdetail.perqsft, 'color')}
                                error={setboxColors(estdetail.perqsft, 'error')}
                            />
                            <TextField required id="outlined-required" label="Pvc cost psf" value={estdetail.pvccostpsf}
                                onChange={(e) => setval(e, estdetail.setpvccostpsf)}
                                color={setboxColors(estdetail.pvccostpsf, 'color')}
                                error={setboxColors(estdetail.pvccostpsf, 'error')}
                            />
                            <TextField required id="outlined-required" label="Total Pvc cost" value={estdetail.totalpvccost}
                                // onChange={(e) => setval(e, estdetail.setsubdesc)}
                                disabled
                                color={setboxColors(estdetail.totalpvccost, 'color')}
                                error={setboxColors(estdetail.totalpvccost, 'error')}
                            />
                            <TextField required id="outlined-required" label="Upvc cost psf" value={estdetail.upvccostpsf}
                                onChange={(e) => setval(e, estdetail.setupvccostpsf)}
                                color={setboxColors(estdetail.upvccostpsf, 'color')}
                                error={setboxColors(estdetail.upvccostpsf, 'error')}
                            />

                            <TextField required id="outlined-required" label="Total Upvc cost" value={estdetail.totalupvccost}
                                // onChange={(e) => setval(e, estdetail.setsubdesc)}
                                disabled
                                color={setboxColors(estdetail.totalupvccost, 'color')}
                                error={setboxColors(estdetail.totalupvccost, 'error')}
                            />

                            <TextField required id="outlined-required" label="Wood cost psf" value={estdetail.woodcostpsf}
                                onChange={(e) => setval(e, estdetail.setwoodcostpsf)}
                                color={setboxColors(estdetail.woodcostpsf, 'color')}
                                error={setboxColors(estdetail.woodcostpsf, 'error')}
                            />

                            <TextField required id="outlined-required" label="Total Wood cost" value={estdetail.totalwoodcost}
                                // onChange={(e) => setval(e, estdetail.setsubdesc)}
                                disabled
                                color={setboxColors(estdetail.totalwoodcost, 'color')}
                                error={setboxColors(estdetail.totalwoodcost, 'error')}
                            />
                            <TextField  id="outlined-required" label="Remarks" value={estdetail.remarks}
                                onChange={(e) => setval(e, estdetail.setremarks)}
                                color={setboxColors(estdetail.remarks, 'color')}
                                // error={setboxColors(estdetail.remarks, 'error')}
                            />
                            <div className="button-warn">
                                <Button variant="contained" color="success" size="medium" onClick={() => estdetail.addOrUpdateEstimateItemHandler('','','New')}>Add Item</Button>

                            </div>


                        </Box>
                    </Card>
                </FormControl>
            </FormGroup>
        </Card>
    </>
}

export default EstimateTableForm;