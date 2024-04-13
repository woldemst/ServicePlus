import { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';

import ModalComponent from '../../shared/UIElements/Modal';
import AppointmentItem from './AppointmentItem';
import AppointmentCreate from '../pages/AppointmentCreate';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointments } from '../../actions/appointmentActions';
import { AuthContext } from '../../context/auth-context';

const AppointmentList = props => {
    const id = props.id
    const dispatch = useDispatch()
    const fetchedData = useSelector(state => state.appointment.appointmentsArray)

    const [isLoaded, setIsLoaded] = useState(false)
    const refresh = useSelector(state => state.util.refresh)

    // const appointmentArr = useSelector(state => state.appointment.appointmentsArray.appointments)
    // const byOrderId = appointmentArr.find(appointment => appointment.orderId == '660d6bd14f47ff40447d52cf')

    // console.log('orderId', props.id);

    const auth = useContext(AuthContext)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/appointments/${auth.firmId}/all`)
                dispatch(getAppointments(response.data))
                setIsLoaded(true)

            } catch (err) {
                setIsLoaded(true)
                console.log("Error fetching appointments", err);
            }
        }
        fetchOrders()
    }, [refresh])

    const renderAppointments = () => {
        if (fetchedData.appointments.length === 0) {
            return (
                <View style={styles.imgContainer}>
                    <Image style={styles.bannerImg} source={require('../../../assets/empty_folder.png')} />
                </View>
            )
        }


        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={fetchedData.appointments}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <AppointmentItem
                        id={item._id}
                        name={item.name}
                        orderId={item.orderId}
                        worker={item.worker}
                        date={item.date}
                        time={item.time}
                        status={item.status}
                        contact={item.contact}
                        description={item.description}
                        o_street={item.o_street}
                        o_houseNr={item.o_houseNr}
                        o_zip={item.o_zip}
                        o_place={item.o_place}
                        o_name={item.o_name}
                        c_name={item.c_name}
                    />
                )}
            >
            </FlatList>
        );
    }




    return <>
        {!isLoaded ? (
            <ActivityIndicator style={styles.loader} size="large" color="#7A9B76" />
        ) : renderAppointments()}

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
        </ModalComponent >




    </>

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