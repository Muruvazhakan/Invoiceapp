import React,{useContext} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Table.css';
import { AllState } from "../Context/allStateContext";

const Tables = () =>{

  const tabledetails=useContext(AllState);
    
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
    },{
        sno:3,
        desc:"Description of Goods",
        hsn:"200",
        quantity:20,
        rateoftax:2,
        rate:100,
        per:"PCS",
        disc:"15%",
        amount:"1000"
    }];

    const hsnlist=[{
        sno:1,
        hsn:2000,
        taxableValue:1000,
        centaxrate:10,
        centaxamt:110,
        satetaxrate:10,
        statetaxamt:110,
        totaltaxamt:200
    }]
    return <>
    {/* <Paper sx={{ height: 400, width: '100%' }}>
  <DataGrid
    rows={rows}
    columns={columns}
    initialState={{ pagination: { paginationModel } }}
    pageSizeOptions={[5, 10]}
    checkboxSelection
    sx={{ border: 0 }}
  />
</Paper> */}

    <TableContainer >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        <TableRow className="table-header">
                    <TableCell className="table-header-td">S.No</TableCell>
                    <TableCell className="table-header-td">Description of Goods </TableCell>
                    <TableCell className="table-header-td">HSN/SAC</TableCell>
                     <TableCell className="table-header-td">Quantity</TableCell>
                     <TableCell className="table-header-td">Rate
                    (Incl.of tax)</TableCell>
                     <TableCell className="table-header-td">Rate</TableCell>
                     <TableCell className="table-header-td">per</TableCell>
                     <TableCell className="table-header-td">Disc.%</TableCell>
                     <TableCell className="table-header-td">Amount</TableCell>
                </TableRow>   
        </TableHead>
        <TableBody>
          {tabledetails.list.map((item,index) => {
           
             return (
                <TableRow className= {item.sno%2==0 ? "table-body tablegrey" :  "table-body"} key={item.sno}
                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell align='center'  className="table-header-td">{index+1}</TableCell>
                <TableCell className="table-header-td">{item.desc}</TableCell>
                <TableCell className="table-header-td">{item.hsn}</TableCell>
                <TableCell align='center' className="table-header-td">{item.quantity}</TableCell>
                <TableCell className="table-header-td">{item.rateinctax}</TableCell>
                <TableCell className="table-header-td">{item.rate}</TableCell>
                <TableCell className="table-header-td">{item.per}</TableCell>
                <TableCell className="table-header-td">{item.disc}</TableCell>
                <TableCell className="table-header-td">{item.amount}</TableCell>
           </TableRow>
              )
            
            })}

{/* id:1,
    desc:'',
    hsn:'',
    quantity:0,
    rateinctax:0,
    rate:0,
    per:'',
    disc:1,
    amount:0
     */}
      <TableRow  key="subtotal"
            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell align='center'  className="table-header-td"></TableCell>
            <TableCell className="table-header-td"></TableCell>
            <TableCell className="table-header-td"></TableCell>
            <TableCell align='center' className="table-header-td"></TableCell>
            <TableCell className="table-header-td"></TableCell>
            <TableCell className="table-header-td"></TableCell>
            <TableCell className="table-header-td"></TableCell>
            <TableCell className="table-header-td"></TableCell>
            <TableCell className="table-header-td">{tabledetails.totalsubamt}</TableCell>
       </TableRow>
          {tabledetails.gstCgstitem.map((item) => (
            <TableRow className= {item.sno%2==0 ? "table-body tablegrey" :  "table-body"} key={item.sno}
            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell align='center'  className="table-header-td"></TableCell>
            <TableCell className="table-header-td">{item.desc}</TableCell>
            <TableCell className="table-header-td"></TableCell>
            <TableCell align='center' className="table-header-td"></TableCell>
            <TableCell className="table-header-td"></TableCell>
            <TableCell className="table-header-td"></TableCell>
            <TableCell className="table-header-td"></TableCell>
            <TableCell className="table-header-td"></TableCell>
            <TableCell className="table-header-td">{item.amount}</TableCell>
       </TableRow>
          ))}
           
        </TableBody>
      </Table>
    </TableContainer>
          <div className="tabletotal-final ">
          <div className="tabletotal-final word" >
           Amount Chargeable  (in words):   
          <div className="words">
          {tabledetails.totalamtwords}
          </div>
          </div>
          <div className="tabletotal-final amount ">
          {tabledetails.totalamt}
            </div>
          </div>
         

          <TableContainer >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        <TableRow className="table-header">
                    <TableCell className="table-header-td">S.No</TableCell>
                    <TableCell className="table-header-td">HSN/SAC</TableCell>
                     <TableCell className="table-header-td">Taxable Value </TableCell>
                     <TableCell className="table-header-td">Central Tax Rate  </TableCell>
                     {/* <TableCell className="table-header-td">Rate</TableCell> */}
                     <TableCell className="table-header-td">Central Tax Amount</TableCell>
                   
                    <TableCell className="table-header-td">State Tax Rate  </TableCell>
                    
                     <TableCell className="table-header-td">State Tax Amount</TableCell>
                   
                     <TableCell className="table-header-td">Total Tax Amount</TableCell>
                </TableRow>   
        </TableHead>
        <TableBody>
          {tabledetails.hsnlist.map((item,key) => (
            <TableRow className= {item.sno%2==0 ? "table-body tablegrey" :  "table-body"} key={item.sno}
            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell className="table-header-td">{key+1}</TableCell>
            <TableCell className="table-header-td">{item.hsndesc}</TableCell>
            <TableCell className="table-header-td">{item.taxvalue}</TableCell>
            <TableCell className="table-header-td">{item.ctrate}</TableCell>
            <TableCell className="table-header-td">{item.ctamount}</TableCell>
            <TableCell className="table-header-td">{item.strate}</TableCell>
            <TableCell className="table-header-td">{item.stamount}</TableCell>
            <TableCell className="table-header-td">{item.amount}</TableCell>
       </TableRow>
          ))}
       
        </TableBody>
      </Table>
    </TableContainer>

    <div className="tabletotal-final ">
          <div className="tabletotal-final word" >
           Amount Chargeable  (in words):   
          <div >
          
           </div>
          <div className="words">
            One Thousand
          </div>
          </div>
          <div className="tabletotal-final amount ">
            Total: ₹ 1000
            </div>
          </div>
    </>
}

export default Tables;