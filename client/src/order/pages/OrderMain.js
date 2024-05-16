import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    ScrollView,
    Image
} from "react-native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";

import { toggleEdit, toggleToFalseEditOrder, toggleToTrueEditOrder, updateOrderDataById } from "../../actions/orderActions";
import { VALIDATOR_REQUIRE } from "../../util/validators";
import OrderAppointments from "./OrderAppointments";
import OrderInfo from "./OrderInfo"
import OrderFiles from "./OrderFiles";
import Input from "../../shared/UIElements/Input";
import { AuthContext } from "../../context/auth-context";


const OrderMain = (props) => {
    const dispatch = useDispatch()
    const route = useRoute()
    const navigation = useNavigation()
    const Tab = createMaterialTopTabNavigator()
    const auth = useContext(AuthContext)


    const orderId = route.params.id
    const fetchedArray = useSelector((state) => state.order.ordersArray.orders);
    const order = fetchedArray.find(order => order._id == orderId)
    const edit = useSelector(state => state.order.edit);

    const [isLoaded, setIsLoaded] = useState(false)
    const [activeTab, setActiveTab] = useState(0);

    const goingBack = () => {
        navigation.goBack()
        dispatch(toggleToFalseEditOrder(false))
    }

    useEffect(() => setIsLoaded(true), [edit])

    const onChangeHandler = (value) => {
        dispatch(updateOrderDataById(value, 'name', orderId))
    }

    return isLoaded && (
        <>
            <View style={styles.header} >
                <View style={styles.headerContent}>
                    <TouchableOpacity style={styles.backButton} onPress={() => goingBack()}>
                        <Ionicons name="arrow-back" size={24} color="green" />
                    </TouchableOpacity>
                    <View style={styles.headerHeadline}>
                        <Input
                            multiline={true}
                            // scrollEnabled={false}
                            // numberOfLines={2}
                            style={[styles.headline, edit ? styles.enabled : styles.disbled]}
                            disabled={!edit}
                            value={order.name}
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText='Geben Sie den Name für den Auftrag ein'
                            onChangeText={onChangeHandler}
                        />
                    </View>
                    <View style={styles.editBtnContainer}>
                        {auth.admin && (
                            <TouchableOpacity onPress={() => dispatch(toggleEdit(!edit))}>
                                <Image source={require('../../../assets/order/edit.png')} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View >

            <Tab.Navigator screenOptions={{
                labelStyle: { fontSize: 14, textTransform: 'none' }, // Style for the tab labels
                tabBarStyle: { paddingTop: 0, paddingBottom: 0, paddingHorizontal: 0 }, // Adjust padding here
                tabBarIndicatorStyle: { backgroundColor: '#e0e0e0' }, // Change the color of the indicator
                swipeEnabled: false,

            }}
                onTabPress={params => {
                    console.log(params);
                    // const index = Tab.Navigator.router.getStateForRouteName(route.name).index;
                    // setActiveTab(index);

                }}

                onIndexChange={(index) => setActiveTab(index)}
            >
                <Tab.Screen
                    name="Info"
                    component={OrderInfo}
                    initialParams={{
                        id: route.params.id,
                        status: route.params.status,

                    }}
                    options={{
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name="Termine"
                    component={OrderAppointments}
                    initialParams={{
                        id: route.params.id,
                    }}
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
    )
}


const styles = StyleSheet.create({
    header: {
        paddingLeft: 24,
        paddingRight: 24,
        backgroundColor: '#fff',
        // width: '100%',
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
        alignItems: 'center',
        maxWidth: '100%',
    },
    backButton: {
        height: '100%',
        width: '10%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerHeadline: {
        maxWidth: '70%',
    },
    headline: {
        fontSize: 20,
        fontWeight: '400',
        color: '#000',
        padding: 7,
        borderRadius: 4,
        borderBottomWidth: 1,
        borderColor: '#eee',
        // maxWidth: '90%', // Adjudzhbnsst this as needed to fit your layout
        // overflow: 'hidden', // Hide overflow
    },
    editBtnContainer: {
        height: '100%',
        width: '10%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row'
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
    inputName: {
        fontSize: 18,
        flex: 1
    },

    disbled: {
        backgroundColor: '#eee',
    },
    enabled: {
        borderColor: '#eee',
        borderBottomWidth: 1,
    },
})

export default OrderMain;