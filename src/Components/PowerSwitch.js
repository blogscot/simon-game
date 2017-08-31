import React from 'react'
import styled, { keyframes, div } from 'styled-components'
import PropTypes from 'prop-types'

const turnOn = keyframes`
{
  0%   {left:0px; top:0px;}
  100% {left:20px; top:0px;}
 }
`
const turnOff = keyframes`
{
  0%   {left:20px; top:0px;}
  100% {left:0px; top:0px;}
 }
`

const Power = styled.div`
  padding: 0px;
  background-color: black;
  width: 45px;
`

const InitialSwitch = styled.div`
  width: 25px;
  height: 25px;
  position: relative;
  background-color: red;
`

const Switch = styled.div`
  width: 25px;
  height: 25px;
  position: relative;
  background-color: red;
  animation-name: ${props => (props.on ? turnOn : turnOff)};
  animation-duration: 1.3s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
`

/**
 * The PowerSwitch component handles starting and stopping
 * the game.
 * 
 * @returns component
 */
const PowerSwitch = ({ powerState }) => {
  let switchStyles = styles.powerSwitch
  return (
    <div style={switchStyles}>
      <span>OFF</span>&nbsp;
      <Power>
        {powerState === 'on'
          ? <Switch on />
          : powerState === 'off' ? <Switch /> : <InitialSwitch />}
      </Power>&nbsp;
      <span>ON</span>
    </div>
  )
}

const styles = {
  powerSwitch: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: '40px'
  }
}

PowerSwitch.propTypes = {
  powerState: PropTypes.string.isRequired
}

export default PowerSwitch
