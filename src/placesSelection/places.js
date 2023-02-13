import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { placesList, getSelectPlace, categoryList } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import Map from '../map/map'
import { withMap } from '../map/withMap';

const MapLocation = withMap(Map);

export default function PlaceSelection() {

  const [places, setPlaces] = useState([]);
  const [value, setValue] = React.useState('')
  const [inputValue, setInputValue] = useState('');
  const [categories, setCategories] = useState([]);

  const fetchPlaceList = useSelector((state) => state.places)
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('API/importantPlaces.json')
    .then(res => res.json())
    .then(data => {
        setPlaces(data.places)
        setCategories(data.categories)
        dispatch(placesList(data.places))
        dispatch(categoryList(data.categories))
    })
    .catch((err)=>console.log(err))
  }, [dispatch])

  const onRadioChange = (event) => {
    const filterPlaces = fetchPlaceList.filter((eachPlace) => {
      return eachPlace.categories.find(each => parseInt(each) === parseInt(event.target.value)) || false
    });

    setInputValue('')
    setValue('')
    setPlaces(filterPlaces)
  }

  return (
    <>
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Categories</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={onRadioChange}
        defaultValue = {1}
      >
        {
          categories && categories.map(eachItem => {
            return <FormControlLabel value={eachItem.id} control={<Radio/>} label={eachItem.name}/>
          })
        }
      </RadioGroup>
    </FormControl>
    <Autocomplete
      id="auto_complete_box"
      value = {value}
      sx={{ width: 500 }}
      options={places}
      getOptionLabel={(option) => option && option.name}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      onChange = {(event, newValue) => {
        setValue(newValue)
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        dispatch(getSelectPlace(newInputValue))
      }}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <LocationOnIcon/>
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a Place"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
    {
        value ? <MapLocation selectedPlace = {value} /> : null
    }
    </>

  );
}
