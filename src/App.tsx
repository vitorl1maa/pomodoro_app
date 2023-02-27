import { useState } from 'react';
import "./index.css";
import "./App.css";
import PomodoroTimer from './components/PomodoroTimer';

function App() {

  return (
    <div className="App">
      <PomodoroTimer 
        defaultPomodoroTime={1800}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
    </div>
  )
}

export default App
