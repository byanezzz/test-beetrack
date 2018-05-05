import React, { Component } from 'react';
import FormValidator from '../FormValidator';
import { Button, Modal, Glyphicon, FormGroup, FormControl, HelpBlock, ControlLabel } from 'react-bootstrap';
import services from '../../service/services';
import './style.css';
class AddButton extends Component {
  constructor(props, context) {
    super(props, context);
    this.validator = new FormValidator([
      {
        field: 'name',
        method: 'isEmpty',
        validWhen: false,
        message: 'El nombre es requerido.'
      },
      {
        field: 'photo',
        method: 'isURL',
        validWhen: true,
        message: 'No es una url.',
      },
      {
        field: 'photo',
        method: 'isEmpty',
        validWhen: false,
        message: 'La URL es requerida.',
      },
      {
        field: 'description',
        method: 'isEmpty',
        validWhen: false,
        message: 'La descripción es requerida.'
      }
    ]);

    this.state = {
      show: false,
      name: '',
      photo: '',
      description: '',
      validation: this.validator.valid(),
    };
    this.submitted = false;

  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid) {
      // handle actual form submission here
      this.newContacts();
    }
  }
  initialState = () => {
    this.submitted = false;
    this.setState({
      show: false,
      name: '',
      photo: '',
      description: '',
      validation: this.validator.valid()
    })
  }

  newContacts = () => {
    let payload = {
      "name": this.state.name,
      "description": this.state.description,
      "photo": this.state.photo
    };

    services.addContact(payload)
      .then(response => {
        if (response.status !== 201) {
          console.log('Error: ' + response.status);
          return new Error();
        }
        this.props.contact();
        this.initialState();
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  render() {
    let validation = this.submitted ?
      this.validator.validate(this.state) : this.state.validation
    return (
      <div>
        <Button bsStyle="warning" bsSize="medium" onClick={this.handleShow} className="pull-right">
          <Glyphicon glyph="plus-sign" /> Nuevo Contacto
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><strong>Agregar Nuevo Contacto</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body className="modalStyle">
            <form>
              <FormGroup
                controlId="photo"
                className={validation.photo.isInvalid && 'has-error'}
              >
                <ControlLabel htmlFor="photo">URL imagen de perfil</ControlLabel>
                <FormControl
                  name="photo"
                  type="text"
                  value={this.state.photo}
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
                <HelpBlock>{validation.photo.message}</HelpBlock>
              </FormGroup>
              <FormGroup
                controlId="name"
                className={validation.name.isInvalid && 'has-error'}
              >
                <ControlLabel htmlFor="name">Nombre</ControlLabel>
                <FormControl
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <FormControl.Feedback />
                <HelpBlock>{validation.name.message}</HelpBlock>
              </FormGroup>
              <FormGroup
                controlId="description"
                className={validation.description.isInvalid && 'has-error'}
              >
                <ControlLabel>Descripción</ControlLabel>
                <FormGroup controlId="formControlsTextarea">
                  <FormControl componentClass="textarea"
                    name="description"
                    type="text"
                    value={this.state.description}
                    onChange={this.handleChange} />
                </FormGroup>
                <HelpBlock>{validation.description.message}</HelpBlock>
              </FormGroup>
              <Button type="submit" onClick={this.handleFormSubmit} onHide={this.handleClose} bsStyle="warning" className="center-block submit" >Guardar</Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default AddButton;