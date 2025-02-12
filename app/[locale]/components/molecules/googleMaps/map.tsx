
'use client' 
import { GoogleMap } from  "@react-google-maps/api" ; 

//Стиль карты 
export  const defaultMapContainerStyle = { 
    width : '460px' , 
    height : '280px' , 
    borderRadius : '0px 0px 0px 0px' , 
}; 
const defaultMapCenter = {
    lat: 50.43093725153015,
    lng: 30.487117122686342
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
        <div  className = "flex items-center justify-center mx-6 w-full max-[400px] min-[200px]:"> 
            < GoogleMap  
                mapContainerStyle={defaultMapContainerStyle}
                center={defaultMapCenter}
                zoom={defaultMapZoom}
                options={defaultMapOptions}> 
            </ GoogleMap > 
        </div>
     ) 
}; 

export { MapComponent };