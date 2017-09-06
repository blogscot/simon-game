import React from 'react'

import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'

/**
 * The Display component shows the current number of
 * presses to be repeated by the player.
 * 
 * @param {number} count - the current number in the game sequence
 * @param {boolean} blink - display info blinks
 * @param {boolean} displayOn - is the display currently enabled?
 * @returns component
 */
const Display = ({ count, blink, hasPower }) => {
  const text = count ? count : '--'
  return (
    <Container>
      {hasPower ? blink ? (
        <BlinkingInfo show>{text}</BlinkingInfo>
      ) : (
        <Info show>{text}</Info>
      ) : (
        <Info>{text}</Info>
      )}
      <Label>Count</Label>
    </Container>
  )
}

const Container = styled.div`
  box-sizing: border-box;
  height: 70px;
  width: 70px;
  border: 3px solid black;
  background: #2d0303;
  color: #ca1c1c;
  text-align: center;
  font-size: 2.8em;
  padding: 0.18em;
  border-radius: 0.25em;
`

const Info = styled.span`
  visibility: ${props => (props.show ? 'visibile' : 'hidden')};
`

const blinking = keyframes`
  50% { opacity: 0; }
`

const BlinkingInfo = Info.extend`animation: ${blinking} 1s linear infinite;`

const Label = styled.div`
  font-size: 15px;
  color: black;
  text-transform: uppercase;
  position: relative;
  top: 14px;
`

Display.propTypes = {
  count: PropTypes.number.isRequired,
  blink: PropTypes.bool.isRequired,
  hasPower: PropTypes.bool.isRequired,
}

export default Display
