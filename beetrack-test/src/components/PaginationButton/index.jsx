import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import classNames from 'classnames';
import './style.css';
class PaginationButton extends Component {
  constructor(props) {
    super(props);
  }
  pagination = () => {
    if (this.props.arrowLeft) {
      this.props.scopeContact.state.nPag--;
    } else {
      this.props.scopeContact.state.nPag++;
    }

    this.props.scopeContact.contacts();
  }

  render() {
    return (
      <div>
        <Button bsStyle="link" onClick={this.pagination} className={classNames({
          'pull-left': this.props.arrowLeft,
          'pull-right': this.props.arrowRight,
          'hide': (this.props.scopeContact.state.nPag <= 1 && this.props.arrowLeft) ||
          (this.props.scopeContact.state.nReg <this.props.scopeContact.state.nLimit  && this.props.arrowRight)
        })}  >
          <Glyphicon glyph='circle-arrow-left' className={classNames({ 'hide': !this.props.arrowLeft })} /> {this.props.title} <Glyphicon glyph='circle-arrow-right' className={classNames({ 'hide': !this.props.arrowRight })} />
        </Button>
      </div>
    );
  }
}

export default PaginationButton;