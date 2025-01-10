import React, { useState, useEffect, useRef } from 'react';

    function App() {
      const [workDuration, setWorkDuration] = useState(25);
      const [breakDuration, setBreakDuration] = useState(5);
      const [timer, setTimer] = useState(workDuration * 60);
      const [isRunning, setIsRunning] = useState(false);
      const [isWork, setIsWork] = useState(true);
      const intervalRef = useRef(null);

      useEffect(() => {
        setTimer(isWork ? workDuration * 60 : breakDuration * 60);
      }, [workDuration, breakDuration, isWork]);

      useEffect(() => {
        if (isRunning) {
          intervalRef.current = setInterval(() => {
            setTimer((prevTimer) => {
              if (prevTimer <= 0) {
                clearInterval(intervalRef.current);
                setIsRunning(false);
                setIsWork(!isWork);
                return isWork ? breakDuration * 60 : workDuration * 60;
              }
              return prevTimer - 1;
            });
          }, 1000);
        } else {
          clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
      }, [isRunning, isWork, workDuration, breakDuration]);

      const handleStartPause = () => {
        setIsRunning(!isRunning);
      };

      const handleReset = () => {
        setIsRunning(false);
        setTimer(isWork ? workDuration * 60 : breakDuration * 60);
      };

      const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      };

      return (
        <div className="container">
          <h1>Pomodoro Timer</h1>
          <div className="timer-display">{formatTime(timer)}</div>
          <div className="controls">
            <button onClick={handleStartPause}>{isRunning ? 'Pause' : 'Start'}</button>
            <button onClick={handleReset}>Reset</button>
          </div>
          <div className="settings">
            <label>
              Work Duration (minutes):
              <input
                type="number"
                value={workDuration}
                onChange={(e) => setWorkDuration(parseInt(e.target.value, 10))}
              />
            </label>
            <label>
              Break Duration (minutes):
              <input
                type="number"
                value={breakDuration}
                onChange={(e) => setBreakDuration(parseInt(e.target.value, 10))}
              />
            </label>
          </div>
        </div>
      );
    }

    export default App;
