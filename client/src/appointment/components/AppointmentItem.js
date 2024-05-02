import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { SwipeListView } from 'react-native-swipe-list-view';
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-native";

import ModalComponent from "../../shared/UIElements/Modal";
import AppointmentInfo from "../pages/AppointmentInfo";
import { deleteAppointment } from '../../actions/appointmentActions'
import { useNavigation } from "@react-navigation/native";

const AppointmentItem = (props) => {
    const dispatch = useDispatch()
    const appointmentId = props.id
    const navigation = useNavigation()
    const [isModalVisible, setModalVisible] = useState(false);

    const appointments = useSelector(state => state.appointment.appointmentsArray.appointments)
    const appointmentItem = appointments.find(appointment => appointment._id == appointmentId)


    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    }

    const renderItem = (data) => (
        <View style={styles.rowFront}>
            <TouchableOpacity style={styles.container} onPress={toggleModal} >
                <View style={[
                    styles.indicator,
                    appointmentItem.status == 1 ? styles.notStarted : null,
                    appointmentItem.status == 2 ? styles.inProgress : null,
                    appointmentItem.status == 3 ? styles.completed : null,
                    appointmentItem.status == 4 ? styles.canceled : null,
                ]}></View>

                <View style={styles.mainContent}>
                    <View style={styles.dateTimeContainer}>
                        <Text style={styles.date}>am {props.date}</Text>
                        <Text> / </Text>
                        <Text style={styles.date}>um {props.time}</Text>
                    </View>

                    <Text style={styles.workersName}>{props.w_name}</Text>

                    <View style={styles.orderDetails}>
                        <Text style={styles.orderName}>{props.o_name}</Text>
                        {/* <Text> - </Text> */}
                        <View style={styles.adressContainer}>
                            <Text style={styles.adressItem}>{props.o_street}</Text>
                            <Text style={styles.adressItem}>{props.o_houseNr}</Text>
                            <Text style={styles.adressItem}>{props.o_zip}</Text>
                            <Text style={styles.adressItem}>{props.o_place}</Text>
                        </View>
                    </View>
                </View>

                {/* <View style={styles.iconContainer}>
                    <Image style={styles.filePlusImg} source={require('../../../assets/file_plus.png')} />
                </View> */}
            </TouchableOpacity>
        </View>
    )

    const deleteHandler = async () => {
        Alert.alert(
            'Delete Confirmation',
            'Are you sure you want to delete this appointment?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            await axios.delete(`http://localhost:8000/api/appointments/${appointmentId}/delete`)
                            dispatch(deleteAppointment(appointmentId))

                        } catch (err) {
                            console.log("Error while deleting appointments", err);
                        }
                    }
                }
            ],
            { cancelable: false }
        )
    }




    return (
        <>
            <SwipeListView
                // swipeGestureBeganHandler={(e) => e.isRightSwipe && e.isSingleTap}
                renderItem={renderItem}
                rightOpenValue={-75}
                // leftOpenValue={75}
                disableRightSwipe={true}
                data={[
                    {
                        id: props.id,
                        date: props.date,
                        time: props.time,
                        worker: props.worker,
                        o_name: props.o_name,
                        o_street: props.o_street,
                        o_houseNr: props.o_houseNr,
                        o_zip: props.o_zip,
                        o_place: props.o_place,
                    },
                ]}
                renderHiddenItem={(data, rowMap) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity
                            onPress={deleteHandler}
                            style={{
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                                paddingRight: 20,
                                height: '100%',

                            }}
                        >
                            <Image style={styles.deleteImage} source={require('../../../assets/buttons/delete.png')} />
                        </TouchableOpacity>

                    </View>
                )}

            />

            <ModalComponent
                isVisible={isModalVisible}
                animationIn="slideInUp" // Specify the slide-up animation
                animationOut="slideOutDown" // Specify the slide-down animation
                onBackdropPress={toggleModal}
                onBackButtonPress={toggleModal}
                modalHeight="50%"
                header={<>
                    <View style={styles.headlineContainer}>
                        <Text style={styles.modalHeadline}>Termin</Text>
                    </View>

                </>}

            >

                <AppointmentInfo
                    key={props.id}
                    id={props.id}
                    // creator={props.creator}
                    name={props.name}
                    w_name={props.w_name}
                    date={props.date}
                    time={props.time}
                    status={props.status}
                    // contact={props.contact}
                    description={props.description}
                    o_street={props.o_street}
                    o_houseNr={props.o_houseNr}
                    o_zip={props.o_zip}
                    o_place={props.o_place}
                    o_name={props.o_name}

                    c_name={props.c_name}
                />
            </ModalComponent>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
    },
    indicator: {
        width: '3%',
        backgroundColor: '#7A9B76',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10

    },
    mainContent: {
        flex: 1,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 16,
        textAlign: 'left',
    },
    iconContainer: {
        // width: '8%',
        paddingRight: 13,
        alignItems: 'center',
        justifyContent: 'center'
    },
    adressContainer: {
        flexDirection: "row",

    },
    adressItem: {
        marginRight: 5
    },
    date: {
        fontSize: 14,
        color: '#171717',
        fontWeight: '700'
    },
    workersName: {
        fontSize: 14,
        marginTop: 6
    },
    order: {
        fontSize: 14,
        marginTop: 7
    },

    filePlusImg: {
        // borderColor: 'red', 
        // borderWidth: 2
        // width: 24, 
        // height: 24,
    },

    dateTimeContainer: {
        flexDirection: 'row',
    },

    orderName: {
        marginRight: 5
    },

    rowFront: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginRight: 24,
        marginLeft: 24,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#757575',
        borderRadius: 10,
    },
    rowBack: {
        backgroundColor: '#C70000',
        borderWidth: 3,
        borderColor: '#C70000',
        borderRadius: 10,
        marginRight: 24,
        marginLeft: 24,
        marginBottom: 16,
    },
    deleteImage: {
        width: 30,
        height: 30

    },
    headlineContainer: {
        flexDirection: 'row',
        marginBottom: 6
    },
    modalHeadline: {
        fontSize: 21,
        color: "#7a9b76",
        fontWeight: "700",
        width: '40%'
    },

    // status indicator 
    notStarted: {
        backgroundColor: '#808080',
    },
    inProgress: {
        backgroundColor: '#1769FF',
    },
    completed: {
        backgroundColor: '#7A9B76',
    },
    canceled: {
        backgroundColor: '#DB504A',
    },

})




export default AppointmentItem;
