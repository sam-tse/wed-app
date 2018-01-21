import React, { Component } from 'react'
import { Router } from './common/Router'
import './App.css'
import cssUikit from '../node_modules/uikit/dist/css/uikit.min.css'
import cssFontAwesome from '../node_modules/font-awesome/css/font-awesome.min.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router/>
      </div>
    )
  }
}

export default App