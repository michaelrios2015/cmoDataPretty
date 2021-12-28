import React from "react";
// import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

// Probably not using this right but it's working so..

const NavBar = () => {
    return (
      
      <Box
      sx={{
        typography: 'body1',
        '& > :not(style) + :not(style)': {
          ml: 2,
        },
      }}
    >
      <div className = { 'nav' }>
        <h2><Link href="#/">Ginnies</Link></h2>
        <h2><Link href="#/graph">Graph</Link></h2>
        </div>
    </Box>
  
    );
  }


export default NavBar;


