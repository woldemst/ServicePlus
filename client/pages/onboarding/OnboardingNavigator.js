import { useState } from "react"
import { View, StyleSheet } from "react-native"
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'


import Management from "./Management"
import Appointments from "./Appointments"

const Tab = createMaterialTopTabNavigator()


const OnboardingNavigator = () =>{
    const [activeTab, setActiveTab] = useState(0);

    return(
        <View style={{flex: 1}}>
            <Tab.Navigator 

                screenOptions={{
                    tabBarItemStyle: { display: 'none' }, // Hide tab labels
                }}
                
                onTabPress={({ route }) => {
                const index = Tab.Navigator.router.getStateForRouteName(route.name).index;
                setActiveTab(index);

                }}
                >


                <Tab.Screen name="Managment" initialParams={{ activeTab }}  component={Management} />
                <Tab.Screen name="Appointments" initialParams={{ activeTab }}  component={Appointments} />
            </Tab.Navigator>

        </View>
    )
}


export default OnboardingNavigator; 