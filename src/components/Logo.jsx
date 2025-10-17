import React from 'react'
import logo  from '../assets/logo.png'

function Logo({width = '100px'}) {
  return (
    <div className="App">
      <img 
        src={logo} 
        alt="Sahil Raj Projects Logo" 
        className="h-16 w-auto mx-auto my-4"
      />
    </div>
  )
}

export default Logo