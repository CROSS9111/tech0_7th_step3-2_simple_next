"use client"

import { useState } from 'react';
import LocationButton from '../../components/buttons/LocationButton';
import LocationDisplay from '../../components/location/LocationDisplay';

export default function Home() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [countup, setCountup] = useState(0);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setCountup(prevCount => prevCount + 1);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-start mt-0">
      <h1 className="text-3xl font-semibold text-gray-900 my-4">現在位置を取得する</h1>
      <LocationButton label={"位置情報取得"} onClick={getLocation} />
      <div className="bg-white p-6 rounded-lg shadow-md mt-6 w-80 text-center">
        <LocationDisplay latitude={latitude} longitude={longitude} />
        <p className="text-lg text-gray-700 mt-3">取得回数: {countup}</p>
      </div>
    </div>
  );
}
