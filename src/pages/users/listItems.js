import React from 'react'
import Table from 'react-bootstrap/lib/Table'
import Alert from 'react-bootstrap/lib/Alert'
import {Link } from 'react-router-dom'
import * as firebase from "firebase"
import DeleteItem from './deleteItem'

class ListItems extends React.Component{
    constructor(props) {
        super(props);                
        this.state = {showDeleteStatus: false};        
    }
    firebaseRef = null;
    componentWillMount() {
        this.firebaseRef = firebase.database().ref("users");        
    }   
    componentWillUnmount() {
        this.firebaseRef.off();
    }
    deleteItem = (e) => {
        const id = e.target.getAttribute('data-value');
        if(id !== undefined)
        {
            this.firebaseRef.child(id).remove((error)=>{
                this.setState({
                    showDeleteStatus: true
                });
                // hide message after 5 seconds
                setTimeout(() =>{
                    this.setState({showDeleteStatus: false});
                }, 5000);
            });
        }
    }
    render(){        
        const searchName = this.props.searchName;
        let successLabel = this.state.showDeleteStatus ? <Alert bsStyle="success">Item removed successfully</Alert> : '';
        let listItems = [];
        this.props.items.forEach((item) => {
                if(item.name.indexOf(searchName)!==-1){
                    listItems.push(
                        <CreateRow key={item.key} name={item.name} deleteItem= {this.deleteItem} />
                    );
                }
            }
        );
        return(
            <Table responsive striped bordered condensed hover>
                <CreateHeader />
                <tbody>
                    {listItems}
                    <tr><td colSpan="2">{successLabel}</td></tr>
                 </tbody>
            </Table>
        );
    }
}
const CreateHeader = () =>(
    <thead><tr><th style={{textAlign: 'center'}}>Name</th><th style={{textAlign: 'center'}}>Action</th></tr></thead>
);
const CreateRow = (props) =>(
    <tr>
        <td><Link to={`/users/${props.name}`}>{props.name}</Link></td>
        <td><DeleteItem onDeleteItem={props.deleteItem} name={props.name} /></td>
    </tr>
);

export default ListItems