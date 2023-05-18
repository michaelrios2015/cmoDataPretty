import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import store from './store';
import GinnieTable from './components/GinnieTable';
import CMOTable from './components/CMOTable';
import NavBar from './components/NavBar';
import { HashRouter as Router, Route, BrowserRouter } from 'react-router-dom';
import Graph from './components/Graph';


// so I don't think is where I should load that data but nt sure how to do it with UseEffect
class _App extends Component{
  constructor(){
    super();
    this.state = {};
  }


  //this works fine now need to figure out how to put my data into Material UI table and add search
  render(){
    return (
        <Router>
          <NavBar />
          <div>
            <Route component={ GinnieTable } path = '/' exact/>  
            <Route component={ Graph } path = '/graph' exact/>       
            <Route component={ CMOTable } path = '/cmotwo' exact/>     
          </div>
        </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

const App = connect(mapStateToProps, null)(_App);

render(<Provider store = {store}><App /></Provider>, document.querySelector('#root'));
