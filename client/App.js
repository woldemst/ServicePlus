import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Overview from './pages/overview/Overview';
// import OnboardingNavigator from './pages/onboarding/OnboardingNavigator';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import EditProfile from './pages/overview/pages/firm/EditProfile';
import OrderView from './pages/overview/pages/OrderView';

import CustomerList from './pages/overview/pages/firm/customer/CustomerList';
import CreateCustomer from './pages/overview/pages/firm/customer/page/CreateCusstomer';
import CustomerDetails from './pages/overview/pages/firm/customer/page/CustomerDetails';


const Stack = createNativeStackNavigator()

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name='onboarding' component={OnboardingNavigator} options={{headerShown: false}}/> */}
        <Stack.Screen name='overview' component={Overview} options={{title: 'Overview'}}/>
        <Stack.Screen name='login' component={Login} options={{title: 'Login'}} />
        <Stack.Screen name='register' component={Register} options={{title: 'Registration'}} />
        {/*  */}
        <Stack.Screen name='orderView' component={OrderView} options={{title: 'Order view'}} />
        <Stack.Screen name='editProfile' component={EditProfile} options={{title: 'Edit Profile'}} />
        {/*  */}
        <Stack.Screen name='customerList' component={CustomerList} options={{title: 'Customers'}} />
        <Stack.Screen name='createCustomer' component={CreateCustomer} options={{title: 'Create Customer'}} />
        <Stack.Screen name='customerDetails' component={CustomerDetails} options={{title: 'Details of the customer'}} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

