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
    this.expectedColorSequence = null
    this.playerColorSequence = []
    this.gameColorSequence = this.generateGameColorSequence()

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
      count: 0,
      blinking: false,
      displayConfig: {},
    }
  }
  generateGameColorSequence = () => {
    const colors = [
      PanelColor.Red,
      PanelColor.Blue,
      PanelColor.Yellow,
      PanelColor.Green,
    ]
    let randomNumber
    let sequence = []
    for (let index = 0; index < 20; index++) {
      randomNumber = Math.floor(Math.random() * 4)
      sequence.push(colors[randomNumber])
    }
    return sequence
  }
  handlePowerSwitch = () => {
    let powerState
    if (this.state.powerState !== PowerState.On) {
      powerState = PowerState.On
    } else {
      powerState = PowerState.Off
    }
    this.setState({
      powerState,
      strictMode: false,
      count: 0,
      blinking: false,
    })
    this.stopPlaying()
  }
  // Start (or restart) the game
  handleStartButton = async () => {
    let { count } = this.state
    // if game is already running restart!
    if (count > 0) {
      // reset the game state
      this.expectedColorSequence = null
      this.playerColorSequence = []
      this.gameColorSequence = this.generateGameColorSequence()
      this.stopPlaying()
      count = 0
      this.setState({ count })
    }
    await this.blinkDisplay()
    count += 1
    this.setState({ count })
    this.playGameSequence(count)
  }
  handleStrictButton = () => {
    if (!this.isPlaying) {
      this.setState({
        strictMode: !this.state.strictMode,
      })
    }
  }
  handlePanelClick = color => {
    if (this.state.powerState === PowerState.On && !this.isPlaying) {
      this.player.play(color)
      this.lightPanel(color)

      // check player sequence
      this.checkPlayerSequence(color)
    }
  }
  checkPlayerSequence = color => {
    this.playerColorSequence.push(color)
    const { count } = this.state
    if (this.playerColorSequence.length === count) {
      if (this.isPlayerSequenceValid()) {
        // Pause before showing next sequence
        setTimeout(() => {
          let count = this.state.count + 1
          this.setState({ count })
          this.playerColorSequence = []
          this.playGameSequence(count)
        }, 1000)
      } else {
        // handle player failure
        console.log('You pressed the wrong color!')
      }
    }
  }
  isPlayerSequenceValid = () => {
    const player = this.playerColorSequence
    const expected = this.expectedColorSequence
    return player.reduce((acc, item, index) => item === expected[index], true)
  }
  playGameSequence = count => {
    if (this.state.powerState === PowerState.On && !this.isPlaying) {
      const currentSequence = this.gameColorSequence.slice(0, count)
      this.expectedColorSequence = currentSequence
      this.playSequence(currentSequence)
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
  blinkDisplay = async (duration = 2400) => {
    const promise = new Promise(resolve => {
      this.setState({ blinking: true })

      setTimeout(() => {
        this.setState({ blinking: false })
        resolve()
      }, duration)
    })
    return promise
  }
  /* 
     Note: if the delay is made is too short not all tones
     will be played as they interfere with each other.

     While the tones are playing prevent further button 
     presses (except power switch)
  */
  playSequence = (colors, delay = 800) => {
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
            count={this.state.count}
            blinking={this.state.blinking}
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
    background: '#ececec',
    borderRadius: '300px',
    border: '16px solid black',
    zIndex: '1',
  },
}

export default App
