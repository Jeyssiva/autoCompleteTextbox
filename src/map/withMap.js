import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken =
  'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

export const withMap = (WrappedComponent) => {
  return (props) => {
    const mapContainerRef = useRef(null);

    const {selectedPlace} = props
    const [lng, setLng] = useState(selectedPlace.longitude || 101);
    const [lat, setLat] = useState(selectedPlace.latitude || 3);
    const [zoom, setZoom] = useState(selectedPlace.zoom || 12);
    const [placeName, setPlaceName] = useState(selectedPlace.name || 'Kuala Lampur')

     // Initialize map when component mounts
    useEffect(() => {
        if(!selectedPlace) return null

        setLng(selectedPlace.longitude ? selectedPlace.longitude : lng)
        setLat(selectedPlace.latitude ? selectedPlace.latitude : lat)
        setZoom(selectedPlace.zoom || zoom)
        setPlaceName(selectedPlace.name)

        const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [ selectedPlace.longitude ? selectedPlace.longitude : lng, 
            selectedPlace.latitude ? selectedPlace.latitude : lat],
        zoom: selectedPlace.zoom || zoom
        });

        const marker = new mapboxgl.Marker({draggable: true})
        .setLngLat([selectedPlace.longitude ? selectedPlace.longitude : lng, 
        selectedPlace.latitude ? selectedPlace.latitude : lat])
        .addTo(map);

        const retrieveLocationDetails = (lngLat) => {
            const request = new XMLHttpRequest();
            request.open('GET', `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat[0]},${lngLat[1]}.json?access_token=${mapboxgl.accessToken}`, true);
            request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200) {
                const response = JSON.parse(request.responseText);
                setPlaceName(response.features[0].place_name);
            }
            };
            request.send();
        };
        
        marker.on('dragend' , () => {
            const lngLat = marker.getLngLat().toArray()
            setLng(lngLat[0])
            setLat(lngLat[1])
            setZoom(map.getZoom())
            retrieveLocationDetails(marker.getLngLat().toArray())
        })

        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
            setPlaceName(retrieveLocationDetails([map.getCenter().lng, map.getCenter().lat]))
        });
        map.getContainer().lastChild.remove(); //"mapboxgl-control-container"

        const updateMarker = () => {
            marker.setLngLat(map.unproject([map.getCanvas().clientWidth/2, map.getCanvas().clientHeight/2]));
        };

        map.on('resize', updateMarker);
        updateMarker();

        // Clean up the map and marker instances when the component unmounts
        return () => {
        map.off('resize', updateMarker);
        marker.remove();
        map.remove();
        }; 
    }, [selectedPlace]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <WrappedComponent
        placeName = {placeName}
        lng = {lng}
        lat = {lat}
        zoom={zoom}
        mapContainer={mapContainerRef}
        {...props}
      />
    );
  };
};

 
