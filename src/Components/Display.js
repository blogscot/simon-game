import React from 'react'

import PropTypes from 'prop-types'

/**
 * The Display component shows the current number of
 * presses to be repeated by the player.
 * 
 * @param {number} count - the current number in the game sequence
 * @param {boolean} displayOn - is the display currently enabled?
 * @returns component
 */
const Display = ({ count, hasPower }) => {
  const countStyle = Object.assign(
    {},
    hasPower ? { visibility: 'visible' } : { visibility: 'hidden' }
  )
  return (
    <div style={styles.display}>
      <span style={countStyle}>{count}</span>
      <div style={styles.text}>Count</div>
    </div>
  )
}

const styles = {
  display: {
    boxSizing: 'border-box',
    height: '70px',
    width: '70px',
    border: '3px solid black',
    background: '#2d0303',
    color: '#ca1c1c',
    textAlign: 'right',
    fontSize: '3em',
    padding: '0.18em',
    borderRadius: '0.25em',
  },
  text: {
    fontSize: '15px',
    color: 'black',
    textTransform: 'uppercase',
    position: 'relative',
    top: '10px',
  },
}

Display.propTypes = {
  count: PropTypes.number.isRequired,
  hasPower: PropTypes.bool.isRequired,
}

export default Display
