import React from 'react';
import {ListGroupItem} from 'react-bootstrap';

export default class MyItem extends React.Component {

  styleItem(category) {
    switch (category) {
      case 1: return {background: '#fdffb2'};
      case 2: return {background: '#b2ffb5'};
      case 3: return {background: '#ffb5b2'};
      case 4: return {background: '#b3b2ff'};
      case 5: return {background: 'LightGrey'};
      default: return {background: 'white'};
    }
  }

  render() {
    var style = {};
    if (this.props.entry.category) {
        style = this.styleItem(this.props.entry.category);
    }

    return (
        <ListGroupItem
          style = {style}
          onClick={this.props.onClick}>
            { this.props.entry.text }
        </ListGroupItem>
    );
  }
}
