const initialState = {
  textInputValue: '',
  places: [],
  categories : [],
  categoryInfo : {}
};

  const locationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'PLACES_LIST':
        return {
          ...state,
          places: action.data,
        };
      case 'SEARCHING_INPUT':
        return {
          ...state,
          textInputValue: action.value
        };
      case 'CATEGORY_LIST':
        return {
          ...state,
          categories: action.data,
        };
      default:
        return state;
    }
  };
  
  export default locationReducer;
  