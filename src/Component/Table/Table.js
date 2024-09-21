import React from "react";

import './Table.css';
const Table = () =>{

    const list=[{
        sno:1,
        desc:"Description of Goods",
        hsn:"200",
        quantity:20,
        rateoftax:2,
        rate:100,
        per:"PCS",
        disc:"15%",
        amount:"1000"
    },{
        sno:2,
        desc:"Description of Goods",
        hsn:"200",
        quantity:20,
        rateoftax:2,
        rate:100,
        per:"PCS",
        disc:"15%",
        amount:"1000"
    }];
    return <>
        <table width="98%" className="mb-10">
            <thead >
                <tr className="table-header">
                    <td className="table-header-td">S.No</td>
                    <td className="table-header-td">Description of Goods </td>
                    <td className="table-header-td">HSN/SAC</td>
                     <td className="table-header-td">Quantity</td>
                     <td className="table-header-td">Rate
                    (Incl.of tax)</td>
                     <td className="table-header-td">Rate</td>
                     <td className="table-header-td">per</td>
                     <td className="table-header-td">Disc.%</td>
                     <td className="table-header-td">Amount</td>
                </tr>         
            </thead>
            
            <>
            {list.map((item,id) =>(
                 <tbody >
                 <tr className= {item.sno%2==0 ? "table-body tablegrey" :  "table-body"}>
                      <td className="table-header-td">{item.sno}</td>
                      <td className="table-header-td">{item.desc}</td>
                      <td className="table-header-td">{item.hsn}</td>
                      <td className="table-header-td">{item.quantity}</td>
                      <td className="table-header-td">{item.rateoftax}</td>
                      <td className="table-header-td">{item.rate}</td>
                      <td className="table-header-td">{item.per}</td>
                      <td className="table-header-td">{item.disc}</td>
                      <td className="table-header-td">{item.amount}</td>
                 </tr>
             </tbody>
            ))   
            }
            </>
        </table>
    </>
}

export default Table;