import React, { Component } from 'react'
import logo from '../pages/logo.svg'
import {NavLink } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>React hello NVG</h2>
            <div className="nav nav-tabs">
              <li><NavLink activeClassName='active' to='/'>Home</NavLink></li>
              <li><NavLink activeClassName='active' to='/users'>Users</NavLink></li>
              <li><NavLink activeClassName='active' to='/users/add'>Add user</NavLink></li>
            </div>
          </div>
    )
  }
}

export default Header;