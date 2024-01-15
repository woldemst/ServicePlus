import { configureStore} from '@reduxjs/toolkit'
import firmReducer from './src/reducer/firmReducer';
import customerReducer from './src/reducer/customerReducer';
import userReducer from './src/reducer/userReducer'
import registerReducer from './src/reducer/registerReducer';
import loginReducer from './src/reducer/loginReducer';

const store = configureStore({
  reducer: {
    firm: firmReducer,
    customer: customerReducer,
    user: userReducer,
    register: registerReducer,
    login: loginReducer
    // Add more reducers if needed
  },
});

export default store;