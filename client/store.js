import { configureStore} from '@reduxjs/toolkit'
import firmReducer from './src/reducer/firmReducer';
import customerReducer from './src/reducer/customerReducer';
import userReducer from './src/reducer/userReducer'
import registerReducer from './src/reducer/registerReducer';
import loginReducer from './src/reducer/loginReducer';
import workerReducer from './src/reducer/workerReducer';
import dataReducer from './src/reducer/dataReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    register: registerReducer,
    login: loginReducer,
    firm: firmReducer,
    worker: workerReducer,
    customer: customerReducer,
    // data: dataReducer
    // Add more reducers if needed
  },
});

export default store;