//Поскольку карта будет загружена и отображена на стороне клиента 
 'use client' ; 

// Импортируем необходимые модули и функции из внешних библиотек и нашего собственного проекта 
import { Libraries , useJsApiLoader } from  '@react-google-maps/api' ; 
import { ReactNode } from  'react' ; 

// Определяем список библиотек для загрузки из API Google Карт 
const libraries = [ 'places' , 'drawing' , 'geometry' ]; 

// Определить компонент функции MapProvider, который принимает свойство children 
export  function  MapProvider ( { children }: { children: ReactNode } ) { 

  // Асинхронная загрузка JavaScript API Google Карт 
  const { isLoaded : scriptLoaded, loadError } = useJsApiLoader ( { 
    googleMapsApiKey : process.env . NEXT_PUBLIC_GOOGLE_MAP_API as  string  , libraries 
    : libraries as  Libraries , 
  }); 

  if (loadError) return  < p > Произошла ошибка при загрузке карт Google </ p >

   if (!scriptLoaded) return  < p > Загружается скрипт карты ... </ p >

   // Возвращает свойство children, обернутое этим компонентом MapProvider 
  return children; 
}