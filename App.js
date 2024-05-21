import React from 'react';
import './App.css';
import Courses from './Courses';
import SubmitCourse from './SubmitCourse';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>GPA Calculator</h1>
        <SubmitCourse />
        <Courses />
      </header>
    </div>
  );
}

export default App;
