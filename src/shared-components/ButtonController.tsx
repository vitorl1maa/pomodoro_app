import React from 'react'
import styled from '@emotion/styled';
import '../index.css';

interface Props {
  text: string;
  onClick?: () => void;
  className?: string;
}

const ButtonController = (props: Props): JSX.Element => {
  return (
    <Button onClick={props.onClick}>
      {props.text}
    </Button>
  )
}

const Button = styled.button`
  background-color: transparent;
  border: 1px solid #9e9e9ecc;
  border-radius: 5px;
  padding: .7rem 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  color: #9e9e9ecc;
  
  &:hover {
    background-color: #4f4f4f85;
    
  }

  @media (max-width: 500px) {
    padding: .7rem 1.7rem;
  }
  

`;



export default ButtonController