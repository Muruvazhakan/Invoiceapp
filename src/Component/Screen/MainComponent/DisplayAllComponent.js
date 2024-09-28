
import React from "react";

import * as Datas from '../../Context/Datas';
import Card from "../../Style/Card/Card";
import {
    Link
  } from "react-router-dom";

  import './DisplayAllComponent.css';

const DisplayAllComponent = (props) => {
    return <>
    <div >
        {Datas.navigationbarcontent.map((items, index) => {
            return(
                <Link className="displayelements" to={{pathname:items.altname}} key={index}>
            <Card className='displayscreenname' >
                {items.screenname}
                
            </Card>
            </Link>
            )
        })}
       
    </div>
    </>
}

export default DisplayAllComponent;