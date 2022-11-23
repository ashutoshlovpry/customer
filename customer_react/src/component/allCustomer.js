import axios from "axios";
  import React, { useState, useEffect } from 'react';
function AllCustomer() {

    const [data,setData]=useState([]) 
 const detail=async ()=>{
    let response= await axios('http://localhost:5002/')
    setData(response.data)
 }
  useEffect( ()=>{
   detail()
  },[])
    return (<>

{data && data.map((item)=>{
            return(<>
            Name:{item.first_name+ " "+ item.last_name}<br/>
            city:{item.city}<br/>
            company:{item.comapny}<br/>
            <br/><br/>
            </>)
         })}
    </>  );
}

export default AllCustomer;