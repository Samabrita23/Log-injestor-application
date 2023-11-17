// LogViewer.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LogViewer = () => {
  const [logs, setLogs] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/logs');
      setLogs(response.data); // Assuming the response is an array of logs
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when the component mounts

  return (
    <div>
      <h2>Log Viewer</h2>
      {/* Render your logs here */}
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            {/* Customize this based on your log structure */}
            {JSON.stringify(log)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogViewer;
