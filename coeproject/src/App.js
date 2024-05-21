import React, { useState } from 'react';
import './App.css';
import Courses from './Courses';
import SubmitCourse from './SubmitCourse';
 
function App() {
  const [courseAdded, setCourseAdded] = useState(false);
 
  const handleCourseAdded = () => {
    setCourseAdded(!courseAdded);
  };
 
  return (
<div className="App">
<header className="App-header">
<h1>GPA Calculator</h1>
<SubmitCourse onCourseAdded={handleCourseAdded} />
<Courses onCourseAdded={courseAdded} />
</header>
</div>
  );
}
 
export default App;