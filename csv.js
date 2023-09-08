// routes/csv.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload page
router.get('/', (req, res) => {
  // Render the HTML form for CSV file upload
  res.sendFile(__dirname + '/views/index.html');
});

// Handle file upload
router.post('/upload', upload.single('csvFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Please upload a CSV file.');
  }

  // Parse the uploaded CSV file
  const csvData = [];
  const bufferString = req.file.buffer.toString();
  csv({ headers: true })
    .fromString(bufferString)
    .on('data', (row) => {
      csvData.push(row);
    })
    .on('end', () => {
      // Display the CSV data as JSON
      res.json(csvData);
    });
});

module.exports = router;
