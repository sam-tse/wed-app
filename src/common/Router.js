import React, { Component } from 'react'
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'
import Home from '../screens/Home'
import Invitation from '../screens/Invitation'
import MyGallery from '../screens/MyGallery'
import NavLink from '../components/NavLink'

export const Router = () => (
  <BrowserRouter>
    <div>
      <nav className="uk-navbar-container">
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <NavLink to="/" name="Our Wedding"/>
            <NavLink to="/gallery" name="Gallery"/>
            <NavLink to="/rsvp" name="RSVP"/>
            <NavLink to="/contact" name="Contact Us"/>
          </ul>
        </div>
      </nav>
      <Route exact path="/" component={Home}/>
      <Route path="/gallery" component={MyGallery}/>
      <Route path="/rsvp" component={Invitation}/>
    </div>
  </BrowserRouter>
)
