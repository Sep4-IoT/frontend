import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";
import GreenhouseProperty from "./GreenhouseProperty";
import axiosInstance from "../jwt/axiosInstance";

function GreenhouseDetails() {
  const [greenhouse, setGreenhouse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGreenhouseData = async () => {
      try {
        const response = await axiosInstance.get(
          "https://api.npoint.io/97ae39192bbd08b53d31"
        );
        data = response.data;
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
      }
    };

    fetchGreenhouseData();
  }, [navigate]);

  const updateGreenhouseWindow = async () => {
    if (!greenhouse) return;

    try {
      const newWindowStatus = !greenhouse.isWindowOpen;
      const response = await axios.patch(
        "https://api.npoint.io/97ae39192bbd08b53d311",
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
    }
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
