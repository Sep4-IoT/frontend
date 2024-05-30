import React from "react";

const GreenhouseProperty = ({ label, value, unit, emoji }) => {
  return (
    <li>
      <strong>{label} {emoji}:</strong> {value} {unit}
    </li>
  );
};

export default GreenhouseProperty;
