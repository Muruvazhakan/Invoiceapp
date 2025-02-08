import React, { useContext } from "react";
import { Box, CircularProgress, Stack } from "@mui/material";
import * as Datas from "../../Context/Datas";
import Card from "../../Style/Card/Card";
import { Link } from "react-router-dom";

import "./DisplayAllComponent.css";
import { CompanyDetail } from "../../Context/companyDetailContext";
import { Stocks } from "../../Context/StocksContex";
import { AllState } from "../../Context/allStateContext";
import Dashboard from "../Dashboard/Dashboard";
const DisplayAllComponent = (props) => {
  const logindet = useContext(CompanyDetail);
  const stockdet = useContext(Stocks);
  const invoicedata = useContext(AllState);
  let totaltransaction = 0;
  const paymentModeCount = invoicedata.invoiceHistoryData.reduce(
    (acc, { paymentmode }) => {
      totaltransaction = totaltransaction + 1;
      // If paymentmode is empty, we treat it as 'No Payment Mode'
      const mode = paymentmode || "No Payment Mode";
      acc[mode] = (acc[mode] || 0) + 1;
      return acc;
    },
    {}
  );
  return (
    <>
      {!logindet.isloaded && (
        <Stack
          sx={{ color: "grey.500" }}
          spacing={2}
          alignItems={"center"}
          className="spinnerstyle"
        >
          <CircularProgress color="success" size={30} />
        </Stack>
      )}
      <Box className=" displayelements">
        {invoicedata.invoiceHistoryData.length > 0 && (
          <Dashboard data={stockdet} totaltransaction={totaltransaction} />
        )}

        {Datas.navigationbarcontent.map((items, index) => {
          let tier = logindet.tier;
          if (items.tier && items.tier.includes(tier)) {
            if (items.screenname !== "Home") {
              return (
                <Card className="displayscreenname" key={index}>
                  <Link
                    className="displayelements linkdecor"
                    to={{ pathname: items.altname }}
                    key={index}
                  >
                    <img
                      src={items.image}
                      height={350}
                      width={350}
                      alt={items.altname}
                    />
                    {/* <div className="cardline">
                            {items.screenname}
                            </div> */}
                  </Link>
                </Card>
              );
            } else return null;
          }
        })}
      </Box>
    </>
  );
};

export default DisplayAllComponent;
