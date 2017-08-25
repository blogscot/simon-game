import React from "react"
import Logo from "./Logo"
import Display from "./Display"
import Button from "./Button"

import PropTypes from "prop-types"

const Control = ({ style }) => {
  Object.assign(styles.panelStyles, style)
  return (
    <div style={styles.panelStyles}>
      <Logo />
      <div style={styles.stripStyles}>
        <Display count={0} />
        <Button text={"start"}
          style={styles.startButtonStyles} />
        <Button text={"strict"}
          style={styles.strictButtonStyles} />
      </div>
    </div>
  )
}

const styles = {
  panelStyles: {
    width: "20em",
    height: "20em"
  },
  stripStyles: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "260px",
    marginLeft: "20px"
  },
  startButtonStyles: {
    background: "red"
  },
  strictButtonStyles: {
    background: "yellow"
  }
}

Control.propTypes = {
  style: PropTypes.object.isRequired
}

export default Control
