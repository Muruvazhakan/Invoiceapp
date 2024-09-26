import logo from './logo.svg';
import './App.css';
import React,{useRef} from 'react';
import ReactToPrint from 'react-to-print';

import Header from './Component/Header/Header';
import GeneralDetails from './Component/GeneralDetails/GeneralDetails';
import Tables from './Component/Table/Table';
import TableForm from './Component/TableForm/TableForm';
import TableFooters from './Component/Table/TableFooter';
import YourDetails from './Component/YourDetails/YourDetails';
import { Button } from '@mui/material';


function App() {
  const componentRef =useRef();
  return (
    <div className="App">
      <ReactToPrint
            trigger={() => (
              <Button variant="outlined" color="success" >
              Print / Download
            
              </Button>
            )}
            content={() => componentRef.current}
          />
      <div ref={componentRef}> 
      <Header/>
      <GeneralDetails />
      <Tables />
    
      <TableFooters/>
      </div>
      <YourDetails />
      <TableForm />
    </div>
  );
}

export default App;
