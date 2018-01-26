import React, { Component } from 'react'
import { Formik } from 'formik'
import classNames from 'classnames'
import InvitationMutation from '../components/graphql/InvitationMutation'
import { inject, observer } from 'mobx-react'

@inject('InvitationStore') @observer
export default class Invitation extends Component {

  generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  submitted(id) {
    console.log('invitation submitted:' + id)
  }

  render() {
    const iStore = this.props.InvitationStore
    return (
      <div>
        <Formik
          initialValues={{
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
          render={({
            values,
            errors,
            touched,
            handleChange,
            setFieldValue,
            handleBlur,
            handleSubmit,
            isSubmitting,
      }) => (
              <form className='uk-form' onSubmit={handleSubmit}>
                { /* TODO: REMOVE THIS */}
                {'dfd' + iStore.isJoiningDinner}
                {iStore.numOfAdults}
                {iStore.setMaxNumOfAdults(4)}
                { /* TODO: REMOVE THIS */}
                <fieldset className="uk-fieldset">
                  <div className="uk-margin">
                    <input
                      type="email"
                      name="email"
                      placeholder="email"
                      className="uk-input uk-form-width-large"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </div>
                  {touched.email && errors.email && <div>{errors.email}</div>}

                  <div className="uk-margin">
                    <div className="uk-button-group">
                      {['Yes', 'No'].map((value, index) => {
                        let btnClass = classNames(
                          'uk-button',
                          'uk-button-default',
                          { 'uk-button-primary': iStore.isJoingDinnerButtonSelected(value) }
                        )
                        return <button key={value} className={btnClass} type="button" onClick={() => setFieldValue('isJoiningDinner', value === 'Yes' ? true : false)}>{value}</button>
                      })}
                    </div>
                    {errors.isJoiningDinner && <div>{errors.isJoiningDinner}</div>}
                  </div>

                  {iStore.isJoiningDinner ?
                    <div className="uk-margin">
                      <div className="uk-button-group">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value, index) => {
                          if (value <= iStore.maxNumOfAdults) {
                            let btnClass = classNames(
                              'uk-button',
                              'uk-button-default',
                              { 'uk-button-primary': iStore.numOfAdults === value }
                            )
                            return <button key={value} className={btnClass} type="button" onClick={() => setFieldValue('numOfAdults', value)}>{value}</button>
                          }
                        })}
                      </div>
                      {touched.numOfAdults && errors.numOfAdults && <div>{errors.numOfAdults}</div>}
                    </div>
                    :
                    <div />
                  }

                  <div className="uk-margin">
                    <textarea className='uk-textarea uk-form-width-large' rows="7" placeholder=""></textarea>
                  </div>

                  <button type="submit" disabled={isSubmitting}>Submit</button>
                </fieldset>
              </form>
            )}
        />

        <div className="codeblock">
          <InvitationMutation code={'' + this.generateRandomInteger(100000, 999999)} onSubmitted={this.submitted}>
            {execute => <button className="uk-button uk-button-primary" type="button" onClick={execute}>Submit</button>}
          </InvitationMutation>
        </div>
      </div>
    )
  }

}
