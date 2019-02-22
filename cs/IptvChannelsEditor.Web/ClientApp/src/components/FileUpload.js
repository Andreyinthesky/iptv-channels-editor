import React, {Component} from 'react';
import {Channels} from "./Channels";

export class FileUpload extends Component {
  displayName = FileUpload.name;

  constructor(props) {
    super(props);

    this.state = {channels: [], loading: true};
    this.fileUpload = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.fileUpload.current.files.length <= 0)
      return;

    let formData = new FormData();
    formData.append('file', this.fileUpload.current.files[0]);

    fetch('api/FileUpload/Index', {
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

  render() {
    let content = !this.state.loading && 
      <Channels channels={this.state.channels}/>;

    return (
      <div>
        <h3>Choose file for upload</h3>
        <form onSubmit={this.handleSubmit}>
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
}