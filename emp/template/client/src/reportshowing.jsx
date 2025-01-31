import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './reportshowing.css'

const ReportShowing = () => {
  const [reports, setReports] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Filter reports based on search term (trainer name) and date
  const filterReports = () => {
    return reports.filter(report => {
      const matchesTrainer = report.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate = dateFilter ? report.date === dateFilter : true;
      return matchesTrainer && matchesDate;
    });
  };

  useEffect(() => {
    axios.get('http://localhost:8000/rest/reports/get/')
      .then(response => {
        if (response.data) {
          console.log(response.data);
          setReports(response.data); // Set reports if it's an array
        } else {
          console.error('Data format error:', response.data);
          setError('Invalid data format');
        }
      })
      .catch(err => {
        console.error('Error fetching reports:', err);
        setError('Failed to fetch reports');
      })
      .finally(() => setLoading(false)); // Set loading to false once done
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const filteredReports = filterReports();

  return (
    <div className="report-showing-container">
       <h2>Employee report :</h2>
      <div className="filters">
        <div className="filter-item">
          <input
            type="text"
            placeholder="Search by Trainer Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="report-table">
       
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Employee Name</th>
              <th>Team Name</th>
              <th>Slot Timing</th>
              <th>Activities</th>
              <th>Student Count</th>
              <th>Students</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) =>
              report.slots.map((slot, index) => (
                <tr key={`${report._id}-${index}`}>
                  <td>{report.date}</td>
                  <td>{report.employeeName}</td>
                  <td>{report.teamName}</td>
                  <td>{slot.timing}</td>
                  <td>{slot.activities || 'N/A'}</td>
                  <td>{slot.studentCount}</td>
                  <td>
                    {slot.students.map((student, studentIndex) => (
                      <div
                        key={studentIndex}
                        style={{
                          color: student.checked ? 'green' : 'red',
                        }}
                      >
                        <strong>{student.name}</strong> ({student.course}) -{' '}
                        {student.checked ? (
                          <span>&#x2705;</span>
                        ) : (
                          <span>&#x274C;</span>
                        )}
                      </div>
                    ))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportShowing;
