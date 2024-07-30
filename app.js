const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointment');
const userRoutes = require('./routes/user');
const authenticate = require('./middlewares/authenticate');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);

db.sequelize.authenticate().then(() => {
  console.log('Database connected...');
  return db.sequelize.sync();
}).then(() => {
  console.log('Database synced...');
}).catch(err => {
  console.log('Error: ' + err);
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

module.exports = app;
