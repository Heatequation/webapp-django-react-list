import React from 'react';
import $ from "jquery";
import {Badge} from 'react-bootstrap'
import MyList from './MyList.jsx';
import ModalForm from './ModalForm.jsx';
import AddBar from './AddBar.jsx';


export default class MainContainer extends React.Component {

  constructor(props) {
      super(props);

      var tmp_entry = {};
      tmp_entry.text = '';
      tmp_entry.date = '';
      tmp_entry.category = '';
      tmp_entry.weight = '';

      this.state = {
        entries: [],
        showModal: false,
        errorMessage: {} ,
        detail_entry: tmp_entry
      };
  }

  componentDidMount() {
    /*begin csrf stuff */
    function getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
          var cookie = $.trim(cookies[i]);
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) == (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');
    function csrfSafeMethod(method) {
      // these HTTP methods do not require CSRF protection
      return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
      beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
          xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
      }
    });
    /*end csrf */

    this.loadAccsFromServer();
  }

  loadAccsFromServer() {
    $.ajax({
      url: "../../../basic_list/entries/",
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        this.setState({entries: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  }

  openModalForm(id) {
    $.ajax({
      url: "../../../basic_list/entries/" + id + "/",
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        this.setState({detail_entry: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
        window.alert("Loading this entry failed. Sorry!");
      }.bind(this)
      });
    this.setState({ showModal: true });
  }


  closeModal() {
    this.setState(
      {
        showModal: false,
        errorMessage: {}
      }
    );
  }

  handleFormChange(entry) {
    this.setState({detail_entry: entry});
  }

  handleSubmit(entry) {
    var entries = this.state.entries;
    entry.id = Date.now();

    var newEntries = this.state.entries;
    var oldEntries = newEntries;
    newEntries.unshift(entry);
    this.setState({entries: newEntries});

    $.ajax({
      url: "../../../basic_list/entries/",
      type: 'POST',
      data: entry,
      success: function(data) {
        this.loadAccsFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({entries: oldEntries});
        console.error(status, err.toString());
        console.error(xhr.responseText);
      }.bind(this)
    });
  }

  handleUpdate(entry) {
    $.ajax({
      url: "../../../basic_list/entries/" + entry.id + "/",
      type: 'PUT',
      data: entry,
      success: function(data) {
        this.loadAccsFromServer();
        this.closeModal();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
        console.error(JSON.parse(xhr.responseText));
        this.setState({errorMessage: JSON.parse(xhr.responseText)});
      }.bind(this)
    });
  }

  handleDestroy(entry) {
    $.ajax({
      url: "../../../basic_list/entries/" + entry.id + "/",
      type: 'DELETE',
      success: function(data) {
        this.loadAccsFromServer();
        this.closeModal();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
        console.error(xhr.responseText);
      }.bind(this)
    });
  }

  /* implement bootstrap's css file! */
  render() {

    var biggest_data = [];
    var recent_data = [];

    this.state.entries.forEach(function(entry, index) {
        if (entry.weight > 1) {
          biggest_data.push(entry);
        }
        if (index < 10) {
          recent_data.push(entry);
        }
      }.bind(this)
    );

    return (
      <div>
        <h1>
          Overview <span>   </span>
          <Badge>
            {this.state.entries.length}
          </Badge>
        </h1>
        <AddBar onSubmit={this.handleSubmit.bind(this)} />
        <MyList
            listType="recent"
            entries={recent_data}
            openModalForm={this.openModalForm.bind(this)}
        />
        <MyList
            listType="biggest"
            entries={biggest_data}
            openModalForm={this.openModalForm.bind(this)}
        />
        <ModalForm
          showModal = {this.state.showModal}
          entry = {this.state.detail_entry}
          errorMessage = {this.state.errorMessage}
          close = {this.closeModal.bind(this)}
          onChange = {this.handleFormChange.bind(this)}
          onUpdate = {this.handleUpdate.bind(this)}
          onDestroy = {this.handleDestroy.bind(this)}
        />
      </div>
    );
  }
}
