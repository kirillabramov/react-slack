import React from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';

import './App.css';
import { channelsActions } from '../../bus/channels/actions';

const App = ({ currentUser, setCurrentChannel, currentChannel }) => {
  return (
    <Grid columns='equal' className='app' style={{ background: '#eee' }}>
      <ColorPanel />
      <SidePanel
        key={currentUser && currentUser.id}
        currentUser={currentUser}
        setCurrentChannel={setCurrentChannel}
      />
      <Grid.Column style={{ marginLeft: 520 }}>
        <Messages
          key={currentChannel && currentChannel.id}
          currentChannel={currentChannel}
          currentUser={currentUser}
        />
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
  currentChannel: state.channels.currentChannel,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
