import React, { useState } from 'react';
 
const SubmitCourse = ({ onCourseAdded }) => {
  const [courses, setCourses] = useState([{ course: '', grade: '', hours: '' }]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
 
  const handleChange = (index, event) => {
    const newCourses = [...courses];
    newCourses[index][event.target.name] = event.target.value;
    setCourses(newCourses);
  };
 
  const handleAddCourse = () => {
    setCourses([...courses, { course: '', grade: '', hours: '' }]);
  };
 
  const handleRemoveCourse = (index) => {
    const newCourses = courses.filter((_, i) => i !== index);
    setCourses(newCourses);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state on new submit
 
    const data = {
      courses: courses.map(course => ({
        course: course.course,
        grade: course.grade,
        hours: parseInt(course.hours, 10)
      }))
    };
 
    try {
      const res = await fetch('https://us-central1-gpacalc-423415.cloudfunctions.net/calcAGPA', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
 
      if (!res.ok) {
        // If the response status is not OK, throw an error with status text
        throw new Error(`HTTP error! status: ${res.status} - ${res.statusText}`);
      }
 
      const result = await res.json();
      console.log('API response:', result); // Log the API response
      setResponse(result);
      // Clear the fields after successful submission
      setCourses([{ course: '', grade: '', hours: '' }]);
      if (onCourseAdded) {
        onCourseAdded(); // Notify the parent component of the new course addition
      }
    } catch (err) {
      console.error('API error:', err);
      setError(`An error occurred: ${err.message}`); // Set error state with detailed message
    }
  };
 
  return (
<div>
<h2>Submit Courses</h2>
<form onSubmit={handleSubmit}>
        {courses.map((course, index) => (
<div key={index}>
<label>
              Course:
<input
                type="text"
                name="course"
                value={course.course}
                onChange={(e) => handleChange(index, e)}
                required
              />
</label>
<label>
              Grade:
<input
                type="text"
                name="grade"
                value={course.grade}
                onChange={(e) => handleChange(index, e)}
                required
              />
</label>
<label>
              Hours:
<input
                type="number"
                name="hours"
                value={course.hours}
                onChange={(e) => handleChange(index, e)}
                required
              />
</label>
            {courses.length > 1 && (
<button type="button" onClick={() => handleRemoveCourse(index)}>
                Remove
</button>
            )}
</div>
        ))}
<button type="button" onClick={handleAddCourse}>Add Course</button>
<button type="submit">Submit</button>
</form>
      {response && !response.error && (
<div>
<p>GPA: {response.gpa}</p>
</div>
      )}
      {error && (
<div>
<p style={{ color: 'red' }}>Error: {error}</p>
</div>
      )}
</div>
  );
};
 
export default SubmitCourse;