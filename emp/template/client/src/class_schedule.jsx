import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './class_schedule.css';  // Import the CSS file for styling

function ClassSchedule() {
  const [studentData, setStudentData] = useState([]); // Store the grouped student data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch grouped student data from the backend
  useEffect(() => {
    axios
      .get('http://localhost:8000/rest/sch/') // Ensure this is the correct API endpoint
      .then((response) => {
        setStudentData(response.data); // Store the grouped data
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching student data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading student data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="schedule-container">
      <h1 className="schedule-title">Class Schedule</h1>
      {studentData.length > 0 ? (
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Trainer</th>
              <th>10:30 to 12:30</th>
              <th>02:30 to 04:30</th>
              <th>04:30 to 06:30</th>
              <th>06:30 to 08:30</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((trainerData, rowIndex) => {
              const { trainerName, slots } = trainerData;
  
              const slot1Students = slots[1] || [];
              console.log(slot1Students);
              const slot2Students = slots[2] || [];
              const slot3Students = slots[3] || [];
              const slot4Students = slots[4] || [];
  
              const rowColor = rowIndex % 2 === 0 ? 'row-even' : 'row-odd';
  
              return (
                <tr key={trainerName} className={rowColor}>
                  <td>{trainerName}</td>  
                  <td>
                    {slot1Students.length > 0 ? (
                      slot1Students.map((student, index) => (
                        <div key={index} className="student-info">
                          {student.name} ({student.course})
                        </div>
                      ))
                    ) : (
                      <div>-</div>
                    )}
                  </td>
                  <td>
                    {slot2Students.length > 0 ? (
                      slot2Students.map((student, index) => (
                        <div key={index} className="student-info">
                          {student.name} ({student.course})
                        </div>
                      ))
                    ) : (
                      <div>-</div>
                    )}
                  </td>
                  <td>
                    {slot3Students.length > 0 ? (
                      slot3Students.map((student, index) => (
                        <div key={index} className="student-info">
                          {student.name} ({student.course})
                        </div>
                      ))
                    ) : (
                      <div>-</div>
                    )}
                  </td>
                  <td>
                    {slot4Students.length > 0 ? (
                      slot4Students.map((student, index) => (
                        <div key={index} className="student-info">
                          {student.name} ({student.course})
                        </div>
                      ))
                    ) : (
                      <div>-</div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>No student data available.</div>
      )}
    </div>
  );
  
}

export default ClassSchedule;
