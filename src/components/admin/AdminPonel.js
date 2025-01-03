import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css'; // Убедитесь, что файл существует и путь верен

const AdminPanel = () => {
  const [students, setStudents] = useState([]);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    age: '',
    className: '',
    yearOfBirth: '',
  });

  // Функция для загрузки списка студентов
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Функция для добавления нового студента
  const addStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/students', newStudent);
      setStudents([...students, response.data]);
      setNewStudent({ firstName: '', lastName: '', age: '', className: '', yearOfBirth: '' });
      setIsAddFormVisible(false);
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add student');
    }
  };

  // Функция для удаления студента
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/students/${id}`);
      setStudents(students.filter((student) => student._id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="admin-panel-container">
      <h1>Admin Panel</h1>

      {/* Кнопка для отображения формы добавления студента */}
      <button onClick={() => setIsAddFormVisible(!isAddFormVisible)}>
        {isAddFormVisible ? 'Hide Add Form' : 'Show Add Form'}
      </button>

      {/* Форма для добавления нового студента */}
      {isAddFormVisible && (
        <form onSubmit={addStudent} className="add-student-form">
          <input
            type="text"
            placeholder="First Name"
            value={newStudent.firstName}
            onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={newStudent.lastName}
            onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={newStudent.age}
            onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Class"
            value={newStudent.className}
            onChange={(e) => setNewStudent({ ...newStudent, className: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Year of Birth"
            value={newStudent.yearOfBirth}
            onChange={(e) => setNewStudent({ ...newStudent, yearOfBirth: e.target.value })}
            required
          />
          <button type="submit">Add Student</button>
        </form>
      )}

      {/* Список студентов */}
      <h2>List of Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.firstName} {student.lastName} | Age: {student.age} | Class: {student.className}
            <button onClick={() => deleteStudent(student._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
