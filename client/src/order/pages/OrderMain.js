import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    Image
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import OrderInfo from "./OrderInfo"
import OrderAppointments from "./OrderAppointments";
import OrderFiles from "./OrderFiles";


const OrderMain = () => {
    const route = useRoute()
    const Tab = createMaterialTopTabNavigator()
    const [activeTab, setActiveTab] = useState('Info');

    return <>
        <View style={styles.header} >
            <View style={styles.headerContent}>
                <View>
                    <Text style={styles.headerHeadline}>{route.params.name}</Text>
                </View>
            </View>
        </View >
        <Tab.Navigator
            initialRouteName={activeTab}
            screenOptions={{
                activeTintColor: '#222', // Color of the active tab
                inactiveTintColor: '#222', // Color of the inactive tab
                labelStyle: { fontSize: 14, textTransform: 'none' }, // Style for the tab labels
                indicatorStyle: { backgroundColor: '#222' }, // Style of the indicator below the active tab
                // tabBarStyle: styles.tabNavigator, // Background color of the tab bar
                tabBarStyle: { paddingTop: 0, paddingBottom: 0, paddingHorizontal: 0 }, // Adjust padding here

            }}

            onTabPress={({ route }) => {
                const routeIndex = route.state?.index; // Get the index of the current route

                if (routeIndex !== undefined && routeIndex !== activeTab) {
                    setActiveTab(route.name);
                }
            }}

        >
            <Tab.Screen
                name="Info"
                component={OrderInfo}
                options={{
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Termine"
                component={OrderAppointments}
                options={{
                    headerShown: false

                }}
            />
            <Tab.Screen
                name="dateien"
                component={OrderFiles}
                options={{
                    headerShown: false

                }}
            />

        </Tab.Navigator>

    </>
}



const styles = StyleSheet.create({
    tabNavigator: {
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: '#000'
    },
    header: {
        marginTop: 50,
        paddingLeft: 24,
        paddingRight: 24,
        backgroundColor: '#fff',
        width: '100%',
        paddingTop: 16,
        paddingBottom: 16,
        position: 'fixed',
        top: 0,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
    },
    headerContent: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        justifyContent: 'center',
    },
    headerHeadline: {
        fontSize: 18,
        fontWeight: '400'
    },
    headerNav: {
        backgroundColor: 'red'
    },
    headerIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '20%'
    },
    headerButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerIcon: {
        width: 24,
        height: 24
    },
    content: {
        padding: 24,
        flex: 1,
        backgroundColor: '#fff'
    },

})

export default OrderMain;