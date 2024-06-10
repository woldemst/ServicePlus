import { useState, useEffect, useContext } from "react"
import { View, Image } from "react-native"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import OrderView from "../../order/pages/OrderView"
import AppointmentView from "../../appointment/pages/AppointmentView"
import FirmView from "../../firm/pages/FirmView"
import { AuthContext } from "../../context/auth-context"
import { useSelector } from "react-redux"

const Tab = createMaterialTopTabNavigator()


const OverviewNavigator = () => {
    const [activeTab, setActiveTab] = useState('OrderView');

    const auth = useContext(AuthContext)
    const firmId = useSelector(state => state.context.firmId)

    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                initialRouteName={activeTab}
                tabBarPosition="bottom"
                screenOptions={{
                    tabBarIndicator: () => null,
                    tabBarLabelStyle: { fontSize: 10 },
                    tabBarStyle: { borderTopColor: '#e0e0e0', borderTopWidth: 1 },
                    swipeEnabled: false,

                }}

                onTabPress={({ route }) => {

                    const routeIndex = route.state?.index; // Get the index of the current route

                    if (routeIndex !== undefined && routeIndex !== activeTab) {
                        setActiveTab(route.name);
                    }

                }}
            >

                {!!firmId && (
                    <>
                        <Tab.Screen
                            name="AppointmentView"
                            component={AppointmentView}
                            options={{
                                headerShown: false,
                                tabBarLabel: 'Termine',
                                tabBarIcon: () => (<Image style={{ width: 28, height: 28 }} source={require("../../../assets/overview/appointment.png")} />),
                                tabBarActiveTintColor: "#000",
                            }}
                        />

                        <Tab.Screen
                            name="OrderView"
                            component={OrderView}
                            options={{
                                headerShown: false,
                                tabBarLabel: 'Aufträge',
                                tabBarIcon: () => (<Image style={{ width: 20, height: 20 }} source={require("../../../assets/overview/orders.png")} />),
                                tabBarActiveTintColor: "#000",
                            }}
                        />
                    </>
                )}

                <Tab.Screen
                    name="FirmView"
                    component={FirmView}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Betrieb',
                        tabBarIcon: () => (<Image style={{ width: 24, height: 24 }} source={require("../../../assets/overview/firm_bold.png")} />),
                        tabBarActiveTintColor: "#000"
                    }}
                />
            </Tab.Navigator>
        </View >
    )
}


export default OverviewNavigator; 
