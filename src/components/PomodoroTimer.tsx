import React, { useState, useEffect, useCallback} from 'react'
import { useInterval } from '../hooks/useInterval';
import ButtonController from '../shared-components/ButtonController';
import TimerComponent from './TimerComponent';
import styled from '@emotion/styled';

import bellStart from '../sounds/src_sounds_bell-start.mp3';
import bellFinish from '../sounds/src_sounds_bell-finish.mp3';
import secondsToTimes from '../utils/secondsToTimes';

const audioStartlearning = new Audio(bellStart);
const audioStoplearning = new Audio(bellFinish);

interface Props {
  defaultPomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

const PomodoroTimer = (props: Props): JSX.Element => {
  const [mainTime, setMainTime] = useState(props.defaultPomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [learning, setlearning] = useState(false);
  const [resting, setResting] = useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(new Array(props.cycles -1).fill(true));

  const [completedCycles, setCompletedCycles] = useState(0);
  const [fulllearningTime, setfulllearningTime] = useState(0);
  const [numberOfPomodoros, setnumberOfPomodoros] = useState(0);

  useInterval(() => {
    setMainTime(mainTime - 1);
    if (learning) setfulllearningTime(fulllearningTime + 1);
  }, timeCounting ? 1000 : null);

  const configureWork = useCallback (() => {
    setTimeCounting(true);
    setlearning(true);
    setResting(false);
    setMainTime(props.defaultPomodoroTime);

    audioStartlearning.play();
  }, [setTimeCounting, setlearning, setResting, setMainTime]);

  const configureResting = useCallback ((long: boolean) => {
    setTimeCounting(true);
    setlearning(false);
    setResting(true);

    if (long) {
      setMainTime(props.longRestTime);
    } else {
      setMainTime(props.shortRestTime);
    }

    audioStoplearning.play();
  }, [setTimeCounting, setlearning, setResting]);

  useEffect(() => {
    if (mainTime > 0) return

    if (learning && cyclesQtdManager.length > 0) {
      configureResting(false);
      cyclesQtdManager.pop();
    } else if (learning && cyclesQtdManager.length <= 0) {
      configureResting(true);
      setCyclesQtdManager(new Array(props.cycles -1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (learning) setnumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configureWork();
  }, [
      learning,
      resting,
      mainTime,
      cyclesQtdManager,
      numberOfPomodoros,
      completedCycles,
      configureResting,
      setCyclesQtdManager,
      configureWork,
      props.cycles,
    ]);

  return (
    <BoxPomodoro>
      <div className='container'>
        <h2>Status: {learning ? 'Estudando' : 'Descansando'}</h2>
        <TimerComponent mainTime={mainTime}/>
        <div className='controlls-btn'>
          <ButtonController text='Iniciar' onClick={() => configureWork()}/>
          <ButtonController
           text={timeCounting ? 'Pause' : 'Play'} 
           onClick={() => setTimeCounting(!timeCounting)}
          />
          <ButtonController text='Rest' onClick={() => configureResting(false)}/>
        </div>

        <div className='pomodoroDetails'>
          <p>Ciclos concluídos: <span>{completedCycles}</span></p>
          <p>Horas Trabalhadas: <span>{secondsToTimes(fulllearningTime)}</span></p>
          <p>Pomodoros concluídos: <span>{numberOfPomodoros}</span></p>
        </div>
      </div>
    </BoxPomodoro>
  )
}

const BoxPomodoro = styled.div`
  width: 50%;
  background-color: #262626;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #9e9e9ecc;
  border-radius: 10px;

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 3rem 5rem;

    > h2 {
      display: flex;
      font-size: 1.8rem;
      padding: 10px;
      color: #ffffff;
      
    }

    @media (max-width: 500px) {
      padding: 1rem 3rem;

      > h1 {
        font-size: 1.3rem;
      }
    }

  }

  .controlls-btn {
    display: flex;
    gap: 2rem;
  }

  .pomodoroDetails {
    margin: 4rem 0;
    color: #9e9e9ecc;
    text-align: center;
    line-height: 1.5;

    > p {
      font-size: 1.3rem;
    }

    span {
      color: #ffffff;
    }
  }

  @media (max-width: 900px) {
    width: 100%;
    margin: 0 1rem;
  }

`;

export default PomodoroTimer