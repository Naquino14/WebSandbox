import React from 'react'
import "./Foot.css"

const openGithub = (e: React.MouseEvent) => {
  e.preventDefault()
  window.open('https://github.com/naquino14', '_blank')
}

const Foot: React.FC = () => {
  return (
    <footer className='foot'>
        <span className='foot_copyright'>Copyright 2069 Vanilla "Woopie/Woogie (ve/vim)" Vinetta</span>
        <button className='foot_button'
        type='button'
        onClick={(e) => {openGithub(e)}}>
          GitHub</button>
    </footer>
  )
}

export default Foot