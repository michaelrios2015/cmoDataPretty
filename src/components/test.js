import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { loadGinnies, loadGinniesByCoupon, loadGinniesByFloats, loadGinniesByCouponsAndFloats } from '../store/index.js';
import * as changeme from '../../data/changeme.js'


import { DataGrid, GridToolbar } from '@mui/x-data-grid';


//change these  
const feddate = changeme.feddate;
const month = changeme.month; 
const is4thday = changeme.is4thday;
// nothing else should need changing 

// for changing columnb visabilty 
// https://mui.com/x/react-data-grid/column-visibility/

const useStyles = makeStyles({
  table: {
    minWidth: 730,
    maxWidth: 1200
  },
  customTableContainer: {
    overflowX: "initial"
  }
});

const rows = [
  {
    id: 1,
    username: '@MUI',
    age: 38,
    desk: 'D-546',
  },
  {
    id: 2,
    username: '@MUI-X',
    age: 25,
    desk: 'D-042',
  },
];

function numberWithCommas(x) {
  // console.log(x);
  x = x * 1;
  x = x.toFixed(1);
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

//rows are now created in store :) 
function PoolTable({ ginnies, loadGinnies, loadGinniesByCoupon, loadGinniesByFloats, loadGinniesByCouponsAndFloats }) {
  const [searchA, setSearchA ] = useState('');
  const [searchB, setSearchB ] = useState(3.5);
  const [searchC, setSearchC ] = useState('Ginnie Two');


  const [loading, setLoading ] = useState(true);



  // so I am using this to litterally just get the month name to display, and there will always be three at the moment 
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  
  var twomonthspast;
  var previousmonth;

  if (month - 1 < 0){
    twomonthspast = months[month+10]
    previousmonth = months[month+11]
    
  } 
  else if (month - 2 < 0){
    twomonthspast = months[month+10]
    
  }
  else {
    twomonthspast = months[month-2]
    previousmonth = months[month-1]
    
  }

  const currentmonth = months[month];
  const nextmonth = months[(month+1)%12];
  const twomoremonths = months[(month+2)%12];

// So if we assign the months here

var monthOne;
var monthTwo;
var monthThree;

var cprOne;
var cprTwo;
var cprThree;

var cprPredictOne;
var cprPredictTwo;
var cprPredictThree;

// so we choose our three months here 
if (is4thday){

  monthOne = nextmonth;
  monthTwo = currentmonth;
  monthThree = previousmonth;

  cprOne = 'curractualcprnext';
  cprTwo = 'curractualcpr';
  cprThree = 'pastactcpr';

  cprPredictOne = 'cprfutureprediction';
  cprPredictTwo = 'cprprediction';
  cprPredictThree = 'cprpastprediction';


} 
else {
  monthOne = currentmonth;
  monthTwo = previousmonth;
  monthThree = twomonthspast;

  cprOne = 'curractualcpr';
  cprTwo = 'pastactcpr';
  cprThree = 'twomonthspastactcpr';
    
  cprPredictOne = 'cprprediction';
  cprPredictTwo = 'cprpastprediction';
  cprPredictThree = 'cprtwomontspastprediction';

}

  // console.log(ginnies[0])
  //my homemade loading true or false again needed not sure
  useEffect(() => {
    console.log(ginnies.length)
    if (ginnies.length > 0){
      setLoading(false);
    }
  },[ginnies]);

  //should be the first thing to load
  useEffect(() => {
    // setLoading(true);
    loadGinniesByCoupon(searchB, 'M');
  },[]);

  const firstUpdate = useRef(true);

//checks to see if deal name or group has changed but does not run the first time
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    
    let indicator = 'M'
    // console.log(searchB);
    // console.log(searchA);

    setLoading(true);

    if(searchC === 'Ginnie One'){
      indicator = 'X'
      console.log(searchC)
    }
    else if (searchC === 'Ginnie Two'){
      indicator = 'M'
      console.log(searchC)
      // does not trigger an infinite loop neat :)
      setSearchC('Ginnie Two');
    }
    else if (searchC === 'JM' || searchC === 'RG') {
      indicator = searchC;
      console.log(searchC)
      setSearchC(indicator);
    }
    // so when you press the x you still have something 
    else {
      indicator = 'M'
    }

    console.log(indicator)
    if(!searchA && !searchB){

      loadGinniesByCoupon( 3.5, 'M');
      
      } else if (searchA && !searchB) {
        loadGinniesByFloats(searchA, indicator);
        // console.log(searchA);  
      }
      else if (!searchA && searchB) {
        loadGinniesByCoupon(searchB, indicator);
        // console.log(searchB); 
      }
      else {
        loadGinniesByCouponsAndFloats(searchB, searchA, indicator)
        // console.log(searchB);
        // console.log(searchA);
      }

  },[searchA, searchB, searchC ]);

  const classes = useStyles();
        
let floats = [];
for (let i=1; i < 10; i++ ){
  floats.push(i.toString())
}
// console.log(floats);

  let coupon = [];
  for (let i=1; i < 10; i += .5 ){
    coupon.push(i.toString())
  }

  let ginniesOpt = ['Ginnie One', 'Ginnie Two', 'JM', 'RG']
  
  // console.log(coupon);
  // console.log(searchA)
  // console.log(searchB)

  return (
    <div>

      <div  className={ 'sideBySide' } > 
        
        <Autocomplete
          id="combo-box-pool-names"
          options={ginniesOpt}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          onChange={(event, value)=>setSearchC(value)}
          renderInput={(params) => <TextField  {...params} label="Ginnies" variant="outlined"/>}
        />

        <Autocomplete
          id="combo-box-pool-names"
          options={coupon}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          onChange={(event, value)=>setSearchB(value)}
          renderInput={(params) => <TextField  {...params} label="Coupons" variant="outlined"/>}
        />  
 
        <TextField  
          label="Min Float" 
          variant="outlined"   
          // id="outlined-name"
          value = {searchA}
          onChange={(event)=>{
            if(!isNaN(event.target.value)){
            setSearchA(event.target.value)
            // console.log(event.target.value)
          }
          }}
        /> 
      </div>
      {
        loading ? 
        (
          <div>
            <h1>LOADING</h1>
          </div>
        ) 
        :       
        (
 
          <div>
          <h1>LOADed</h1>
          
          <DataGrid
          columns={[
            { field: 'username', hideable: false },
            { field: 'age' },
            { field: 'desk' },
          ]}
          rows={rows}
          components={{
            Toolbar: GridToolbar,
          }}
        />
        </div>
        )
      }

     </div>
  );
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadGinnies: ()=> {
      dispatch(loadGinnies());
    },
    loadGinniesByCoupon:(coupon, indicator)=> {
      dispatch(loadGinniesByCoupon(coupon, indicator));
    },
    loadGinniesByFloats:(float, indicator)=> {
      dispatch(loadGinniesByFloats(float, indicator));
    },
    loadGinniesByCouponsAndFloats:(coupon, float, indicator)=> {
      dispatch(loadGinniesByCouponsAndFloats(coupon, float, indicator));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(PoolTable);