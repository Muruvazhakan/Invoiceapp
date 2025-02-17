import { Box, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import Card from "../../Style/Card/Card";
import { Link } from "react-router-dom";
import { estimateState } from "../../Context/EstimatestateContext";
import { AllState } from "../../Context/allStateContext";

const ActionPanelTemplate = (props) => {
  const invoiceDet = useContext(AllState);
  const estimatedet = useContext(estimateState);

  return (
    <>
      <Card>
        <Link
          to={{
            pathname: `${props.link}`,
          }}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Stack
            direction="row"
            // margin={0.2}
            alignItems="center"
            justifyContent={"center"}
            height={30}
          >
            <img
              src={props.img}
              height={60}
              width={60}
              alt="sales dashbboard"
            />
            <Box>
              <Typography
                variant="body2"
                // boxSizing={2}
                color="textSecondary"
                // sx={{
                //   paddingRight: "5px",
                // }}
              >
                {props.title}
              </Typography>
            </Box>
          </Stack>
          {props.children}
        </Link>
      </Card>
    </>
  );
};

export default ActionPanelTemplate;
