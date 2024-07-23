import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users'); // Ensure this URL is correct
        setUsers(response.data.users);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, phone: user.phone, role: user.role });
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${id}`); // Ensure this URL is correct
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/users/${selectedUser.id}`, formData); // Ensure this URL is correct
      setUsers(users.map(user => user.id === selectedUser.id ? response.data.user : user));
      setSelectedUser(null);
      setFormData({ name: '', email: '', phone: '', role: '' });
      setError('');
    } catch (error) {
      setError('Failed to update user');
      console.error('Failed to update user', error);
    }
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} className="user-item">
            <span>{user.name} - {user.email} - {user.role}</span>
            <button onClick={() => handleEditClick(user)}>Edit</button>
            <button onClick={() => handleDeleteClick(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {selectedUser && (
        <form onSubmit={handleSubmit} className="edit-form">
          <h3>Edit User</h3>
          <div>
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label>Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div>
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Institute">Institute</option>
            </select>
          </div>
          <button type="submit">Update User</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      )}
    </div>
  );
}

export default UserManagement;
