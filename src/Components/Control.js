import React from 'react'
import Logo from './Logo'
import Display from './Display'
import Button from './Button'
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
    powerState: 'Reset'
  }
  handlePowerSwitch = () => {
    let powerState
    if (this.state.powerState !== 'On') {
      powerState = 'On'
    } else {
      powerState = 'Off'
    }
    this.setState({ powerState })
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
          <Button text={'start'}
            style={styles.startButton} />
          <Button text={'strict'}
            style={styles.strictButton} />
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
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '260px',
    marginLeft: '20px'
  },
  startButton: {
    background: 'red'
  },
  strictButton: {
    background: 'yellow'
  }
}

Control.propTypes = {
  style: PropTypes.object.isRequired
}

export default Control
