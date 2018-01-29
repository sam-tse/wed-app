import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import FormStore from './stores/FormStore'
import { observer } from 'mobx-react'

const getFormInputClasses = ({ field: { error } , className }) => {
  return classNames('uk-input', className, {
    'uk-form-danger': !!error 
  })
}

const getFormTextareaClasses = ({ field: { error } , className }) => {
  return classNames('uk-textarea', className, {
    'uk-form-danger': !!error 
  })
}

const FormInput = observer((props) => {
  const { field, onChange, ...rest } = props
  let { error, type } = field
  type = type || 'text'
  return (
    <Fragment>
      { type === 'textarea' ?
      <textarea {...rest}
        className={getFormTextareaClasses(props)}
        onChange={(e) => onChange(e.target.name, e.target.value)} 
        value={field.value} 
      />
      :
      <input {...rest}
        className={getFormInputClasses(props)}
        type={type}
        onChange={(e) => onChange(e.target.name, e.target.value)} 
        value={field.value} 
      />
      }
      {error &&
        <div className="uk-alert uk-alert-danger">{error}</div>
      }
    </Fragment>
  )
})

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
}

export default FormInput