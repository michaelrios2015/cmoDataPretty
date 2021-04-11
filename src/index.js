import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import store, { loadCurrentRows, loadRows } from './store';
import BasicTable from './Table';
import CurrentMonth from './CurrentMonth';
import { HashRouter as Router, Route, BrowserRouter } from 'react-router-dom';

// so I don't think is where I should load that data but nt sure how to do it with UseEffect
class _App extends Component{
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this.props.bootstrap();
  }

  //this works fine now need to figure out how to put my data into Material UI table and add search
  render(){
    return (
      <Router>
        <div>
          <Route component={ CurrentMonth } path = '/'  exact />
          <Route component={ BasicTable } path = '/past' />
          
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    bootstrap: ()=> {
      dispatch(loadCurrentRows());
      dispatch(loadRows());
    }
  };
}

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

render(<Provider store = {store}><App /></Provider>, document.querySelector('#root'));
