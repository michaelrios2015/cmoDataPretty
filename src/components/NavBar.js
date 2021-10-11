import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
      <div>
        <div className = { 'nav' }>
          {/* <h2><Link to='/'>cmos</Link></h2> */}
          <h2><Link to='/'>G2</Link></h2>
          <h2><Link to='/platinums'>platinums</Link></h2>
        </div>
        <hr></hr>
      </div>
    );
  }


export default NavBar;
