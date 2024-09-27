import React from "react";
import YourDetails from "../YourDetails/YourDetails";
import TableForm from "../TableForm/TableForm";
import Tables from "../Table/Table";
import Card from "../Card/Card";

const InvoiceDeatilsEdit = (props)=>{
    return(<>
        <YourDetails />
      <TableForm />
      <Card >
       <h2>Edit the content</h2> 
      <Tables screen="update" />
      </Card>
      </>
    )
}

export default InvoiceDeatilsEdit;