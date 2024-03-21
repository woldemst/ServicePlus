import { useState, useEffect } from "react"
import { View, Image } from "react-native"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import OrderView from "../../order/pages/OrderView"
import AppointmentView from "../../appointment/pages/AppointmentView"
import FirmView from "../../firm/pages/FirmView"

const Tab = createMaterialTopTabNavigator()


const OverviewNavigator = () => {
    const [activeTab, setActiveTab] = useState('OrderView');



    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                initialRouteName={activeTab}
                tabBarPosition="bottom"

                screenOptions={{
                    tabBarIndicator: () => null,
                    tabBarLabelStyle: { fontSize: 10 },
                    tabBarStyle: { borderTopColor: '#eee', borderTopWidth: 1 },

                }}

                onTabPress={({ route }) => {

                    const routeIndex = route.state?.index; // Get the index of the current route

                    if (routeIndex !== undefined && routeIndex !== activeTab) {
                        setActiveTab(route.name);
                    }

                }}
            >

                <Tab.Screen
                    name="AppointmentView"
                    component={AppointmentView}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Termine',
                        tabBarIcon: () => (<Image source={require("../../../assets/tabler.png")} />),
                        tabBarActiveTintColor: "#000"
                    }}


                />
                <Tab.Screen
                    name="OrderView"
                    component={OrderView}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Aufträge',
                        tabBarIcon: () => (<Image source={require("../../../assets/settings.png")} />),
                        tabBarActiveTintColor: "#000"

                    }}

                />
                <Tab.Screen
                    name="FirmView"
                    component={FirmView}
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Betrieb',
                        tabBarIcon: () => (<Image source={require("../../../assets/betrieb.png")} />),
                        tabBarActiveTintColor: "#000"
                    }}
                />
            </Tab.Navigator>
        </View >
    )
}


export default OverviewNavigator; 
