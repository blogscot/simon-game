import React from 'react'
import Logo from './Logo'
import Display from './Display'
import Button from './Button'
import Indicator from './Indicator'
import PowerSwitch from './PowerSwitch'

import Sound1 from '../Audio/Sound1.mp3'
import Sound2 from '../Audio/Sound2.mp3'
import Sound3 from '../Audio/Sound3.mp3'
import Sound4 from '../Audio/Sound4.mp3'

import PropTypes from 'prop-types'

/**
 * The Control compentent contains the display and button
 * controls.
 * 
 * @param {object} style - the injected component styles 
 * @returns component 
 */
class Control extends React.Component {
  state = {
    powerState: 'Reset',
    strictMode: false,
    isPlaying: false,
  }
  redPanelTone = new Audio(Sound1)
  bluePanelTone = new Audio(Sound2)
  yellowPanelTone = new Audio(Sound3)
  greenPanelTone = new Audio(Sound4)
  handlePowerSwitch = () => {
    let powerState
    if (this.state.powerState !== 'On') {
      powerState = 'On'
    } else {
      powerState = 'Off'
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
    if (this.state.powerState === 'On' && !this.state.isPlaying) {
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
     will be played, as they overlap with each other.

     While the tones are playing prevent further button 
     presses (execept power switch)
  */
  playToneSequence = (tones, delay = 600) => {
    this.setState({ isPlaying: true })
    this.toneTimers = tones.map((tone, index) => {
      return setTimeout(() => tone.play(), delay * index)
    })
    // Clear isPlaying state when sequence finishes
    setTimeout(() => this.setState({ isPlaying: false }), delay * tones.length)
  }
  render() {
    const { style } = this.props
    const displayOn = this.state.powerState === 'On' ? true : false
    Object.assign(styles.panel, style)
    return (
      <div style={styles.panel}>
        <Logo />
        <div style={styles.strip}>
          <Display count={0}
            displayOn={displayOn} />
          <Button
            text={'start'}
            style={styles.startButton}
            onClick={this.handleStartButton}
          />
          <Button
            text={'strict'}
            style={styles.strictButton}
            onClick={this.handleStrictButton}
          />
          <Indicator
            style={styles.indicator}
            hasPower={this.state.powerState === 'On'}
            strictMode={this.state.strictMode}
          />
        </div>
        <PowerSwitch
          powerState={this.state.powerState}
          onClick={this.handlePowerSwitch}
        />
      </div>
    )
  }
}

const styles = {
  panel: {
    width: '20em',
    height: '20em',
  },
  strip: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    width: '300px',
    marginLeft: '30px',
  },
  startButton: {
    background: 'red',
  },
  strictButton: {
    background: 'yellow',
  },
  indicator: {
    position: 'relative',
    top: '-51px',
    left: '-63px',
  },
}

Control.propTypes = {
  style: PropTypes.object.isRequired,
}

export default Control
