import React from 'react';
import Script from 'next/script'


const MapUkraine = () => {
    return (
        <div>
            <>
      <Script src="mapdata.js" />
      <Script src="countrymap.js" />
      <div id="map">
      
      </div>
    </>
        </div>
    );
};

export default MapUkraine;