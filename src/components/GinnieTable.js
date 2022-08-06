import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { loadGinnies, loadGinniesByCoupon, loadGinniesByFloats, loadGinniesByCouponsAndFloats } from '../store';



const useStyles = makeStyles({
  table: {
    minWidth: 730,
    maxWidth: 1200
  },
  customTableContainer: {
    overflowX: "initial"
  }
});

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

  // const [searchYear, setSearchYear ] = useState('2021');
  // const [searchMonth, setSearchMonth ] = useState('FEB');
  
  const [loading, setLoading ] = useState(true);

  const twomonthspast = 'APR'
  const previousmonth = 'MAY';
  const currentmonth = 'JUN';
  const nextmonth = 'JUL';
  const twomoremonths = 'AUG';
  const feddate = '08/03/22';

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
      {/* <Autocomplete
          id="combo-box-demo"
          options={months}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          onChange={(event, value)=>setSearchMonth(value)}
          renderInput={(params) => <TextField  {...params} label="Month" variant="outlined" onClick = {(ev)=> !ev.target.value && setSearchMonth('FEB')}  />}
        />  */}
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
        (<TableContainer classes={{root: classes.customTableContainer}}>
          {/* <Table className={classes.table} aria-label="sticky table"> */}
          <Table stickyHeader aria-label="sticky table">
            <TableHead className={ 'head'}>
              <TableRow  >
              <TableCell colSpan={2}><b>{searchC} {currentmonth}</b></TableCell>
                <TableCell align="center" colSpan={11}/>
                <TableCell align="center" colSpan={1}>
                  Predicted CPR
                </TableCell>
                <TableCell align="center" colSpan={3}>
                  Actual CPR
                </TableCell>
                <TableCell align="center" colSpan={3}>
                  CPR Resid 
                </TableCell>
                {/* <TableCell align="center" colSpan={1}>
                  Predicted CDR
                </TableCell>
                <TableCell align="center" colSpan={1}>
                  Actual CDR
                </TableCell>
                <TableCell align="center" colSpan={1}>
                  CDR Resid
                </TableCell> */}
              </TableRow>
              
              <TableRow>
                <TableCell className={ 'head'} >CUSIP</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Issue Month</TableCell>
                <TableCell align="right">Current Face</TableCell>
                <TableCell align="right">CF in CMO</TableCell>
                <TableCell align="right">CF in FED {feddate}</TableCell>
                <TableCell align="right">CF in Plat</TableCell>
                <TableCell align="right">Float MM</TableCell>  
                <TableCell align="right">Coupon</TableCell>
                <TableCell align="right">GWAC</TableCell>
                <TableCell align="right">WALA</TableCell>
                <TableCell align="right">WAM</TableCell>
                <TableCell align="right">VA</TableCell>
                {/* Predicted CPR */}
                {/* <TableCell align="right">{twomoremonths}</TableCell> */}
                <TableCell align="right">{nextmonth}</TableCell>
                {/* actual cpr -- --- this changes on the 4th and 6th */}
                <TableCell align="right">{nextmonth}</TableCell> 
                <TableCell align="right">{currentmonth}</TableCell>
                <TableCell align="right">{previousmonth}</TableCell>
                {/* <TableCell align="right">{twomonthspast}</TableCell> */}
                {/* RESID --- this changes on the 4th and 6th */}
                <TableCell align="right">{nextmonth}</TableCell>
                <TableCell align="right">{currentmonth}</TableCell>
                <TableCell align="right">{previousmonth}</TableCell>
                {/* <TableCell align="right">{twomonthspast}</TableCell> */}
              
              {/* not being used at the moment */}
                {/* CDR predicted*/}
                {/* <TableCell align="right">{nextmonth}</TableCell> */}
                {/* CDR actual --- this changes on the 4th and 6th */}
                {/* <TableCell align="right">{nextmonth}</TableCell> */}
                {/* <TableCell align="right">{currentmonth}</TableCell> */}
                {/* CDR residual --- this changes on the 4th and 6th */}
                {/* <TableCell align="right">{nextmonth}</TableCell> */}
                {/* <TableCell align="right">{currentmonth}</TableCell> */}

                {/* <TableCell align="right">Date</TableCell> */}
              
              </TableRow>
            </TableHead>
            <TableBody>
            {/* cusip,name,issuedate,currface,cfincmo,cfinfed,cfinplat,coupon,gwac,wala,wam,va,cprprediction,cprpredictionnext,date */}

              {ginnies.map((row) => (
                <TableRow key={row.cusip}>
                  <TableCell component="th" scope="row"> {row.cusip} </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.issuedate}</TableCell>
                  <TableCell align="right">{row.currentface && numberWithCommas(row.currentface)}</TableCell>
                  <TableCell align="right">{row.cfincmo && numberWithCommas(row.cfincmo)}</TableCell>
                  <TableCell align="right">{row.cfinfed && numberWithCommas(row.cfinfed)}</TableCell>
                  <TableCell align="right">{row.cfinplat && numberWithCommas(row.cfinplat)}</TableCell>
                  <TableCell align="right">{numberWithCommas(row.currentface - row.cfincmo - row.cfinfed - row.cfinplat)}</TableCell>
                  <TableCell align="right">{row.coupon}</TableCell>
                  <TableCell align="right">{row.gwac}</TableCell>
                  <TableCell align="right">{row.wala}</TableCell>
                  <TableCell align="right">{row.wam}</TableCell>
                  <TableCell align="right">{row.va}</TableCell>
                  {/* cpr prediction*/}
                  {/* <TableCell align="right">{row.cprfuturepredictionnext}</TableCell> */}
                  <TableCell align="right">{row.cprfutureprediction}</TableCell>
                  {/* cpr actual  --- this changes on the 4th and 6th  */}
                  <TableCell align="right">{row.curractualcprnext}</TableCell>
                  <TableCell align="right">{row.curractualcpr}</TableCell>
                  <TableCell align="right">{row.pastactcpr}</TableCell>
                  {/* <TableCell align="right">{row.twomonthspastactcpr}</TableCell> */}
                  {/* CPR residual --- this changes on the 4th and 6th  */}
                  <TableCell align="right" style={(row.curractualcprnext - row.cprfutureprediction).toFixed(1)  > 0 ? {color: "red"}: {color: "black"} }>{(row.curractualcprnext - row.cprfutureprediction).toFixed(1) != 0? (row.curractualcprnext - row.cprfutureprediction).toFixed(1) : ' '}</TableCell>
                  <TableCell align="right" style={(row.curractualcpr - row.cprprediction).toFixed(1)  > 0 ? {color: "red"}: {color: "black"} }>{(row.curractualcpr - row.cprprediction).toFixed(1) != 0? (row.curractualcpr - row.cprprediction).toFixed(1) : ' '}</TableCell>
                  <TableCell align="right" style={(row.pastactcpr - row.cprpastprediction).toFixed(1)  > 0 ? {color: "red"}: {color: "black"} }>{(row.pastactcpr - row.cprpastprediction).toFixed(1) != 0? (row.pastactcpr - row.cprpastprediction).toFixed(1) : ' '}</TableCell>
                  {/* <TableCell align="right" style={(row.twomonthspastactcpr - row.cprtwomontspastprediction).toFixed(1) > 0 ? {color: "red"}: {color: "black"} }>{(row.twomonthspastactcpr - row.cprtwomontspastprediction).toFixed(1) != 0? (row.twomonthspastactcpr - row.cprtwomontspastprediction).toFixed(1) : ' '}</TableCell> */}
                  
                  {/* not using right now  */}

                  {/* CDR prediction */}
                  {/* <TableCell align="right">{row.cdrfuturepediction}</TableCell> */}
                  {/* CDR actual  --- this changes on the 4th and 6th */}
                  {/* <TableCell align="right">{row.curractualcdrnext}</TableCell> */}
                  {/* <TableCell align="right">{row.curractualcdr}</TableCell> */}
                  {/* CDR residual --- this changes on the 4th and 6th */}
                  {/* <TableCell align="right" style={(row.curractualcdrnext - row.cdrfuturepediction).toFixed(1) > 0 ? {color: "red"}: {color: "black"} }>{(row.curractualcdrnext - row.cdrfuturepediction).toFixed(1) != 0 ? (row.curractualcdrnext - row.cdrfuturepediction).toFixed(1) : ' '}</TableCell> */}
                  {/* <TableCell align="right" style={(row.curractualcdr - row.currcdrprediction).toFixed(1) > 0 ? {color: "red"}: {color: "black"} }>{(row.curractualcdr - row.currcdrprediction).toFixed(1) != 0 ? (row.curractualcdr - row.currcdrprediction).toFixed(1) : ' '}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>)   
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