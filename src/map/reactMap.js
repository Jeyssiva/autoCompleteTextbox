import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

function App() {
  const [viewport, setViewport] = React.useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
    width: '100%',
    height: '400px'
  });

  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        onViewportChange={setViewport}
      >
        <Marker latitude={37.7577} longitude={-122.4376}>
          <div>San Francisco</div>
        </Marker>
      </ReactMapGL>
    </div>
  );
}

export default App;
