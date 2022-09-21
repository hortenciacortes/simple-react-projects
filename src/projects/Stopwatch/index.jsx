import { ArrowCounterClockwise, Pause, Play } from 'phosphor-react';
import { useStopwatch } from 'react-timer-hook';
import './styles.scss';

export function Stopwatch() {
  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });


  return (
    <section className='container'>
      <div className='title'>
        <img src='src/assets/stopwatch.png' alt='Imagem de uma mão segurando um relógio' />
        <h2>Cronômetro</h2>
      </div>

      <div className="contain-stopwatch">

        <div className="card">
          <span>{hours < 10 ? `0${hours}` : hours}</span>
          <span>: {minutes < 10 ? `0${minutes}` : minutes}</span>
          <span>: {seconds < 10 ? `0${seconds}` : seconds}</span>
        </div>

        <div className='buttons'>
          {isRunning ? 
            <button className="card" onClick={pause}><Pause size={26} color="#04a0d9" weight="bold" /></button> :
            <button className="card" onClick={start}><Play size={26} color="#04a0d9" weight="bold" /></button>
          }
          <button className="card" onClick={() => reset(false, false)}><ArrowCounterClockwise size={26} color="#04a0d9" weight="bold" /></button>
        </div>

      </div>
    </section>
  );
}