import React from "react";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceMainComponent from "../Screen/MainComponent/InvoiceMainComponent";
import NoData from "../Screen/NoData/NoData";
import YourDetails from "../Screen/EditScreen/Invoice/YourDetails/YourDetails";
import NavigationBar from "../Screen/NavigationBar/NavigationBar";
import DisplayAllComponent from "../Screen/MainComponent/DisplayAllComponent";

import EstimateMainComponent from "../Screen/MainComponent/EstimateMainComponent";

const ScreenRoute = (props) => {

    return <>

        <Router>
            <div>
                <NavigationBar/>
                <Routes>
                    <Route exact path='/' Component={DisplayAllComponent} /> 
                    <Route path='/yourdetail' Component={YourDetails} />
                    <Route  path='/geninvoice' Component={InvoiceMainComponent} /> 
                    <Route  path='/genestimate' Component={EstimateMainComponent} /> 
                    <Route path='/' Component={NoData} />
                </Routes>
                {/* <MainComponent/> */}
            </div>
        </Router>


    </>
}

export default ScreenRoute;