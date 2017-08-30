import React from 'react'

/**
 * Displays the game logo.
 * 
 * @returns component
 */
const Logo = () => {
  return (
    <div style={styles.logo}>
      <b>Simon</b>
      <span style={styles.trademark}>&reg;</span>
    </div>
  )
}

const styles = {
  logo: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '5em',
    fontFamily: 'bookman',
    marginTop: '0.5em'
  },
  trademark: {
    fontSize: '0.3em'
  }
}

export default Logo
