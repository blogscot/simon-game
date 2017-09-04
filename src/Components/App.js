import React, { Component } from 'react'
import Panel from './Panel'
import Control from './Control'
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
      isPlaying: false,
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

    // clear any running timers
    if (this.state.isPlaying) {
      this.toneTimers.forEach(timer => clearTimeout(timer))
    }
  }
  handleStrictButton = () => {
    if (!this.state.isPlaying) {
      this.setState({
        strictMode: !this.state.strictMode,
      })
    }
  }
  /* FIXME */
  handleStartButton = () => {
    if (this.state.powerState === PowerState.On && !this.state.isPlaying) {
      this.playToneSequence([
        this.greenPanelTone,
        this.greenPanelTone,
        this.redPanelTone,
        this.redPanelTone,
        this.bluePanelTone,
        this.bluePanelTone,
        this.yellowPanelTone,
        this.yellowPanelTone,
      ])
    }
  }
  /* 
     Note: if the delay is made is too short not all tones
     will be played as they interfere with each other.

     While the tones are playing prevent further button 
     presses (except power switch)
  */
  playToneSequence = (tones, delay = 600) => {
    this.setState({ isPlaying: true })
    this.toneTimers = tones.map((tone, index) => {
      return setTimeout(() => tone.play(), delay * index)
    })
    // Clear isPlaying when sequence finishes
    setTimeout(() => this.setState({ isPlaying: false }), delay * tones.length)
  }
  handlePanelClick = color => {
    this.player.play(color)
  }
  render() {
    const displayOn = this.state.powerState === PowerState.On ? true : false
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
          <Control
            displayOn={displayOn}
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
