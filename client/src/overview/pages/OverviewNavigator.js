import { useState } from "react"
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
                tabBarIndicator={false}
                tabBarIndicatorStyle={{
                    backgroundColor: 'transparent'
                }}
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 10 },

                }}

                onTabPress={({ route }) => {
                    const index = Tab.Navigator.router.getStateForRouteName(route.name).index;
                    setActiveTab(index);

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