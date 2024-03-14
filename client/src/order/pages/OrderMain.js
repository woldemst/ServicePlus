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
import { Ionicons } from '@expo/vector-icons';

import OrderInfo from "./OrderInfo"
import OrderAppointments from "./OrderAppointments";
import OrderFiles from "./OrderFiles";


const OrderMain = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const Tab = createMaterialTopTabNavigator()
    const [activeTab, setActiveTab] = useState('Info');

    const goBack = () => {
        navigation.goBack();
    };

    return <>
        <View style={styles.header} >
            <View style={styles.headerContent}>
                <TouchableOpacity onPress={goBack}>
                    <Ionicons name="arrow-back" size={24} color="green" />
                </TouchableOpacity>
                <Text style={styles.headerHeadline}>{route.params.name}</Text>
                <TouchableOpacity>
                    <Image source={require('../../../assets/order/edit.png')} />
                </TouchableOpacity>
            </View>
        </View >
        <Tab.Navigator
            initialRouteName={activeTab}
            screenOptions={{
                labelStyle: { fontSize: 14, textTransform: 'none' }, // Style for the tab labels
                tabBarStyle: { paddingTop: 0, paddingBottom: 0, paddingHorizontal: 0 }, // Adjust padding here
                tabBarIndicatorStyle: { backgroundColor: '#222' }, // Change the color of the indicator
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
    header: {
        paddingLeft: 24,
        paddingRight: 24,
        backgroundColor: '#fff',
        width: '100%',
        paddingTop: 66,
        paddingBottom: 16,
        position: 'fixed',
        top: 0,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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