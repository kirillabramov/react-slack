import React, { Component } from 'react';

import { Menu } from 'semantic-ui-react';

import UserPanel from './UserPanel/UserPanel';
import Channels from './Channels/Channels';

class SidePanel extends Component {
  state = {};
  render() {
    const { currentUser, setCurrentChannel } = this.props;

    return (
      <Menu
        size='large'
        inverted
        fixed='left'
        vertical
        style={{ background: '#4c3c4c', fontSize: '1.2rem' }}
      >
        <UserPanel currentUser={currentUser} />
        <Channels
          currentUser={currentUser}
          setCurrentChannel={setCurrentChannel}
        />
      </Menu>
    );
  }
}

export default SidePanel;
