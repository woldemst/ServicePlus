import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';

import ModalComponent from '../../shared/UIElements/Modal';
import AppointmentItem from './AppointmentItem';

const AppointmentList = props => {
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
                <AppointmentItem
                    key={appointment._id}
                    name={appointment.name}
                    // customer={appointment.customer}
                    creator={appointment.creator}
                    worker={appointment.worker}
                    date={appointment.date}
                    status={appointment.status}
                    contact={appointment.contact}
                    description={appointment.description}
                />

            ))}

            <ModalComponent
                isVisible={props.toggle}
                animationIn="slideInUp" // Specify the slide-up animation
                animationOut="slideOutDown" // Specify the slide-down animation
                onBackdropPress={props.toggleModal}
                onBackButtonPress={props.toggleModal}

                header={<Text style={styles.modalHeadline}>Termin hinzufügen</Text>}
            >
                {/* <OrderCreate handleRefresh={handleRefresh} toggle={toggleModal} /> */}
            </ModalComponent>


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
    modalHeadline: {
        fontSize: 21,
        color: "#7a9b76",
        fontWeight: "700",
    },
})


export default AppointmentList;