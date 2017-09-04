import React from 'react'
import Logo from './Logo'
import Display from './Display'
import Button from './Button'
import Indicator from './Indicator'
import PowerSwitch from './PowerSwitch'
import PowerState from '../Enums/PowerState'

import PropTypes from 'prop-types'

/**
 * The Control compontent contains the display, button,
 * indicator and power switch subcomponents.
 * 
 * @param {object} style - the injected component styles 
 * @returns component 
 */
const ControlPanel = ({
  style,
  powerState,
  strictMode,
  handleStrictButton,
  handleStartButton,
  handlePowerSwitch,
}) => {
  Object.assign(styles.panel, style)
  const hasPower = powerState === PowerState.On
  return (
    <div style={styles.panel}>
      <Logo />
      <div style={styles.strip}>
        <Display count={0}
          hasPower={hasPower} />
        <Button
          text={'start'}
          style={styles.startButton}
          onClick={handleStartButton}
        />
        <Button
          text={'strict'}
          style={styles.strictButton}
          onClick={handleStrictButton}
        />
        <Indicator
          style={styles.indicator}
          hasPower={hasPower}
          strictMode={strictMode}
        />
      </div>
      <PowerSwitch powerState={powerState}
        onClick={handlePowerSwitch} />
    </div>
  )
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

ControlPanel.propTypes = {
  style: PropTypes.object.isRequired,
  powerState: PropTypes.string.isRequired,
  strictMode: PropTypes.bool.isRequired,
  handleStrictButton: PropTypes.func.isRequired,
  handleStartButton: PropTypes.func.isRequired,
  handlePowerSwitch: PropTypes.func.isRequired,
}

export default ControlPanel