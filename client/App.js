import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

// import Header from './components/Header';
import Overview from './pages/Overview';
import OnboardingNavigator from './pages/onboarding/OnboardingNavigator';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

const Stack = createNativeStackNavigator()

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='onboarding' component={OnboardingNavigator} options={{headerShown: false}}/>

        <Stack.Screen name='overview' component={Overview} options={{title: 'Overview'}}/>

        <Stack.Screen name='login' component={Login} options={{title: 'Login'}} />
        <Stack.Screen name='register' component={Register} options={{title: 'Registration'}} />

        {/* <View style={styles.container}></View> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
