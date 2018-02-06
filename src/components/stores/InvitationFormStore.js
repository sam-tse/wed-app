import { observable, extendObservable, action, autorun, computed, toJS } from 'mobx'
import FormStore from './FormStore'
import { setter, observe } from 'mobx-decorators'
import gql from 'graphql-tag'
import graphql from 'mobx-apollo'
import { isRunningInDev } from '../../index'

export default class InvitationFormStore extends FormStore {

  constructor(graphqlClient) {
    super()
    this.graphqlClient = graphqlClient
    if (isRunningInDev === true) {
      autorun(() => {
        //TODO: for debugging only
        console.log(JSON.stringify(this.form))
        console.log(JSON.stringify(this.queryInvitationData))
      })
    }

  }

  @setter
  @observable
  isFormSubmitted = false

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
        rule: 'required_with:isJoiningCeremony|required_with:isJoiningDinner',
        disabled: false // true if maxNumOfInfants is 0 
      },
      email: {
        label: 'Email',
        type: 'email',
        // initialValue: 1,
        value: '',
        error: null,
        rule: 'email',
        disabled: true
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

  @computed
  get isAttendingCeremonyOrDinner() {
    return this.form.fields.isJoiningCeremony.value === true || this.form.fields.isJoiningDinner.value === true || this.isFormSubmitted === true
  }

  @action
  onChangeInvitationCode = (key, value) => {
    this.onFieldChange(key, value)
  }

  getNumOfAdultsButtonGroupValues(max) {
    let values = []
    for (let i = 1; i <= max; i++) {
      values.push({ id: i })
    }
    return values
  }

  getNumOfInfantsButtonGroupValues(max) {
    let values = []
    for (let i = 0; i <= max; i++) {
      values.push({ id: i })
    }
    return values
  }

  //************************************** 
  // GraphQL functions
  //**************************************

  _graphql({ query, variables }) {
    return graphql({ client: this.graphqlClient, query: query, variables: variables })
  }

  get invitations() {
    const QUERY = gql`
    query getAllInvitations{  
      allInvitations(orderBy: createdAt_DESC) {
        id
        code
        name
      }
    }`
    const graphql = this._graphql({ query: QUERY })
    return (graphql.data && toJS(graphql.data.allInvitations)) || []
  }

  @computed
  get queryInvitation() {
    const QUERY = gql`
      query getInvitation($code: String!){
      Invitation(code: $code) {
        id
        code
        numberOfAdults
        numberOfInfants
        maxNumberOfAdults
        maxNumberOfInfants
        name
        isSubmitted
      }
    }`
    const code = this.form.fields.invitationCode.value
    if (code.length === 6) {
      return this._graphql({ query: QUERY, variables: { code: code } })
    }
    return null
  }

  @computed
  get queryInvitationLoading() {
    return this.queryInvitation.loading
  }

  @computed
  get queryInvitationData() {
    return (this.queryInvitation != null && this.queryInvitation.data && toJS(this.queryInvitation.data.Invitation)) || {}
  }

  @computed
  get isInvitationCodeValid() {
    const code = this.form.fields.invitationCode.value
    if (code != null && code.length > 6) return false
    if (code == null || code.length < 6 || this.queryInvitation == null || this.queryInvitationLoading) return null
    return this.queryInvitationData.id != null
  }

  @computed
  get isInvitationSubmitted() {
    return (this.queryInvitationData != null && this.queryInvitationData.isSubmitted === true) || this.isFormSubmitted === true
  }

  @action
  updateInvitation() {
    const MUTATION = gql`
      mutation updateInvitation($id:ID!, $dinner:Boolean!, $ceremony:Boolean!, $numberOfAdults:Int, $numberOfInfants:Int, $comment:String, $isSubmitted:Boolean!) {
        updateInvitation(id:$id, dinner:$dinner, ceremony:$ceremony, numberOfAdults: $numberOfAdults,  numberOfInfants: $numberOfInfants, comment:$comment, isSubmitted:$isSubmitted) {
          id
        }
      }
    `
    const field = this.form.fields

    if (field.isJoiningCeremony.value === false && field.isJoiningDinner.value === false) {
      this.onFieldChange('numOfAdults', 0)
      this.onFieldChange('numOfInfants', 0)
    }

    if (this.queryInvitationData.maxNumberOfInfants === 0) {
      this.onFieldChange('numOfInfants', 0)
    }

    this.graphqlClient.mutate({
      mutation: MUTATION,
      variables: {
        id: this.queryInvitationData.id,
        ceremony: field.isJoiningCeremony.value,
        dinner: field.isJoiningDinner.value,
        numberOfAdults: field.numOfAdults.value,
        numberOfInfants: field.numOfInfants.value,
        comment: field.comment.value,
        isSubmitted: true
      },
    }).then(() => this.setIsFormSubmitted(true))
  }
}

