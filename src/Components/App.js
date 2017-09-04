import React, { Component } from 'react'
import Panel from './Panel'
import ControlPanel from './ControlPanel'
import Color from '../Enums/PanelColor'
import Player from '../Audio/Player'
import PowerState from '../Enums/PowerState'

/**
 * The App component encapsulates the Simon game's
 * subcomponents.
 * 
 * @class App
 * @extends {Component}
 */
class App extends Component {
  constructor() {
    super()
    this.player = new Player()

    this.state = {
      powerState: PowerState.Reset,
      strictMode: false,
    }
  }
  handlePowerSwitch = () => {
    let powerState
    if (this.state.powerState !== PowerState.On) {
      powerState = PowerState.On
    } else {
      powerState = PowerState.Off
    }
    this.setState({ powerState, strictMode: false })

    // stop any playing sounds
    this.player.stop()
  }
  handleStrictButton = () => {
    if (!this.player.isPlaying) {
      this.setState({
        strictMode: !this.state.strictMode,
      })
    }
  }
  /* FIXME */
  handleStartButton = () => {
    if (this.state.powerState === PowerState.On && !this.player.isPlaying) {
      this.player.playSequence([
        Color.Green,
        Color.Green,
        Color.Red,
        Color.Red,
        Color.Blue,
        Color.Blue,
        Color.Yellow,
        Color.Yellow,
      ])
    }
  }
  handlePanelClick = color => {
    if (this.state.powerState === PowerState.On) {
      this.player.play(color)
    }
  }
  render() {
    return (
      <div style={styles.base}>
        <div style={styles.row}>
          <Panel
            style={styles.topLeftPanel}
            onClick={() => this.handlePanelClick(Color.Green)}
          />
          <Panel
            style={styles.topRightPanel}
            onClick={() => this.handlePanelClick(Color.Red)}
          />
        </div>
        <div style={styles.row}>
          <Panel
            style={styles.bottomLeftPanel}
            onClick={() => this.handlePanelClick(Color.Yellow)}
          />
          <Panel
            style={styles.bottomRightPanel}
            onClick={() => this.handlePanelClick(Color.Blue)}
          />
        </div>
        <div style={styles.row}>
          <ControlPanel
            powerState={this.state.powerState}
            strictMode={this.state.strictMode}
            style={styles.control}
            handleStrictButton={this.handleStrictButton}
            handleStartButton={this.handleStartButton}
            handlePowerSwitch={this.handlePowerSwitch}
          />
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
