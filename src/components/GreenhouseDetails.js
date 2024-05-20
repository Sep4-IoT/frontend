// GreenhouseDetails.js
import React, { useState, useEffect } from 'react';
import { DNA } from 'react-loader-spinner';
import axios from 'axios';

function GreenHouseDetails() {
  const [greenhouse, setGreenhouse] = useState(null);

  useEffect(() => {
    const fetchGreenhouseData = async () => {
      try {
        const response = await fetch('https://javierperalta.dk/GreenHouse/1');
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
      const response = await axios.patch(`https://javierperalta.dk/GreenHouse/1`, {
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
    <div className='greenhouse-container'>
      {greenhouse ? (
        <div className='greenhouse-wrapper'>
          
          <p><b>Name:</b> {greenhouse.GreenHouseName}</p>
          <p><b>Description:</b> {greenhouse.Description}</p>
          <p><b>Light intensity:</b> {greenhouse.LightIntensity}</p>
          <p><b>Temperature:</b> {greenhouse.Temperature}</p>
          <p><b>CO2 levels:</b> {greenhouse.Co2Levels}</p>
          <p><b>Humidity:</b> {greenhouse.Humidity}</p>

          <p><b>Window opened:</b> {greenhouse.isWindowOpen ? 'Yes' : 'No'}</p>
          <button onClick={updateGreenhouseWindow}>
            {greenhouse.isWindowOpen ? 'Close Window' : 'Open Window'}
          </button>
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
