import React,{useContext,useState,useEffect, createContext} from "react";
import {  toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import collect from "collect.js";


export const estimateState = createContext();

const EstimatestateContext =({children}) =>{
    const [width] = useState(641);

    let columnNames= [{ columnname:'S.no', display:true}
         ,{columnname:'Description', display:true}
         ,{columnname:'Length', display:true}
         ,{columnname:'Height', display:true}
         ,{columnname:'Area', display:true}
         ,{columnname:'Per sq.ft', display:true}
         ,{columnname:'PVC cost Psf', display:true}
         ,{columnname:'Total PVC Cost', display:true}
         ,{columnname:'UPVC cost Psf', display:true}
         ,{columnname:'Total UPVC Cost', display:true}
         ,{columnname:'Wood cost Psf', display:false}
         ,{columnname:'Total Wood Cost', display:false}
         ,{columnname:'Remarks', display:false}];

    const [columns,setcolumns]=useState(columnNames);

    const [upvcisvisible,setupvcisvisible]=useState(false);
    const [woodisvisible,setwoodsvisible]=useState(false);

    let row=[{title:'MODULAR KITCHEN',values:[{desc:'1', length:'1',height:'1',area:'1',
        perqsft:1,pvccostpsf:0,totalpvccost:0,upvccostpsf:0,totalupvccost:0,woodcostpsf:0,totalwoodcost:0,remarks:''
    },{desc:'2', length:'1',height:'1',area:'1',
        perqsft:1,pvccostpsf:0,totalpvccost:0,upvccostpsf:0,totalupvccost:0,woodcostpsf:0,totalwoodcost:0,remarks:''
    }
],
    sumtotalpvscost:0,sumtotalupvscost:0,sumtotalwoodcost:0
    },{title:'KITCHEN',values:[{desc:'2', length:'1',height:'1',area:'1',
        perqsft:1,pvccostpsf:0,totalpvccost:0,upvccostpsf:0,totalupvccost:0,woodcostpsf:0,totalwoodcost:0,remarks:''
    }],
    sumtotalpvscost:0,sumtotalupvscost:0,sumtotalwoodcost:0
    }
];
    const [rows,setrows]=useState(row);

    const [disc,setdisc]=useState(1);
    const [disctype,setdisctype]=useState('');
    const [granttotalpvccost,setgranttotalpvccost]=useState(0);
    const [granttotalupvccost,setgranttotalupvccost]=useState(0);
    const [granttotalwoodcost,setgranttotalwoodcost]=useState(0);

    const[estimateid,setestimateid]=useState('');
    const[estimateidcount,setestimateidcount]=useState(1000);
    const[estimatedate,setestimatedate]=useState('');

    const[clientName,setclientName]=useState('it');
    const[clientPhno,setclientPhno]=useState('');
    const[clientAdd,setclientAdd]=useState('');

    const estcontext ={columns,setcolumns,rows,setrows,estimateidcount,setestimateidcount,
        disc,setdisc,disctype,setdisctype,granttotalpvccost,setgranttotalpvccost,granttotalupvccost,setgranttotalupvccost,granttotalwoodcost,setgranttotalwoodcost,
        clientName,setclientName,clientPhno,setclientPhno,clientAdd,setclientAdd,estimateid,setestimateid,estimatedate,setestimatedate,upvcisvisible,setupvcisvisible,
        woodisvisible,setwoodsvisible
    };


    return <estimateState.Provider value={estcontext} >{children}</estimateState.Provider>
}

export default EstimatestateContext;