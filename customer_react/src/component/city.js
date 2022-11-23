import React, { useState, useEffect } from 'react';
import axios from "axios";

function UniqueCity() {
    const [cities, setCities]=useState([])
const getPersonsPerCity=async ()=>{
let response= await axios.get("http://localhost:5002/cities")
console.log(response)
setCities(response.data)
}
useEffect(()=>{
    getPersonsPerCity()
},[])

    return ( <>
    
     {
        cities.map((item)=>{
            return(<>
           City: {item._id}<br/>
           Number of people:{item.count}<br/><br/><br/>
            
            </>)
        })
     }
    </> );
}

export default UniqueCity;