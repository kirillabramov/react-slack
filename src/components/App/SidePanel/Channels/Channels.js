import React, { Component } from 'react';
import firebase from '../../../../firebase';

import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';

class Channels extends Component {
  state = {
    activeChannel: '',
    channels: [],
    modal: false,
    channelName: null,
    channelDetails: null,
    channelsRef: firebase.database().ref('channels'),
    user: this.props.currentUser,
    firstLoad: true,
  };

  componentDidMount() {
    this.addListeners();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  removeListeners = () => this.state.channelsRef.off();

  addListeners = () => {
    const loadedChannels = [];
    this.state.channelsRef.on('child_added', snap => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels }, this.setFirstChannel());
    });
  };

  setFirstChannel = () => {
    setTimeout(() => {
      const firstChannel = this.state.channels[0];

      if (this.state.firstLoad && this.state.channels) {
        this.props.setCurrentChannel(firstChannel);
        this.setState({ firstLoad: false });
      }
    }, 1000);
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };

  isFormValid = ({ channelName, channelDetails }) =>
    channelDetails && channelName;

  closeModal = () => this.setState({ modal: false });

  openModal = () => this.setState({ modal: true });

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  addChannel = () => {
    const { channelsRef, channelDetails, channelName, user } = this.state;
    const key = channelsRef.push().key;

    const newChannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        name: user.displayName,
        avatar: user.photoURL,
      },
    };
    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelDetails: '', channelName: '' });
        this.closeModal();
        console.log('channel added');
      })
      .catch(err => console.log(err));
  };

  displayChannels = channels => {
    return (
      channels.length > 0 &&
      channels.map(channel => (
        <Menu.Item
          key={channel.id}
          onClick={() => this.changeChannel(channel)}
          name={channel.name}
          style={{ opacity: 0.7 }}
          active={channel.id === this.state.activeChannel}
        >
          # {channel.name}
        </Menu.Item>
      ))
    );
  };

  changeChannel = channel => {
    this.props.setCurrentChannel(channel);
    this.setActiveChannel(channel);
  };

  setActiveChannel = channel => {
    this.setState({ activeChannel: channel.id });
  };

  render() {
    const { channels, modal } = this.state;
    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: '2em' }}>
          <Menu.Item>
            <span>
              <Icon name='exchange' /> CHANNELS
            </span>
            ({channels.length}) <Icon name='add' onClick={this.openModal} />
          </Menu.Item>
          {this.displayChannels(channels)}
        </Menu.Menu>

        {modal && (
          <Modal basic open={modal} onClose={this.closeModal}>
            <Modal.Header>Add a channel</Modal.Header>
            <Modal.Content>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <Input
                    fluid
                    label='Name of Channel'
                    name='channelName'
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    fluid
                    label='About a Channel'
                    name='channelDetails'
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color='green' inverted onClick={this.handleSubmit}>
                <Icon name='checkmark' /> Add
              </Button>
              <Button color='red' inverted onClick={this.closeModal}>
                <Icon name='remove' /> Cancel
              </Button>
            </Modal.Actions>
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

export default Channels;
