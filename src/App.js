import React from 'react'
import './App.css';

import { Link } from 'react-router-dom';


function App() {
  

  return (
    <div className="App">
      <div>Stock Viewer</div>
      <div><Link to='/search'>Search</Link></div>
      <div><Link to='/news'>News</Link></div>
      
    </div>
  );
}

export default App;
