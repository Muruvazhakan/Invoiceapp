import React from 'react';

import './App.css';

import MainComponent from './Component/Screen/MainComponent/InvoiceMainComponent';
import ScreenRoute from './Component/Router/ScreenRoute';
import Developer from './Component/Screen/ViewScreen/Developer';


function App() {
 
  return (
    <div className="App">      
         <ScreenRoute />
    </div>
  );
}

export default App;
