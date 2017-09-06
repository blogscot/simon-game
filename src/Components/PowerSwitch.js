import React from 'react'
import PowerState from '../Enums/PowerState'

import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'

/**
 * The PowerSwitch component handles powering the game on and off.
 * Note, the switch animates 'On' and 'Off' and starts initially 'Reset'.
 * 
 * @param {boolean} powerState - the power state can be 'Reset', 'Off' or 'On'
 * @param {function} onClick - the power switch click handler
 * @returns component
 */
const PowerSwitch = ({ powerState, onClick }) => {
  return (
    <Wrapper>
      <span>OFF</span>&nbsp;
      <Power>
        {powerState === PowerState.On ? (
          <Switch on
            onClick={onClick} />
        ) : powerState === PowerState.Off ? (
          <Switch onClick={onClick} />
        ) : (
          <InitialSwitch onClick={onClick} />
        )}
      </Power>&nbsp;
      <span>ON</span>
    </Wrapper>
  )
}

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
  &:hover {
    cursor: pointer;
  }
`

const Switch = InitialSwitch.extend`
  animation-name: ${props => (props.on ? turnOn : turnOff)};
  animation-duration: 0.1s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 40px;
`

PowerSwitch.propTypes = {
  powerState: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default PowerSwitch
