import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { App, Login, Register } from '../components';

import { routes } from './routes';
import firebase from '../firebase';
import { authActions } from '../bus/auth/actions';

class Root extends Component {
  state = {};

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user);
        this.props.history.push('/');
      }
    });
  }

  render() {
    return (
      <Switch>
        <Route path='/' exact component={App} />
        <Route path={routes.auth.login} exact component={Login} />
        <Route path={routes.auth.register} exact component={Register} />
      </Switch>
    );
  }
}

export default withRouter(
  connect(
    null,
    { setUser: authActions.setUser },
  )(Root),
);
