// server.js
const express = require('express');
const app = express();
const port = 5047;

app.use(express.json());

let greenhouseData = {
  greenHouseId: 1,
  GreenHouseName: 'Test Greenhouse',
  Description: 'A test greenhouse',
  Temperature: 25,
  LightIntensity: 300,
  Co2Levels: 400,
  Humidity: 50,
  isWindowOpen: false
};

app.get('/GreenHouse/:id', (req, res) => {
  res.json(greenhouseData);
});

app.patch('/GreenHouse/:id', (req, res) => {
  greenhouseData.isWindowOpen = req.body.isWindowOpen;
  res.json({ message: 'Window status updated successfully' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app; // Export the app for testing
