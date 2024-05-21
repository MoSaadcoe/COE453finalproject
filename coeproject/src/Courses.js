import React, { useState, useEffect } from 'react';

const Courses = ({ onCourseAdded }) => {
  const [courses, setCourses] = useState([]);

  // Function to fetch courses from the GraphQL server
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
      console.log("GraphQL response:", result); // Log the full response

      if (result.data && result.data.courses) {
        setCourses(result.data.courses);
      } else if (result.errors) {
        console.error('GraphQL Errors:', result.errors);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Fetch courses on mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Refetch courses when a new course is added
  useEffect(() => {
    if (onCourseAdded) {
      fetchCourses();
    }
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
