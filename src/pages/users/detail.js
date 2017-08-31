import React, { Component } from 'react'
import * as firebase from "firebase"
import DetailItem from './detailItem'
import LoadingBar from '../../components/commons/loadingBar'

class Detail extends Component {  
  constructor(props) {
    super(props);    
    this.state = {name:'', sex: '', isLoader: true};
  }

  firebaseRef = null;
  componentWillMount() {
    this.firebaseRef = firebase.database().ref("users/"+  this.props.match.params.id);        
    this.firebaseRef.once("value", snapshot => {
        let hasName = snapshot.hasChild("name")?snapshot.val().name: ''; 
        let hasSex = snapshot.hasChild("sex")?snapshot.val().sex: '';
        this.setState({name: hasName, sex: hasSex, isLoader: false});
    });
  }
  componentWillUnmount() {
    this.firebaseRef.off();
  }
  render() {
      const loader = <LoadingBar />;      
      const {isLoader, name, sex} = this.state;
      let res = isLoader? loader :  `Hello: ${name} (${sex})`;
      return (
          <DetailItem res = {res} />          
      );
    }
}
export default Detail;