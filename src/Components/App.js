import React, { Component } from 'react'
import Panel from './Panel'
import ControlPanel from './ControlPanel'
import PanelColor from '../Enums/PanelColor'
import PowerState from '../Enums/PowerState'
import TonePlayer from '../Audio/TonePlayer'

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
    this.tonePlayer = new TonePlayer()
    this.isPlayingSequence = false
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
      displayText: '--',
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
      randomNumber = Math.floor(Math.random() * colors.length)
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
      displayText: '--',
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
      this.setState({ count, displayText: '--' })
    }
    await this.blinkDisplay()
    count += 1
    this.setState({ count, displayText: count.toString() })
    this.playGameSequence(count)
  }
  handleStrictButton = () => {
    this.setState({
      strictMode: !this.state.strictMode,
    })
  }
  handlePanelClick = color => {
    if (
      this.state.powerState === PowerState.On &&
      this.state.count > 0 &&
      !this.isPlayingSequence
    ) {
      this.playerColorSequence.push(color)
      this.lightPanel(color)

      // check panel is the expected panel
      const playerSeq = this.playerColorSequence
      const expectedSeq = this.expectedColorSequence

      if (this.isPlayerSequenceValid(playerSeq, expectedSeq)) {
        this.tonePlayer.playToneFor(color)
        // check if player has completed the sequence
        if (playerSeq.length === expectedSeq.length) {
          let count = this.state.count + 1
          this.playerColorSequence = []
          setTimeout(() => {
            this.setState({ count, displayText: count.toString() })
            this.playGameSequence(count)
          }, 1000)
        }
      } else {
        this.handleWrongPanelPress()
      }
    }
  }
  handleWrongPanelPress = async () => {
    this.tonePlayer.errorTone()

    // blink error message
    const { displayText } = this.state
    this.setState({ displayText: '!!' })
    await this.blinkDisplay()
    this.setState({ displayText })

    this.playerColorSequence = []
    if (this.state.strictMode) {
      // restart from scratch
      this.gameColorSequence = this.generateGameColorSequence()
      // Wait for blinking to finish
      setTimeout(() => this.setState({ count: 0 }), 800)
      this.handleStartButton()
    } else {
      this.playGameSequence(this.state.count)
    }
  }
  /**
   * Checks the current user input matches the expected game sequence
   * 
   * @memberof App
   */
  isPlayerSequenceValid = (playerSeq, expectedSeq) => {
    return playerSeq.reduce(
      (acc, item, index) => item === expectedSeq[index],
      true
    )
  }
  playGameSequence = count => {
    if (this.state.powerState === PowerState.On && !this.isPlayingSequence) {
      const currentSequence = this.gameColorSequence.slice(0, count)
      this.expectedColorSequence = currentSequence
      this.playSequence(currentSequence)
    }
  }
  lightPanel(color, duration = 600) {
    // light up color panel for a short time
    let panelPressed = { ...this.state.panelPressed }
    panelPressed[color] = true
    this.setState({ panelPressed })

    setTimeout(() => {
      panelPressed[color] = false
      this.setState({ panelPressed })
    }, duration)
  }
  blinkDisplay = async (duration = 1800) => {
    const promise = new Promise(resolve => {
      this.setState({ blinking: true })

      setTimeout(() => {
        this.setState({ blinking: false })
        resolve()
      }, duration)
    })
    return promise
  }
  /**
   * Play a sequence of tones for the given colors.
   * 
   * @param {array} colors - the color sequence
   * @param {number} delay - the interval between tones
   * 
   * @memberof App
   */
  playSequence = (colors, interval = 800) => {
    this.isPlayingSequence = true
    this.toneTimers = colors.map((color, index) => {
      return setTimeout(() => {
        this.lightPanel(color)
        this.tonePlayer.playToneFor(color)
      }, interval * index)
    })
    // Clear isPlaying when sequence finishes
    setTimeout(() => (this.isPlayingSequence = false), interval * colors.length)
  }
  /**
   * Stop playing sequence early
   * 
   * @memberof App
   */
  stopPlaying = () => {
    if (this.isPlayingSequence) {
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
            text={this.state.displayText}
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
