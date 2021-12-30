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

import { loadCMOS, loadCMOSYearDealGroup } from '../store';

const useStyles = makeStyles({
  table: {
    minWidth: 730,
    maxWidth: 1200
  },
});

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

//rows are now created in store :) 
function CMOTable({ cmos, loadCMOS, loadCMOSYearDealGroup }) {
  const [searchA, setSearchA ] = useState('All');
  const [searchB, setSearchB ] = useState('All');
  const [searchYear, setSearchYear ] = useState('2021');
  const [searchMonth, setSearchMonth ] = useState('FEB');
  
  const [loading, setLoading ] = useState(true);

  // console.log(cmos)
  //my homemade loading true or false again needed not sure
  useEffect(() => {
    console.log(cmos.length)
    if (cmos.length > 0){
      setLoading(false);
    }
  },[cmos]);

  //should be the first thing to load
  useEffect(() => {
    // setLoading(true);
    loadCMOS();
  },[]);

  const firstUpdate = useRef(true);

  // checks to see if deal name or group has changed but does not run the first time
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if(!searchYear){
      setSearchYear(2021);
    }

    if(!searchA){
      setSearchA('All');
    }

    if(!searchB){
      setSearchB('All');
    }
    
    setLoading(true);
    console.log(searchA, searchB, searchYear, searchMonth)
    loadCMOSYearDealGroup (searchYear, searchA, searchB);
  },[searchA, searchB, searchYear, searchMonth]);

  const classes = useStyles();
      
  let dealNames = [];
  cmos.forEach(item=>dealNames.push(item.deal.toString()));
  // seems to remove the duplicates
  dealNames = [...new Set(dealNames)]
  // // console.log(dealNames);
  
  let groups = [];
  cmos.forEach(item=>groups.push(item.group));
  // data.forEach(item=>console.log(item.group));
  // seems to remove the duplicates
  groups = [...new Set(groups)]
  // // console.log(groups);

  let years = [];
  for (let i=2021; i > 2000; i--){
    years.push(i.toString())
  }

  years.push('1999');

  let months = ['FEB', 'MARCH', 'APRIL'];
  // console.log(searchA)
  // console.log(searchB)
  // console.log(searchYear)

  return (
    <div>
      {/* <h1>February CMOs</h1> */}
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
          id="combo-box-demo"
          options={years}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          onChange={(event, value)=>setSearchYear(value)}
          renderInput={(params) => <TextField  {...params} label="Year" variant="outlined"   />}
        /> 
        <Autocomplete
          id="combo-box-demo"
          options={dealNames}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          onChange={(event, value)=>setSearchA(value)}
          renderInput={(params) => <TextField  {...params} label="Deal Names" variant="outlined" />}
        />
        
        <Autocomplete
          id="combo-box-pool-names"
          options={groups}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          onChange={(event, value)=>setSearchB(value)}
          renderInput={(params) => <TextField  {...params} label="Groups" variant="outlined" />}
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
                {/* <TableCell align="center" colSpan={3}>
                  NOV 2021 Data
                </TableCell> */}
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell align="right" colSpan={1}>
                  Current Face
                </TableCell>  
                <TableCell align="right" colSpan={1}>
                  Coupon
                </TableCell>  
                <TableCell align="center" colSpan={2}>
                  Predicted CPR 
                </TableCell>
                <TableCell align="center" colSpan={3}>
                  Actual CPR
                </TableCell>
                <TableCell align="center" colSpan={3}>
                  CPR RESID
                </TableCell>
                <TableCell align="center" colSpan={1}>
                  Predicted CDR
                </TableCell>
                <TableCell align="center" colSpan={1}>
                  Actual CDR 
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell >Year</TableCell>
                <TableCell align="right">Deal</TableCell>
                <TableCell align="right">Group</TableCell>
                {/* current face  */}
                <TableCell align="right">NOV</TableCell>
                {/* coupon  */}
                <TableCell align="right">NOV</TableCell>
                {/* predicted cpr */}
                <TableCell align="right">JAN</TableCell>
                <TableCell align="right">DEC</TableCell>
                {/* actual?? */}
                <TableCell align="right">NOV</TableCell>
                <TableCell align="right">OCT</TableCell>
                <TableCell align="right">SEP</TableCell>
                {/* RESID */}
                <TableCell align="right">NOV</TableCell>
                <TableCell align="right">OCT</TableCell>
                <TableCell align="right">SEP</TableCell>
                {/* CDR */}
                <TableCell align="right">DEC</TableCell>
                <TableCell align="right">NOV</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
              {cmos.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell component="th" scope="row"> {row.year} </TableCell>
                  <TableCell align="right">{row.deal}</TableCell>
                  <TableCell align="right">{row.group}</TableCell>
                  {/* currface */}
                  <TableCell align="right">{row.currface && numberWithCommas(row.currface)}</TableCell>
                  {/* predicted coupon */}
                  <TableCell align="right">{row.coupon}</TableCell>
                  {/* predicted cpr */}
                  <TableCell align="right">{row.predictedcprnext}</TableCell>
                  <TableCell align="right">{row.predictedcpr}</TableCell>
                  {/* actual cpr */}
                  <TableCell align="right">{row.cpr}</TableCell>
                  <TableCell align="right">{row.pastcpr}</TableCell>
                  <TableCell align="right">{row.twomonthspastcpr}</TableCell>
                  {/* cpr resid */}
                  <TableCell align="right">{row.resid}</TableCell>
                  <TableCell align="right">{row.pastresid}</TableCell>
                  <TableCell align="right">{row.twomonthspastresid}</TableCell>
                  <TableCell align="right">{row.predictedcdr}</TableCell>
                  <TableCell align="right">{row.cdr}</TableCell>
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
    loadCMOS: ()=> {
      dispatch(loadCMOS());
    },
    loadCMOSYearDealGroup: (year, deal, group)=> {
      dispatch(loadCMOSYearDealGroup(year, deal, group));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CMOTable);