import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './studentdetails.css';

function Studentdetails() {
  const [students, setStudents] = useState([]); // Store all students data
  const [filteredStudents, setFilteredStudents] = useState([]); // Store filtered students data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterMessage, setFilterMessage] = useState(''); // State to handle filter message

  // Fetch data from backend when component mounts
  useEffect(() => {
    axios
      .get('http://localhost:8000/rest/details/')
      .then((response) => {
        console.log("he");
        setStudents(response.data);
        setFilteredStudents(response.data); 
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching student data');
        setLoading(false);
      });
  }, []);

  const handleButtonClick = (trainerName) => {
    const normalizedTrainerName = trainerName.trim().toLowerCase();
    const filtered = students.filter((student) => {
      return student.trainer && student.trainer.trim().toLowerCase() === normalizedTrainerName;
    });

    const uniqueStudents = [];
    const seenRegnos = new Set();
    
    filtered.forEach((student) => {
      if (!seenRegnos.has(student.regno)) {
        seenRegnos.add(student.regno);
        uniqueStudents.push(student);
      }
    });

    if (uniqueStudents.length === 0) {
      setFilterMessage(`No students found for trainer: ${trainerName}`);
    } else {
      setFilterMessage('');
    }

    setFilteredStudents(uniqueStudents);
  };

  // Function to determine the background color based on the trainer's name
  // const trainerColor = (trainerName) => {
  //   switch (trainerName) {
  //     case 'Ayoop':
  //       return '#FFEB3B'; // Yellow for Ayoop
  //     case 'Karthi':
  //       return '#FF7043'; // Orange for Karthi
  //     case 'Malathi':
  //       return '#81C784'; // Green for Malathi
  //     case 'Prathi':
  //       return '#64B5F6'; // Blue for Prathiksha
  //     case 'Aravind':
  //       return '#E57373'; // Red for Aravind
  //     case 'Siva':
  //       return '#FFCDD2'; // Light Red for Siva
  //     default:
  //       return '#FFFFFF'; // Default white if no trainer matches
  //   }
  // };

  // Function to set the session based on the slot value
  const getSession = (slot) => {
    switch (slot) {
      case 1: return "10:00 AM to 12:30 PM";
      case 2: return "02:30 PM to 04:30 PM";
      case 3: return "04:30 PM to 06:30 PM";
      case 4: return "06:30 PM to 08:30 PM";
      default: return "N/A";
    }
  };

  if (loading) return <div className="loading">Loading student data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="student-details-container">
      <div className="filter-buttons">
        {/* Buttons for each trainer */}
        <button onClick={() => handleButtonClick('Ayoop')} className="trainer-button">Ayoop</button>
        <button onClick={() => handleButtonClick('Karthikeyan')} className="trainer-button">Karthi</button>
        <button onClick={() => handleButtonClick('Malathi')} className="trainer-button">Malathi</button>
        <button onClick={() => handleButtonClick('prathiksha')} className="trainer-button">Prathiksha</button>
        <button onClick={() => handleButtonClick('Aravind')} className="trainer-button">Aravind</button>
        <button onClick={() => handleButtonClick('Siva')} className="trainer-button">Siva</button>
      </div>

      {/* Display filter message if no students match */}
      {filterMessage && <div className="filter-message">{filterMessage}</div>}

      <div className="table-container">
        <h2>Student Details</h2>
        {filteredStudents.length > 0 ? (
          <table className="student-table">
            <thead>
              <tr>
                <th>Serial No</th>
                <th>Reg No</th>
                <th>Name</th>
                <th>Course</th>
                <th>Slot</th>
                <th>Trainer</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student.regno} >
                  <td>{index + 1}</td>
                  <td>{student.regno}</td>
                  <td>{student.name}</td>
                  <td>{student.course}</td>
                  <td>{getSession(student.slot)}</td>
                  <td>{student.trainer}</td>
                  <td>{student.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No student data available for this trainer.</div>
        )}
      </div>
    </div>
  );
}

export default Studentdetails;
