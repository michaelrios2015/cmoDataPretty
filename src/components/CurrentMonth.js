import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { loadCurrentDataByDealandGroup, loadCurrentRows } from '../store';

//There should be a way of combining BasicTable and this, I think it should just be able to see the url
// and tell what it is supposed to use but not entirely sure 

const useStyles = makeStyles({
  table: {
    minWidth: 730,
    maxWidth: 1000
  },
});

const StyledTableContainer = withStyles((theme) => ({
  root: {
    width: "max-content"
  }
}))(TableContainer);
const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: "0px 0px"
  }
}))(TableCell);


//rows are now created in store :) 
function CurrentMonth({ loadDataByDealandGroup, loadCurrentRows, currentrows }) {
  const [searchA, setSearchA ] = useState('All');
  const [searchB, setSearchB ] = useState('All');
  const [loading, setLoading ] = useState(true);

  //console.log(loadCurrentRows)
  //console.log(loadDataByDealandGroup);
  
  useEffect(() => {
    setLoading(true);
    loadDataByDealandGroup(searchA, searchB);
  },[searchA, searchB]);

  useEffect(() => {
    loadCurrentRows();
  },[]);

  useEffect(() => {
    console.log(currentrows.length)
    if (currentrows.length > 0){
      setLoading(false);
    }
  },[currentrows]);

  // console.log(currentrows);

  const classes = useStyles();
      
  let dealNames = [];
  currentrows.forEach(item=>dealNames.push(item.deal));
  // seems to remove the duplicates
  dealNames = [...new Set(dealNames)]
  // console.log(dealNames);
  
  let groups = [];
  currentrows.forEach(item=>groups.push(item.group));
  // data.forEach(item=>console.log(item.group));
  // seems to remove the duplicates
  groups = [...new Set(groups)]
  // console.log(groups);

  
  console.log(searchA)
  console.log(searchB)

  return (
    <div>
      <h1>March CMOs</h1>
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
            <h1>LOADING</h1>
          </div>
        ) 
        :  
        (
          <StyledTableContainer component={Paper}>   
              <Table className={classes.table} aria-label="simple table">
              <colgroup>
                <col style={{width:'50'}}/>
                <col style={{width:'50'}}/>
                <col style={{width:'50'}}/>
                <col style={{width:'50'}}/>
                <col style={{width:'50'}}/>
                <col style={{width:'50'}}/>
                <col style={{width:'50'}}/>
                <col style={{width:'50'}}/>
                <col style={{width:'50'}}/>
              </colgroup>
            <TableHead>
              <TableRow>
                <TableCell >Deal</TableCell>
                <TableCell align="right">Group</TableCell>
                <TableCell align="right">March CPR</TableCell>
                <TableCell align="right">April CPR</TableCell>
                <TableCell align="right">March VPR</TableCell>
                <TableCell align="right">April VPR</TableCell>
                <TableCell align="right">March CDR</TableCell>
                <TableCell align="right">April CDR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentrows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row"> {row.deal} </TableCell>
                  <TableCell align="right">{row.group}</TableCell>
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
        </StyledTableContainer>
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
    loadCurrentRows: ()=> {
      dispatch(loadCurrentRows());
    },
    loadDataByDealandGroup: (deal, group)=> {
      dispatch(loadCurrentDataByDealandGroup(deal, group));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CurrentMonth);