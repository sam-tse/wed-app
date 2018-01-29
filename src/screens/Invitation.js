import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import FormInput from '../components/FormInput'
import FormButtonGroup from '../components/FormButtonGroup'
import { observer, inject } from 'mobx-react'
import classNames from 'classnames'
import { InvitationCodeStatus } from '../components/stores/InvitationFormStore'

@inject('InvitationStore', 'InvitationFormStore')
@observer
export default class Invitation extends Component {

  submit = (event) => {
    console.log('submit')
    event.preventDefault()
    this.props.InvitationFormStore.validateAll()
    // this.props.onSubmit()
  }

  render() {
    const iStore = this.props.InvitationStore
    const formStore = this.props.InvitationFormStore
    const { form: { fields, meta }, onFieldChange, onChangeInvitationCode } = formStore

    return (
        <div className="uk-container uk-container-center uk-margin-top uk-margin-large-bottom">
      <form className='uk-form' onSubmit={null}>
        <h1 className="uk-heading-line uk-text-center"><span>Celebrate Together</span></h1>

        <div className='uk-form-row'>
          <p className='myLabel'>Enter Your Invitation Code</p>
          <FormInput
            id='invitationCode'
            className='uk-form-width-medium'
            name='invitationCode'
            field={fields.invitationCode}
            onChange={onChangeInvitationCode}
            placeholder='' />
        </div>

        {(formStore.invitationCodeStatus === InvitationCodeStatus.CanNotBeFound ||
          formStore.invitationCodeStatus === InvitationCodeStatus.InvalidFormat) &&
          <Fragment>
            <div className="uk-alert uk-alert-danger">Your Invitation Code is incorrect. Please verify and try again.  Please contact us if you have any issue.</div>
          </Fragment>
        }

        {formStore.invitationCodeStatus === InvitationCodeStatus.Valid &&
          <Fragment>
            <h2 className="uk-text-center" /* TODO: fetch name */>Dear Mr. and Mrs. Lee</h2>

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
                    values={formStore.getNumOfAdultsButtonGroupValues()}
                  />
                </div>

                <div className='uk-form-row'>
                  <p className='myLabel'>Number of Infants (2 years old or younger)</p>
                  <FormButtonGroup
                    name='numOfInfants'
                    field={fields.numOfInfants}
                    onChange={onFieldChange}
                    values={formStore.getNumOfInfantsButtonGroupValues()}
                  />
                </div>

                <div className='uk-form-row'>
                  <p className='myLabel'>Your Email (for receiving updates on our wedding)</p>
                  <FormInput
                    name='email'
                    className='uk-form-width-large'
                    field={fields.email}
                    onChange={onFieldChange}
                    placeholder='' />
                </div>

              </Fragment>
            }

            <div className='uk-form-row'>
              <p className='myLabel'>Comment</p>
              <FormInput
                name='comment'
                className='uk-form-width-large'
                rows='5'
                field={fields.comment}
                onChange={onFieldChange}
                placeholder='' />
            </div>

            { /* TODO: */ meta.error ? <div className='login-form__error'>
              {meta.error}
            </div> : null}

            <br />
            <button className='uk-button uk-button-primary' type='button' /* disabled={!meta.isValid} */ onClick={this.submit}>
              Submit
            </button>

          </Fragment>
        }
        
      </form>
      </div>
    )
  }

}

