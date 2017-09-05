import React from 'react'
import PropTypes from 'prop-types'
import Color from 'color'

/**
 * Panel displays a coloured panel, red, blue, yellow or blue,
 * which brightens when clicked by the user.
 * 
 * @param {object} style - the component style
 * @param {bool} lighten - brighten the panel color
 * @param {function} onClick - click handler  
 * @returns component
 */

const Panel = ({ style, lighten, onClick }) => {
  const lighter = Color(style.background).lighten(0.3)
  const lighterStyle = lighten ? { background: lighter.string() } : {}
  const newStyles = Object.assign({}, panelStyles, style, lighterStyle)
  return <div style={newStyles}
    onClick={onClick} />
}

const panelStyles = {
  width: '18em',
  height: '18em',
  borderStyle: 'solid',
  borderColor: 'black',
}

Panel.propTypes = {
  style: PropTypes.object.isRequired,
  lighten: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Panel
