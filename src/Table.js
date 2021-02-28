// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { loadData } from './store';

// //pagination would really help this simple front end is easy but not not be helpful since we are trying to speed it up
// //should there be three calls one that gets 100 items per page and keeps going one for each search of a cusip and poolname
// //probably  

// class Table extends Component{
//         constructor(){
//           super();
//           this.state = {
//             searchA: 'All',
//             searchB: 'All', 
//           };
//           this.onChange = this.onChange.bind(this);
//         }
      
//         componentDidMount(){
//           this.props.bootstrap();
//           // console.log(this.props)
       
//         }
      
//         onChange(ev){
//           const change = {};
//           console.log(change);
//           change[ev.target.name] = ev.target.value;
//           this.setState(change);
//         }


// render(){
//     let { data } = this.props;
//     let groups = [];
//     data.forEach(item=>groups.push(item.group));
//     // data.forEach(item=>console.log(item.group));
//     // seems to remove the duplicates
//     groups = [...new Set(groups)]
//     // console.log(groups);
    
//     let dealNames = [];
//     data.forEach(item=>dealNames.push(item.deal));
//     // seems to remove the duplicates
//     dealNames = [...new Set(dealNames)]
//     // console.log(dealNames);
    
//     const { onChange } = this;
//     const { searchA, searchB } = this.state;

//     // this works but need a drop down menu at least 
//     if( searchA !== 'All'){
//       data = data.filter((item)=> item.group === searchA);
//     }
//     if( searchB !== 'All'){
//       data = data.filter((item)=> item.deal.includes(searchB));
//     }

//     return(
//         <div className = { 'myTable' }>
//           {/* It would be cool to make my own autocomplete which does not seem really hard but I don't have time right now
//           it would somehow have to combine a input box with a select box, I think and filter through options as you type */}
//             Groups:
//             <select name='searchA' value={ searchA } onChange = { onChange }>
//                     <option value = 'All'>Choose a Group</option>
//                     {
//                         groups.map( (group, idx) => { 
//                                 return (
//                                     <option key={ idx } value = { group }>
//                                         { group } 
//                                     </option>
//                                 );
//                             })
//                     }
//             </select>
//             Deal Name:
//             <select name='searchB' value={ searchB } onChange = { onChange }>
//                         <option value = 'All'>Choose a Deal Name</option>
//                         {
//                             dealNames.map( (dealName, idx) => { 
//                                     return (
//                                         <option key={ idx } value = { dealName }>
//                                             { dealName } 
//                                         </option>
//                                     );
//                                 })
//                         }
//                 </select>   
//             <table >
//                 <thead>
//                         <tr>
//                             <th>Group</th>
//                             <th>Deal</th>
//                             <th>CPR</th>
//                             <th>CPR Next</th>
//                             <th>VPR</th>
//                             <th>VPR Next</th>
//                             <th>CDR</th>
//                             <th>CDR Next</th>
//                             <th>CurrFace</th>
//                         </tr>   
//                     </thead>
//                 <tbody>
//                     {
//                         data.map( item => { 
//                             return (
//                                 <tr key={ item.id }> 
//                                     <td key={ item.id + 1} >
//                                         { item.group }
//                                     </td>
//                                     <td key={ item.id + 2 }>
//                                         { item.deal }    
//                                     </td>
//                                     <td key={ item.id + 3}>
//                                         { item.cpr }    
//                                     </td>
//                                     <td key={ item.id + 4}>
//                                         { item.cprNext }    
//                                     </td>
//                                     <td key={ item.id + 5}>
//                                         { item.vpr }    
//                                     </td>
//                                     <td key={ item.id + 6}>
//                                         { item.vprNext }    
//                                     </td>
//                                     <td key={ item.id + 7}>
//                                         { item.cdr }    
//                                     </td>
//                                     <td key={ item.id + 8}>
//                                         { item.cdrNext }    
//                                     </td>
//                                     <td key={ item.id + 9}>
//                                         { item.currFace }    
//                                     </td>
//                                 </tr>
//                                 );
//                             })       
//                     }
//                 </tbody>
//             </table>
//         </div>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//     return state;
//   }
  
// const mapDispatchToProps = (dispatch) => {
//     return {
//       bootstrap: ()=> {
//         dispatch(loadData());
//       }
//     };
//   }
  
// export default connect(mapStateToProps, mapDispatchToProps)(Table);

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
function BasicTable({ rows }) {
  const [searchA, setSearchA ] = useState('');
  const [searchB, setSearchB ] = useState('');


  useEffect(() => {
    
    setSearchA(searchA)
    
  },[searchA]);


  function onChangeTwo(data){

    setSearchA(data);

  }

  const classes = useStyles();
  

  let cusipsTwo = [{cusip: ''}];
  rows.forEach(item=>cusipsTwo.push({cusip: item.Cusip}));
  // console.log(cusipsTwo);
  let poolNamesTwo = [];
  rows.forEach(item=>poolNamesTwo.push({poolname: item.PoolName}));

  console.log(searchA)
  if (searchA !== ''){
    rows = rows.filter((item)=> item.Cusip === searchA);
    // console.log(rows)
  }
  if (searchB !== ''){
    rows = rows.filter((item)=> item.PoolName.includes(searchB));
    console.log(rows)
  }

  return (
    <div>
              <Autocomplete
              id="combo-box-demo"
              options={cusipsTwo}
              getOptionLabel={(option) => option.cusip}
              style={{ width: 300 }}
              // getOptionSelected={(value) => console.log(value)}
              getOptionSelected={(option, value) => {if (option.cusip === value.cusip){ onChangeTwo(option.cusip)}}}
              renderInput={(params) => <TextField  {...params} label="Cusips" variant="outlined" onClick = {(ev)=> !ev.target.value && setSearchA('')}  />}
    />
               {/* <Autocomplete
              id="combo-box-pool-names"
              options={poolNamesTwo}
              getOptionLabel={(option) => option.poolname}
              style={{ width: 300 }}
              getOptionSelected={(option, value) => option.poolname === value.poolname && setSearchB(option.poolname)}
              renderInput={(params) => <TextField  {...params} label="Pool Names" variant="outlined" onClick = {(ev)=> !ev.target.value && setSearchB('')} />}
    /> */}


      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell >Cusip</TableCell>
              <TableCell align="right">Pool Name</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Month</TableCell>
              <TableCell align="right">CF</TableCell>
              <TableCell align="right">Coupon</TableCell>
              <TableCell align="right">GWAC</TableCell>
              <TableCell align="right">WALA</TableCell>
              <TableCell align="right">WAM</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row"> {row.group} </TableCell>
                <TableCell align="right">{row.deal}</TableCell>
                <TableCell align="right">{row.cpr}</TableCell>
                <TableCell align="right">{row.cprNext}</TableCell>
                <TableCell align="right">{row.vpr}</TableCell>
                <TableCell align="right">{row.vprNext}</TableCell>
                <TableCell align="right">{row.cdr}</TableCell>
                <TableCell align="right">{row.cdrNext}</TableCell>
                <TableCell align="right">{row.currFace}</TableCell>
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


export default connect(mapStateToProps, null)(BasicTable);