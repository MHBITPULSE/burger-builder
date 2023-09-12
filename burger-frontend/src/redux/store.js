// import { createStore } from 'redux'
// import { reducer } from './reducer'

// export const store = createStore(reducer);

import { configureStore } from '@reduxjs/toolkit';
import burgerReducer from './burgerSlice';

export default configureStore({
      reducer: {
            burger: burgerReducer,
      },
});
