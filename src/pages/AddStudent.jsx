import React, { useState } from 'react';
import axios from 'axios';
import '../pages/AddStudent.css';  // Путь зависит от местоположения компонента
const AddStudent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [className, setClassName] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentData = { firstName, lastName, age, class: className, yearOfBirth };
    
    try {
      const response = await axios.post('http://localhost:8080/api/students', studentData);
      console.log('Student added:', response.data);
      alert('Student added successfully');
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add student');
    }
  };

  return (
    <div className="add-student-container">
      <h1>Add New Student</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Class"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Year of Birth"
          value={yearOfBirth}
          onChange={(e) => setYearOfBirth(e.target.value)}
          required
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
