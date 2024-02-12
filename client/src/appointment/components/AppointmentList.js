import { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import axios from 'axios';

import AppointmentItem from './AppointmentItem';

const AppointmentList = () => {
    const [fetchedAppointments, setFetchedAppointments] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/appointments/all')
                setFetchedAppointments(response.data)

            } catch (err) {
                console.log("Error fetching appointments", err);
            }
        }
        fetchOrders()
    }, [])

    if (fetchedAppointments.length === 0) {
        return (
            <View style={styles.imgContainer}>
                <Image style={styles.bannerImg} source={require('../../../assets/empty_folder.png')} />
            </View>
        )
    }

    return (

        <>
            {fetchedAppointments.map(appointment => (
                <AppointmentItem key={appointment._id} appointment={appointment} />

            ))}

        </>

    )
}


const styles = StyleSheet.create({
    bannerImg: {
        // bottom: '50%',
    },
    imgContainer: {
        // borderColor: 'red',
        // borderWidth: 2,

        height: '100%',
        width: '100%',
        // flex: 1,
        // position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        top: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 0,
        marginBottom: 0
    },
})


export default AppointmentList;