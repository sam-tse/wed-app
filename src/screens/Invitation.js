import React, { Component } from 'react'
import { Formik } from 'formik'
import classNames from 'classnames'
import InvitationMutation from '../components/graphql/InvitationMutation'
import { inject } from 'mobx-react'

const tempMaxAdults = 3
const isValidate = false


@inject('InvitationStore')
export default class Invitation extends Component {

  state = {
    numOfAdults: null
  }

  generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  buttonClick(values, value) {
    values.numOfAdults = value
    this.setState({ numOfAdults: value })
  }

  submitted(id) {
    console.log('invitation submitted:' + id)
  }

  render() {
    this.props;
    return (
      <div>
        <Formik
          initialValues={{
            email: '',
            password: '',
            numOfAdults: this.state.numOfAdults,
          }}
          validate={values => {
            if (!isValidate) return
            let errors = {}
            // validate email
            if (!values.email) {
              errors.email = 'Required'
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address'
            }
            // validate numOfAdults
            if (!Number.isInteger(values.numOfAdults) || values.numOfAdults === 0)
              errors.numOfAdults = 'Please select the number of adults will be attending'
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
            handleBlur,
            handleSubmit,
            isSubmitting,
      }) => (
              <form onSubmit={handleSubmit}>
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
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                  </div>
                  {touched.password && errors.password && <div>{errors.password}</div>}

                  <div className="uk-button-group">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value, index) => {
                      let btnClass = classNames(
                        'uk-button', 
                        'uk-button-default', 
                        {'uk-button-primary': this.state.numOfAdults === value }
                      )

                      return <button key={value} className={btnClass} type="button" onClick={() => this.buttonClick(values, value)}>{value}</button>
                    })}
                  </div>
                  {touched.numOfAdults && errors.numOfAdults && <div>{errors.numOfAdults}</div>}
                  
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
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
