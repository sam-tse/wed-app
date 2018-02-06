import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import FormInput from '../components/FormInput'
import FormButtonGroup from '../components/FormButtonGroup'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'
import { InvitationCodeStatus } from '../components/stores/InvitationFormStore'
import { Link } from 'react-router-dom'

@inject('InvitationFormStore')
@observer
export default class Invitation extends Component {

  submit = (event) => {
    event.preventDefault()
    const formStore = this.props.InvitationFormStore
    formStore.validateAll()
    if (formStore.form.meta.isValid === true) {
      formStore.updateInvitation()
      this.props.history.push('/thankyou')
    }
  }

  render() {
    const formStore = this.props.InvitationFormStore
    const { form: { fields, meta }, onFieldChange, onChangeInvitationCode } = formStore

    return (
      <div className="uk-container uk-container-center uk-margin-top uk-margin-large-bottom">
        <form className='uk-form' onSubmit={this.submit} /* Need to include a custom submit function to prevent the default form submission */ >
          <h1 className="uk-heading-line uk-text-center"><span>Celebrate Together</span></h1>
          
          {formStore.isInvitationCodeValid !== true &&
            <div className='uk-form-row'>
              <p className='myLabel'>Enter Your Invitation Code</p>
              <FormInput
                id='invitationCode'
                className='uk-form-width-medium'
                name='invitationCode'
                field={fields.invitationCode}
                onChange={onChangeInvitationCode}
                placeholder=''
                autoFocus
              />
            </div>
          }

          {formStore.isInvitationCodeValid === false &&
            <Fragment>
              <div className="uk-alert uk-alert-danger">Your Invitation Code is incorrect. Please verify and try again.  Please <Link to="/contact">contact us</Link> if you have any issue.</div>
            </Fragment>
          }

          {formStore.isInvitationCodeValid === true && formStore.isInvitationSubmitted === true &&
            <Fragment>
              <p>You have already submitted your RSVP response for your Invitation Code <b>{fields.invitationCode.value}</b>. Please <Link to="/contact">contact us</Link> if you have any question or issue.</p>
            </Fragment>
          }

          {formStore.isInvitationCodeValid === true && formStore.isInvitationSubmitted === false &&
            <Fragment>
              <p>Your Invitation Code: {fields.invitationCode.value}</p>

              <h2 className="uk-text-center">Dear {formStore.queryInvitationData.name}</h2>

              <div className='uk-form-row'>
                <p className='myLabel'>Attending Wedding Ceremony at 1pm</p>
                <FormButtonGroup
                  name='isJoiningCeremony'
                  field={fields.isJoiningCeremony}
                  onChange={onFieldChange}
                  values={[{ id: true, label: 'Yes' }, { id: false, label: 'No' }]}
                  placeholder='' />
              </div>

              <div className='uk-form-row'>
                <p className='myLabel'>Attending Dinner Reception at 6pm</p>
                <FormButtonGroup
                  name='isJoiningDinner'
                  field={fields.isJoiningDinner}
                  onChange={onFieldChange}
                  values={[{ id: true, label: 'Yes' }, { id: false, label: 'No' }]}
                />
              </div>

              {formStore.isAttendingCeremonyOrDinner &&

                <Fragment>
                  <div className='uk-form-row'>
                    <p className='myLabel'>Number of Adults</p>
                    <FormButtonGroup
                      name='numOfAdults'
                      field={fields.numOfAdults}
                      onChange={onFieldChange}
                      values={formStore.getNumOfAdultsButtonGroupValues(formStore.queryInvitationData.maxNumberOfAdults)}
                    />
                  </div>

                  {formStore.queryInvitationData.maxNumberOfInfants === 0 && formStore.disableField('numOfInfants')}

                  {formStore.queryInvitationData.maxNumberOfInfants > 0 &&
                    <div className='uk-form-row'>
                      <p className='myLabel'>Number of Infants (2 years old or younger)</p>
                      <FormButtonGroup
                        name='numOfInfants'
                        field={fields.numOfInfants}
                        onChange={onFieldChange}
                        values={formStore.getNumOfInfantsButtonGroupValues(formStore.queryInvitationData.maxNumberOfInfants)}
                      />
                    </div>
                  }
                </Fragment>
              }

              <div className='uk-form-row'>
                <p className='myLabel'>Comment</p>
                <FormInput
                  name='comment'
                  className='uk-form-width-large'
                  rows='3'
                  field={fields.comment}
                  onChange={onFieldChange}
                  placeholder='' />
              </div>

              { formStore.isFormSubmitted && <p>FORM SUBMITTED</p>}
              { meta.error ? <div className='login-form__error'>
                {meta.error}
              </div> : null}

              <br />
              <button className='uk-button uk-button-primary' type='button' disabled={!meta.isValid} onClick={this.submit}>
                Submit
            </button>

            </Fragment>
          }

        </form>
      </div>
    )
  }

}

