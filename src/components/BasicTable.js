import React, { useState, useEffect } from 'react';
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
import CircularProgress from '@material-ui/core/CircularProgress';

import { loadData, loadDataByDealandGroup, loadRows } from '../store';

const useStyles = makeStyles({
  table: {
    minWidth: 730,
  },
});

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

//rows are now created in store :) 
function BasicTable({ rows, loadDataByDealandGroup }) {
  const [searchA, setSearchA ] = useState('All');
  const [searchB, setSearchB ] = useState('All');
  
  const [loading, setLoading ] = useState(true);

  console.log(loadDataByDealandGroup);
  
  useEffect(() => {
    loadRows();
    // console.log(rows.length)
    // if (rows.length > 0){
    //   setLoading('false');
    // }
  },[]);

  useEffect(() => {
    console.log(rows.length)
    if (rows.length > 0){
      setLoading(false);
    }
  },[rows]);


  console.log(loading);
  useEffect(() => {
    setLoading(true);
    loadDataByDealandGroup(searchA, searchB);
  },[searchA, searchB]);

  //feel like I am not really doing this right 
  function onChange(ev){
    const change = {};
    console.log(change);
    change[ev.target.name] = ev.target.value;
    // this.setState(change);
    if (change.searchA){
    setSearchA(change.searchA)}
    if (change.searchB) {
    setSearchB(change.searchB)}
  }
  const classes = useStyles();
      
  let dealNames = [];
  rows.forEach(item=>dealNames.push(item.deal));
  // seems to remove the duplicates
  dealNames = [...new Set(dealNames)]
  // console.log(dealNames);
  
  let groups = [];
  rows.forEach(item=>groups.push(item.group));
  // data.forEach(item=>console.log(item.group));
  // seems to remove the duplicates
  groups = [...new Set(groups)]
  // console.log(groups);

  
  console.log(searchA)
  console.log(searchB)

  return (
    <div>
      <div className={ 'sideBySide' }>
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
            <CircularProgress />
            <p>LOADING</p>
          </div>
        ) 
        :       
        (<TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell >Deal</TableCell>
                <TableCell align="right">Group</TableCell>
                <TableCell align="right">CPR</TableCell>
                <TableCell align="right">Residual</TableCell>
                <TableCell align="right">Feb CPR</TableCell>
                <TableCell align="right">March CPR</TableCell>
                <TableCell align="right">Feb VPR</TableCell>
                <TableCell align="right">March VPR</TableCell>
                <TableCell align="right">Feb CDR</TableCell>
                <TableCell align="right">March CDR</TableCell>
                <TableCell align="right">Current Face</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row"> {row.deal} </TableCell>
                  <TableCell align="right">{row.group}</TableCell>
                  <TableCell align="right">{row.actualCpr}</TableCell>
                  <TableCell align="right">{row.residual}</TableCell>
                  <TableCell align="right">{row.cpr}</TableCell>
                  <TableCell align="right">{row.cprNext}</TableCell>
                  <TableCell align="right">{row.vpr}</TableCell>
                  <TableCell align="right">{row.vprNext}</TableCell>
                  <TableCell align="right">{row.cdr}</TableCell>
                  <TableCell align="right">{row.cdrNext}</TableCell>
                  <TableCell align="right">{numberWithCommas(row.currFace)}</TableCell>
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
    bootstrap: ()=> {
      dispatch(loadRows());
    },
    loadDataByDealandGroup: (deal, group)=> {
      dispatch(loadDataByDealandGroup(deal, group));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(BasicTable);