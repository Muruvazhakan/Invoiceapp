import React from "react";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceMainComponent from "../Screen/MainComponent/InvoiceMainComponent";
import NoData from "../Screen/NoData/NoData";
import NavigationBar from "../Screen/NavigationBar/NavigationBar";
import DisplayAllComponent from "../Screen/MainComponent/DisplayAllComponent";

import EstimateMainComponent from "../Screen/MainComponent/EstimateMainComponent";
import CompanyEditeScreen from "../Screen/ViewScreen/CompanyotherDetail/CompanyEditeScreen";

const ScreenRoute = (props) => {

    return <>

        <Router>
            <div>
                <NavigationBar/>
                <Routes>
                    <Route exact path='/' Component={DisplayAllComponent} /> 
                    <Route path='/yourdetail' Component={CompanyEditeScreen} />
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