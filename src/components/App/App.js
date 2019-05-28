import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';

import './App.css';
import { channelsActions } from '../../bus/channels/actions';

const App = ({ currentUser, setCurrentChannel }) => {
  return (
    <Grid columns='equal' className='app' style={{ background: '#eee' }}>
      <ColorPanel />
      <SidePanel
        currentUser={currentUser}
        setCurrentChannel={setCurrentChannel}
      />
      <Grid.Column style={{ marginLeft: 520 }}>
        <Messages />
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
};

const mapDispatchToProps = {
  setCurrentChannel: channelsActions.setCurrentChannel,
};
const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
