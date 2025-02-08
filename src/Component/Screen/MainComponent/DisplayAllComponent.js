import React, { useContext } from "react";
import { Box, CircularProgress, Stack } from "@mui/material";
import * as Datas from "../../Context/Datas";
import Card from "../../Style/Card/Card";
import { Link } from "react-router-dom";

import "./DisplayAllComponent.css";
import { CompanyDetail } from "../../Context/companyDetailContext";
import { Stocks } from "../../Context/StocksContex";
import Dashboard from "../Dashboard/Dashboard";
const DisplayAllComponent = (props) => {
  const logindet = useContext(CompanyDetail);
  const stockdet = useContext(Stocks);

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
        <Dashboard data={stockdet} />
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
