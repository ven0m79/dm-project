
'use client' 


import { GoogleMap } from  "@react-google-maps/api" ; 

//Стиль карты 
export  const defaultMapContainerStyle = { 
    width : '500px' , 
    height : '300px' , 
    borderRadius : '15px 15px 15px 15px' , 
}; 
const defaultMapCenter = {
    lat: 50.431284760007486,
    lng: 30.485278846030162
}

const defaultMapZoom = 17;

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