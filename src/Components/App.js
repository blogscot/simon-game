import React, { Component } from 'react'
import Panel from './Panel'
import ControlPanel from './ControlPanel'
import PanelColor from '../Enums/PanelColor'
import PowerState from '../Enums/PowerState'
import Player from '../Audio/Player'

/**
 * The App component encapsulates the Simon game's
 * Panel and ControlPanel subcomponents.
 * 
 * @class App
 * @extends {Component}
 */
class App extends Component {
  constructor() {
    super()
    this.player = new Player()
    this.isPlaying = false

    let panelPressed = {
      [PanelColor.Red]: false,
      [PanelColor.Blue]: false,
      [PanelColor.Yellow]: false,
      [PanelColor.Green]: false,
    }

    this.state = {
      powerState: PowerState.On, // FIXME: Development setting only
      strictMode: false,
      panelPressed: panelPressed,
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
    this.stopPlaying()
  }
  handleStrictButton = () => {
    if (!this.isPlaying) {
      this.setState({
        strictMode: !this.state.strictMode,
      })
    }
  }
  /* FIXME */
  handleStartButton = () => {
    if (this.state.powerState === PowerState.On && !this.isPlaying) {
      this.playSequence([
        PanelColor.Red,
        PanelColor.Green,
        PanelColor.Blue,
        PanelColor.Red,
        PanelColor.Yellow,
        PanelColor.Blue,
        PanelColor.Green,
        PanelColor.Yellow,
      ])
    }
  }
  handlePanelClick = color => {
    if (this.state.powerState === PowerState.On && !this.isPlaying) {
      this.player.play(color)
      this.lightPanel(color)
    }
  }
  lightPanel(color, duration = 300) {
    // light up color panel for a short time
    let panelPressed = { ...this.state.panelPressed }
    panelPressed[color] = true
    this.setState({ panelPressed })

    setTimeout(() => {
      panelPressed[color] = false
      this.setState({ panelPressed })
    }, duration)
  }
  /* 
     Note: if the delay is made is too short not all tones
     will be played as they interfere with each other.

     While the tones are playing prevent further button 
     presses (except power switch)
  */
  playSequence = (colors, delay = 600) => {
    this.isPlaying = true
    this.toneTimers = colors.map((color, index) => {
      return setTimeout(() => {
        this.lightPanel(color, 400)
        this.player.play(color)
      }, delay * index)
    })
    // Clear isPlaying when sequence finishes
    setTimeout(() => (this.isPlaying = false), delay * colors.length)
  }
  stopPlaying = () => {
    if (this.isPlaying) {
      this.toneTimers.forEach(timer => clearTimeout(timer))
    }
  }
  render() {
    const { panelPressed } = this.state
    return (
      <div style={styles.base}>
        <div style={styles.row}>
          <Panel
            style={styles.topLeftPanel}
            lighten={panelPressed[PanelColor.Green]}
            onClick={() => this.handlePanelClick(PanelColor.Green)}
          />
          <Panel
            style={styles.topRightPanel}
            lighten={panelPressed[PanelColor.Red]}
            onClick={() => this.handlePanelClick(PanelColor.Red)}
          />
        </div>
        <div style={styles.row}>
          <Panel
            style={styles.bottomLeftPanel}
            lighten={panelPressed[PanelColor.Yellow]}
            onClick={() => this.handlePanelClick(PanelColor.Yellow)}
          />
          <Panel
            style={styles.bottomRightPanel}
            lighten={panelPressed[PanelColor.Blue]}
            onClick={() => this.handlePanelClick(PanelColor.Blue)}
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
