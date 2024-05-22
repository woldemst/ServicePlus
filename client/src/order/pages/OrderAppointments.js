import { View, StyleSheet } from "react-native";
import AppointmentList from "../../appointment/components/AppointmentList";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";


const OrderAppointments = props => {
    const route = useRoute()

    return <>
        <View style={styles.appointmentListing} >
            <AppointmentList id={route.params.id} />
        </View>
    </>
}

const styles = StyleSheet.create({
    appointmentListing: {
        flex: 1,
        backgroundColor: '#fff',
        // paddingVertical: 32,
        // paddingHorizontal: 16
    }
})

export default OrderAppointments;  