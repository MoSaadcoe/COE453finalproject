import React, { useState, useEffect } from 'react';
 
const Courses = ({ onCourseAdded }) => {
  const [courses, setCourses] = useState([]);
 
  const fetchCourses = async () => {
    try {
      const response = await fetch('https://graphql-service-cdaoifjgkq-ew.a.run.app/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            {
              courses {
                grade
                course
                hours
              }
            }
          `,
        }),
      });
      const result = await response.json();
      setCourses(result.data.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
 
  useEffect(() => {
    fetchCourses();
  }, []);
 
  useEffect(() => {
    fetchCourses();
  }, [onCourseAdded]);
 
  return (
<div>
<h1>Courses</h1>
<ul>
        {courses.map((course, index) => (
<li key={index}>
            {course.course}: {course.grade} ({course.hours} hours)
</li>
        ))}
</ul>
</div>
  );
};
 
export default Courses;