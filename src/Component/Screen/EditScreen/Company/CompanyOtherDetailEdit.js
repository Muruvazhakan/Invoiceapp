
import React, { useContext, useEffect, useState } from "react";
import { CompanyDetail } from "../../../Context/companyDetailContext";
import './CompanyOtherDetailEdit.css';
import Card from "../../../Style/Card/Card";
import { Box, Button, TableCell, TextField } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";

const CompanyOtherDetailEdit = () => {

    const [companydetailtitle, setcompanydetailtitle] = useState(' ');
    const [companydetaildesc, setcompanydetaildesc] = useState(' ');
    const [companydetailid, setcompanydetailid] = useState(null);
 
    const companydet = useContext(CompanyDetail);
  
    // useEffect(() => {
    //     console.log(companydet.companydetails)
    // }, [companydet.companydetails]);

   
    return (

        <Card className="">
            <h2>Terms And Conditions</h2>
            {companydet.companydetails.map((item, index) => {
                return (<Box className="  "
                    sx={{ '& .MuiTextField-root': { m: 2, width: '45ch' } }}
                >

                    {item.isvisible === true && <>
                        <div className=" companyotherdeta companyindex">
                            <div className="companyindex ">
                                {index + 1}</div>

                            <TextField id="outlined-required" label="Title" value={item.title}
                                onChangeCapture={(e) => {
                                    setcompanydetailid(item.id);
                                    setcompanydetailtitle(e.target.value);
                                    companydet.companytitle(item.id,e.target.value,'title');
                                }}
                            />
                            <TextField id="outlined-required" label="Details" multiline value={item.desc}
                                onChange={(e) => {
                                    setcompanydetailid(item.id);
                                    setcompanydetaildesc(e.target.value);
                                    companydet.companytitle(item.id,e.target.value,'desc');
                                }}
                            />

                            {/* <TableCell className="table-edit" onClick={() => companydet.companyOtherDetailHandeler(item.id, companydetailtitle, companydetaildesc, companydetailid, "save")}
                            >

                                <FaRegSave size={20} />

                            </TableCell> */}

                            <TableCell className="table-edit" onClick={() => companydet.companyOtherDetailHandeler(item.id, companydetailtitle, companydetaildesc, companydetailid, "delete")} >

                                <MdDelete size={20} />

                            </TableCell>

                        </div>
                    </>}

                </Box>
                )
            })}

            {/* <h2>Add New Terms And Conditions</h2>
            <TextField id="outlined-required" label="Title" value={companydetailtitle}
                onChange={(e) => {
                    setcompanydetailid(null);
                    setcompanydetailtitle(e.target.value)
                }}
            />

            <TextField id="outlined-required" label="Details" multiline value={companydetaildesc}
             onChange={(e) => {
                setcompanydetailid(null);
                setcompanydetaildesc(e.target.value)
            }}
            
            />

            <Button>Add</Button> */}

        </Card>)
}

export default CompanyOtherDetailEdit;