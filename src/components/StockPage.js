import React,{useEffect,useState} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
const socket = new WebSocket('wss://ws.finnhub.io?token=btnth1n48v6p0j27i8k0');

function StockPage(props) {
  const stock=(props.match.params.id).substring(1)
  const [results,setResults]=useState()
  const [news,setNews]=useState()
  const [loading,setLoading]=useState(true)
  const today= new Date()
  const [price,setPrice]=useState(0)
  const [currentprice,setCurrentPrice]=useState()

  socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': stock}))
    
  });

  socket.addEventListener('message', function (event) {
    if(JSON.parse(event.data).data!=null){
      setCurrentPrice(JSON.parse(event.data).data[0].p)
    }
    
  });

 


  useEffect(()=>{
    async function fetchData() {
        const oneMonth=new Date()
        oneMonth.setMonth(oneMonth.getMonth()-1)
        const arr=[today.getDate(),today.getMonth()+1,oneMonth.getDate(),oneMonth.getMonth()+1]
        for(let n=0;n<arr.length;n++){
          if(arr[n]<10){
            arr[n]='0'+ String(arr[n])
          }
        }
        const response = await axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${stock}&token=btnth1n48v6p0j27i8k0`)
        const news=await axios.get(`https://finnhub.io/api/v1//company-news?symbol=${stock}&from=${oneMonth.getFullYear()}-${arr[3]}-${arr[2]}&to=${today.getFullYear()}-${arr[1]}-${arr[0]}&token=btnth1n48v6p0j27i8k0`)
        const prices=await axios.get(`https://finnhub.io/api/v1///quote?symbol=${stock}&token=btnth1n48v6p0j27i8k0`)
        const newsResult=await news.data.slice(0,4)
        const results= await response.data
        const updatedPrices=await prices.data
        setPrice(updatedPrices)
        setResults(results)
        setNews(newsResult)
        setLoading(false)
    }
    
    fetchData()

    /*return function cleanup() {
      var unsubscribe = function(symbol) {
        socket.send(JSON.stringify({'type':'unsubscribe','symbol': 'APPL'}))
        console.log('done')
      }
    }*/
    
  },[])

  

  
  

  return (
    <div className="App">
      <div><Link to='/search'>Back</Link></div>
      {loading?<div>loading</div>:<div>
        <p>Name: {results.name}</p>
        <p>Current Price: {currentprice}</p>
        <p>High Price of the Day: {price.h}</p>
        <p>Low Price of the Day: {price.l}</p>
        <p>Currency: {results.currency}</p>
        <p>Exchange: {results.exchange}</p>
        <p>Country: {results.country}</p>
        <p>Industry: {results.finnhubIndustry}</p>
        <p>IPO: {results.ipo}</p>
        <p>Shares Outstanding: {results.shareOutstanding}</p>
        <p>Ticker: {results.ticker}</p>
        <p>Web URL: {results.weburl}</p>
        <img src={results.logo} alt="new"/>
        <p>This Past Week's News for {stock}</p>
        {news.map((news,key)=>(
          <div>
          
          <p>{news.headline}</p>
          <img src={news.image} alt="new"/>
          <p>{news.summary}</p>
          <a href={news.url}>Visit Article</a>
          </div>
        ))}

        </div>}
      
    </div>
  );
}

export default StockPage