import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class NavLink extends React.Component {
  render() {
    let isActive = this.context.router.route.location.pathname === this.props.to
    let className = isActive ? 'uk-active' : ''

    return (
      <li className={className} {...this.props}>
        <a href={this.props.to}>{this.props.name}</a>
      </li>
    )
  }
}

NavLink.contextTypes = {
  router: PropTypes.object
}

export default withRouter(NavLink)
