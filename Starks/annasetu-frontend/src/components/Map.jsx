import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '16px'
};

const center = {
  lat: 28.6139,
  lng: 77.2090
};

// We will use a mock map if API key is not present, but for now we implement the real thing
// and let the user add their API key in a .env file later.
const Map = ({ markers = [] }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  const [activeMarker, setActiveMarker] = React.useState(null);

  if (!isLoaded) {
    return (
      <div style={{ 
        width: '100%', height: '100%', 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-secondary)', borderRadius: '16px'
      }}>
        <p>Loading Map... (Ensure VITE_GOOGLE_MAPS_API_KEY is set in .env)</p>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
      options={{
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ],
        disableDefaultUI: true,
        zoomControl: true
      }}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => setActiveMarker(marker)}
          icon={marker.type === 'surplus' ? {
            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
          } : {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          }}
        />
      ))}

      {activeMarker && (
        <InfoWindow
          position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
          onCloseClick={() => setActiveMarker(null)}
        >
          <div style={{ padding: '4px', color: '#000' }}>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 600 }}>{activeMarker.title}</h4>
            <p style={{ margin: 0, fontSize: '12px' }}>{activeMarker.description}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default React.memo(Map);
