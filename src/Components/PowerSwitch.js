import React from 'react'
import styled, { keyframes, div, span } from 'styled-components'
import PropTypes from 'prop-types'

const turnOn = keyframes`
{
  0%   {left:0px; top:0px;}
  100% {left:20px; top:0px;}
 }
`

const Power = styled.div`
  padding: 0px;
  background-color: black;
  width: 45px;
`

const Switch = styled.div`
  width: 25px;
  height: 25px;
  position: relative;
  background-color: red;
  animation-name: ${turnOn};
  animation-duration: 1.3s;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
`

const PowerSwitch = () => {
  let switchStyles = styles.powerSwitch
  return (
    <div style={switchStyles}>
      <span>OFF</span>&nbsp;
      <Power>
        <Switch />
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
  style: PropTypes.object.isRequired
}

export default PowerSwitch
