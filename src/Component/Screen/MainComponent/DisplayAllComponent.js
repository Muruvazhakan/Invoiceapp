
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
            if(items.screenname!=="Home"){
                return(
              
                    <Card className='displayscreenname' key={index} >
                          <Link className="displayelements linkdecor" to={{pathname:items.altname}} key={index}>
                          <img src={items.image} height={350} width={350} alt={items.altname}/>
                          {/* <div className="cardline">
                            {items.screenname}
                            </div> */}
                        
                        </Link>
        
                    </Card>
                  
                    )
            }else return null;
           
        })}
       
    </div>
    </>
}

export default DisplayAllComponent;