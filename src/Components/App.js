import React, { Component } from 'react'
import Panel from './Panel'
import Control from './Control'

/**
 * The App component encapsulates the Simon game's
 * subcomponents.
 * 
 * @class App
 * @extends {Component}
 */
class App extends Component {
  render() {
    return (
      <div style={styles.base}>
        <div style={styles.row}>
          <Panel style={styles.topLeftPanel} />
          <Panel style={styles.topRightPanel} />
        </div>
        <div style={styles.row}>
          <Panel style={styles.bottomLeftPanel} />
          <Panel style={styles.bottomRightPanel} />
        </div>
        <div style={styles.row}>
          <Control style={styles.control} />
        </div>
      </div>
    )
  }
}

const styles = {
  base: {
    marginTop: '20px',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  topLeftPanel: {
    borderRadius: '300px 0 0 0',
    background: 'green',
    borderWidth: '16px 8px 8px 16px',
    borderStyle: 'solid',
    borderColor: 'black',
  },
  topRightPanel: {
    borderRadius: '0 300px 0 0',
    background: '#a50303',
    borderWidth: '16px 16px 8px 8px',
  },
  bottomRightPanel: {
    borderRadius: '0 0 300px 0',
    background: '#5b75bf',
    borderWidth: '8px 16px 16px 8px',
  },
  bottomLeftPanel: {
    borderRadius: '0 0 0 300px',
    background: '#c3c32f',
    borderWidth: '8px 8px 16px 16px',
  },
  control: {
    position: 'relative',
    top: '-484px',
    background: 'white',
    borderRadius: '300px',
    border: '16px solid black',
    zIndex: '1',
  },
}

export default App
