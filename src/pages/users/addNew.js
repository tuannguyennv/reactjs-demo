import React, { Component } from 'react'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import Button from 'react-bootstrap/lib/Button'
import FormControl from 'react-bootstrap/lib/FormControl'
import Panel from 'react-bootstrap/lib/Panel'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'

import * as firebase from "firebase"

class AddNew extends Component {
    constructor(props) {
        super(props);    

        // this.handleChange = this.handleChange.bind(this);    
        this.state = {name: '', pw:'', sex:'', formIsValid: false
          , error : {name:'', pw:''}
          , errorName: true, errorPw:true
        };
    }
    firebaseRef = null;
    componentWillMount() {
        this.firebaseRef = firebase.database().ref("users");  
    }
    componentWillUnmount() {
        this.firebaseRef.off();
    }
    submitData = (e)=> {
        e.preventDefault();
        this.firebaseRef.child(this.state.name).set({
              name: this.state.name, sex: this.state.sex, password: this.state.pw
            });
        this.props.history.push('/users');
    }
    setValidField = (val, field) =>{
        let flag = false;
        let mes = '';
        let fieldErr = '';
        if(field === 'name'){
            fieldErr = 'errorName';
            if(!val.match(/^[a-zA-Z0-9]+$/)){
                mes ='Only letter a-zA-Z0-9!';
                flag = true;
            }
            else mes ='';
        } 
        if(field === 'pw'){
            fieldErr = 'errorPw';
            if(val === ''){
                mes ='Please enter your password';
                flag = true;
            }
            else mes ='';
        }                
        this.setState({error: {[field] : mes}, [fieldErr] : flag}, this.setValidForm);
        
    }
    setValidForm = ()=>{
        this.setState({formIsValid: (!this.state.errorName && !this.state.errorPw)});
    }
    handleChange = (e) => {    
        const valueCheck = e.target.value;
        const nameCheck = e.target.name;
       
        this.setState({[nameCheck] : valueCheck }, this.setValidField(valueCheck, nameCheck));
    }
    render() { 
        return (
            <form onSubmit={this.submitData}>
                <Panel header="New user" bsStyle="primary">
                    <FormGroup controlId="name" validationState={this.state.errorName === false? 'success': 'error'}>
                        <FormControl className="margin-bot-list-item" type="text" value={this.state.name}
                        placeholder="Enter username" name="name" onChange={this.handleChange} />
                        <HelpBlock>{this.state.error.name}</HelpBlock>
                    </FormGroup>
                    <FormGroup controlId="pw" validationState={this.state.errorPw === false? 'success': 'error'}>
                        <FormControl className="margin-bot-list-item" type="password" value={this.state.pw}
                        placeholder="Enter password" name="pw" onChange={this.handleChange} />
                        <HelpBlock>{this.state.error.pw}</HelpBlock>
                    </FormGroup>
                    <FormGroup controlId="formControlsSelect">                    
                        <FormControl componentClass="select" placeholder="select" value={this.state.sex} name="sex" onChange={this.handleChange}>
                            <option value="">Select sex</option>
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </FormControl>
                    </FormGroup>
                    <Button type="submit" bsStyle="primary" disabled={!this.state.formIsValid}>Save</Button>
                </Panel>
            </form>
        );
    }
}
export default AddNew