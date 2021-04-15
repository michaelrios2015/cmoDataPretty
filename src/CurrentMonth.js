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
import { loadData, loadDataByDealandGroup, loadCurrentRows } from './store';


// need to clean up unused code getting some sort of error when first load does not break anything but not exactly good
// Same thing about pagination and loading


// lost the minwidth without this guy can probably be hard coded in somewhere 
// changed so cusip and pool would not run together should be a better way
const useStyles = makeStyles({
  table: {
    minWidth: 730,
  },
});

//rows are now created in store :) 
function CurrentMonth({ loadDataByDealandGroup, loadCurrentRows, currentrows }) {
  const [searchA, setSearchA ] = useState('All');
  const [searchB, setSearchB ] = useState('All');


  console.log(loadCurrentRows)
  console.log(loadDataByDealandGroup);
  useEffect(() => {
    loadDataByDealandGroup(searchA, searchB);
  },[searchA, searchB]);

  useEffect(() => {
    loadCurrentRows();
  },[]);

  console.log(currentrows);
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

      Deal Name:
                <select name='searchA' value={ searchA } onChange = { onChange }>
                        <option value = 'All'>All Deal Names</option>
                        {
                            dealNames.map( (dealName, idx) => { 
                                    return (
                                        <option key={ idx } value = { dealName }>
                                            { dealName } 
                                        </option>
                                    );
                                })
                        }
                </select>   
      Groups:
          <select name='searchB' value={ searchB } onChange = { onChange }>
                  <option value = 'All'>All Groups</option>
                  {
                      groups.map( (group, idx) => { 
                              return (
                                  <option key={ idx } value = { group }>
                                      { group } 
                                  </option>
                              );
                          })
                  }
          </select> 


      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell >Deal</TableCell>
              <TableCell align="right">Group</TableCell>
              <TableCell align="right">Feb CPR</TableCell>
              <TableCell align="right">March CPR</TableCell>
              <TableCell align="right">Feb VPR</TableCell>
              <TableCell align="right">March VPR</TableCell>
              <TableCell align="right">Feb CDR</TableCell>
              <TableCell align="right">March CDR</TableCell>
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
      </TableContainer>
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
      // dispatch(loadDataByDealandGroup(deal, group));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(CurrentMonth);