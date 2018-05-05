import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {Grid} from 'react-bootstrap';
import './App.css';
import ContactList from '../src/components/ContactList';

class App extends Component {
  render() {
    return (
      <Router store={this.props.store}>      
        <Grid>
          <Route exact path="/" render={() => <ContactList store={this.props.store} />} />         
        </Grid>
      </Router>
    );
  }
}

export default connect()(App);
