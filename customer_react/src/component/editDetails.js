
import axios from "axios";
import {    useParams} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function EditDetails() {
   const params=useParams() 
   const [data,setData]=useState('') 
   const [firstName,setFirstName]=useState('')
   const [lastName,setLastName]=useState('')
   const [city,setCity]=useState('')
   const [company,setCompany]=useState('')
   const [selectedFile, setselectedFile]=useState('')
    const formData = new FormData();

      // Update the formData object
    //   const onUpload= ()=>{
    //     ("ff",selectedFile);
    //     formData.append(
    //         "myFile",
    //         selectedFile,
    //         "ashu")
    //    ("DD",formData);
    //    for (var [key, value] of formData.entries()) { 
    //     (key, value);
    // }
    //   }
    
 const detail=async ()=>{
    try {let response= await axios('http://localhost:5002/edit/'+params.id,{method:"patch",
data:{
    first_name:firstName,
    last_name:lastName,
    city:city,
    comapny:company,
    
}})
    if(response.status===200){
      setData("Updated Sucessfully")
    }
    else{
      setData("Something went wrong")

    }
 }
 catch(err){

 }
}
//  const upload=async()=>{
//   let response= await axios('http://localhost:5002/upload/'+params.id,{method:"post", data:{
//     file:formData,
//   }
// })

//  }
  useEffect( ()=>{
  },[])
    return ( <>
       <input type="text" placeholder="First Name" onChange={(e)=>{setFirstName(e.target.value)}}></input><br/>
       <input type="text" placeholder="Last Name" onChange={(e)=>{setLastName(e.target.value)}}></input><br/>
       <input type="text" placeholder="City" onChange={(e)=>{setCity(e.target.value)}}></input><br/>
       <input type="text" placeholder="Company" onChange={(e)=>{setCompany(e.target.value)}}></input><br/>
       <button onClick={detail}>Update</button><br/><br/><br/>
           {data}<br/>
       {/* <input type="file" placeholder="file" onChange={(e)=>{onUpload(e)
         setselectedFile(e.target.files[0])}}></input><br/>
         <button onClick={upload}>Upload</button> */}

    </> );
}

export default EditDetails;