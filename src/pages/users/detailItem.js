import React from 'react'
import Panel from 'react-bootstrap/lib/Panel'
import {NavLink } from 'react-router-dom'

const DetailItem = (props) =>      
(
    <Panel header="User" bsStyle="primary">
        {props.res}
        <br /> <br /> 
        <NavLink to="/users" >Go back list</NavLink> 
    </Panel>
);
export default DetailItem