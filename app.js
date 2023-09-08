// app.js
const express = require('express');
const app = express();
const csvRoutes = require('./routes/csv');

app.use(express.static('public'));
app.use('/csv', csvRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
