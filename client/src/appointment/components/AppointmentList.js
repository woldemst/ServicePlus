import { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import axios from 'axios';

import ModalComponent from '../../shared/UIElements/Modal';
import AppointmentItem from './AppointmentItem';
import AppointmentCreate from '../pages/AppointmentCreate';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointments } from '../../actions/appointmentActions';
import { AuthContext } from '../../context/auth-context';

const AppointmentList = props => {
    const dispatch = useDispatch()
    const auth = useContext(AuthContext)

    const fetchedActiveAppointments = useSelector(state => state.appointment.activeAppointments)
    const fetchedArchivedAppointments = useSelector(state => state.appointment.archivedAppointments)
    const showArchived = useSelector(state => state.appointment.showArchived)
    const refresh = useSelector(state => state.util.refresh)
    const firmId = useSelector(state => state.context.firmId)


    const [isLoaded, setIsLoaded] = useState(false)
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/appointments/${firmId}/all`)
                dispatch(getAppointments(response.data))
                setIsLoaded(true)

            } catch (err) {
                setIsLoaded(true)
                console.log("Error fetching appointments", err);
            }
        }
        fetchOrders()
    }, [refresh, refreshing])


    const renderAppointments = () => {
        if (fetchedActiveAppointments.length === 0) {
            return (
                <View style={styles.imgContainer}>
                    <Image style={styles.bannerImg} source={require('../../../assets/empty_folder.png')} />
                </View>
            )
        }
        // console.log(showArchived);

        // let appointmentsToRender = showArchived ? fetchedArchivedAppointments : fetchedActiveAppointments;

        // if (props.id) { appointmentsToRender = appointmentsToRender.filter(appointment => appointment.orderId === props.id) }


        let appointmentsToRender = []
        if (props.id) {
            appointmentsToRender = [
                ...fetchedActiveAppointments.filter(appointment => appointment.orderId === props.id),
                ...fetchedArchivedAppointments.filter(appointment => appointment.orderId === props.id)
            ]
        }else {
            appointmentsToRender = showArchived ? fetchedArchivedAppointments : fetchedActiveAppointments
        }

        // console.log(appointmentsToRender);

        if (appointmentsToRender.length === 0) {
            return (
                <View style={styles.imgContainer}>
                    <Image style={styles.bannerImg} source={require('../../../assets/empty_folder.png')} />
                    <Text>No appointments found for this order ID.</Text>
                </View>
            );
        }
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                data={appointmentsToRender}
                keyExtractor={item => item._id}
                renderItem={({ item, index }) => (
                    <AppointmentItem
                        id={item._id}
                        name={item.name}
                        orderId={item.orderId}
                        workers={item.workers}
                        w_name={item.w_name}
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
                        style={index === 0 ? { marginTop: 24 } : {}}

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