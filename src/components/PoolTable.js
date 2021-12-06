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

import { loadPools, loadPoolsByCoupon, loadPoolsByFloats, loadPoolsByCouponsAndFloats } from '../store';

const useStyles = makeStyles({
  table: {
    minWidth: 730,
    maxWidth: 1200
  },
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
function PoolTable({ pools, loadPools, loadPoolsByCoupon, loadPoolsByFloats, loadPoolsByCouponsAndFloats }) {
  const [searchA, setSearchA ] = useState('');
  const [searchB, setSearchB ] = useState(3.5);
  // const [searchYear, setSearchYear ] = useState('2021');
  // const [searchMonth, setSearchMonth ] = useState('FEB');
  
  const [loading, setLoading ] = useState(true);

  const previousmonth = 'September';
  const currentmonth = 'October';
  const nextmonth = 'November';
  const feddate = '12/01/21';

  // console.log(pools[0])
  //my homemade loading true or false again needed not sure
  useEffect(() => {
    console.log(pools.length)
    if (pools.length > 0){
      setLoading(false);
    }
  },[pools]);

  //should be the first thing to load
  useEffect(() => {
    // setLoading(true);
    loadPoolsByCoupon(searchB);
  },[]);

  const firstUpdate = useRef(true);

//checks to see if deal name or group has changed but does not run the first time
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    
    // console.log(searchB);
    // console.log(searchA);

    setLoading(true);

    if(!searchA && !searchB){
      loadPools()
      
      } else if (searchA && !searchB) {
        loadPoolsByFloats(searchA);
        // console.log(searchA);  
      }
      else if (!searchA && searchB) {
        loadPoolsByCoupon(searchB);
        // console.log(searchB); 
      }
      else {
        loadPoolsByCouponsAndFloats(searchB, searchA)
        // console.log(searchB);
        // console.log(searchA);
      }

  },[searchA, searchB ]);

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
      <div className={ 'sideBySide' }> 
        
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
        (<TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell colSpan={2}><b>G2s OCTOBER</b></TableCell>
                <TableCell align="center" colSpan={11}/>
                <TableCell align="center" colSpan={2}>
                  Predicted CPR
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Actual CPR
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  CPR Resid 
                </TableCell>
                <TableCell align="center" colSpan={1}>
                  Predicted CDR
                </TableCell>
                <TableCell align="center" colSpan={1}>
                  Actual CDR
                </TableCell>
                <TableCell align="center" colSpan={1}>
                  CDR Resid
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell >CUSIP</TableCell>
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
                <TableCell align="right">December</TableCell>
                <TableCell align="right">{nextmonth}</TableCell>
                <TableCell align="right">{nextmonth}</TableCell>
                <TableCell align="right">{currentmonth}</TableCell>
                <TableCell align="right">{nextmonth}</TableCell>
                <TableCell align="right">{currentmonth}</TableCell>
                <TableCell align="right">{nextmonth}</TableCell>
                <TableCell align="right">{currentmonth}</TableCell>
                <TableCell align="right">{currentmonth}</TableCell>

                {/* <TableCell align="right">Date</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
            {/* cusip,name,issuedate,currface,cfincmo,cfinfed,cfinplat,coupon,gwac,wala,wam,va,cprprediction,cprpredictionnext,date */}

              {pools.map((row) => (
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
                  <TableCell align="right">{row.cprfuturepredictionnext}</TableCell>
                  <TableCell align="right">{row.cprfutureprediction}</TableCell>
                  <TableCell align="right">{row.curractualcprnext}</TableCell>
                  <TableCell align="right">{row.curractualcpr}</TableCell>
                  <TableCell align="right">{(row.curractualcprnext - row.cprfutureprediction).toFixed(1) != 0? (row.curractualcprnext - row.cprfutureprediction).toFixed(1) : ' '}</TableCell>
                  <TableCell align="right">{(row.curractualcpr - row.cprprediction).toFixed(1) != 0? (row.curractualcpr - row.cprprediction).toFixed(1) : ' '}</TableCell>
                  <TableCell align="right">{row.cdrfuturepediction}</TableCell>
                  <TableCell align="right">{row.curractualcdr}</TableCell>
                  <TableCell align="right">{(row.curractualcdr - row.currcdrprediction).toFixed(1) != 0 ? (row.curractualcdr - row.currcdrprediction).toFixed(1) : ' '}</TableCell>

                  {/* <TableCell align="right">{row.date}</TableCell> */}
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
    loadPools: ()=> {
      dispatch(loadPools());
    },
    loadPoolsByCoupon:(coupon)=> {
      dispatch(loadPoolsByCoupon(coupon));
    },
    loadPoolsByFloats:(float)=> {
      dispatch(loadPoolsByFloats(float));
    },
    loadPoolsByCouponsAndFloats:(coupon, float)=> {
      dispatch(loadPoolsByCouponsAndFloats(coupon, float));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(PoolTable);