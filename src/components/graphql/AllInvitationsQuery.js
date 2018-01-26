import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// NOTE: to use paramater(s), define as follow: allInvitations($param1: String!) {
const QUERY = gql`
  query AllInvitations{  
   allInvitations(orderBy: createdAt_DESC) {
    id
    code
    member {
      name
    }
  }
}`

class AllInvitationsQuery extends Component {
  render() {
    if (this.props.data.loading)
      return <div>{/* Loading... */}</div> //Retrieving GraphQL data....
    else
      return this.props.children(this.props.data) //GraphQL data is ready
  }
}

export default graphql(QUERY, {
  options: ({ param1 }) => ({ variables: { param1 } })
})(AllInvitationsQuery)
