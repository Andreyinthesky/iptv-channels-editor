import React, { Component } from 'react';
import {Channels} from "./components/Channels";

export default class App extends Component {
  displayName = App.name;

  constructor(props) {
    super(props);

    this.state = {loading: true};
    this.fileUpload = React.createRef();
    this.handleUploadPlaylist = this.handleUploadPlaylist.bind(this);
  }

  handleUploadPlaylist(event) {
    event.preventDefault();
    if (this.fileUpload.current.files.length <= 0)
      return;

    let formData = new FormData();
    formData.append('file', this.fileUpload.current.files[0]);

    fetch('api/fileUpload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(channels => {
        channels.map((channel, index) =>
        {
          channel.id = index;
          return channel;
        });
        this.setState({channels: channels, loading: false});
      })
      .catch(error => console.error('Error:', error));
  }

  loadSampleChannels = () => {
    fetch('api/sampleChannels')
      .then(response => response.json())
      .then(playlist => {
        playlist.channels.map((channel, index) =>
        {
          channel.id = index;
          return channel;
        });
        
        this.channels = playlist.channels;
        this.setState({loading: false});
      })
      .catch(error => console.error('Error:', error));
  };

  renderForm() {
    let content = !this.state.loading &&
      <Channels channels={this.state.channels}/>;

    return (
      <div>
        <h3>Choose file for upload</h3>
        <form onSubmit={this.handleUploadPlaylist}>
          <label>
            Upload file:
            <input type="file" ref={this.fileUpload} accept=".m3u,.m3u8"/>
          </label>
          <br/>
          <button type="submit">Submit</button>
          {content}
        </form>
      </div>
    );
  }

  render() {
    if (this.state.loading){
      this.loadSampleChannels();
    }
    return (
      <div>
        <h3>Sample channels</h3>
        {
          !this.state.loading &&
          <Channels channels={this.channels}
          />
        }
      </div>
    );
  }
}
