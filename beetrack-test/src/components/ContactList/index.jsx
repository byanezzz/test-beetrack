import React, { Component } from 'react';
import { connect } from 'react-redux';
import search from '../../actions';
import SearchContact from '../SearchContact';
import Header from '../Header';
import AddButton from '../AddButton';
import PaginationButton from '../PaginationButton';
import { Row, Col, Grid, Media, Image } from 'react-bootstrap';
import services from '../../service/services'
import './style.css'


class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactTable: [],
      show: false,
      nPag: 1,
      nReg: 0,
      nLimit: 3
    };
  }
  unsubscribe = this.props.store.subscribe(() => {
    let previousValue = this.props.store.getState().search.result;
    if (previousValue !== undefined) {
      this.setState({ contactTable: previousValue });
    }
  })
  handleShow = () => {
    this.setState({ show: true });
  }
  handleHide = () => {
    this.setState({ show: false });
  }
  componentWillMount() {
    this.contacts();
  }
  contacts = () => {
      services.getContacts(this.state.nPag, this.state.nLimit)
      .then(response => {
        if (response.status !== 200) {
          console.log('Error: ' + response.status);
          return new Error();
        }
        return response.json();
      })
      .then(data => {
        this.state.nReg = data.length;
        this.props.dispatch(search(data));
      })
      .catch(err => {
        console.log('Error', err);
      });
  }
  handleDelete = (e) => {
    let id = e.target.attributes["data-id"].value;
      services.deleteContact(id)
      .then(response => {
        if (response.status !== 200) {
          console.log('Error: ' + response.status);
          return new Error();
        }
        this.contacts();
      })
      .catch(err => {
        console.log('Error', err);
      });
  }
  render() {
    return (
      <div className="listContact">
        <Header />
        <Row>
          <Col md={4} className="pd-right">
            <SearchContact contact={this.contacts} />
          </Col>
          <Col md={8} className="pull-right">
            <AddButton contact={this.contacts} />
          </Col>
        </Row>
        <div className="contactList">
          <Row className="contactListTitle">
            <Col md={4} className="">
              <strong>Nombre</strong>
            </Col>
            <Col md={8} className="">
              <strong>Descripción</strong>
            </Col>
          </Row>
          {this.state.contactTable.map(v => {
            return (
              <Row key={v.id} id={v.id} className="contactRow">
                <Col md={4} className="contactImg">
                  < Media >
                    < Media.Left >
                      <Image width={64} height={64} src={v.photo} alt={v.name} circle />
                    </ Media.Left >
                    < Media.Body >
                      < Media.Heading > <strong>{v.name}</strong> </ Media.Heading >
                      < a onClick={this.handleDelete} data-id={v.id} className="delete"> Eliminar </ a >
                    </ Media.Body >
                  </ Media >
                </Col>
                <Col md={8} className="contactDescription">
                  {v.description}
                </Col>
              </Row>
            );
          })
          }
        </div>
        <Row>
          <Col md={6}>
            <PaginationButton title="Página Anterior" arrowLeft="true" scopeContact={this} />
          </Col>
          <Col md={6}>
            <PaginationButton title="Siguiente página" arrowRight="true" scopeContact={this} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect()(ContactList);