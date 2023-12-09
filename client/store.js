import { configureStore} from '@reduxjs/toolkit'
import firmReducer from './src/reducer/firmReducer';
import customerReducer from './src/reducer/customerReducer';

const store = configureStore({
  reducer: {
    firm: firmReducer,
    customer: customerReducer
    // Add more reducers if needed
  },
});

export default store;