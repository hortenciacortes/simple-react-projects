import { useStopwatch } from 'react-timer-hook';
import './styles.scss';

export function Stopwatch() {
  const {
    seconds,
    minutes,
    hours,
    days,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });


  return (
    <section className='container'>
      <div className='title'>
        <img src='src/assets/stopwatch.png' alt='Imagem de uma mão segurando um relógio' />
        <h2>Stopwatch</h2>
      </div>

      <div className="contain-stopwatch">

        <div className="card">
          <span>{days < 10 ? `0${days}` : days}</span>:
          <span>{hours < 10 ? `0${hours}` : hours}</span>:
          <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
          <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
        </div>

        <div className='buttons'>
          <button className="card" onClick={start}>Start</button>
          <button className="card" onClick={pause}>Stop</button>
          <button className="card" onClick={reset}>Reset</button>
        </div>

      </div>
    </section>
  );
}