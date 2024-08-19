
'use client' 


import { GoogleMap } from  "@react-google-maps/api" ; 

//Стиль карты 
export  const defaultMapContainerStyle = { 
    width : '500px' , 
    height : '300px' , 
    borderRadius : '15px 15px 15px 15px' , 
}; 

const  MapComponent = ( ) => { 
    return ( 
        < div  className = "w-full" > 
            < GoogleMap  mapContainerStyle = {defaultMapContainerStyle} > 
            </ GoogleMap > 
        </ div >
     ) 
}; 

export { MapComponent };