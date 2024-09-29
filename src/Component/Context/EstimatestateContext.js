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
    const [pvccostpsf, setpvccostpsf] = useState(10);
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

    const addOrUpdateEstimateItemHandler = (inputitem, inputsubitem, type) => {
        //console.log('item edit rows')
        //console.log(type);

        if (type === 'New') {
            const available = rows.filter((item) => {
                return item.title === title;
            });
            const other = rows.filter((item) => {
                return item.title !== title;
            });
            //console.log('available');
            //console.log(available);
            //console.log('other');
            //console.log(other);
            if (available.length > 0) {
                // console.log(available[0]);         
                let exitsingleestimatevalue1 = {
                    subid: uuidv4(), desc: subdesc, length: length, height: height, area: area,
                    perqsft: perqsft, pvccostpsf: pvccostpsf, totalpvccost: totalpvccost, upvccostpsf: upvccostpsf, totalupvccost: totalupvccost, woodcostpsf: woodcostpsf, totalwoodcost: totalwoodcost, remarks: remarks
                };

                available[0] = {
                    id: available[0].id,
                    title: title,
                    sumtotalpvccost: calculatetotal(available[0].sumtotalpvccost, totalpvccost, 'sum'),
                    sumtotalupvccost: calculatetotal(available[0].sumtotalupvccost, totalupvccost, 'sum'),
                    sumtotalwoodcost: calculatetotal(available[0].sumtotalwoodcost, totalwoodcost, 'sum'),
                    values: [...available[0].values, exitsingleestimatevalue1]
                };

                // console.log('exitsingleestimatevalue2');
                // console.log(available);
                // available[0].values = values+ exitsingleestimatevalue;
                // console.log(available);
                if (other.length > 0) {
                    setrows([
                        ...other,
                        available[0]
                    ]);
                } else {
                    setrows([
                        available[0]
                    ]);
                }

            }
            else {
                // console.log('not ava');
                let singleestimate = {
                    id: uuidv4(),
                    title: title,
                    sumtotalpvccost: totalpvccost, sumtotalupvccost: totalupvccost, sumtotalwoodcost: totalwoodcost,
                    values: [{
                        subid: uuidv4(), desc: subdesc, length: length, height: height, area: area,
                        perqsft: perqsft, pvccostpsf: pvccostpsf, totalpvccost: totalpvccost, upvccostpsf: upvccostpsf, totalupvccost: totalupvccost, woodcostpsf: woodcostpsf, totalwoodcost: totalwoodcost, remarks: remarks
                    }]
                };
                setrows([
                    ...rows,
                    singleestimate
                ]);
                // console.log(singleestimate)
                // console.log(rows)
            }
            toast.success("Estimation Item Added");
        }
        else {
            const available1 = rows.filter((item) => {
                return item.id === inputitem;
            });
            const other1 = rows.filter((item) => {
                return item.id !== inputitem;
            });
            //     title, settitle, subdesc, setsubdesc, length, setlength, height, setheight, area, setarea, perqsft, setperqsft,
            // pvccostpsf, setpvccostpsf, totalpvccost, settotalpvccost, upvccostpsf, setupvccostpsf, totalupvccost, settotalupvccost, woodcostpsf, setwoodcostpsf, totalwoodcost, settotalwoodcost,
            // remarks, 

            //console.log('available1');
            //console.log(available1);
            //console.log('other1');
            //console.log(other1);
            //console.log('inputsubitem');
            //console.log(inputsubitem);
            if (available1.length > 0) {
                const subtableava = available1[0].values.filter((subitem) => {
                    return subitem.subid === inputsubitem.subid
                });
                const othersubtableava = available1[0].values.filter((subitem) => {
                    return subitem.subid !== inputsubitem.subid
                });


                //console.log('subtableava');
                //console.log(subtableava);
                //console.log('othersubtableava');
                //console.log(othersubtableava);
                if(type === 'update') {
                    settitle(available1[0].title);
                    setsubdesc(subtableava[0].desc);
                    setlength(subtableava[0].length);
                    setheight(subtableava[0].height);
                    setarea(subtableava[0].area);
                    setperqsft(subtableava[0].perqsft);
                    setpvccostpsf(subtableava[0].pvccostpsf);
                    settotalpvccost(subtableava[0].totalpvccost);
                    setupvccostpsf(subtableava[0].upvccostpsf);
                    settotalupvccost(subtableava[0].totalupvccost);
                    setwoodcostpsf(subtableava[0].woodcostpsf);
                    settotalwoodcost(subtableava[0].totalwoodcost);
                    setremarks(subtableava[0].remarks);
                    toast.info("Estimation Item is added in edit section");
                }
                else{
                    toast.warning("Estimation Item Deleted");
                }
               

                if (othersubtableava.length > 0) {

                    available1[0] = {
                        id: available1[0].id,
                        title: available1[0].title,
                        sumtotalpvccost: calculatetotal(available1[0].sumtotalpvccost, subtableava[0].totalpvccost, 'diff'),
                        sumtotalupvccost: calculatetotal(available1[0].sumtotalupvccost, subtableava[0].totalupvccost, 'diff'),
                        sumtotalwoodcost: calculatetotal(available1[0].sumtotalwoodcost, subtableava[0].totalwoodcost, 'diff'),
                        values: [...othersubtableava]
                    };
                    //console.log('available1');
                    //console.log(available1);
                    if (other1.length > 0) {
                        setrows([
                            ...other1,
                            available1[0]
                        ]);
                    }
                    else {
                        setrows([
                            available1[0]
                        ]);
                    }
                } else{
                    if (other1.length > 0) {
                        setrows([
                            ...other1
                        ]);
                    }
                    else {
                        setrows([]);
                        cleartotal();
                    }
                }
                // setrows([
                //     ...other1,
                // ]);
            } 

            //console.log('rows')
            //console.log(rows);
        }
    };

    const cleartotal=()=>{
        setgrandtotalpvccost(0);
            setgrandtotalupvccost(0);
            setgrandtotalwoodcost(0);
    }

    const calculatetotal = (initalval, statevalue, type) => {
        if (type === 'sum') {
            return ((initalval) * 1 + (statevalue) * 1).toFixed(2);
        }
        else {
            return ((initalval) * 1 - (statevalue) * 1).toFixed(2);
        }
    };

    const calculateEstimateTotal = () => {
        if (rows.length > 0) {
            const totalpvc = rows.map((item) => item.sumtotalpvccost);
            const totalupvc = rows.map((item) => item.sumtotalupvccost);
            const totalwood = rows.map((item) => item.sumtotalwoodcost);
            setgrandtotalpvccost(collect(totalpvc).sum().toFixed(2));
            setgrandtotalupvccost(collect(totalupvc).sum().toFixed(2));
            setgrandtotalwoodcost(collect(totalwood).sum().toFixed(2));
        }
        // grandtotalupvccost, setgrandtotalupvccost, grandtotalpvccost, setgrandtotalpvccost, grandtotalwoodcost, setgrandtotalwoodcost,
    };
    useEffect(() => {
        calculateEstimateTotal();
    }, [rows])

    useEffect(() => {
        let ar = (length * height).toFixed(3);
        let psf = (ar / 144).toFixed(3);
        setarea(ar);
        setperqsft(psf);
    }, [length, height]);

    useEffect(() => {
        let costpvc = ((pvccostpsf * 1) * perqsft).toFixed(2);
        settotalpvccost(costpvc);
    }, [perqsft, pvccostpsf]);

    useEffect(() => {
        let costupvc = ((upvccostpsf * 1) * perqsft).toFixed(2);
        settotalupvccost(costupvc);
    }, [perqsft, upvccostpsf]);

    useEffect(() => {
        let costwood = ((woodcostpsf * 1) * perqsft).toFixed(2);
        settotalwoodcost(costwood);
    }, [perqsft, woodcostpsf]);

    const estcontext = {
        columns, setcolumns, rows, setrows, estimateidcount, setestimateidcount,
        granttotalpvccost, setgranttotalpvccost, granttotalupvccost, setgranttotalupvccost, granttotalwoodcost, setgranttotalwoodcost,
        clientName, setclientName, clientPhno, setclientPhno, clientAdd, setclientAdd, estimateid, setestimateid, estimatedate, setestimatedate,
        grandtotalupvccost, setgrandtotalupvccost, grandtotalpvccost, setgrandtotalpvccost, grandtotalwoodcost, setgrandtotalwoodcost,
        title, settitle, subdesc, setsubdesc, length, setlength, height, setheight, area, setarea, perqsft, setperqsft,
        pvccostpsf, setpvccostpsf, totalpvccost, settotalpvccost, upvccostpsf, setupvccostpsf, totalupvccost, settotalupvccost, woodcostpsf, setwoodcostpsf, totalwoodcost, settotalwoodcost,
        remarks, setremarks, addOrUpdateEstimateItemHandler
    };


    return <estimateState.Provider value={estcontext} >{children}</estimateState.Provider>
}

export default EstimatestateContext;