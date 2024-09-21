import React from "react";


import './Header.css';
const Header = () =>{

    const print = ()=>{
        window.print();
    }
    return <div className="header">
        <main>
        <header className="header-title">
            <h2 >
            Invoice App
            </h2>
       
            </header>

        
            {/* <ul className="header-option">
            
            <li className="list-name" onClick={print}>
              
                Print
              
            </li>
            <li className="list-name">
            Download
            </li>
            <li className="list-name">
            Send
            </li>
            </ul> */}
       
       
        </main>
    </div>
}

export default Header;