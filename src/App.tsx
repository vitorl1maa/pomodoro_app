import { useState } from 'react';
import "./index.css";
import "./App.css";
import PomodoroTimer from './components/PomodoroTimer';

function App() {

  return (
    <div className="App">
      <PomodoroTimer 
        defaultPomodoroTime={6600}
        shortRestTime={300}
        longRestTime={650}
        cycles={4}
      />
    </div>
  )
}

export default App
