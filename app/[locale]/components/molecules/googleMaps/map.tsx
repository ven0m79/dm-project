
'use client' 


import { GoogleMap } from  "@react-google-maps/api" ; 

//Стиль карты 
export  const defaultMapContainerStyle = { 
    width : '500px' , 
    height : '300px' , 
    borderRadius : '0px 0px 0px 0px' , 
}; 
const defaultMapCenter = {
    lat: 50.43066125519892,
    lng: 30.485148390790926
}

const defaultMapZoom = 19;

const defaultMapOptions = {
    zoomControl: true,
    tilt: 1,
    gestureHandling: 'auto',
    mapTypeId: 'roadmap',
};

const  MapComponent = ( ) => { 
    return ( 
        < div  className = "w-full" > 
            < GoogleMap  
                mapContainerStyle={defaultMapContainerStyle}
                center={defaultMapCenter}
                zoom={defaultMapZoom}
                options={defaultMapOptions}> 
            </ GoogleMap > 
        </ div >
     ) 
}; 

export { MapComponent };