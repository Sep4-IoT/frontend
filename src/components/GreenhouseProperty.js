import React from 'react';

const units = {
  temperature: '°C',
  lightIntensity: ' lx',
  co2Levels: ' ppm',
  humidity: '%',
  isWindowOpen: ''
};

const GreenhouseProperty = ({ label, value, unit }) => {
  return (
    <li>
      <b>{label}:</b> {value}{unit}
    </li>
  );
};

export default GreenhouseProperty;
