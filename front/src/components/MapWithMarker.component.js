import React from 'react'
import { GoogleMap, LoadScript,Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 48.298800506022374,
  lng: 4.076549553391784
};

const MapWithMarker = ({markers=[]}) => {
    return (
        <LoadScript
          googleMapsApiKey="AIzaSyD6qkJit4TplVvkfrfMH75si3mzRQCDu1E"
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            { /* Child components, such as markers, info windows, etc. */ }
            { markers.map((data,index) => {
                if (data) {
                return (
                    <Marker position={{lat: data.posX, lng: data.posY}} label={data.name}/>
    	        )	
    	        }
    	        return null
    }) }

            <></>
          </GoogleMap>
        </LoadScript>
      )
  }


export default React.memo(MapWithMarker)