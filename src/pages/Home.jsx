import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../pages/Home.css';

const Home = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/students');
        setStudents(response.data);
        setFilteredStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(
        students.filter((student) =>
          `${student.firstName} ${student.lastName}`
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  const handleSort = () => {
    const sorted = [...filteredStudents].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.firstName.localeCompare(b.firstName);
      } else {
        return b.firstName.localeCompare(a.firstName);
      }
    });
    setFilteredStudents(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && selectedStudent) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.patch(
          `http://localhost:8080/api/students/${selectedStudent._id}/image`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        // Обновить студента с новым изображением
        const updatedStudents = students.map((student) =>
          student._id === response.data._id ? response.data : student
        );

        setStudents(updatedStudents);
        setFilteredStudents(updatedStudents);
        setImagePreview(response.data.image ? `http://localhost:8080${response.data.image}` : null);
        alert('Image updated successfully');
      } catch (error) {
        console.error('Error updating image:', error);
        alert('Failed to update image');
      }
    }
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setImagePreview(student.image ? `http://localhost:8080${student.image}` : null);
  };

  return (
    <div className="container">
      <h1>Students</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={handleSort}>
          Sort by Name ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
      </div>

      <ul>
        {filteredStudents.map((student) => (
          <li
            className="li"
            key={student._id}
            onClick={() => handleSelectStudent(student)}
          >
            <div className="student-info">
              <img
                className="student-img"
                src={
                  student.image
                    ? `http://localhost:8080${student.image}`
                    : 'https://via.placeholder.com/150'
                }
                alt={`${student.firstName} ${student.lastName}`}
              />
              <div>
                <div>{student.firstName} {student.lastName}</div>
                <div>Age: {student.age}</div>
                <div>Class: {student.class}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {selectedStudent && (
        <div className="student-details">
          <h2>Edit {selectedStudent.firstName}'s Image</h2>
          <img
            className="student-img-preview"
            src={imagePreview || 'https://via.placeholder.com/150'}
            alt="Preview"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
  