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
    strictMode: false
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
  }
  handleStrictButton = () => {
    this.setState({
      strictMode: !this.state.strictMode
    })
  }
  handleStartButton = () => {
    this.playToneSequence([
      this.redPanelTone,
      this.greenPanelTone,
      this.yellowPanelTone,
      this.bluePanelTone,
      this.redPanelTone
    ])
  }
  playToneSequence = (tones, delay = 500) => {
    tones.forEach((tone, index) => {
      setTimeout(() => tone.play(), delay * index)
    })
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
    height: '20em'
  },
  strip: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    width: '300px',
    marginLeft: '30px'
  },
  startButton: {
    background: 'red'
  },
  strictButton: {
    background: 'yellow'
  },
  indicator: {
    position: 'relative',
    top: '-51px',
    left: '-63px'
  }
}

Control.propTypes = {
  style: PropTypes.object.isRequired
}

export default Control
