import React, { useContext, useState, useEffect, createContext } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import collect from "collect.js";


export const estimateState = createContext();

const EstimatestateContext = ({ children }) => {
    const [width] = useState(641);

    let columnNames = [{ columnname: 'S.no', display: true }
        , { columnname: 'Description', display: true }
        , { columnname: 'Length', display: true }
        , { columnname: 'Height', display: true }
        , { columnname: 'Area', display: true }
        , { columnname: 'Total sq.ft', display: true }
        , { columnname: 'PVC cost Psf', display: true }
        , { columnname: 'Total PVC Cost', display: true }
        , { columnname: 'UPVC cost Psf', display: true }
        , { columnname: 'Total UPVC Cost', display: true }
        , { columnname: 'Wood cost Psf', display: true }
        , { columnname: 'Total Wood Cost', display: true }
        , { columnname: 'Remarks', display: false }];

    const [columns, setcolumns] = useState(columnNames);

    const [grandtotalpvccost, setgrandtotalpvccost] = useState(0);
    const [grandtotalupvccost, setgrandtotalupvccost] = useState(0);
    const [grandtotalwoodcost, setgrandtotalwoodcost] = useState(0);

    let row = [{
        id: 1123, title: 'MODULAR KITCHEN', values: [{
            subid: 1, desc: '1', length: '1', height: '1', area: '1',
            perqsft: 1, pvccostpsf: 0, totalpvccost: 0, upvccostpsf: 0, totalupvccost: 0, woodcostpsf: 0, totalwoodcost: 0, remarks: ''
        }, {
            subid: 2, desc: '2', length: '1', height: '1', area: '1',
            perqsft: 1, pvccostpsf: 0, totalpvccost: 0, upvccostpsf: 0, totalupvccost: 0, woodcostpsf: 0, totalwoodcost: 0, remarks: ''
        }
        ],
        sumtotalpvscost: 0, sumtotalupvscost: 0, sumtotalwoodcost: 0
    }, {
        title: 'KITCHEN', values: [{
            desc: '2', length: '1', height: '1', area: '1',
            perqsft: 1, pvccostpsf: 0, totalpvccost: 0, upvccostpsf: 0, totalupvccost: 0, woodcostpsf: 0, totalwoodcost: 0, remarks: ''
        }],
        sumtotalpvscost: 0, sumtotalupvscost: 0, sumtotalwoodcost: 0
    }
    ];
    const [rows, setrows] = useState([]);

    const [title, settitle] = useState('tit');
    const [subdesc, setsubdesc] = useState('sub');
    const [length, setlength] = useState(1);
    const [height, setheight] = useState(1);
    const [area, setarea] = useState(1);
    const [perqsft, setperqsft] = useState(1);
    const [pvccostpsf, setpvccostpsf] = useState(0);
    const [totalpvccost, settotalpvccost] = useState(1);
    const [upvccostpsf, setupvccostpsf] = useState(1);
    const [totalupvccost, settotalupvccost] = useState(1);
    const [woodcostpsf, setwoodcostpsf] = useState(1);
    const [totalwoodcost, settotalwoodcost] = useState(1);
    const [remarks, setremarks] = useState('remarks');
    const [granttotalpvccost, setgranttotalpvccost] = useState(0);
    const [granttotalupvccost, setgranttotalupvccost] = useState(0);
    const [granttotalwoodcost, setgranttotalwoodcost] = useState(0);

    const [estimateid, setestimateid] = useState('');
    const [estimateidcount, setestimateidcount] = useState(1000);
    const [estimatedate, setestimatedate] = useState('');

    const [clientName, setclientName] = useState('it');
    const [clientPhno, setclientPhno] = useState('');
    const [clientAdd, setclientAdd] = useState('');

    const editEstimateListRows = (item, subitem, type) => {
        console.log('item edit rows')
        console.log(item)
        console.log(subitem)
    }

    const addOrUpdateEstimateItemHandler = (item, subitem, type) => {
        console.log('item edit rows')
        console.log(type)
        if (type === 'New') {
            const available = rows.filter((item) => {
                return item.title === title;
            });
            console.log('available');
            console.log(available);
            if (available.length > 0) {
                console.log('inside');
               
            } else {
                console.log('not ava');
                let singleestimate = {
                    id: uuidv4(),
                    title: title,
                    sumtotalpvscost: 10, sumtotalupvscost: 10, sumtotalwoodcost: 10,
                    values: [{
                        subid: uuidv4(), desc: subdesc, length: length, height: height, area: area,
                        perqsft: perqsft, pvccostpsf: pvccostpsf, totalpvccost: totalpvccost, upvccostpsf: upvccostpsf, totalupvccost: totalupvccost, woodcostpsf: woodcostpsf, totalwoodcost: totalwoodcost, remarks: remarks
                    }]
                };
                setrows([
                    ...rows,
                    singleestimate
                ]);
                console.log(singleestimate)
                console.log(rows)
            }
        }
    }
    useEffect(()=>{
        console.log('rows')
                console.log(rows)
    },[rows])
    useEffect(() => {
        let ar = length * height;
        let psf = ar / 144;
        setarea(ar);
        setperqsft(psf);
    }, [length, height]);

    useEffect(() => {
        let costpvc = (pvccostpsf * 1) * perqsft;
        settotalpvccost(costpvc);
    }, [perqsft, pvccostpsf]);

    useEffect(() => {
        let costupvc = (upvccostpsf * 1) * perqsft;
        settotalupvccost(costupvc);
    }, [perqsft, upvccostpsf]);

    useEffect(() => {
        let costwood = (woodcostpsf * 1) * perqsft;
        settotalwoodcost(costwood);
    }, [perqsft, woodcostpsf]);

    const estcontext = {
        columns, setcolumns, rows, setrows, estimateidcount, setestimateidcount,
        granttotalpvccost, setgranttotalpvccost, granttotalupvccost, setgranttotalupvccost, granttotalwoodcost, setgranttotalwoodcost,
        clientName, setclientName, clientPhno, setclientPhno, clientAdd, setclientAdd, estimateid, setestimateid, estimatedate, setestimatedate,
        editEstimateListRows, grandtotalupvccost, setgrandtotalupvccost, grandtotalpvccost, setgrandtotalpvccost, grandtotalwoodcost, setgrandtotalwoodcost,
        title, settitle, subdesc, setsubdesc, length, setlength, height, setheight, area, setarea, perqsft, setperqsft,
        pvccostpsf, setpvccostpsf, totalpvccost, settotalpvccost, upvccostpsf, setupvccostpsf, totalupvccost, settotalupvccost, woodcostpsf, setwoodcostpsf, totalwoodcost, settotalwoodcost,
        remarks, setremarks, addOrUpdateEstimateItemHandler
    };


    return <estimateState.Provider value={estcontext} >{children}</estimateState.Provider>
}

export default EstimatestateContext;