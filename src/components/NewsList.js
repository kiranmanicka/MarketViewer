import axios from 'axios'
import React,{useState,useEffect} from 'react'

import { Link } from 'react-router-dom';


const NewsList=()=>{
    const [articles,setArticles]=useState([])
    const [loading,setLoading]=useState(true)
    
    useEffect(()=>{

      async function fetchData() {
        const response = await axios.get(
          "https://finnhub.io/api/v1/news?category=general&token=btnth1n48v6p0j27i8k0"
        );
      const results= await response.data
      const shorten=results.slice(0,20)
      setArticles(shorten)
      setLoading(false)
      }
      
      fetchData()
      console.log('here')
    },[])

    return (
        <div>
            <div><Link to='/'>Back</Link></div>
            {loading?<div>loading</div>:<div>no longer loading</div>}
            {articles.map((result,key)=>(
            <div>
          <p key={key}>{result.headline}</p>
          <p key={key+key}>{result.summary}</p>
          <img src={result.image} alt="new"/>
         <a href={result.url}>Visit article</a>
            </div>
        ))}
        </div>
    );
}


export default NewsList