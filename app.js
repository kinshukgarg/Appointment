require('dotenv').config(); // Load environment variables

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointment');
const userRoutes = require('./routes/user');
const authenticate = require('./Middlewares/authenticate');
const isTeacher = require('./middlewares/isTeacher');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

sequelize.authenticate().then(() => {
  console.log('Database connected...');
  return sequelize.sync();
}).then(() => {
  console.log('Database synced...');
}).catch(err => {
  console.log('Error: ' + err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
