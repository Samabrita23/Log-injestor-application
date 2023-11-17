// server/index.js

const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./db');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Ingest logs endpoint
app.post('/ingest', async (req, res) => {
  const logData = req.body;

  try {
    const db = await connectToDatabase();
    const logsCollection = db.collection('logs');

    // Insert the log data into MongoDB
    await logsCollection.insertOne(logData);

    res.status(200).send('Log ingested successfully');
  } catch (error) {
    console.error('Error ingesting log:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Log Ingestor is running on http://localhost:${port}`);
});
