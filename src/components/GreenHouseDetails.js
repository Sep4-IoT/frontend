// GreenHouseDetails.js
import React, { useState, useEffect } from 'react';
import { DNA } from 'react-loader-spinner';
import axios from 'axios';

function GreenHouseDetails() {
  const [greenhouse, setGreenhouse] = useState(null);

  useEffect(() => {
    const fetchGreenhouseData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/kubista9/greenhouse/main/greenhouse.json');
        const data = await response.json();
        console.log("API Response:", data); // Debugging line
        if (response.status !== 200) {
          throw new Error('Failed to fetch greenhouse data');
        }
        if (!data || data.length === 0) {
          throw new Error('No greenhouse data found');
        }
        const greenhouseData = data;
        setGreenhouse({
          greenHouseId: greenhouseData.GreenHouseId,
          GreenHouseName: greenhouseData.GreenHouseName,
          Description: greenhouseData.Description,
          Temperature: greenhouseData.Temperature,
          LightIntensity: greenhouseData.LightIntensity,
          Co2Levels: greenhouseData.Co2Levels,
          Humidity: greenhouseData.Humidity,
          isWindowOpen: greenhouseData.IsWindowOpen
        });
      } catch (error) {
        console.error('Error fetching greenhouse data:', error);
      }
    };

    fetchGreenhouseData();
  }, []);

  const updateGreenhouseWindow = async () => {
    if (!greenhouse) return;

    try {
      const newWindowStatus = !greenhouse.isWindowOpen;
      const response = await axios.patch(`http://localhost:5047/GreenHouse/${greenhouse.greenHouseId}`, {
        isWindowOpen: newWindowStatus 
      });
  
      if (response.data && response.data.message) {
        console.log(response.data.message);
      } else {
        console.log('Window status updated successfully');
      }
  
      setGreenhouse(prevState => ({
        ...prevState,
        isWindowOpen: newWindowStatus
      }));
    } catch (error) {
      console.error('Error updating greenhouse window status with patch:', error);
    }
  };
  
  return (
    <div className='container'>
      {greenhouse ? (
        <div className='wrapper'>
          <p>ID: {greenhouse.greenHouseId}</p>
          <p>Window opened: {greenhouse.isWindowOpen ? 'Yes' : 'No'}</p>
          <button onClick={updateGreenhouseWindow}>
            {greenhouse.isWindowOpen ? 'Close Window' : 'Open Window'}
          </button>
          <p>Greenhouse name: {greenhouse.GreenHouseName}</p>
          <p>Description: {greenhouse.Description}</p>
          <p>Temperature: {greenhouse.Temperature}</p>
          <p>Light intensity: {greenhouse.LightIntensity}</p>
          <p>CO2 levels: {greenhouse.Co2Levels}</p>
          <p>Humidity: {greenhouse.Humidity}</p>
        </div>
      ) : (
        <div className='loader'>
          <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
          <p>Loading greenhouse details...</p>
          <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      )}
    </div>
  );
}

export default GreenHouseDetails;
