import React from 'react'

const GreenhouseProperty = ({ label, value, unit }) => {
  return (
    <li>
      {label}: {value}
      {unit}
    </li>
  )
}

export default GreenhouseProperty
