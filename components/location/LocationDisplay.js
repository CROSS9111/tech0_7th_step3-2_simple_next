import React from 'react';

const LocationDisplay = ({ latitude, longitude }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <p className="text-lg text-gray-700">
          <span className="font-semibold">緯度:</span> {latitude !== null ? `${latitude}度` : '???度'}
        </p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <p className="text-lg text-gray-700">
          <span className="font-semibold">経度:</span> {longitude !== null ? `${longitude}度` : '???度'}
        </p>
      </div>
    </div>
  );
}

export default LocationDisplay;
