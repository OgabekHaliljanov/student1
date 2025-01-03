import React, { useState } from 'react';
import axios from 'axios';
import '../pages/AddStudent.css'; // Обновите путь в зависимости от расположения файла

const AddStudent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [className, setClassName] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('age', age);
    formData.append('class', className);
    formData.append('yearOfBirth', yearOfBirth);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:8080/api/students', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
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
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {preview && <img className="image-preview" src={preview} alt="Preview" />}
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
