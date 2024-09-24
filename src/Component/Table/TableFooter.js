import { Table, TableCell, TableContainer } from "@mui/material";
import React from "react";

const TableFooters = () =>{

    return <>
    <div className="words declaration">
         Declaration
    </div >
    <div className="word declarationcon"> We declare that the invoice details are the actual price of the goods</div>
    <div className="sign-content-temp">
    <div className="sign-content">
        <div className="sign-content-company">For company</div>
    </div>
    
    
    <div className=" sign-content sign-content-sign"> Authorised Signature</div>
    </div>
    
    </>
}

export default TableFooters;