import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await axios.post('https://graphql-service-cdaoifjgkq-ew.a.run.app/graphql', {
        query: `
          {
            courses {
              grade
              course
              hours
            }
          }
        `,
      });
      setCourses(response.data.data.courses);
    };

    fetchCourses();
  }, []);

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
