import { useState } from 'react';
import "./index.css";
import "./App.css";
import PomodoroTimer from './components/PomodoroTimer';

function App() {

  return (
    <div className="App">
      <PomodoroTimer 
        defaultPomodoroTime={10}
        shortRestTime={2}
        longRestTime={5}
        cycles={4}
      />
    </div>
  )
}

export default App
