
import React, { useContext } from "react";
import { CompanyDetail } from "../../../Context/companyDetailContext";
import './CompanyOtherDetailEdit.css';
import Card from "../../../Style/Card/Card";
import { Box, Button, TextField } from "@mui/material";
import { MdDeleteForever,MdOutlineSaveAlt } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import * as localstorage from "../../../Context/localStorageData";
const CompanyOtherDetailEdit = () => {


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

                                    companydet.companytitle(item.id, e.target.value, 'title');
                                }}
                            />
                            <TextField id="outlined-required" label="Details" multiline value={item.desc}
                                onChange={(e) => {

                                    companydet.companytitle(item.id, e.target.value, 'desc');
                                }}
                            />

                            {/* <TableCell className="table-edit" onClick={() => companydet.companyOtherDetailHandeler(item.id, companydetailtitle, companydetaildesc, companydetailid, "save")}
                            >

                                <FaRegSave size={20} />

                            </TableCell> */}
                            <Button variant="contained" color="error" endIcon={<MdDeleteForever />}
                                onClick={() => companydet.companyOtherDetailHandeler(item.id, "delete")} >
                                Delete
                            </Button>



                        </div>
                    </>}

                </Box>
                )
            })}
            {/* <h5>
                System will automatically update while editing...
            </h5> */}
            <Button variant="contained" color="info" endIcon={<MdOutlineSaveAlt />}
                onClick={() => localstorage.addOrUpdateCompanyTermsAndConditionHandler(companydet.companydetails, "save")} >
                Save the Changes
            </Button>
            <Card >
                <h2 >Add New Terms And Conditions</h2>
                <Box component="form" sx={{ '& .MuiTextField-root': { m: 2, width: '35ch' } }}>
                    <div className=" companyotherdeta companyindex">
                        <TextField id="outlined-required" label="Title" value={companydet.companydetailtitle}
                            onChange={(e) => {

                                companydet.setcompanydetailtitle(e.target.value)
                            }}
                        />

                        <TextField id="outlined-required" label="Details" multiline value={companydet.companydetaildesc}
                            onChange={(e) => {

                                companydet.setcompanydetaildesc(e.target.value)
                            }}

                        />

                        <Button variant="contained" color="success" endIcon={<FaRegSave />}
                            onClick={() => companydet.companyOtherDetailHandeler('', "new")} >
                            Save
                        </Button>

                    </div>
                </Box>
            </Card>
        </Card>)
}

export default CompanyOtherDetailEdit;