import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';
import StockPage from './components/StockPage'
import News from './components/NewsList'
import Search from './components/Search'

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/search' component={Search} />
      <Route path='/news' component={News} />
      <Route path='/stock/:id' component={StockPage} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


