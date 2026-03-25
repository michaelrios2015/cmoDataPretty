import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import store from './store';
import GinnieTable from './components/GinnieTable';
import CMOTable from './components/CMOTable';
import NavBar from './components/NavBar';
import Graph from './components/Graph';
import test from './components/test';
import LoginTest from './components/Login';
import { HashRouter as Router, Route, BrowserRouter } from 'react-router-dom';



// so I don't think is where I should load that data but nt sure how to do it with UseEffect
class _App extends Component{
  constructor(){
    super();
    this.state = { loggedIn: !!localStorage.getItem('visitorEmail') };
  }

  handleLogin = () => {
    this.setState({ loggedIn: true });
  }

  //this works fine now need to figure out how to put my data into Material UI table and add search
  render(){
    return (
      <div>
        <Router>
          <NavBar />
          <div>
            <Route component={ GinnieTable } path = '/' exact/>
            <Route component={ Graph } path = '/graph' exact/>
            <Route component={ CMOTable } path = '/cmotwo' exact/>
            <Route component={ test } path = '/test' exact/>
          </div>
        </Router>
        {!this.state.loggedIn && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(1px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <LoginTest onLogin={this.handleLogin} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

const App = connect(mapStateToProps, null)(_App);

render(<Provider store = {store}><App /></Provider>, document.querySelector('#root'));
