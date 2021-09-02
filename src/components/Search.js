import React,{useEffect,useState} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import './Search.css';

function Search() {
  const [search,setSearch]=useState('')
  const [results,setResults]=useState([])
  

  const searchOnChange=(event)=>{
    setSearch(event.target.value)
  }
  
  useEffect(()=>{
    
    async function fetchData() {
      if(search.length>0){
        const response = await axios.get(`https://finnhub.io/api/v1/search?q=${search}&token=btnth1n48v6p0j27i8k0`)
        const results= await response.data
        console.log(results.result)
        setResults(results.result.slice(0,5))
      }else{
        setResults([])
      }
    }
    fetchData()
   
  },[search])

  return (
    <>
      <div className="searchApp">
        <h3 className="stocks">
          Stock Viewer
        </h3>
        <div className="news"><Link to='/news'>News</Link></div>
        <input className="input" type="text" value ={search} onChange={searchOnChange} placeholder='Search' />
        {results.map((result,key)=>(
          <div className="results"><Link to={`/stock/:${result.symbol}`}>{result.symbol}</Link></div>
        ))}
      </div>
    </>
  );
}

export default Search