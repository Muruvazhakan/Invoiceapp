import React, { useContext, useState } from "react";
import { Stocks } from "../../Context/StocksContex";

import "./StockTable.css";
import { Box, Button, IconButton, Stack } from "@mui/material";
import AutoTable from "../AutoTable/AutoTable";
import EditIcon from "@mui/icons-material/Edit";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { deleteStockBD } from "../../DBconnection/stockDetailBD";
import * as localstorage from "../../Context/localStorageData";
const AutoStockTable = (props) => {
  const basiccolumns = [
    { field: "id", headerName: "S.NO", width: 90 },
    {
      field: "productid",
      headerName: "Product Id",
      width: 150,
    },
    {
      field: "hsn",
      headerName: "HSN/SAC",
      width: 150,
    },
    {
      field: "desc",
      headerName: "Product Description",
      width: 350,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "quantity",
      // headerName: (props.from === "add" || props.from === "profit" ? "Purchace Rate (₹)" : "Sales Rate (₹)"),
      headerName: "Quantity",
      width: 150,
    },
    {
      field: "rate",
      headerName: "Rate",
      width: 150,
    },
    {
      field: "amt",
      headerName: "Amount (₹)",
      width: 150,
    },
  ];

  const stockcolumns = [
    { field: "id", headerName: "S.NO", width: 90 },
    {
      field: "productid",
      headerName: "Product Id",
      width: 150,
    },
    {
      field: "hsn",
      headerName: "HSN/SAC",
      width: 150,
    },
    {
      field: "desc",
      headerName: "Product Description",
      width: 350,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "quantity",
      // headerName: (props.from === "add" || props.from === "profit" ? "Purchace Rate (₹)" : "Sales Rate (₹)"),
      headerName: "Quantity",
      width: 150,
    },
    {
      field: "rate",
      headerName: "Rate",
      width: 150,
    },
    {
      field: "amt",
      headerName: "Amount (₹)",
      width: 150,
    },
    {
      field: "",
      headerName: "Action",
      width: 150,
      filterable: false,
      hideSortIcons: false,
      disableColumnMenu: false,
      renderCell: (params) => {
        const { row } = params;
        return (
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"start"}
            gap={3}
            height={"100%"}
          >
            {/* <IconButton
              sx={{ height: "16px", width: "16px" }}
              onClick={() => handleEdit(row)}
              title="Edit"
            >
              <EditIcon />
            </IconButton> */}
            <IconButton
              sx={{ height: "16px", width: "16px" }}
              // onClick={() => handleDelete(row)}
              onClick={() => showConfirmationToast(row)}
              title="Delete"
            >
              <GridDeleteIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  const profitcolumns = [
    { field: "id", headerName: "S.NO", width: 90 },
    {
      field: "productid",
      headerName: "Product Id",
      width: 150,
    },
    {
      field: "hsn",
      headerName: "HSN/SAC",
      width: 150,
    },
    {
      field: "desc",
      headerName: "Product Description",
      width: 200,
    },
    {
      field: "rate",
      headerName: "Purchace Rate (₹)",
      width: 150,
    },
    {
      field: "purchaceamount",
      headerName: "Purchace Amount (₹)",
      width: 180,
    },
    {
      field: "salequantity",
      headerName: "Sold Quantity",
      width: 150,
    },
    {
      field: "salerate",
      headerName: "Sold Rate (₹)",
      width: 150,
    },
    {
      field: "saleamount",
      headerName: "Sold Amount (₹)",
      width: 150,
    },
    {
      field: "profit",
      headerName: "Profit Amount (₹)",
      width: 150,
    },
  ];

  const handleEdit = (row) => {
    // if (!itemIsUpdate) setitemIsUpdate(true);
    // setStock({ ...row });
    console.log(row);
  };

  const showConfirmationToast = (row) => {
    const confirmToast = toast(
      <Stack gap={0.5}>
        <p>Are you sure you want to delete Stock?</p>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => handleDelete(row)}
        >
          Confirm
        </Button>
        <Button variant="outlined" color="primary">
          Cancel
        </Button>
      </Stack>,
      {
        position: "top-center",
        autoClose: true, // Keep the toast open until action is taken
        closeOnClick: true, // Disable closing by clicking the toast
        draggable: true, // Disable dragging
        hideProgressBar: true, // Hide the progress bar
      }
    );
  };

  const tabledetails = useContext(Stocks);
  // useEffect(() => {
  //     console.log("refresh");
  // }, []);

  const [open, setOpen] = useState(false);

  const [item, setItem] = useState([]);

  const handleClickOpen = (items) => {
    setOpen(true);
    setItem(items);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = (item) => {
    setOpen(false);
    tabledetails.deleteStock(item, props.screen, displaylist, "delete");
  };
  let sum1 = 0;
  let displaylist =
    props.screen == "allstocks"
      ? tabledetails.allStockList
          .map((item, index) => {
            if (
              (item.quantity === 0 ||
                item.status === "deleted" ||
                item.status === "Deleted") &&
              props.screen === "allstocks"
            ) {
            } else {
              sum1 = sum1 + item.quantity * 1 * item.rate;
              return item;
            }
          })
          .filter((x) => x !== undefined)
      : props.screen == "alladdedstocks"
      ? tabledetails.allStockAddedList
      : props.screen == "allProfit"
      ? tabledetails.allProfitStockList
      : props.screen == "add"
      ? tabledetails.list
      : props.screen == "sale"
      ? tabledetails.saleslist
      : tabledetails.allStockSalesList;
  displaylist = displaylist?.map((item, index) => {
    item.amt = (item.rate * 1 * item.quantity).toFixed(2);

    item.status = item.status ? item.status : "Active";
    if (
      (item.quantity === 0 ||
        item.status === "deleted" ||
        item.status === "Deleted") &&
      props.screen == "allstocks"
    )
      return null;
    return { ...item, id: index + 1 };
  });
  // console.log("displaylist  " + " props.screen ^^^ " + props.screen);
  // console.log(displaylist)
  let localsum =
    props.screen === "allstocks"
      ? sum1
      : props.screen == "alladdedstocks"
      ? tabledetails.alladdedstockstotalamt
      : props.screen === "allProfit"
      ? tabledetails.totalprofiramt
      : props.screen == "add"
      ? tabledetails.totalamt
      : props.screen == "sale"
      ? tabledetails.totalsalesamt
      : tabledetails.allstockssalestotalamt;

  let localsumqty1 = 0,
    localsumqty2 = 0,
    sumpurchaseamt = 0;

  let localsumqty = displaylist.map((item, index) => {
    localsumqty1 = localsumqty1 + item.quantity * 1;
    if (props.screen === "allProfit")
      localsumqty2 = localsumqty2 + item.salequantity * 1;
    sumpurchaseamt = sumpurchaseamt + item.purchaceamount * 1;
  });
  // let localtotal1 = 0;
  // let localtotal = displaylist.map((item, index) => {
  //     localtotal1 = localtotal1 + (item.quantity * 1 * item.rate);
  // });

  console.log(
    props.screen +
      " props.screen" +
      localsum +
      " localsum  " +
      displaylist +
      " displaylist",
    +" localsumqty ++ " + localsumqty1
  );

  let from = props.from;
  const digit2options = { maximumFractionDigits: 2 };

  const handleDelete = async (row) => {
    tabledetails.setisloading(true);
    let loginuserid = localstorage.addOrGetUserdetail("", "userid", "get");
    let response = await deleteStockBD(row, loginuserid);
    console.log("response");
    console.log(response);
    if (response.status === 200) {
      toast.success(response.data.message);
      const newData = displaylist.filter((f) => f.productid !== row.productid);
      tabledetails.setallStockList(newData);
    } else toast.warn(response.response.data.message);
    tabledetails.setisloading(false);
  };

  return (
    <>
      <Box
        sx={
          {
            // marginLeft: "20px",
            // marginRight: "20px",
            // marginTop: "5px",
            // marginBottom: "5px",
            //   borderRadius:"20px",
            //   border:"25px"
          }
        }
      >
        <AutoTable
          loading={tabledetails.isloading}
          columns={
            props.screen !== "allProfit"
              ? props.iseditable
                ? stockcolumns
                : basiccolumns
              : profitcolumns
          }
          data={displaylist.length ? displaylist : []}
          pageSize={10}
          enableExportAndPrint={true}
          totalQuantity={localsumqty1}
          totalPrice={localsum}
          iseditable={props.iseditable ? props.iseditable : false}
        />
      </Box>
    </>
  );
};

export default AutoStockTable;
