/**
 * author: tuannguyen
 * @providesModule List
 */

import React, { Component } from "react";
import Helmet from "react-helmet";

import Panel from "react-bootstrap/lib/Panel";
import * as firebase from "firebase";
import ListItems from "./listItems";
import SearchBar from "./searchBar";
import LoadingBar from "../../components/commons/loadingBar";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: "",
      items: [],
      isLoader: true,
      showDeleteStatus: false
    };
  }
  firebaseRef = null;
  componentWillMount() {
    this.firebaseRef = firebase.database().ref("users");
    this.firebaseRef.limitToLast(25).on("value", dataSnapshot => {
      var items = [];
      dataSnapshot.forEach(childSnapshot => {
        var item = childSnapshot.val();
        item["key"] = childSnapshot.key;
        items.push(item);
      });
      this.setState({
        items: items,
        isLoader: false
      });
    });
  }
  componentWillUnmount() {
    this.firebaseRef.off();
  }
  changeInput = e => {
    this.setState({ searchName: e.target.value });
  };
  render() {
    const loader = <LoadingBar />;
    let listItems = this.state.isLoader ? (
      loader
    ) : (
      <ListItems searchName={this.state.searchName} items={this.state.items} />
    );
    return (
      <Panel header="Users" bsStyle="primary">
        <Helmet>
          <title>List of users</title>
          <meta name="description" content="List of users in system" />
        </Helmet>
        <SearchBar
          searchName={this.state.searchName}
          onChangeInput={this.changeInput}
        />
        {listItems}
      </Panel>
    );
  }
}
export default List;
