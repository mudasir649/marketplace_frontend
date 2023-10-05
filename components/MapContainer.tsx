'use client';
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from "@react-google-maps/api"
import { Box, CircularProgress } from '@mui/material';
import useWindowDimensions from '@/utils/useWindowDimensions';
import locateAddress from '@/utils/GoogleLocation';


const MapContainer = ({ apikey, address }: any) => {

  const [lat, setLat] = useState<any>();
  const [long, setLong] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { width, height } = useWindowDimensions();

  const newWidth = width || 0;
  const newHeight = height || 0;

  useEffect(() => {
    locateAddress(apikey, address).then((data: any) => {
      if (data?.lat && data.long) {
        setLoading(false);
        setLat(data?.lat);
        setLong(data?.long);
      }
      if (data?.message) {
        setLoading(false)
        setErrorMessage(data?.message)
      }
    });
  }, [apikey, address]);

  const center = { lat: lat, lng: long };
  return (
    <div className='h-96 w-auto rounded-lg'>
      <LoadScript googleMapsApiKey={apikey}>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );

  // return (
  //   <div className={`h-72 w-auto md:h-64 md:w-64 border rounded-lg 
  //           ${newWidth <= 1024 && newHeight <= 800 ? 'lg:w-56 lg:h-56' : 'lg:h-96 lg:w-96'} 
  //           ${newWidth <= 1024 && newHeight <= 885 ? 'lg:w-56 lg:h-56' : 'lg:h-96 lg:w-96'}`}>

  //     <LoadScript googleMapsApiKey={apikey}>
  //       <GoogleMap
  //         center={center}
  //         zoom={15}
  //         mapContainerStyle={{ width: "100%", height: "100%" }}
  //         options={{
  //           zoomControl: true,
  //           streetViewControl: false,
  //           mapTypeControl: false,
  //           fullscreenControl: false,
  //         }}
  //       >
  //         <Marker position={center} />
  //       </GoogleMap>
  //     </LoadScript>
  //   </div>
  // );

  // if (loading) {
  //   return <div>
  //     <Box>
  //       <CircularProgress />
  //     </Box>
  //   </div>;
  // } else if (errorMessage) {
  //   return <div>{errorMessage}</div>;
  // } else {
  //   return (
  //     <div className={`h-72 w-auto md:h-64 md:w-64 border rounded-lg 
  //             ${newWidth <= 1024 && newHeight <= 800 ? 'lg:w-56 lg:h-56' : 'lg:h-96 lg:w-96'} 
  //             ${newWidth <= 1024 && newHeight <= 885 ? 'lg:w-56 lg:h-56' : 'lg:h-96 lg:w-96'}`}>
  //       <LoadScript googleMapsApiKey={apikey}>
  //         <GoogleMap
  //           center={center}
  //           zoom={15}
  //           mapContainerStyle={{ width: "100%", height: "100%" }}
  //           options={{
  //             zoomControl: false,
  //             streetViewControl: false,
  //             mapTypeControl: false,
  //             fullscreenControl: false,
  //           }}
  //         >
  //           <Marker position={center} />
  //         </GoogleMap>
  //       </LoadScript>
  //     </div>
  //   );
  // }
};

export default MapContainer;
