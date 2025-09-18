# School Appointment System

A web application that allows students to book appointments with teachers and teachers to manage their availability.

## Features

- Teacher availability management
- Student appointment booking
- Real-time availability checking
- Appointment status tracking
- User-friendly interface

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd appointment-system
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

4. Create a .env file in the root directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/appointment-system
```

## Running the Application

1. Start the backend server:
```bash
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

### For Teachers
1. Log in to the teacher dashboard
2. Manage your availability by adding or removing time slots
3. View and manage appointment requests
4. Confirm or cancel appointments

### For Students
1. Log in to the student dashboard
2. View available teachers and their time slots
3. Book appointments with teachers
4. View your appointment history and status

## Technologies Used

- Frontend:
  - React
  - Material-UI
  - React Router
  - Axios

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose

## License

This project is licensed under the MIT License. 