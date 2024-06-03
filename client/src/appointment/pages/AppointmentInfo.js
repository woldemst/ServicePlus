import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { refershData } from "../../actions/utilActions";
import { Alert } from "react-native";

import Button from "../../shared/UIElements/Button";
import { AuthContext } from "../../context/auth-context";



const AppointmentInfo = props => {
    const auth = useContext(AuthContext)
    const dispatch = useDispatch()


    const appointments = useSelector(state => state.appointment.appointmentsArray.appointments)
    const showArchived = useSelector(state => state.appointment.showArchived)
    const appointmentItem = appointments.find(appointment => appointment._id == props.id)
    const userRole = useSelector(state => state.context.userRole)

    const [edit, setEdit] = useState(false);
    const [activeStatus, setActiveStatus] = useState(props.status);

    useEffect(() => {
        setActiveStatus(appointmentItem.status)
        if (activeStatus !== appointmentItem.status) {
            setActiveStatus(activeStatus)
        }
    }, [activeStatus, edit])

    const handleStatusChange = async newStatus => {
        setActiveStatus(newStatus);

        Alert.alert(
            'Changing Confirmation',
            'Are you sure you want to change a status of this appointment?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: "Change",
                    onPress: async () => {
                        try {
                            const response = await axios.post(`http://localhost:8000/api/appointments/${props.id}/statuschange`, { newStatus: newStatus })
                            dispatch(refershData())
                            setEdit(false)

                        } catch (err) {
                            console.log("Error if changing a status of an appointments", err);
                        }
                    }
                }
            ],
            { cancelable: false }
        )

    };

    // console.log(auth);

    const disabledButton = () => {
        if (userRole) {
            return showArchived
        } 
        return !props.workers.includes(auth.userId) || (props.status == '3' || props.status == '4')

    }

    return <>
        <View style={styles.container}>
            <View style={styles.table}>
                <View style={styles.row}>
                    <Text style={[styles.boldCell, styles.cell]}>Datum:</Text>
                    <Text style={[styles.thinCell, styles.cell]}>{props.date}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.boldCell, styles.cell]}>Zeit:</Text>
                    <Text style={[styles.thinCell, styles.cell]}>{props.time}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.boldCell, styles.cell]}>Auftrag:</Text>
                    <Text style={[styles.thinCell, styles.cell]}>{props.o_name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.boldCell, styles.cell]}>Mitarbeiter:</Text>
                    <Text style={[styles.thinCell, styles.cell]}>{props.w_name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.boldCell, styles.cell]}>Kunde:</Text>
                    <Text style={[styles.thinCell, styles.cell]}>{props.c_name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.boldCell, styles.cell]}>Adresse:</Text>
                    <Text style={[styles.thinCell, styles.cell]}>{props.o_street} {props.o_houseNr} {props.o_zip} {props.o_place}</Text>
                </View>

                <View style={[styles.statusContainer]}>
                    <TouchableOpacity
                        style={[
                            {
                                borderTopLeftRadius: 4,
                                borderBottomLeftRadius: 4
                            },
                            styles.statusButton,
                            edit ? [activeStatus == 2 ? styles.inProgress : styles.disabledButton] : [activeStatus == 2 ? styles.currentOfflineStatus : styles.disabledButton],
                        ]}
                        onPress={() => handleStatusChange(2)}
                        disabled={!edit}
                    >
                        <Text style={styles.statusButtonText}>In Arbeit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.statusButton,
                            edit ? [activeStatus == 3 ? styles.completed : styles.disabledButton] : [activeStatus == 3 ? styles.currentOfflineStatus : styles.disabledButton],
                        ]}
                        onPress={() => handleStatusChange(3)}
                        disabled={!edit}
                    >
                        <Text style={styles.statusButtonText}>Fertig</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            {
                                borderTopRightRadius: 4,
                                borderBottomRightRadius: 4
                            },
                            styles.statusButton,
                            edit ? [activeStatus == 4 ? styles.canceled : styles.disabledButton] : [activeStatus == 4 ? styles.currentOfflineStatus : styles.disabledButton],
                        ]}
                        onPress={() => handleStatusChange(4)}
                        disabled={!edit}>
                        <Text style={styles.statusButtonText}>Storniert</Text>
                    </TouchableOpacity>

                </View>

            </View>

            <View style={styles.btnContainer}>
                {edit ? (
                    <Button
                        style={[styles.editButton, styles.button]}
                        buttonText={styles.editButtonText}
                        onPress={() => setEdit(false)}
                        title={'Abbrechen'}
                        disabled={showArchived}
                    />
                ) : (
                    <Button
                        style={[styles.invalideButton, styles.button]}
                        buttonText={styles.editButtonText}
                        onPress={() => setEdit(true)}
                        title={'Ändern'}
                        disabled={disabledButton()}
                    />
                )}
            </View>

        </View>
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
        paddingBottom: 16
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        // borderColor: 'green',
        // borderWidth: 2
    },
    boldCell: {
        fontSize: 20,
        fontWeight: '600'
    },
    thinCell: {
        width: '60%',
        fontSize: 20,
        fontWeight: '400'
    },

    // status 
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        marginTop: 8,
        // borderWidth: 1,
        // borderColor: 'red'
    },
    statusButton: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderWidth: 1,

    },
    statusButtonText: {
        fontWeight: 'bold',
        color: 'white',

    },
    disabledButton: {
        backgroundColor: 'grey',
        color: 'white',
        opacity: 0.7,
        borderColor: '#222',
        borderWidth: 1,


    },
    notStarted: {
        backgroundColor: '#eee',
        color: 'white',
        borderWidth: 1,
    },
    inProgress: {
        backgroundColor: '#1769FF',
        color: 'white',
        borderColor: '#1769FF',

    },
    completed: {
        backgroundColor: '#7A9B76',
        color: 'white',
        borderColor: '#7A9B76',
        borderRightWidth: 0,
        borderLeftWidth: 0
    },
    canceled: {
        backgroundColor: '#DB504A',
        borderColor: '#DB504A',
        color: 'white',
    },
    currentOfflineStatus: {
        backgroundColor: '#222',
        borderColor: '#222',
        opacity: 0.7,
    },
    // button 
    btnContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    button: {
        // height: 53,    
        padding: 16,
        width: '100%',
        borderRadius: 4,
        justifyContent: "center",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    cancelBtnText: {
        fontSize: 18,
        color: "#7A9B76",
        fontWeight: "700",
    },
    editButton: {
        backgroundColor: "#7A9B76",
    },
    editButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "700",
    },
    invalideButton: {
        height: 53,
        width: '40%',
        backgroundColor: 'gray',
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
    },
})

export default AppointmentInfo;