// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3010;

app.use(express.json());
app.use(express.static('static'));

// Serve the homepage
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'pages/index.html'));
});

// Endpoint to retrieve students above a threshold
app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body;

  if (typeof threshold !== 'number') {
    return res.status(400).json({ error: 'Invalid threshold. Please provide a number.' });
  }

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading data file.' });
    }

    try {
      const students = JSON.parse(data);
      const filteredStudents = students.filter(student => student.total > threshold);

      res.json({
        count: filteredStudents.length,
        students: filteredStudents.map(student => ({ name: student.name, total: student.total }))
      });
    } catch (error) {
      res.status(500).json({ error: 'Error parsing data file.' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
