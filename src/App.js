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


function App() {
  const componentRef =useRef();
  return (
    <div className="App">
      <ReactToPrint
            trigger={() => (
              <button className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400">
                Print / Download
              </button>
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
