import React from 'react'

import PropTypes from 'prop-types'

/**
 * Displays a configurable game button 
 * 
 * @param {string} text  - the button text
 * @param {object} style - the injected component styles 
 * @returns component
 */
const Button = ({ text, style, onClick }) => {
  Object.assign(styles.button, style)
  return (
    <div style={styles.base}>
      <div style={styles.button}
        onClick={onClick} />
      <div style={styles.text}>
        {text}
      </div>
    </div>
  )
}

const styles = {
  base: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    width: '24px',
    height: '24px',
    borderRadius: '24px',
    border: '3px solid black'
  },
  text: {
    fontSize: '15px',
    color: 'black',
    textTransform: 'uppercase',
    position: 'relative',
    top: '23px'
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Button
