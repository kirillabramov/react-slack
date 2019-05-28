import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { App, Login, Register, Spinner } from '../components';

import { routes } from './routes';
import firebase from '../firebase';
import { authActions } from '../bus/auth/actions';

class Root extends Component {
  state = {};

  componentDidMount() {
    const { setUser, clearUser, history } = this.props;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        history.push('/');
      } else {
        history.push('/login');
        clearUser();
      }
    });
  }

  render() {
    const { isLoading } = this.props;
    return isLoading ? (
      <Spinner />
    ) : (
      <Switch>
        <Route path='/' exact component={App} />
        <Route path={routes.auth.login} exact component={Login} />
        <Route path={routes.auth.register} exact component={Register} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
});

export default withRouter(
  connect(
    mapStateToProps,
    { setUser: authActions.setUser, clearUser: authActions.clearUser },
  )(Root),
);
