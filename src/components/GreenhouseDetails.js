import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";
import GreenhouseProperty from "./GreenhouseProperty";

function GreenhouseDetails() {
  const [greenhouse, setGreenhouse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGreenhouseData = async () => {
      try {
        const response = await fetch("https://javierperalta.dk/GreenHouse/1");
        const data = await response.json();
        console.log(data);
        if (response.status !== 200) {
          throw new Error("Failed to fetch greenhouse data");
        }
        if (!data || data.length === 0) {
          throw new Error("No greenhouse data found");
        }
        setGreenhouse({
          id: data.id,
          greenHouseName: data.greenHouseName,
          description: data.description,
          temperature: data.temperature,
          lightIntensity: data.lightIntensity,
          co2Levels: data.co2Levels,
          humidity: data.humidity,
          isWindowOpen: data.isWindowOpen,
        });
      } catch (error) {
        console.error("Error fetching greenhouse data:", error);
        navigate("/error");
      }
    };

    fetchGreenhouseData();
  }, [navigate]);

  const updateGreenhouseWindow = async () => {
    if (!greenhouse) return;

    try {
      const newWindowStatus = !greenhouse.isWindowOpen;
      const response = await axios.patch(
        "https://javierperalta.dk/GreenHouse/1",
        {
          isWindowOpen: newWindowStatus,
        }
      );

      if (response.data && response.data.message) {
        console.log(response.data.message);
      } else {
        console.log("Window status updated successfully");
      }

      setGreenhouse((prevState) => ({
        ...prevState,
        isWindowOpen: newWindowStatus,
      }));
    } catch (error) {
      console.error("Error updating greenhouse window status:", error);
      navigate("/error");
    }
  };

  const propertyLabels = {
    id: "Id",
    greenHouseName: "Name",
    description: "Description",
    temperature: "Temperature",
    lightIntensity: "Light intensity",
    co2Levels: "CO2 levels",
    humidity: "Humidity",
    isWindowOpen: "Window opened",
  };

  const units = {
    temperature: "°C",
    lightIntensity: " lx",
    co2Levels: " ppm",
    humidity: "%",
    isWindowOpen: "",
  };

  return (
    <div className="wrapper">
      {greenhouse ? (
        <div className="greenhouse-container">
          <ul>
            {Object.entries(greenhouse).map(([key, value]) => (
              <GreenhouseProperty
                key={key}
                label={propertyLabels[key]}
                value={key === "isWindowOpen" ? (value ? "Yes" : "No") : value}
                unit={units[key]}
              />
            ))}
          </ul>
          <Button
            onClick={updateGreenhouseWindow}
            label={greenhouse.isWindowOpen ? "Close Window" : "Open Window"}
          />
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default GreenhouseDetails;
