import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import FormStore from './stores/FormStore'
import { observer } from 'mobx-react'

const FormButtonGroup = observer((props) => {
  const { name, field, onChange, values, ...rest } = props
  let { error, type } = field
  type = type || 'text'
  return (
    <Fragment>
      <div className='uk-button-group'>
        {values.map((obj, index) => {
          const btnClass = classNames(
            'uk-button',
            'uk-button-default',
            'my-button-group-button',
            { 'uk-button-primary': field.value === obj.id }
          )
          return (
            <button {...rest} key={obj.id} className={btnClass} type='button' onClick={() => onChange(name, obj.id)}>{obj.label != null ? obj.label : obj.id}</button>
          )
        })}
      </div>
      {error &&
        <div className="uk-alert uk-alert-danger">{error}</div>
      }
    </Fragment>
  )
})

FormButtonGroup.propTypes = {
  name: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
}

export default FormButtonGroup