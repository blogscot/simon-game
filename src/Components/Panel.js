import React from "react"
import PropTypes from "prop-types"

const Panel = ({ style }) => {
  Object.assign(panelStyles, style)
  return <div style={panelStyles} />
}

const panelStyles = {
  width: "18em",
  height: "18em"
}

Panel.propTypes = {
  style: PropTypes.object.isRequired
}

export default Panel
