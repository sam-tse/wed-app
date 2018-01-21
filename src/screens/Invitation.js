import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Invitation extends Component {

  render() {
    return (
      <div>
        <p>Invitation</p>
        <Link to="/">Home</Link>
      </div>
    )
  }
}

