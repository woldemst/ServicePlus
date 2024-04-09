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
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";

import { toggleToFalseEditOrder, toggleToTrueEditOrder } from "../../actions/orderActions";
import { VALIDATOR_REQUIRE } from "../../util/validators";
import { setInitialInputData, addToInitialData } from "../../actions/inputActions";
import OrderAppointments from "./OrderAppointments";
import OrderInfo from "./OrderInfo"
import OrderFiles from "./OrderFiles";
import Input from "../../shared/UIElements/Input";


const OrderMain = () => {
    const dispatch = useDispatch()
    const route = useRoute()
    const navigation = useNavigation()
    const Tab = createMaterialTopTabNavigator()

    const [isLoaded, setIsLoaded] = useState(false)
    const fetchedInputData = useSelector(state => state.input)
    const edit = useSelector(state => state.order.edit);

    const goingBack = () => {
        navigation.goBack()
        dispatch(toggleToFalseEditOrder())
    }

    useEffect(() => {
        dispatch(addToInitialData(initialInputState));
        setIsLoaded(true)
    }, [edit])

    const initialInputState = {
        name: {
            value: route.params.name
        },
    }

    return isLoaded && (
        <>
            <View style={styles.header} >
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => goingBack()}>
                        <Ionicons name="arrow-back" size={24} color="green" />
                    </TouchableOpacity>
                    <View style={styles.headerHeadline}>
                        <Input
                            id='orderName'
                            reducerKey='order'
                            fieldName='name'
                            thin={true}
                            style={styles.inputName}
                            errorText='Geben Sie den Namen ein'
                            value={fetchedInputData.inputs.name.value}
                            validators={[VALIDATOR_REQUIRE()]}
                            disabled={!edit}
                        />
                    </View>
                    <TouchableOpacity onPress={() => dispatch(toggleToTrueEditOrder())}>
                        <Image source={require('../../../assets/order/edit.png')} />
                    </TouchableOpacity>
                </View>
            </View >

            <Tab.Navigator screenOptions={{
                labelStyle: { fontSize: 14, textTransform: 'none' }, // Style for the tab labels
                tabBarStyle: { paddingTop: 0, paddingBottom: 0, paddingHorizontal: 0 }, // Adjust padding here
                tabBarIndicatorStyle: { backgroundColor: '#e0e0e0' }, // Change the color of the indicator
            }}
            >
                <Tab.Screen
                    name="Info"
                    component={OrderInfo}
                    initialParams={{
                        id: route.params.id,
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
    input: {
        color: '#000'
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
})

export default OrderMain;