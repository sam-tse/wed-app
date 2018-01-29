import { observable, action, autorun, computed } from 'mobx'
import FormStore from './FormStore'
import { setter, observe } from 'mobx-decorators'

export default class InvitationFormStore extends FormStore {

  constructor() {
    super()
    autorun(() => console.log(JSON.stringify(this.form))) //debugging purposes
  }

  @observe(change => console.log('1', change))
  @observable
  form = {
    fields: {
      invitationCode: {
        label: 'Invitation Code',
        type: 'number',
        value: '',
        error: null,
        rule: 'required'
      },
      isJoiningCeremony: {
        label: 'Attending Wedding Ceremony',
        // initialValue: 1,
        value: undefined,
        error: null,
        rule: 'required'
      },
      isJoiningDinner: {
        label: 'Attending Dinner Reception',
        // initialValue: 1,
        value: undefined,
        error: null,
        rule: 'required'
      },
      numOfAdults: {
        label: 'Number of Adults',
        // initialValue: 1,
        value: undefined,
        error: null,
        rule: 'required_with:isJoiningCeremony|required_with:isJoiningDinner'
      },
      numOfInfants: {
        label: 'Number of Infants',
        // initialValue: 1,
        value: undefined,
        error: null,
        rule: 'required_with:isJoiningCeremony|required_with:isJoiningDinner'
      },
      email: {
        label: 'Email',
        type: 'email',
        // initialValue: 1,
        value: '',
        error: null,
        rule: 'email'
      },
      comment: {
        label: 'Comment',
        type: 'textarea',
        // initialValue: 1,
        value: '',
        error: null,
        rule: 'string'
      }
    },
    meta: {
      isValid: true,
      error: null,
    },
  }

  @setter
  @observable
  invitationCodeStatus = InvitationCodeStatus.ToBeEntered

  @computed
  get isAttendingCeremonyOrDinner() {
    return this.form.fields.isJoiningCeremony.value === true || this.form.fields.isJoiningDinner.value === true
  }

  @action
  onChangeInvitationCode = (key, value) => {
    this.onFieldChange(key, value)
    if (value != null) {
      if (value.length === 6) {
        this.searchForInvitationCode()
      } else if (value.length < 6) {
        this.setInvitationCodeStatus(InvitationCodeStatus.ToBeEntered)
      } else {
        this.setInvitationCodeStatus(InvitationCodeStatus.InvalidFormat)
      }
    } 
  }

  @action
  searchForInvitationCode() {
    //TODO:
    this.setInvitationCodeStatus(InvitationCodeStatus.Valid)
  }

  getNumOfAdultsButtonGroupValues() {
    let values  = []
    for (let i = 1; i <= 8; i++) {
      values.push({id: i})
    }
    return values
  }

  getNumOfInfantsButtonGroupValues() {
    let values  = []
    for (let i = 0; i <= 4; i++) {
      values.push({id: i})
    }
    return values
  }
}

export const InvitationCodeStatus = {
  ToBeEntered: 'ToBeEntered',
  InvalidFormat: 'InvalidFormat',
  CanNotBeFound: 'CanNotBeFound',
  Valid: 'Valid'
}

