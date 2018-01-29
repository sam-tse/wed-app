import { action, toJS } from 'mobx'
import Validator from 'validatorjs'

// Reference: https://medium.com/@KozhukharenkoN/react-form-validation-with-mobx-8ce00233ae27
export default class FormStore {

  _keysAndLabels = {}

  constructor() {
    this._parseKeysAndLabels()
  }

  _parseKeysAndLabels() {
    Object.keys(this.form.fields).map(key => {
      this._keysAndLabels[key] = this.form.fields[key].label
    })
  }

   _onFieldChange(key) {
    const form = this.form
    const field = this.form.fields[key]
    var validator = new Validator(
      this.getFlattenedValues('value'),
      this.getFlattenedValues('rule')
    )
    if (field.label) {
      validator.setAttributeNames(this._keysAndLabels) //use a different attribute name as defined in field.label
    }
    form.meta.isValid = validator.passes()
    field.error = validator.errors.first(key)
  }

  getFlattenedValues = (valueKey = 'value') => {
    let data = {}
    let form = toJS(this.form).fields
    Object.keys(form).map(key => {
      data[key] = form[key][valueKey]
    })
    return data
  }

  @action
  onFieldChange = (key, value) => {
    this.form.fields[key].value = value
    this._onFieldChange(key)
  }

  @action
  validateAll = () => {
    Object.keys(this.form.fields).map(key => {
      this._onFieldChange(key)
    })
  }

  @action
  clearAll = () => {
    const fields = this.form.fields
    Object.keys(fields).map(key => {
      const initialValue = fields[key].initialValue
      fields[key].value = initialValue !== undefined ? initialValue : ''
      fields[key].error = null
    })
  }

  @action
  setError = (errMsg) => {
    this.form.meta.error = errMsg
  }
}
