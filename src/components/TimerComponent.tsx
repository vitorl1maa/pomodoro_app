import React from 'react'
import secondsToMinutes from '../utils/secondsToTime';
import styled from '@emotion/styled';

interface Props {
  mainTime: number;
}

const TimerComponent = (props: Props): JSX.Element => {
  return (
    <TimerContainer>
      {secondsToMinutes(props.mainTime)}
    </TimerContainer>
  )
}

const TimerContainer = styled.div`
  font-size: 10rem;
  color: #ffffff;

  @media (max-width: 500px) {
    font-size: 5rem;
  }
`;

export default TimerComponent;