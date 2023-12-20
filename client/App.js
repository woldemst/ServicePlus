import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingNavigator from './src/onboarding/OnboardingNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Provider } from 'react-redux';



import CustomerList from './src/customer/components/CustomerList';
import CustomerDetails from './src/customer/pages/CustomerDetails';
import CreateCustomer from './src/customer/pages/CreateCustomer';
import WorkerList from './src/worker/component/WorkerList';
import WorkerCreate from './src/worker/pages/WorkerCreate';
import { AuthContext } from './src/context/auth-context';
import EditProfile from './src/firm/pages/EditProfile';
import Overview from './src/overview/pages/Overview';
import OrderView from './src/order/pages/OrderView';
import Register from './src/auth/pages/Register';
import Login from './src/auth/pages/Login';
import store from './store';



export default function App() {
  const Stack = createNativeStackNavigator() 

  const [userToken, setUserToken] = useState(false)
  const [userId, setUserId] = useState(false)

  useEffect(()=>{
    const getAllKeys = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken')
        if(token !== null) {
          setUserToken(token)
        }

      } catch (err) {
        console.error('Error retrieving user token:', err);
      }

    }

    getAllKeys()
  })
  

  const login = useCallback(async (uid, token) => {
    try {
      setUserToken(token)
      setUserId(uid)

      await AsyncStorage.setItem('userToken', 
        JSON.stringify({ userId: uid, token: token })
      )

      
    } catch (err) {
      console.error('Error setting user token:', err);
      
    }
  }, [])

  const logout = useCallback(async() => {
    try {
      await AsyncStorage.removeItem('userToken')
      // window.alert('Are you sure you want to logout?')
      setUserToken(null)
      setUserId(null)


    } catch (err) {
      console.error('Error removing user token:', err); 
    }
  }, [])


  return (
      <Provider store={store}>
          <AuthContext.Provider value={{ login: login, logout: logout }}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name='onboarding' component={OnboardingNavigator} options={{ headerShown: false }}/>
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
          </AuthContext.Provider>
      </Provider>
  );
}

 