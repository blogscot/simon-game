import React from 'react'
import PropTypes from 'prop-types'

/**
 * Panel displays a coloured panel, red, blue, yellow or blue.
 * 
 * @param {object} style - the component style 
 * @returns component
 */

const Panel = ({ style, onClick }) => {
  let styles = Object.assign({}, panelStyles, style)
  return <div style={styles}
    onClick={onClick} />
}

const panelStyles = {
  width: '18em',
  height: '18em',
}

Panel.propTypes = {
  style: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Panel
