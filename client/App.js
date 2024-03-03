import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingNavigator from './src/onboarding/OnboardingNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { useCallback, useEffect, useState, useContext } from 'react';
import { Provider } from 'react-redux';
import { AuthContext } from './src/context/auth-context';
import React from 'react';

import CustomerList from './src/customer/components/CustomerList';
import CustomerDetails from './src/customer/pages/CustomerDetails';
import CreateCustomer from './src/customer/pages/CreateCustomer';
import WorkerList from './src/worker/component/WorkerList';
import WorkerCreate from './src/worker/pages/WorkerCreate';
import UpdateProfile from './src/firm/pages/UpdateProfile';
import OrderCreate from './src/order/pages/OrderCreate';
import OrderView from './src/order/pages/OrderView';
import Register from "./src/auth/pages/Register";
import Login from './src/auth/pages/Login';
import store from './store';
import OverviewNavigator from './src/overview/pages/OverviewNavigator';


export default function App() {
  const Stack = createNativeStackNavigator()
  const auth = useContext(AuthContext)
  const [userToken, setUserToken] = useState(false)
  const [userId, setUserId] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [firmId, setFirmId] = useState(null)
  const [refresh, setRefresh] = useState(false)


  const handleRefresh = () => setRefresh(prevData => !prevData);


  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = JSON.parse(await AsyncStorage.getItem('userData'))
        if (userData && userData.token) {
          login(userData.usedId, userData.token, userData.role, userData.firmId)
          setUserToken(userData.token)
        }

        // console.log('isLoggedIn:', auth.isLoggedIn);
      } catch (err) {
        console.error('Error retrieving user token:', err);
      }
    }

    getUserData()
  }, [login])


  const login = useCallback(async (uid, token, role, fid) => {
    try {
      setUserToken(token)
      setUserId(uid)
      setUserRole(role)
      setFirmId(fid)
      await AsyncStorage.setItem('userData', JSON.stringify({ userId: uid, token: token, role: role, firmId: fid }))



    } catch (err) {
      console.error('Error setting user data:', err);

    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('userData')
      // window.alert('Are you sure you want to logout?')
      setUserToken(null)
      setUserId(null)
      setUserRole(null)


    } catch (err) {
      console.error('Error removing user token:', err);
    }
  }, [])


  const updateId = id => {
    setFirmId(id)

  }

  let routes;


  if (userToken) {
    routes = (
      <NavigationContainer>
        <Stack.Navigator>
          {/* when logging out */}
          <Stack.Screen name='onboarding' component={OnboardingNavigator} options={{ headerShown: false }} />

          {/* authentification */}
          <Stack.Screen name='login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='register' component={Register} options={{ headerShown: false }} />

          {/* main */}
          <Stack.Screen name='overviewNavigator' component={OverviewNavigator} options={{ headerShown: false }} />


          {/* orders */}
          <Stack.Screen name='orderView' component={OrderView} />
          <Stack.Screen name='orderCreate' component={OrderCreate} options={{ title: 'Create order' }} />

          {/* firm */}
          <Stack.Screen name='updateProfile' component={UpdateProfile} options={{ title: 'Edit Profile' }} />

          {/* customers */}
          <Stack.Screen name='customerList' component={CustomerList} options={{ title: 'Customers' }} />
          <Stack.Screen name='createCustomer' component={CreateCustomer} options={{ title: 'Create Customer' }} />
          <Stack.Screen name='customerDetails' component={CustomerDetails} options={{ title: 'Details of the customer' }} />

          {/* workers  */}
          <Stack.Screen name='workerList' component={WorkerList} options={{ title: 'Workers' }} />
          <Stack.Screen name='createWorker' component={WorkerCreate} options={{ title: 'Worker create' }} />

        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    routes = (
      <NavigationContainer>
        <Stack.Navigator>
          {/* main */}
          <Stack.Screen name='onboarding' component={OnboardingNavigator} options={{ headerShown: false }} />

          {/* authentification */}
          <Stack.Screen name='login' component={Login} options={{ title: 'Login' }} />
          <Stack.Screen name='register' component={Register} options={{ title: 'Registration' }} />

          {/* main */}
          <Stack.Screen name='overviewNavigator' component={OverviewNavigator} options={{ headerShown: false }} />


        </Stack.Navigator>
      </NavigationContainer>
    )
  }


  return (
    <Provider store={store}>
      <AuthContext.Provider
        value={{
          login: login,
          logout: logout,
          updateId: updateId,
          isLoggedIn: !!userToken,
          userToken: userToken,
          userId: userId,
          firmId: firmId,
          role: userRole,
          refresh: refresh,
          handleRefresh: handleRefresh

        }}>
        <React.Fragment>{routes}</React.Fragment>
      </AuthContext.Provider>
    </Provider>
  );
}

