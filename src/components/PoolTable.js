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

import { loadPools } from '../store';

const useStyles = makeStyles({
  table: {
    minWidth: 730,
    maxWidth: 1200
  },
});

function numberWithCommas(x) {
  // console.log(x);
  x = x * 1;
  x = x.toFixed(2);
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

//rows are now created in store :) 
function PoolTable({ pools, loadPools, loadRowsByYear, bootstrap }) {
  const [searchA, setSearchA ] = useState('All');
  const [searchB, setSearchB ] = useState('All');
  const [searchYear, setSearchYear ] = useState('2021');
  const [searchMonth, setSearchMonth ] = useState('FEB');
  
  const [loading, setLoading ] = useState(true);

  console.log(pools[0])
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
    loadPools();
  },[]);

  const firstUpdate = useRef(true);

  //checks to see if deal name or group has changed but does not run the first time
//   useLayoutEffect(() => {
//     if (firstUpdate.current) {
//       firstUpdate.current = false;
//       return;
//     }
//     setLoading(true);
//     loadDataByDealandGroup(searchA, searchB, searchYear, searchMonth);
//   },[searchA, searchB, searchYear, searchMonth]);

  const classes = useStyles();
      
//   let dealNames = [];
//   rows.forEach(item=>dealNames.push(item.deal.toString()));
//   // seems to remove the duplicates
//   dealNames = [...new Set(dealNames)]
//   // console.log(dealNames);
  
//   let groups = [];
//   rows.forEach(item=>groups.push(item.group));
//   // data.forEach(item=>console.log(item.group));
//   // seems to remove the duplicates
//   groups = [...new Set(groups)]
//   // console.log(groups);

//   let years = [];
//   for (let i=2021; i > 2000; i--){
//     years.push(i.toString())
//   }

//   years.push('1999');

//   let months = ['FEB', 'MARCH', 'APRIL'];
  // console.log(searchA)
  // console.log(searchB)
  // console.log(searchYear)

  return (
    <div>
      {/* <Autocomplete
          id="combo-box-demo"
          options={months}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          onChange={(event, value)=>setSearchMonth(value)}
          renderInput={(params) => <TextField  {...params} label="Month" variant="outlined" onClick = {(ev)=> !ev.target.value && setSearchMonth('FEB')}  />}
        /> 
      <div className={ 'sideBySide' }>
         <Autocomplete
          id="combo-box-demo"
          options={years}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          onChange={(event, value)=>setSearchYear(value)}
          renderInput={(params) => <TextField  {...params} label="Year" variant="outlined" onClick = {(ev)=> !ev.target.value && setSearchYear('2021')}  />}
        /> 
        <Autocomplete
          id="combo-box-demo"
          options={dealNames}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          onChange={(event, value)=>setSearchA(value)}
          renderInput={(params) => <TextField  {...params} label="Deal Names" variant="outlined" onClick = {(ev)=> !ev.target.value && setSearchA('All')}  />}
        />
        
        <Autocomplete
          id="combo-box-pool-names"
          options={groups}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          onChange={(event, value)=>setSearchB(value)}
          renderInput={(params) => <TextField  {...params} label="Groups" variant="outlined" onClick = {(ev)=> !ev.target.value && setSearchB('All')} />}
        />  
      </div> */}

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
                {/* <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell align="center" colSpan={2}>
                  Actual {searchMonth}
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Predicted CPR
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Predicted VPR
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Predicted CDR
                </TableCell> */}
              </TableRow>
              <TableRow>
                <TableCell >CUSIP</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Issue Date</TableCell>
                <TableCell align="right">Current Face</TableCell>
                <TableCell align="right">CF in CMO</TableCell>
                <TableCell align="right">CF in FED</TableCell>
                <TableCell align="right">CF in Plat</TableCell>
                <TableCell align="right">Float</TableCell>  
                <TableCell align="right">Coupon</TableCell>
                <TableCell align="right">GWAC</TableCell>
                <TableCell align="right">WALA</TableCell>
                <TableCell align="right">WAM</TableCell>
                <TableCell align="right">VA</TableCell>
                <TableCell align="right">CPR Prediction</TableCell>
                <TableCell align="right">CPR Prediction Next</TableCell>
                <TableCell align="right">Date</TableCell>
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
                  <TableCell align="right">{row.cprprediction}</TableCell>
                  <TableCell align="right">{row.cprpredictionnext}</TableCell>
                  <TableCell align="right">{row.date}</TableCell>
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
    bootstrap: (year, month)=> {
      // dispatch(loadRows());
      // dispatch(loadInitialRows());
      console.log(year)
      dispatch(loadRowsByYear(year, month));
    },
    loadPools: ()=> {
      dispatch(loadPools());
    },
    loadRowsByYear: (year)=> {
      dispatch(loadRowsByYear(year));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(PoolTable);