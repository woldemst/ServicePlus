import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    Alert
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { deleteOrder, toggleToTrueEditOrder } from "../actions/orderActions";
import { deleteAppointmentsByOrder } from "../actions/appointmentActions";

const OrderOptions = props => {
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    const modalWidth = 200;
    const modalHeight = 100;
    const top = props.position.y + 50;
    const left = props.position.x - modalWidth / 2;

    // Ensure that the options remain within the screen bounds
    const adjustedTop = Math.min(top, screenHeight - modalHeight);
    const adjustedLeft = Math.max(0, Math.min(left, screenWidth - modalWidth));

    const dispatch = useDispatch()
    const orderId = props.id
    // const edit = useSelector(state => state.order.edit);

    const deleteHandler = async () => {
        Alert.alert(
            'Delete Confirmation',
            'Are you sure you want to delete this order and its appointments?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => { props.onClose() }
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await axios.delete(`http://192.168.178.96:8000/api/orders/${orderId}/delete`);
                            dispatch(deleteOrder(orderId));
                            dispatch(deleteAppointmentsByOrder(orderId))
                            props.onClose()
                        } catch (err) {
                            console.log("Error while deleting order:", err);
                        }
                    },
                },
            ],
            { cancelable: false }
        )
    };

    const renameHandler = async () => {
        props.onClose(),
            props.onRenameHandler(orderId)
    }

    return <>
        <View style={[styles.optionsContainer, { top: adjustedTop, left: adjustedLeft }]}>
            <TouchableOpacity style={styles.option} onPress={renameHandler}>
                <Text>Umbenennen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={deleteHandler}>
                <Text>Löschen</Text>
            </TouchableOpacity>
        </View>
    </>
}

const styles = StyleSheet.create({
    optionsContainer: {
        position: 'absolute',
        backgroundColor: '#fff',
        width: 200,
        // paddingVertical: 10,
        borderRadius: 5,
        elevation: 5,
    },
    option: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: '#222',
    },
})

export default OrderOptions;
