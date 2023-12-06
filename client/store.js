import { configureStore} from '@reduxjs/toolkit'
import firmReducer from './src/firm/firmReducer';

const store = configureStore({
  reducer: {
    firm: firmReducer,
    // Add more reducers if needed
  },
});

export default store;