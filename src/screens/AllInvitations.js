import React, { Component } from 'react'
import AllInvitationQuery from '../components/graphql/AllInvitationsQuery'

export default class AllInvitations extends Component {

  render() {
    return (
      <div>
        <div className="codeblock">
          <AllInvitationQuery>
            {({ allInvitations }) => <pre>{JSON.stringify(allInvitations, null, 2)}</pre> }
          </AllInvitationQuery>
        </div>
      </div>
    )
  }
}
