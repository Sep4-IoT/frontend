import React, { useState, useEffect } from 'react';
import { DNA } from 'react-loader-spinner'
import axios from 'axios';

function GreenHouseDetails() {
  const [greenhouse, setGreenhouse] = useState(null);

  useEffect(() => {
    const fetchGreenhouseData = async () => {
      try {
        const response = await axios.get('http://154.62.108.77:5047/GreenHouse/2');
        console.log("API Response:", response.data); // Debugging line
        if (response.status !== 200) {
          throw new Error('Failed to fetch greenhouse data');
        }
        const data = response.data;
        if (!data || data.length === 0) {
          throw new Error('No greenhouse data found');
        }
        const greenhouseData = data[0];
        setGreenhouse({
          greenHouseId: greenhouseData.greenHouseId,
          GreenHouseName: greenhouseData.greenHouseName,
          Description: greenhouseData.description,
          Temperature: greenhouseData.temperature,
          LightIntensity: greenhouseData.lightIntensity,
          Co2Levels: greenhouseData.co2Levels,
          Humidity: greenhouseData.humidity,
          isWindowOpen: greenhouseData.isWindowOpen
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
      const response = await axios.patch(`http://154.62.108.77:5047/GreenHouse/2`, {
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
      console.error('Error updating greenhouse window status:', error);
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
          <p>Loading greenhouse details.............</p>
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
