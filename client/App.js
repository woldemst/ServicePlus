import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Overview from './pages/overview/Overview';
import OnboardingNavigator from './pages/onboarding/OnboardingNavigator';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import EditProfile from './pages/overview/pages/firm/EditProfile';

import OrderView from './pages/overview/pages/OrderView';
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

      </Stack.Navigator>
    </NavigationContainer>
  );
}

