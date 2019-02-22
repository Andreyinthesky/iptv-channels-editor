import React, { Component } from 'react';
import {FileUpload} from "./components/FileUpload";

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <FileUpload>
      </FileUpload>
    );
  }
}
