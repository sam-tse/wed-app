import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from 'react-router-dom'

@inject('InvitationFormStore')
@observer
export default class ThankYou extends Component {

  render() {
    return (
      <div className="thankyou uk-container uk-container-center uk-margin-top uk-margin-large-bottom">
        <h1>- Thank You -</h1>
        <p>Your RSVP response has been submitted. We look forward to see you all on our wedding day!</p>
        <p>Also, take a look at our <Link to="/gallery">Gallery</Link> if you have time.</p>
        <h4>Cheers,</h4>
        <h3>Lisa & Sam</h3>
      </div>
    )
  }
}

