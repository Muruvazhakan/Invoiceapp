import React, { useState, useContext, useEffect } from "react";

import { Box, Button, FormControl, FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import Card from "../../../../Style/Card/Card";

import { estimateState } from "../../../../Context/EstimatestateContext";

import './EstimateTableForm.css';

const EstimateTableForm = (props) =>{

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

    return<>
       <Card>
       <ToastContainer position="top-center" theme="colored" />
       <h3>Estimate Data </h3>
       <FormGroup>
        <FormControl>
            <Card>
            <h3>Add Goods details below for Estimation</h3>
            </Card>
        </FormControl>
       </FormGroup>
       </Card>
    </>
}

export default EstimateTableForm;