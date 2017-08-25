import React from "react"
import Logo from "./Logo"

import PropTypes from "prop-types"

const Control = ({ style }) => {
  Object.assign(styles.panelStyles, style)
  return (
    <div style={styles.panelStyles}>
      <Logo />
    </div>
  )
}

const styles = {
  panelStyles: {
    width: "20em",
    height: "20em"
  }
}
Control.propTypes = {
  style: PropTypes.object.isRequired
}

export default Control
