const express = require('express');
const app = express();

app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/contacts', require('./routes/contacts'));

const port = process.env.PORT || 2020;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello Bitches' });
});

app.listen(port, () =>
  console.log(`Server is up and listening on port: ${port}`)
);
