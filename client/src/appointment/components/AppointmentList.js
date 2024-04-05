import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import axios from 'axios';

import ModalComponent from '../../shared/UIElements/Modal';
import AppointmentItem from './AppointmentItem';
import AppointmentCreate from '../pages/AppointmentCreate';
import { useSelector } from 'react-redux';

const AppointmentList = props => {
    const [fetchedAppointments, setFetchedAppointments] = useState([])
    const refresh = useSelector(state => state.util.refresh)

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
    }, [refresh])

    if (fetchedAppointments.length === 0) {
        return (
            <View style={styles.imgContainer}>
                <Image style={styles.bannerImg} source={require('../../../assets/empty_folder.png')} />
            </View>
        )
    }

    return (

        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                {fetchedAppointments.map(appointment => (
                    <AppointmentItem
                        key={appointment._id}
                        name={appointment.name}
                        // customer={appointment.customer}
                        creator={appointment.creator}
                        worker={appointment.worker}
                        date={appointment.date}
                        time={appointment.time}
                        status={appointment.status}
                        contact={appointment.contact}
                        description={appointment.description}
                        // orderData={appointment.orderData}
                        c_street={appointment.c_street}
                        c_houseNr={appointment.c_houseNr}
                        c_zip={appointment.c_zip}
                        c_place={appointment.c_place}
                        o_name={appointment.o_name}
                    />
                ))}
            </ScrollView>


            <ModalComponent
                isVisible={props.isModalVisible}
                animationIn="slideInUp" // Specify the slide-up animation
                animationOut="slideOutDown" // Specify the slide-down animation
                onBackdropPress={props.toggleModal}
                onBackButtonPress={props.toggleModal}

                header={<Text style={styles.modalHeadline}>Termin hinzufügen</Text>}
            >
                <AppointmentCreate toggleModal={props.toggleModal} />
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