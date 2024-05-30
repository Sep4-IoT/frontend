import axios from "axios";
import React, { useState, useEffect } from "react";
import GreenhouseProperty from "./GreenhouseProperty";
import propertyLabels from "../data/propertyLabels";
import units from "../data/units";
import LoadingSpinner from "./LoadingSpinner";
import Button from "./Button";

const GreenhouseDetails = () => {
  const [greenhouse, setGreenhouse] = useState(null);
  const [intervalId, setIntervalId] = useState(null); // Step 1: State to hold the interval ID

  useEffect(() => {
    const fetchGreenhouseData = async () => {
      try {
        const response = await axios.get(
          "https://javierperalta.dk/SEP4/greenhouses/1/current"
        );
        const data = response.data;
        if (response.status!== 200 ||!data || data.length === 0) {
          throw new Error("Failed to fetch greenhouse data");
        }
        setGreenhouse({
          id: data.Id,
          name: data.Name,
          description: data.Description,
          temperature: data.Temperature,
          lightIntensity: data.LightIntensity,
          co2Levels: data.Co2Levels,
          humidity: data.Humidity,
          isWindowOpen: data.isWindowOpen,
        });
      } catch (error) {
        console.error("Error fetching greenhouse data:", error);
      }
    };

    const id = setInterval(fetchGreenhouseData, 1000); // Step 2: Set up the interval
    setIntervalId(id); // Store the interval ID

    // Step 3: Clear the interval on component unmount
    return () => clearInterval(id);
  }, []);

  const updateGreenhouseWindow = async () => {
    if (!greenhouse) return;

    try {
      const newWindowStatus =!greenhouse.isWindowOpen;
      setGreenhouse((prevState) => ({
       ...prevState,
        isWindowOpen: newWindowStatus,
      }));

      const response = await axios.patch(
        "https://javierperalta.dk/SEP4/greenhouses/1",
        {
          isWindowOpen: newWindowStatus,
        }
      );

      if (response.data && response.data.message) {
        console.log(response.data.message);
      } else {
        console.log("Window status updated successfully");
      }
    } catch (error) {
      console.error("Error updating greenhouse window status:", error);
    }
  };

  return (
    <div className="wrapper">
      {greenhouse? (
        <div className="greenhouse-container">
          <ul>
            {Object.entries(greenhouse).map(([key, value]) => (
              <GreenhouseProperty
                key={key}
                label={propertyLabels[key]}
                value={key === "isWindowOpen"? (value? "Yes" : "No") : value}
                unit={units[key]}
              />
            ))}
          </ul>
          <Button
            onClick={updateGreenhouseWindow}
            label={greenhouse.isWindowOpen? "Close Window" : "Open Window"}
          />
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default GreenhouseDetails;
