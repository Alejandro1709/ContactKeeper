const express = require('express');
const connectDB = require('./config/db');
const app = express();

connectDB();

app.use(express.json());
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/contacts', require('./routes/contacts'));

const port = process.env.PORT || 2020;

app.listen(port, () =>
  console.log(`Server is up and listening on port: ${port}`)
);
