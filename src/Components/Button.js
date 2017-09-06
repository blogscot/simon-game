import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

/**
 * Displays a configurable game button 
 * 
 * @param {string} text  - the button text
 * @param {function} onClick - the button click handler
 * @returns component
 */

const Button = ({ text, onClick }) => {
  return (
    <Wrapper>
      {text === 'strict' ? (
        <GameButton strict
          onClick={onClick} />
      ) : (
        <GameButton onClick={onClick} />
      )}
      <Label>{text}</Label>
    </Wrapper>
  )
}

const GameButton = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 24px;
  border: 3px solid black;
  &:hover {
    cursor: pointer;
  }
  background: ${props => (props.strict ? 'yellow' : 'red')};
`

const Label = styled.div`
  font-size: 15px;
  color: black;
  text-transform: uppercase;
  position: relative;
  top: 23px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
`

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Button
