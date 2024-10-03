
import React from "react";

import * as Datas from '../../Context/Datas';
import Card from "../../Style/Card/Card";
import {
    Link
  } from "react-router-dom";

  import './DisplayAllComponent.css';

const DisplayAllComponent = (props) => {
    return <>
    <div className=" displayelements" >
        {Datas.navigationbarcontent.map((items, index) => {
            return(
              
            <Card className='displayscreenname ' >
                  <Link className="displayelements linkdecor" to={{pathname:items.altname}} key={index}>
                {items.screenname}
                </Link>
            </Card>
          
            )
        })}
       
    </div>
    </>
}

export default DisplayAllComponent;