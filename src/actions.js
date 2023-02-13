export const placesList = (data) => ({
    type: 'PLACES_LIST',
    data,
  });
  
export const getSelectPlace = (value) => ({
    type: 'SEARCHING_INPUT',
    value,
  });
  
export const categoryList = (data) => ({
    type: 'CATEGORY_LIST',
    data,
})