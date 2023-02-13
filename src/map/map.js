import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize: 'large',
    fontWeight : 'bold',
    margin: '5px'
  }));
  
  const Map = ({ mapContainer, placeName, lng,lat, zoom }) => {
    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" margin={'4px'}>
      <Grid item>
        <Item>
           Place Name: {placeName} | Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </Item>
      </Grid>
      <div style={{width:'1400px', height: '700px'}} ref={mapContainer} />
    </Grid>
    );
  };
  

export default Map;
