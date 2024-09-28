import React from "react";
import {Link} from "react-router-dom";

import { IconContext } from 'react-icons/lib';
import * as Datas from '../../Context/Datas';
import { PiInvoiceThin } from "react-icons/pi";
import './NavigationBar.css';
const NavigationBar = (props)=>{

    const handleheaderClick = () => {
        //console.log(" headerName,headerdetails click" + headerName + headerdetails);
        //console.log(headerdetails);
       
        window.location.reload()
      }

    return<>
     <IconContext.Provider value={{ color: '#rrr' }}>
   
    <nav className='navbar'>
          <div className="navbar-container container ">

            <Link to='/' className='navbar-logo'>
            <PiInvoiceThin className='logo logo-name' size={30} />
              <div
               
                className='logo-name'>
                {/* <img className='logo' src={Datas.EELogo}
                  alt="EE_Logo"
                /> */}
               
                BillEdge</div>

            </Link>
          
            <ul className={'nav-menu  nav-active  active' }>
             
              <>
                {Datas.navigationbarcontent.map((item, index) => {
                  let pathnameurl=  item.screenname=="Home"? "/" : `/screen=${item.altname}` ;
                  console.log(pathnameurl + " pathnameurl ");
                  return (
                    <div className='nav-item  nav-active '
                    //  onClick={() => handleheaderClick()} 
                    key={index}>
                    <li className='nav-item  nav-active '>
                     
                        < Link className='nav-links' to={ { pathname: item.altname }}
                        duration={1000} activeClass="nav-active" spy={true} offset={-50}
                        smooth 
                        // onClick={closeMobileMenu}
                        >
                          {item.screenname}
                         </Link>
                    </li>
                    </div>
                  )
                })}
               
                
             
              </>
            
             
              <div className='nav-item menu-icon2' 
            //   onClick={handleClick}
              >
              
              </div>
              {/* {state.useredits === '66656d6364' ?
                  <div className='nav-item nav-links'
                //    onClick={handleLogout}
                  >Logout </div> : null
                } */}
            </ul>

          </div>
        </nav>
    </IconContext.Provider>
    </>
}

export default NavigationBar;