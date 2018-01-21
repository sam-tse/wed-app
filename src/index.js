import React from 'react'
import { render } from 'react-dom'
import './index.css'
import App from './App'
import WebfontLoader from '@dr-kobros/react-webfont-loader'

 // webfontloader configuration object. *REQUIRED*.
const config = {
  google: {
    families: ['Great+Vibes'],
  }
}

// Callback receives the status of the general webfont loading process. *OPTIONAL*
const callback = status => {
  // I could hook the webfont status to for example Redux here.
}
 
render(
  <WebfontLoader config={config} onStatus={callback}>
    <App />
  </WebfontLoader>,
  document.getElementById('root')
)
