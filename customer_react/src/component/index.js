
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Pagination from 'react-responsive-pagination';
function CompantList() {
const [data,setData]=useState([])
const [search,setSearch]=useState('')
const [pageno, setPageno]=useState(1)
const [limit, setLimit]=useState(1)
const [nodata, setNoData]=useState('')
const headers = {
    "Content-Type": "application/json",
    "Accept":"application/json, text/plain, /"
  };
const getData=async(pageno,limit)=>{
  let result=  await axios({url:"http://localhost:5002/search/"+search, method: 'POST',data:{pageno:pageno,limit:limit},headers:headers })
  setData(result.data)
  if(result.data[0].paginatedResults.length===0) setNoData('No Data Found')
  else setNoData('')
  return result
}
  const searchButton=async()=>{
 await getData(pageno,limit)
 setPageno(1)
  }
   
 const next=async(e)=>{
    let result = await getData(e,limit)
     setPageno(e) 
     setData(result.data)
 }
    return ( <>
    <div style={{textAlign:'center'}}>
    <input type="search" onChange={(e)=>{setSearch(e.target.value)}}></input>
    <button onClick={()=>{searchButton()}}>search</button> <br/> 
    { data[0] && data[0].paginatedResults &&
        data[0].paginatedResults.map((item)=>{
          return(<>
       <Link to={"customer/"+ item.id}> {item.first_name+ " "+ item.last_name}<br></br></Link>
          </>)
        })
    }
    {nodata}
    <Pagination
        current={pageno}
        total={data[0] ? Math.ceil( data[0].total/limit):0}
        onPageChange={(e) => next(e)}
    />  
    </div>
    <div style={{float:'left'}} ><Link to="customers"><button>All customers</button></Link>  </div><br/><br/>
    <div style={{float:'left'}} ><Link to="city"><button>Cities</button></Link>  </div>

    </> );
}

export default CompantList;