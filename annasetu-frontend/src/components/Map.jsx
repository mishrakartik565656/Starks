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

const MapPlaceholder = ({ message }) => (
  <div style={{
    width: '100%', height: '100%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    background: 'var(--bg-secondary)', borderRadius: '16px', padding: '24px', textAlign: 'center'
  }}>
    <p>{message}</p>
  </div>
);

const GoogleMapView = ({ markers }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const [activeMarker, setActiveMarker] = React.useState(null);

  if (loadError) {
    return <MapPlaceholder message="Map could not be loaded. Check the Google Maps API key and browser network connection." />;
  }

  if (!isLoaded) {
    return <MapPlaceholder message="Loading map..." />;
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

const Map = ({ markers = [] }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return <MapPlaceholder message="Map unavailable. Add VITE_GOOGLE_MAPS_API_KEY to a .env file to enable it." />;
  }

  return <GoogleMapView markers={markers} />;
};

export default React.memo(Map);
