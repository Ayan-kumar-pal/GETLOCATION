import React, { useState } from 'react';
import cross_Icon from "../assets/cross_Icon.png";
import no_data from "../assets/no_data.png";
import "./getloc.css";

function Getloc() {
  const [locationInfo, setLocationInfo] = useState(null);
  const [zipCode, setZipCode] = useState("");
  const [showNoData, setShowNoData] = useState(false);
  const [containerHeight, setContainerHeight] = useState(100);

  const handleClick = async () => {
    try {
      const res = await fetch(
        `http://api.geonames.org/postalCodeLookupJSON?postalcode=${zipCode}&username=ayan007`
      );
      const data = await res.json();
  
      setContainerHeight(400); // Increase container height
  
      if (data.postalcodes.length === 0) {
        setLocationInfo(null);
        setShowNoData(true);
      } else {
        setLocationInfo(data.postalcodes[0]);
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

  return (
    <div className="container" style={{ height: `${containerHeight}px` }}>
      <div className="search-box">
        <i className='bx bxs-map'></i>
        <input
          type="text"
          value={zipCode}
          placeholder="Enter Your Pin Code"
          onChange={(e) => {
            setZipCode(e.target.value);
          }}
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
            <p>Pin Code: {locationInfo.postalcode}</p>
            <p>Place Name: {locationInfo.placeName}</p>
            <p>State: {locationInfo.adminName1}</p>
            <p>Country: {locationInfo.countryCode}</p>
            <p>Latitude: {locationInfo.lat}</p>
            <p>Longitude: {locationInfo.lng}</p>
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




