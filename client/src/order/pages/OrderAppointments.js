import { View, StyleSheet } from "react-native";
import OrderList from "../components/OrderList"
import AppointmentList from "../../appointment/components/AppointmentList";


const OrderAppointments = () => {
    return <>
        <View style={styles.appointmentListing} >
            <AppointmentList />
        </View>
    </>
}

const styles = StyleSheet.create({
    appointmentListing: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 32,
        paddingHorizontal: 16
    }
})

export default OrderAppointments; 