import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import classNames from 'classnames'
import InvitationMutation from '../components/graphql/InvitationMutation'
import { inject, observer, Observer } from 'mobx-react'

// wedding ceremony
// dinner reception

// Yes, accepts with pleasure
// NO, regretfully declines



@inject('InvitationStore')
@withRouter
@observer
export default class InvitationOld extends Component {

  generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  submitted(id) {
    console.log('invitation submitted:' + id)
  }

  toggle = () => {

  }

  render() {


    const iStore = this.props.InvitationStore
    return (
      <div>
        <div
          ref="form"
          initialValues={{
            invitationCode: iStore.invitationCode,
            email: '',
            password: '',
            numOfAdults: iStore.numOfAdults,
          }}
          validate={values => {

            let errors = {}
            if (!iStore.isValidateForm) return errors

            // *** isJoiningDinner ***
            if (values.isJoiningDinner === undefined) {
              errors.isJoiningDinner = 'Please make a selection'
            } else {
              iStore.setIsJoiningDinner(values.isJoiningDinner)
            }

            if (values.isJoiningCeremony === undefined) {
              errors.isJoiningCeremony = 'Please make a selection'
            } else {
              iStore.setIsJoiningCeremony(values.isJoiningCeremony)
            }
            // validate email
            // if (!values.email) {
            //   errors.email = 'Required'
            // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            //   errors.email = 'Invalid email address'
            // }

            // *** numOfAdults ***
            if (!Number.isInteger(values.numOfAdults) || values.numOfAdults < 0) {
              errors.numOfAdults = 'Please make a selection'
            } else {
              iStore.setNumOfAdults(values.numOfAdults)
            }

            return errors
          }}
          onSubmit={(
            values,
            { setSubmitting, setErrors /* setValues and other goodies */ }
          ) => {
            console.log('onSubmit ', values)
            setSubmitting(false)
            // LoginToMyApp(values).then(
            //   user => {
            //     setSubmitting(false)
            //     // do whatevs...
            //     // props.updateUser(user)
            //   },
            //   errors => {
            //     setSubmitting(false)
            //     // Maybe transform your API's errors into the same shape as Formik's
            //     setErrors(transformMyApiErrors(errors))
            //   }
            // )
          }}
          render={
            ({
            values,
              errors,
              touched,
              handleChange,
              setFieldValue,
              handleBlur,
              handleSubmit,
              handleReset,
              isSubmitting,
             }) =>
              <Observer>
                {() =>
                  <form className='uk-form'>
                    { /* TODO: REMOVE THIS */}
                    {iStore.invitationCode}
                    {'dfd' + iStore.isJoiningDinner}
                    {iStore.numOfAdults}
                    {iStore.setMaxNumOfAdults(4)}
                    { /* TODO: REMOVE THIS */}

                    <fieldset className='uk-fieldset'>
                      <p className='myLabel'>Your Invitation Code</p>
                      <div className='uk-form-row'>
                        <input
                          type='number'
                          name='invitationCode'
                          className='uk-input uk-form-width-medium'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.invitationCode}
                        />
                      </div>
                      {touched.invitationCode && errors.invitationCode && <div>{errors.invitationCode}</div>}

                      {iStore.isInvitationCodeValid === true &&
                        <Fragment>
                          <div className='uk-form-row'>
                            <p className='myLabel'>Attending Wedding Ceremony at 1pm</p>
                            <div className='uk-button-group'>
                              {[{ id: true, label: 'Yes' }, { id: false, label: 'No' }].map((obj, index) => {
                                let btnClass = classNames(
                                  'uk-button',
                                  'uk-button-default',
                                  { 'uk-button-primary': iStore.isJoingCeremonyButtonSelected(obj.id) }
                                )
                                return <button key={obj.id} className={btnClass} type='button' onClick={() => setFieldValue('isJoiningCeremony', obj.id)}>{obj.label}</button>
                              })}
                            </div>
                            {touched.isJoiningCeremony && errors.isJoiningCeremony && <div>{errors.isJoiningCeremony}</div>}
                          </div>

                          <div className='uk-form-row'>
                            <p className='myLabel'>Attending Dinner Reception at 6pm</p>
                            <div className='uk-button-group'>
                              {[{ id: true, label: 'Yes' }, { id: false, label: 'No' }].map((obj, index) => {
                                let btnClass = classNames(
                                  'uk-button',
                                  'uk-button-default',
                                  { 'uk-button-primary': iStore.isJoingDinnerButtonSelected(obj.id) }
                                )
                                return <button key={obj.id} className={btnClass} type='button' onClick={() => setFieldValue('isJoiningDinner', obj.id)}>{obj.label}</button>
                              })}
                            </div>
                            {touched.isJoiningDinner && errors.isJoiningDinner && <div>{errors.isJoiningDinner}</div>}
                          </div>

                          {(iStore.isJoiningCeremony || iStore.isJoiningDinner) &&
                            <div className='uk-form-row'>
                              <p className='myLabel'>Number of Adults</p>
                              <div className='uk-button-group'>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value, index) => {
                                  if (value > iStore.maxNumOfAdults) return null
                                  let btnClass = classNames(
                                    'uk-button',
                                    'uk-button-default',
                                    { 'uk-button-primary': iStore.numOfAdults === value }
                                  )
                                  return <button key={value} className={btnClass} type='button' onClick={() => setFieldValue('numOfAdults', value)}>{value}</button>
                                })}
                              </div>
                              {touched.numOfAdults && errors.numOfAdults && <div>{errors.numOfAdults}</div>}
                            </div>
                          }

                          <div className='uk-form-row'>
                            <p className='myLabel'>Email</p>
                            <input
                              type='email'
                              name='email'
                              className='uk-input uk-form-width-large'
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                            />
                          </div>
                          {touched.email && errors.email && <div>{errors.email}</div>}
                          <div className='uk-form-row'>
                            <p className='myLabel'>Comment</p>
                            <textarea className='uk-textarea uk-form-width-large' rows='5' placeholder=''></textarea>
                          </div>

                          <button className='uk-button uk-button-primary' type='button' onClick={handleReset}>Submit</button>
                        </Fragment>
                      }
                    </fieldset>
                  </form>
                }
              </Observer>
          }
        />

        <div className='codeblock'>
          <InvitationMutation code={'' + this.generateRandomInteger(100000, 999999)} onSubmitted={this.submitted}>
            {execute => <button className='uk-button uk-button-primary' type='button' onClick={execute}>Submit</button>}
          </InvitationMutation>
        </div>

        <button className='uk-button uk-button-primary' type='button' onClick={() => this.props.InvitationStore.toogleIsInvitationCodeValid()}>Toggle Invitation Code</button>
      </div>
    )
  }

}

