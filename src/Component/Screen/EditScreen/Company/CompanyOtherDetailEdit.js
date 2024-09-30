
import React, { useContext } from "react";
import { CompanyDetail } from "../../../Context/companyDetailContext";
import './CompanyOtherDetailEdit.css';
import Card from "../../../Style/Card/Card";
import { Box, TextField } from "@mui/material";
const CompanyOtherDetailEdit = () => {

    const companydet = useContext(CompanyDetail);
    return (

        <Card >

            {companydet.companydetails.map((item, index) => {
                return (<Box className=" companyotherdeta "
                    sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} 
                >
                    
                    {item.isvisible === true && <div>
                        <ul className="details" key={index}>
                           {index+1}
                           <li >
                            <TextField id="outlined-required" label="Title"  value={item.title}
                                // onChange={(e) => setval(e, estimateDet.setclientAdd)}
                                // color={setboxColors(estimateDet.clientAdd, 'color')}
                            //  error={setboxColors(estimateDet.clientAdd,'error')} 
                            /> </li>
                        <li>
                            <TextField id="outlined-required" label="Details" multiline value={item.desc}
                                // onChange={(e) => setval(e, estimateDet.setclientAdd)}
                                // color={setboxColors(estimateDet.clientAdd, 'color')}
                            //  error={setboxColors(estimateDet.clientAdd,'error')} 
                            />
                            </li>
                </ul>
                    </div>}

                </Box>
                )
            })}
        </Card>)
}

export default CompanyOtherDetailEdit;