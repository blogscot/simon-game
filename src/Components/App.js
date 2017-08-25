import React, { Component } from "react"
import Panel from "./Panel"

class App extends Component {
  render() {
    return (
      <div style={styles.base}>
        <div style={styles.row}>
          <Panel style={styles.topLeftPanelStyle} />
          <Panel style={styles.topRightPanelStyle} />
        </div>
        <div style={styles.row}>
          <Panel style={styles.bottomLeftPanelStyle} />
          <Panel style={styles.bottomRightPanelStyle} />
        </div>
      </div>
    )
  }
}

const styles = {
  base: {
    marginTop: "20px"
  },
  row: {
    display: "flex",
    justifyContent: "center"
  },
  topLeftPanelStyle: {
    borderRadius: "300px 0 0 0",
    background: "green",
    borderWidth: "16px 8px 8px 16px",
    borderStyle: "solid",
    borderColor: "black"
  },
  topRightPanelStyle: {
    borderRadius: "0 300px 0 0",
    background: "red",
    borderWidth: "16px 16px 8px 8px"
  },
  bottomRightPanelStyle: {
    borderRadius: "0 0 300px 0",
    background: "#7595ef",
    borderWidth: "8px 16px 16px 8px"
  },
  bottomLeftPanelStyle: {
    borderRadius: "0 0 0 300px",
    background: "#c3c32f",
    borderWidth: "8px 8px 16px 16px"
  }
}

export default App
