import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const MUTATION = gql`
  mutation ($code: String!) {
    createInvitation(code: $code) {
      id
    }
  }
`

class InvitationMutation extends React.Component {
  constructor(props, ctx) {
    super(props, ctx)

    this.execute = () => this.executeMutation()
  }

  async executeMutation() {
    const { data } = await this.props.mutate({
      variables: {
        code: this.props.code
      },
    })
    
    /* eslint-disable no-unused-expressions */
    this.props.submittedEvent ? this.props.onSubmitted(data.createInvitation.id) : null
  }

  render() {
    return this.props.children(this.execute)
  } 
}

export default graphql(MUTATION)(InvitationMutation)