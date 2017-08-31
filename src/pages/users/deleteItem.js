import React, {Component} from 'react'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

class DeleteItem extends Component{    
    deleteItem = (e) => {
        this.props.onDeleteItem(e);
    }
    render(){
        return(
           <Glyphicon onClick={this.deleteItem} glyph="remove" style={{cursor: 'pointer'}} data-value={this.props.name} />
        );
    }
}

export default DeleteItem