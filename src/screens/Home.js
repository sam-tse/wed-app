import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

@inject('InvitationFormStore')
@withRouter
@observer
export default class Home extends Component {

  state = {
    invitationCode: undefined
  }

  rsvp = () => {
    const formStore = this.props.InvitationFormStore
    const { form: { fields, meta }, onChangeInvitationCode } = formStore

    if (this.state.invitationCode != null) {
      onChangeInvitationCode('invitationCode', this.state.invitationCode)
      this.props.history.push('/rsvp')
    }
  }

  setInvitationCode = (e) => {
    const val = e.target.value
    if (val != null) {
      this.setState({ invitationCode: val })
    }
  }

  render() {
    const coupleName = process.env.REACT_APP_COUPLE_NAME
    const weddingDate = process.env.REACT_APP_WEDDING_DATE
    const weddingDateAlt = process.env.REACT_APP_WEDDING_DATE_ALT
    const weddingReceptionPlace = process.env.REACT_APP_WEDDING_RECEPTION_PLACE
    const weddingReceptionTime = process.env.REACT_APP_WEDDING_RECEPTION_TIME
    const weddingReceptionLocation = process.env.REACT_APP_WEDDING_RECEPTION_LOCATION
    const weddingReceptionGoogleMapUrl = process.env.REACT_APP_WEDDING_RECEPTION_GOOGLE_MAP_URL
    const weddingDinnerPlace = process.env.REACT_APP_WEDDING_DINNER_PLACE
    const weddingDinnerLocation = process.env.REACT_APP_WEDDING_DINNER_LOCATION
    const weddingDinnerGoogleMapUrl = process.env.REACT_APP_WEDDING_DINNER_GOOGLE_MAP_URL

    const formStore = this.props.InvitationFormStore

    let mainImageUrl
    try {
      mainImageUrl = require('../images/my-main.jpg')
    } catch (ex) {
      mainImageUrl = require('../images/mickey-minnie.jpg')
    }

    return (
      <div className="uk-container uk-container-center uk-margin-top uk-margin-large-bottom">
        <div>
          <h2>- We're getting married!  -</h2>
          <h1><span className="uk-heading-hero">{coupleName}</span>
            <br />{weddingDate}</h1>
          <div className="uk-inline">
            <img className="hero-image" src={mainImageUrl} alt="" />
          </div>
          <h1 className="uk-heading-line uk-text-center"><span>Celebrate Together</span></h1>
          {formStore.isInvitationSubmitted === true ?
            <p>You have already submitted your RSVP response for your Invitation Code <b>{formStore.form.fields.invitationCode.value}</b>. Please <Link to="/contact">contact us</Link> if you have any question or issue.</p>
            :
            <React.Fragment>
              <p>Enter your Invitation Code below and click RSVP</p>
              <fieldset className="uk-fieldset">
                <div className="uk-margin">
                  <span className="uk-form-icon" data-uk-icon="icon: user"></span>
                  <input
                    value={this.state.invitationCode || ""} /* conditionally set an empty string to force this as an controlled component */
                    onChange={this.setInvitationCode} className="uk-input uk-form-large uk-text-center"
                    type="number" placeholder="Invitation Code" />
                </div>
              </fieldset>
              <button onClick={this.rsvp} className="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom uk-button-large" disabled={this.state.invitationCode == null}>RSVP</button>
            </React.Fragment>
          }

          <h1 className="uk-heading-line uk-text-center"><span>Locations</span></h1>
          <p><b>{weddingDateAlt}</b></p>
          <p>Wedding ceremony will take place at</p>
          <p className="p1"><b>{weddingReceptionPlace}</b></p>
          <p>{weddingReceptionLocation}</p>
          <p>{weddingReceptionTime}</p>
          <p><button onClick={() => window.open(weddingReceptionGoogleMapUrl)} className="uk-button uk-button-primary uk-margin-small-bottom">View Map</button></p>
          <hr className="uk-divider-small" />
          <p>Dinner reception at</p>
          <p className="p1"><b>{weddingDinnerPlace}</b></p>
          <p>{weddingDinnerLocation}</p>
          <p>Reception at 6:00 pm<br />Dinner at 7:30 pm</p>
          <p><button onClick={() => window.open(weddingDinnerGoogleMapUrl)} className="uk-button uk-button-primary uk-margin-small-bottom">View Map</button></p>
        </div>
      </div>
    )
  }
}


