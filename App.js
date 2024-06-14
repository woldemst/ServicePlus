import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingNavigator from './src/onboarding/OnboardingNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { useCallback, useEffect, useState, useContext } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { AuthContext } from './src/context/auth-context';
import React from 'react';

import CustomerList from './src/customer/components/CustomerList';
import CustomerDetails from './src/customer/pages/CustomerDetails';
import CreateCustomer from './src/customer/pages/CreateCustomer';
import WorkerList from './src/worker/component/WorkerList';
import WorkerCreate from './src/worker/pages/WorkerCreate';
import Profile from './src/firm/pages/Profile';
import OrderCreate from './src/order/pages/OrderCreate';
import OrderView from './src/order/pages/OrderView';
import Register from "./src/auth/pages/Register";
import Login from './src/auth/pages/Login';
import store from './store';
import OverviewNavigator from './src/overview/pages/OverviewNavigator';
import OrderMain from './src/order/pages/OrderMain';
import OrderInfo from './src/order/pages/OrderInfo';
import OrderAppointments from './src/order/pages/OrderAppointments';
import AppointmentMain from './src/appointment/pages/AppointmentMain';
import WorkerDetails from './src/worker/pages/WorkerDetails';
import ResetPassword from './src/auth/pages/ResetPassword';
import { setUserRole, updateFirmId } from './src/actions/contextActions';


const MainApp = () => {
  const dispatch = useDispatch()

  const [userToken, setUserToken] = useState(false)
  const [userId, setUserId] = useState(false)

  const [refresh, setRefresh] = useState(false)

  const Stack = createNativeStackNavigator()

  const handleRefresh = () => setRefresh(prevData => !prevData);


  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = JSON.parse(await AsyncStorage.getItem('userData'))
        if (userData && userData.token) {
          login(userData.userId, userData.token, userData.admin, userData.firmId)
          setUserToken(userData.token)
        }

        // console.log('isLoggedIn:', auth.isLoggedIn);
      } catch (err) {
        console.error('Error retrieving user token:', err);
      }
    }

    getUserData()
  }, [login])

  const login = useCallback(async (uid, token, admin, fid) => {
    try {
      setUserToken(token)
      setUserId(uid)

      dispatch(setUserRole(admin))
      dispatch(updateFirmId(fid))
      await AsyncStorage.setItem('userData', JSON.stringify({ userId: uid, token: token, admin: admin, firmId: fid }))


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
      // setUserRole(null)


    } catch (err) {
      console.error('Error removing user token:', err);
    }
  }, [])


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
          <Stack.Screen name='resetPassword' component={ResetPassword} options={{ title: 'Passwort zurücksetzen' }} />

          {/* main */}
          <Stack.Screen name='overviewNavigator' component={OverviewNavigator} options={{ headerShown: false, title: 'Übersicht' }} />

          {/* orders */}
          <Stack.Screen name='orderView' component={OrderView} />
          <Stack.Screen name='orderCreate' component={OrderCreate} options={{ title: 'Create order' }} />
          <Stack.Screen name='orderMain' component={OrderMain} options={{ headerShown: false }} />

          {/* appointemts */}
          <Stack.Screen name='appointmentMain' component={AppointmentMain} options={{ headerShown: false }} />

          {/* firm */}
          <Stack.Screen name='profile' component={Profile} options={{ title: 'Edit Profile' }} />

          {/* customers */}
          <Stack.Screen name='customerList' component={CustomerList} options={{ title: 'Customers' }} />
          <Stack.Screen name='createCustomer' component={CreateCustomer} options={{ title: 'Create Customer' }} />
          <Stack.Screen name='customerDetails' component={CustomerDetails} options={{ title: 'Details of the customer' }} />

          {/* workers  */}
          <Stack.Screen name='workerList' component={WorkerList} options={{ title: 'Workers' }} />
          <Stack.Screen name='createWorker' component={WorkerCreate} options={{ title: 'Worker create' }} />
          <Stack.Screen name='workerDetails' component={WorkerDetails} options={{ title: 'Worker details' }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    routes = (
      <NavigationContainer>
        <Stack.Navigator>

          {/* onboarding */}
          <Stack.Screen name='onboarding' component={OnboardingNavigator} options={{ headerShown: false }} />

          {/* authentification */}
          <Stack.Screen name='login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='register' component={Register} options={{ headerShown: false }} />

          {/* main */}
          <Stack.Screen name='overviewNavigator' component={OverviewNavigator} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    )
  }


  return (
    <AuthContext.Provider
      value={{
        login: login,
        logout: logout,

        isLoggedIn: !!userToken,
        userToken: userToken,
        userId: userId,

        // admin: userRole, 
        refresh: refresh,
        handleRefresh: handleRefresh,
      }}>
      <React.Fragment>{routes}</React.Fragment>
    </AuthContext.Provider>
  );
}

const App = () => {

  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  )
}

export default App
