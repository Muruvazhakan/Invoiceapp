import React from 'react';

import './App.css';

import MainComponent from './Component/Screen/MainComponent/InvoiceMainComponent';
import ScreenRoute from './Component/Router/ScreenRoute';
import Developer from './Component/Screen/ViewScreen/Developer';

import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.REACT_APP_NODE_ENV === 'production') {
  disableReactDevTools();
  console.log = () =>{};
}
function App() {
 
  return (
    <div className="App">      
         <ScreenRoute />
    </div>
  );
}

export default App;
