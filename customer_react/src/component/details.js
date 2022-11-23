
import axios from "axios";
import {    useParams} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Details() {
   const params=useParams() 
   const [data,setData]=useState([]) 
 const detail=async ()=>{
    let response= await axios('http://localhost:5002/'+params.id)
    setData(response.data)
 }
  useEffect( ()=>{
   detail()
  },[])
    return ( <>
        <Link to={"/"}><button>Back</button></Link> <br/>

         {data && data.map((item)=>{
            return(<>
            Name:{item.first_name+ " "+ item.last_name}<br/>
            city:{item.city}<br/>
            company:{item.comapny}<br/>
            <Link to={"/edit/"+item.id}><button>Edit Details</button></Link> <br/>

            </>)
         })}<br/>

    </> );
}

export default Details;