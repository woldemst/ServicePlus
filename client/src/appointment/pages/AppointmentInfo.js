import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { refershData } from "../../actions/utilActions";
import { Alert } from "react-native";


const AppointmentInfo = props => {
    const dispatch = useDispatch()
    const [status, setStatus] = useState(props.status || 1);
    const [showOptions, setShowOptions] = useState(false);


    const statusStrings = {
        1: "new",
        2: "in progress",
        3: "completed",
        4: "canceled"
    };

    const handleStatusChange = async newStatus => {
        setStatus(newStatus);

        Alert.alert(
            'Changing Confirmation',
            'Are you sure you want to change a status of this appointment?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            const response = await axios.post(`http://localhost:8000/api/appointments/${props.id}/statuschange`, { newStatus: newStatus })
                            dispatch(refershData())
                            setShowOptions(false);

                        } catch (err) {
                            console.log("Error if changing a status of an appointments", err);
                        }
                    }
                }
            ],
            { cancelable: false }
        )

    };

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

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
                    <Text style={[styles.thinCell, styles.cell]}>{props.worker}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.boldCell, styles.cell]}>Kunde:</Text>
                    <Text style={[styles.thinCell, styles.cell]}>{props.c_name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.boldCell, styles.cell]}>Adresse:</Text>
                    <Text style={[styles.thinCell, styles.cell]}>{props.o_street} {props.o_houseNr} {props.o_zip} {props.o_place}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.boldCell, styles.cell]}>Status:</Text>

                    <View style={[styles.statusContainer]}>

                        <View style={[
                            styles.statusLine,
                            status === '1' ? styles.notStarted : null,
                            status === '2' ? styles.inProgress : null,
                            status === '3' ? styles.completed : null,
                            status === '4' ? styles.canceled : null
                        ]}></View>

                        <Text style={styles.statusText}>
                            {(() => {
                                switch (status) {
                                    case '1':
                                        return 'Not started';
                                    case '2':
                                        return 'In progress';
                                    case '3':
                                        return 'Completed';
                                    case '4':
                                        return 'Canceled';
                                    default:
                                        return '';
                                }
                            })()}
                        </Text>

                        <View>
                            <View style={[
                                styles.thinCell,
                                styles.cell,
                                status === '1' ? styles.notStarted : null,
                                status === '2' ? styles.inProgress : null,
                                status === '3' ? styles.completed : null,
                                status === '4' ? styles.canceled : null

                            ]}></View>
                            <TouchableOpacity onPress={toggleOptions} style={styles.statusChangeButton}>
                                {/* <Text style={styles.changeButtonText}>Change</Text> */}
                                <Image source={require('../../../assets/buttons/edit.png')} />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
                {showOptions && (
                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={() => handleStatusChange("2")}>
                            <Text style={[styles.statusButton, styles.inProgress]}>In Progress</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleStatusChange("3")}>
                            <Text style={[styles.statusButton, styles.completed]}>Completed</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleStatusChange("4")}>
                            <Text style={[styles.statusButton, styles.canceled]}>Canceled</Text>
                        </TouchableOpacity>
                    </View>
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
    table: {

    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        // borderColor: 'green',
        // borderWidth: 2
    },
    cell: {

        // borderColor: 'red',
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
        justifyContent: 'flex-start',
        width: '60%',

        // borderWidth: 2,
        // borderColor: 'red'
    },
    inProgress: {
        backgroundColor: 'yellow',
        color: 'black'
    },
    completed: {
        backgroundColor: 'green',
        color: 'white'
    },
    canceled: {
        backgroundColor: 'red',
        color: 'white'
    },
    statusChangeButton: {
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        padding: 5,
    },
    changeButtonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    statusLine: {
        width: 24,
        height: 24,
        borderRadius: 50
    },
    notStarted: {
        backgroundColor: '#eee',
        color: 'white'
    },
    inProgress: {
        backgroundColor: '#1769FF',
        color: 'white'
    },
    completed: {
        backgroundColor: '#7A9B76',
        color: 'white'
    },
    canceled: {
        backgroundColor: '#DB504A',
        color: 'white'
    },

    statusText: {
        paddingHorizontal: 6,
        paddingVertical: 2
    },
    statusChangeButton: {
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        padding: 5,
    },
    changeButtonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderWidth: 2,
        // borderColor: 'red'
    },
    statusButton: {
        padding: 8,
        borderRadius: 4,
        fontWeight: 'bold',
        textAlign: 'center',
        width: 110
    },
})

export default AppointmentInfo;