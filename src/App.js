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
import Card from './Component/Card/Card';
import InvoiceDetails from './Component/InvoiceDetails/InvoiceDetails';
import InvoiceDeatilsEdit from './Component/InvoiceDetails/InvoiceDeatilsEdit';


function App() {
  const componentRef =useRef();
  return (
    <div className="App">
      <main className=""
        style={{
          maxWidth: "1920px",
          margin: "auto",
        }}>
       <section>
      <Card>

      <ReactToPrint
            trigger={() => (
              <Button variant="outlined" color="success" >
              Print / Download
            
              </Button>
            )}
            content={() => componentRef.current}
          />
      <div ref={componentRef}> 
      <InvoiceDetails screen="display" />
      
      </div>
      </Card>
      </section>
      <div className="invoice__preview bg-white p-5 rounded-2xl border-4 border-blue-200">
      <InvoiceDeatilsEdit />
      </div>
      </main>
    </div>
  );
}

export default App;
