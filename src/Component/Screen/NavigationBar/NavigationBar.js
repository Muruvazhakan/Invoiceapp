import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { IconContext } from "react-icons/lib";
import * as Datas from "../../Context/Datas";
import { FaBars, FaTimes, FaRegUserCircle } from "react-icons/fa";
import { IoHome, IoLogOutSharp } from "react-icons/io5";
import "./NavigationBar.css";
import EELogo from "../../../Image/iconc.png";

import { CompanyDetail } from "../../Context/companyDetailContext";

const NavigationBar = (props) => {
  const [button, setButton] = useState(true);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  const closeMobileMenu = () => setClick(false);
  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
    return window.removeEventListener("resize", showButton);
  }, []);
  const logindet = useContext(CompanyDetail);
  // const [state, setState] = useState(initialState);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <>
      <IconContext.Provider value={{ color: "#rrr" }}>
        <nav className="navbar">
          <div className="navbar-container container ">
            <Link to="/" className="navbar-logo">
              {/* <PiInvoiceThin className='logo logo-name' size={30} /> */}
              <div className="logo-name">
                <img className="logo" src={EELogo} alt="EE_Logo" />
                BillEdge
              </div>
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul
              className={click ? "nav-menu  nav-active  active" : "nav-menu "}
            >
              {logindet.loginstatus ? (
                <>
                  {Datas.navigationbarcontent.map((item, index) => {
                    let pathnameurl =
                      item.screenname === "Home"
                        ? "/"
                        : `/screen=${item.altname}`;
                    let tier = logindet.tier;
                    if (item.tier && item.tier.includes(tier)) {
                      return (
                        <div
                          className="nav-item  nav-active "
                          //  onClick={() => handleheaderClick()}
                          key={index}
                        >
                          <li className="nav-item  nav-active ">
                            <Link
                              className="nav-links"
                              to={{ pathname: item.altname }}
                              duration={1000}
                              activeClass="nav-active"
                              spy={true}
                              offset={-50}
                              smooth
                              onClick={closeMobileMenu}
                            >
                              {item.screenname === "Home" ? (
                                <IoHome size={20} />
                              ) : item.screenname === "Company Detail" ? (
                                <FaRegUserCircle size={22} />
                              ) : (
                                item.screenname
                              )}
                            </Link>
                          </li>
                        </div>
                      );
                    }
                    // console.log(pathnameurl + " pathnameurl ");
                  })}
                  <div
                    className="nav-item  nav-active "
                    //  onClick={() => handleheaderClick()}
                    key="logout"
                  >
                    <li className="nav-item  nav-active ">
                      <Link
                        className="nav-links"
                        duration={1000}
                        activeClass="nav-active"
                        spy={true}
                        offset={-50}
                        smooth
                        onClick={logindet.logoutHandler}
                      >
                        <IoLogOutSharp size={22} />
                      </Link>
                    </li>
                  </div>
                </>
              ) : (
                <>
                  {Datas.userLogin.map((item, index) => {
                    // let tier = logindet.tier;
                    // if (item.tier && item.tier.includes(tier)) {
                    return (
                      <div className="nav-item  nav-active">
                        <li className="nav-item  nav-active">
                          <Link
                            className="nav-links"
                            to={{ pathname: item.altname }}
                            duration={1000}
                            activeClass="nav-active"
                            spy={true}
                            offset={-50}
                            smooth
                          >
                            {item.screenname}
                            <item.iconname size={20} className="icon" />
                          </Link>
                        </li>
                      </div>
                    );
                    // }
                  })}
                </>
              )}

              <div className="nav-item menu-icon2" onClick={handleClick}></div>
              <div className="nav-item menu-icon2" onClick={handleClick}>
                {click ? <FaTimes size="40px" /> : <FaBars />}
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
  );
};

export default NavigationBar;
