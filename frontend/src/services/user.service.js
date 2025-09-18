import axios from 'axios';

const API_URL = '/api/users';

const getAllUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_URL}/${id}`, userData);
  return response.data;
};

const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const getCurrentUserProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`);
  return response.data;
};

const updateCurrentUserProfile = async (userData) => {
  const response = await axios.put(`${API_URL}/profile`, userData);
  return response.data;
};

const userService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
};

export default userService;