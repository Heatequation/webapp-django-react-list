import React from 'react';
import {Input, Modal, Button, Panel} from 'react-bootstrap';

export default class ModalForm extends React.Component {

  handleUpdate(e) {
    e.preventDefault();
    var entry = this.props.entry;
    if (!entry) { return; }
    this.props.onUpdate(entry);
    }

  handleDelete(e) {
    e.preventDefault();
    this.props.onDestroy(this.props.entry);
  }

  handleChange(e) {
    var change = this.props.entry;
    change[e.target.name] = e.target.value;
    this.props.onChange(change);
  }

  errorPanel()  {

    if (!this.props.errorMessage) return;
    return (
      <Panel header="Error!" bsStyle="danger">
        {this.props.errorMessage}
      </Panel>
    );
  }

  render() {
      return (
        <Modal show={this.props.showModal} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <form id="entry-form" action="" name="form" method="POST">
              <Input name="text" label="Text:" type="text"
                onChange={this.handleChange.bind(this)}
                value={this.props.entry.text}
                help = {this.props.errorMessage.text}
              />
              <Input name="date" label="Date:" type="datetime"
                onChange={this.handleChange.bind(this)}
                value={this.props.entry.date}
                help = {this.props.errorMessage.date}
              />
              <Input name="weight" label="Weight:" type="number"
                onChange={this.handleChange.bind(this)}
                value={this.props.entry.weight}
                help = {this.props.errorMessage.weight}
              />
              <Input name="category" label="Category:" type="select" onChange={this.handleChange.bind(this)} value={this.props.entry.category}>
                  <option value="0">---------</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
              </Input>
              </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.handleUpdate.bind(this)}>Update</Button>
            <Button bsStyle="primary" onClick={this.handleDelete.bind(this)}>Delete</Button>
            <Button onClick={this.props.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
  }


}
