import React from 'react';
import {ListGroup} from 'react-bootstrap';
import MyItem from './MyItem.jsx'

export default class MyList extends React.Component {

  render() {

    var entries = [];

    this.props.entries.forEach(function(entry) {
      entries.push(
        <MyItem
          entry={entry}
          onClick={this.props.openModalForm.bind(null, entry.id)}
          key={entry.id}
        />
      );
    }.bind(this));

    return (
      <div>
        <h2>{this.props.listType} items</h2>
        <ListGroup>
          {entries}
        </ListGroup>
      </div>
    );
  }




}
