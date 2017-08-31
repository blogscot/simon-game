import React from 'react'

import PropTypes from 'prop-types'

/**
 * Displays the current state of `Strict mode`.
 * 
 * @param {object} style - the injected component styles 
 * @returns component
 */
const Indicator = ({ style }) => {
  Object.assign(styles.button, style)
  return <div style={styles.button} />
}

const styles = {
  button: {
    width: '10px',
    height: '10px',
    borderRadius: '10px',
    backgroundColor: 'red',
    border: '3px solid black'
  }
}

Indicator.propTypes = {
  style: PropTypes.object.isRequired
}

export default Indicator
