import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Overview from './src/overview/pages/Overview'
// import OnboardingNavigator from './pages/onboarding/OnboardingNavigator';
import Login from './src/auth/pages/Login';
import Register from './src/auth/pages/Register';
import EditProfile from './src/firm/pages/EditProfile'
import OrderView from './src/order/pages/OrderView';
import FirmProfile from './src/firm/pages/FirmProfile'

import CustomerList from './src/customer/components/CustomerList';
import CreateCustomer from './src/customer/pages/CreateCustomer'
import CustomerDetails from './src/customer/pages/CustomerDetails';
import { Provider } from 'react-redux';
import store from './store';
import WorkerList from './src/worker/component/WorkerList';
import WorkerCreate from './src/worker/pages/WorkerCreate';


const Stack = createNativeStackNavigator()


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name='onboarding' component={OnboardingNavigator} options={{headerShown: false}}/> */}
          <Stack.Screen name='overview' component={Overview} options={{ title: 'Overview' }} />

          {/* authentification */}
          <Stack.Screen name='login' component={Login} options={{ title: 'Login' }} />
          <Stack.Screen name='register' component={Register} options={{ title: 'Registration' }} />
          {/* orders */}
          <Stack.Screen name='orderView' component={OrderView} options={{ title: 'Order view' }} />


          <Stack.Screen name='editProfile' component={EditProfile} options={{ title: 'Edit Profile' }} />
          {/* customers */}
          <Stack.Screen name='customerList' component={CustomerList} options={{ title: 'Customers' }} />
          <Stack.Screen name='createCustomer' component={CreateCustomer} options={{ title: 'Create Customer' }} />
          <Stack.Screen name='customerDetails' component={CustomerDetails} options={{ title: 'Details of the customer' }} />

          {/* workers  */}
          <Stack.Screen name='workerList' component={WorkerList} options={{ title: 'Workers' }} />
          <Stack.Screen name='createWorker' component={WorkerCreate} options={{ title: 'Worker create'}} />


        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

