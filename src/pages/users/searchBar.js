import React, { Component } from 'react'
import FormControl from 'react-bootstrap/lib/FormControl'

class SearchBar extends Component {
    changeInput = (e)=>{
        this.props.onChangeInput(e);
    }
    render() {    
        return (
            <form>
                <FormControl className="margin-bot-list-item"
                type="text" value={this.props.searchName}
                placeholder="Enter user name" onChange={this.changeInput} />            
            </form>
        );
        }
}
export default SearchBar