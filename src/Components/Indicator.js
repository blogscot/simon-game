import React from 'react'

import PropTypes from 'prop-types'

/**
 * Displays the current state of `Strict mode`.
 * 
 * @param {object} style - the injected component styles
 * @param {boolean} strictMode - the current strict mode state
 * @param {boolean} hasPower - does the game have power?
 * @returns component
 */
const Indicator = ({ style, strictMode, hasPower }) => {
  const indicatorStyle =
    hasPower && strictMode
      ? { backgroundColor: 'red' }
      : { backgroundColor: 'black' }
  const buttonStyle = Object.assign({}, styles.button, style, indicatorStyle)
  return <div style={buttonStyle} />
}

const styles = {
  button: {
    width: '10px',
    height: '10px',
    borderRadius: '10px',
    border: '3px solid black',
  },
}

Indicator.propTypes = {
  style: PropTypes.object.isRequired,
  hasPower: PropTypes.bool.isRequired,
  strictMode: PropTypes.bool.isRequired,
}

export default Indicator
