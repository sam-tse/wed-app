import React, { Component } from 'react'

export default class Contact extends Component {

  send = () => {
      
    
  }

  render() {
    return (
      <div className="uk-container uk-container-center uk-margin-top uk-margin-large-bottom">
        <p>Invitation</p>
        <button onClick={this.send}>Send</button>
      </div>
    )
  }
}
