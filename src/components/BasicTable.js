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

import { loadDataByDealandGroup, loadRows, loadInitialRows, loadRowsByYear } from '../store';

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
function BasicTable({ rows, loadDataByDealandGroup, loadRowsByYear, bootstrap }) {
  const [searchA, setSearchA ] = useState('All');
  const [searchB, setSearchB ] = useState('All');
  const [searchYear, setSearchYear ] = useState('2021');
  
  const [loading, setLoading ] = useState(true);

  //this is just supposed to be called the first time page is loaded might not be neccessary 
  // useEffect(() => {
  //   bootstrap('2021');
  // },[]);

  console.log(rows)
  //my homemade loading true or false again needed not sure
  useEffect(() => {
    console.log(rows.length)
    if (rows.length > 0){
      setLoading(false);
    }
  },[rows]);

  //checks to see if year has changed
  useEffect(() => {
    setLoading(true);
    loadRowsByYear('2021');
  },[]);

  const firstUpdate = useRef(true);

  //checks to see if deal name or group has changed but does not run the first time
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setLoading(true);
    loadDataByDealandGroup(searchA, searchB, searchYear);
  },[searchA, searchB, searchYear]);

  const classes = useStyles();
      
  let dealNames = [];
  rows.forEach(item=>dealNames.push(item.deal.toString()));
  // seems to remove the duplicates
  dealNames = [...new Set(dealNames)]
  // console.log(dealNames);
  
  let groups = [];
  rows.forEach(item=>groups.push(item.group));
  // data.forEach(item=>console.log(item.group));
  // seems to remove the duplicates
  groups = [...new Set(groups)]
  // console.log(groups);

  let years = [];
  for (let i=2021; i > 1998; i--){
    years.push(i.toString())
  }

  // console.log(searchA)
  // console.log(searchB)
  // console.log(searchYear)

  return (
    <div>
      <h1>February CMOs</h1>
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
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell align="center" colSpan={2}>
                  Actual Feb
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Predicted CPR
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Predicted VPR
                </TableCell>
                <TableCell align="center" colSpan={2}>
                  Predicted CDR
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell >Year</TableCell>
                <TableCell align="right">Deal</TableCell>
                <TableCell align="right">Group</TableCell>
                <TableCell align="right">Current Face</TableCell>
                <TableCell align="right">CPR</TableCell>
                <TableCell align="right">Residual</TableCell>
                <TableCell align="right">Feb CPR</TableCell>
                <TableCell align="right">March CPR</TableCell>
                <TableCell align="right">Feb VPR</TableCell>
                <TableCell align="right">March VPR</TableCell>
                <TableCell align="right">Feb CDR</TableCell>
                <TableCell align="right">March CDR</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row"> {row.year} </TableCell>
                  <TableCell align="right">{row.deal}</TableCell>
                  <TableCell align="right">{row.group}</TableCell>
                  <TableCell align="right">{numberWithCommas(row.currFace)}</TableCell>
                  <TableCell align="right">{row.actualCpr}</TableCell>
                  <TableCell align="right">{row.residual}</TableCell>
                  <TableCell align="right">{row.cpr}</TableCell>
                  <TableCell align="right">{row.cprNext}</TableCell>
                  <TableCell align="right">{row.vpr}</TableCell>
                  <TableCell align="right">{row.vprNext}</TableCell>
                  <TableCell align="right">{row.cdr}</TableCell>
                  <TableCell align="right">{row.cdrNext}</TableCell>
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
    bootstrap: (year)=> {
      // dispatch(loadRows());
      // dispatch(loadInitialRows());
      console.log(year)
      dispatch(loadRowsByYear(year));
    },
    loadDataByDealandGroup: (deal, group, year)=> {
      dispatch(loadDataByDealandGroup(deal, group, year));
    },
    loadRowsByYear: (year)=> {
      dispatch(loadRowsByYear(year));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(BasicTable);