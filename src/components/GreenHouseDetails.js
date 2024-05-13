import React, { useState, useEffect } from 'react';

function GreenHouseDetails() {
  const [greenhouse, setGreenhouse] = useState(null);

  useEffect(() => {
    const fetchGreenhouseData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/kubista9/greenhouse/main/greenhouse.json');
        if (!response.ok) {
          throw new Error('Failed to fetch greenhouse data');
        }
        const data = await response.json();
        console.log('Response data:', data);
        if (!data) {
          throw new Error('No greenhouse data found');
        }
        setGreenhouse(data);
      } catch (error) {
        console.error('Error fetching greenhouse data:', error);
      }
    };
  
    fetchGreenhouseData();
  }, []);
  
  const updateGreenhouseWindow = () => {
    if (!greenhouse) return; // Ensure greenhouse data is loaded
  
    // Toggle window status
    const newWindowStatus = !greenhouse.IsWindowOpen;
  
    setGreenhouse(prevState => ({
      ...prevState,
      IsWindowOpen: newWindowStatus 
    }));
  };
  
  return (
    <div className='container'>
      {greenhouse ? (
        <div className='wrapper'>
          <p>ID: {greenhouse.GreenHouseId}</p>
          <p>Window opened: {greenhouse.IsWindowOpen ? 'Yes' : 'No'}</p>
          <button onClick={updateGreenhouseWindow}>
            {greenhouse.IsWindowOpen ? 'Close Window' : 'Open Window'}
          </button>
        </div>
      ) : (
        <div>
          <h1>Welcome to the page</h1>
          <p>Loading greenhouse details...</p>
        </div>
      )}
    </div>
  );
}

export default GreenHouseDetails;
