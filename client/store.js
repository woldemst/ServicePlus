import { configureStore} from '@reduxjs/toolkit'
import firmReducer from './src/reducer/firmReducer';
import customerReducer from './src/reducer/customerReducer';
import userReducer from './src/reducer/userReducer'

const store = configureStore({
  reducer: {
    firm: firmReducer,
    customer: customerReducer,
    user: userReducer
    // Add more reducers if needed
  },
});

export default store;