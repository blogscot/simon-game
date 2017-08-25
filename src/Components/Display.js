import React from "react"

import PropTypes from "prop-types"

const Display = ({ style, count }) => {
  Object.assign(styles.display, style)
  return (
    <div style={styles.display}>
      {count}
    </div>
  )
}

const styles = {
  display: {
    height: "50px",
    width: "56px",
    border: "3px solid black",
    background: "red",
    color: "white",
    textAlign: "right",
    fontSize: "3em",
    padding: "0.15em",
    borderRadius: "0.25em"
  }
}

Display.propTypes = {
  count: PropTypes.number.isRequired
}

Display.propTypes = {
  style: PropTypes.object.isRequired
}

export default Display
