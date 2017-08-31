import React from 'react'
import Logo from './Logo'
import Display from './Display'
import Button from './Button'
import Indicator from './Indicator'
import PowerSwitch from './PowerSwitch'

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
    console.log('start button pressed')
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
