import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import search from '../../actions';
import { Glyphicon } from 'react-bootstrap';
import services from '../../service/services'
import './style.css';

class SearchContact extends Component {

  //Filtra contactos según texto ingresado
  handleSearchContact = e => {
    services.searchContact(this.state.text)
      .then(response => {
        if (response.status !== 200) {
          console.log('Error: ' + response.status);
          return new Error();
        }
        return response.json();
      })
      .then(data => {
        this.props.dispatch(search(data))
      })
      .catch(err => {
        console.log('Error', err);
      });
    /* } */
  }

  constructor(props) {
    super(props);
    this.state = { text: this.props.text };
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
  }

  render() {
    return (
      <div className="search has-feedback has-feedback-left">
        <input type="text" className="form-control" id="search" onChange={this.handleChange} onKeyUp={this.handleSearchContact} placeholder="Buscar contacto.." />
        <Glyphicon className="form-control-feedback" glyph="search" />
      </div>

    )
  }

}
export default withRouter(connect()(SearchContact));