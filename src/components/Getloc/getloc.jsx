import React, { useState } from 'react';
import cross_Icon from "../assets/cross_Icon.png";
import no_data from "../assets/no_data.png";
import "./getloc.css";

function Getloc() {
  const [locationInfo, setLocationInfo] = useState(null);
  const [zipCode, setZipCode] = useState("");
  const [showNoData, setShowNoData] = useState(false);
  const [containerHeight, setContainerHeight] = useState(100);
  const api="3485f280-7bf3-11ee-aecd-570962425fb9";

  const handleClick = async () => {
    try {
      const res = await fetch(
        `https://app.zipcodebase.com/api/v1/search?apikey=${api}&codes=${zipCode}`
      );
      const data = await res.json(); 
      setContainerHeight(400); // Increase container height
  
      if (data.results.length === 0) {
        setLocationInfo(null);
        setShowNoData(true);
      } else {
        setLocationInfo(data.results[zipCode][0]);
        setShowNoData(false);
      }
    } catch (error) {
      console.error("Error in handleClick:", error);
    }
  };

  const handleReset = () => {
    setZipCode("");
    setLocationInfo(null);
    setShowNoData(false);
    setContainerHeight(100); // Reset container height
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setZipCode(value);
    if (!value) handleReset();
  };

  return (
    <div className="container" style={{ height: `${containerHeight}px` }}>
      <div className="search-box">
        <i className='bx bxs-map'></i>
        <input
          type="text"
          value={zipCode}
          placeholder="Enter Your Pin Code"
          onChange={handleInputChange}
        />
        {zipCode && (
          <span className="closeIcon" onClick={handleReset}>
            <img className='icon_cross' src={cross_Icon} alt="Cross Icon" />
          </span>
          
        )}
        
       {zipCode &&( <button className="bx bx-search" onClick={handleClick}></button>)}
        {locationInfo && (
          <div className="info">
            <h3>Location Info</h3>
            <p>Pin Code: {locationInfo.postal_code}</p>
            <p>Place Name: {locationInfo.province}</p>
            <p>State: {locationInfo.state}</p>
            <p>Country: {locationInfo.country_code}</p>
            <p>Latitude: {locationInfo.latitude}</p>
            <p>Longitude: {locationInfo.longitude}</p>
          </div>
        )}

        {showNoData && (
          <div className="no-data-message">
            <img className="no_data" src={no_data} alt="no_data" />
            <p>Oops! No data available </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Getloc;




