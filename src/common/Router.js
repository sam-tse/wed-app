import React from 'react'
import {
  BrowserRouter,
  Route,
} from 'react-router-dom'
import NavLink from '../components/NavLink'
import Home from '../screens/Home'
import Invitation from '../screens/Invitation'
import MyGallery from '../screens/MyGallery'
import Contact from '../screens/Contact'
import AllInvitations from '../screens/AllInvitations'

export const Router = (props) => (
  <BrowserRouter>
    <div>
      <nav className="uk-navbar-container">
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <NavLink to="/" name="OW" />
            <NavLink to="/gallery" name="Ga" />
            <NavLink to="/rsvp" name="RS" />
            <NavLink to="/contact" name="Con" />
          </ul>
        </div>
      </nav>
      <Route exact path="/" component={Home} />
      <Route path="/gallery" component={MyGallery} />
      <Route path="/rsvp" component={Invitation} />
      <Route path="/allInvitations" component={AllInvitations} />
      <Route path="/contact" component={Contact} />
    </div>
  </BrowserRouter>
)
