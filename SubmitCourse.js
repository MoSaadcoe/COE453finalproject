import React, { useState } from 'react';
import axios from 'axios';

const SubmitCourse = () => {
  const [courses, setCourses] = useState([{ course: '', grade: '', hours: '' }]);
  const [response, setResponse] = useState(null);

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

    const data = {
      courses: courses.map(course => ({
        course: course.course,
        grade: course.grade,
        hours: parseInt(course.hours, 10)
      }))
    };

    try {
      const res = await axios.post('https://us-central1-gpacalc-423415.cloudfunctions.net/calcAGPA', data);
      console.log('API response:', res.data); // Log the API response
      setResponse(res.data);
    } catch (err) {
      console.error('API error:', err);
      setResponse({ error: 'An error occurred' });
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
      {response && (
        <div>
          {response.error ? (
            <p>Error: {response.error}</p>
          ) : (
            <p>GPA: {response.gpa}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SubmitCourse;
