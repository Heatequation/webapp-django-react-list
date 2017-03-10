import React from 'react';
import {Button, Input} from 'react-bootstrap';

export default class AddBar extends React.Component{

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  handleTextChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var text = this.state.text.trim();
    var d = new Date();
    var date = d.toISOString();
    if (!text) {
      return;
    }
    this.props.onSubmit({text: text, date: date});
    this.setState({text: ''});
  }

  render() {
    const submitButton = <Button type="submit" bsStyle="primary">Add</Button>;

    return (
       <form className="AddForm" onSubmit={this.handleSubmit.bind(this)}>
        <Input
          type="text"
          placeholder="New entry..."
          value={this.state.text}
          onChange={this.handleTextChange.bind(this)}
          buttonAfter={submitButton}
        />
      </form>
    );
  }
}
