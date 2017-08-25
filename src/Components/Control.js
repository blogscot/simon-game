import React from "react"
import Logo from "./Logo"
import Display from "./Display"

import PropTypes from "prop-types"

const Control = ({ style }) => {
  Object.assign(styles.panelStyles, style)
  return (
    <div style={styles.panelStyles}>
      <Logo />
      <Display style={styles.displayStyles}
        count={0} />
    </div>
  )
}

const styles = {
  panelStyles: {
    width: "20em",
    height: "20em"
  },
  displayStyles: {
    marginLeft: "20px"
  }
}

Control.propTypes = {
  style: PropTypes.object.isRequired
}

export default Control
