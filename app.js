const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointment');
const userRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes); // Ensure this line is present

sequelize.authenticate().then(() => {
  console.log('Database connected...');
  return sequelize.sync(); // Sync models with database
}).then(() => {
  console.log('Database synced...');
}).catch(err => {
  console.log('Error: ' + err);
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
