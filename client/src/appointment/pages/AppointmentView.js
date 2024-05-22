import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { useContext, useState } from "react";
import AppointmentList from '../components/AppointmentList'
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../context/auth-context";
import { getArchivedAppointments } from "../../actions/appointmentActions";

const AppointmentView = () => {
    const auth = useContext(AuthContext)
    const dispatch = useDispatch()

    const showArchived = useSelector(state => state.appointment.showArchived)

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    }

    const toggleArchived = () => {
        dispatch(getArchivedAppointments())
    }

    return (
        <View style={styles.appontmentContainer}>
            <View style={styles.header} >
                <View style={styles.headerContent}>
                    <View style={styles.textContainer} >
                        <Text style={styles.headerText}>Terminbersicht {showArchived && '(archiviert)'}</Text>
                    </View>
 
                    <View style={[styles.headerIconContainer, { justifyContent: auth.admin ? 'space-between' : 'flex-end' }]} >
                        <TouchableOpacity disabled={showArchived} style={styles.headerButton} >
                            <Image style={styles.headerIcon} source={require('../../../assets/filter.png')} />
                        </TouchableOpacity>

                        {auth.admin && (
                            <TouchableOpacity disabled={showArchived} onPress={toggleModal} style={styles.headerButton} >
                                <Image style={styles.headerIcon} source={require('../../../assets/add_new.png')} />
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity onPress={toggleArchived} style={styles.headerButton} >
                            <Image style={styles.headerIcon} source={require('../../../assets/order/archive.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.content}>
                <AppointmentList isModalVisible={isModalVisible} toggleModal={toggleModal} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    appontmentContainer: {
        backgroundColor: '#fff',
        flex: 1,
    },
    header: {
        paddingLeft: 24,
        paddingRight: 24,
        backgroundColor: '#fff',
        marginTop: 50,
        width: '100%',
        paddingTop: 16,
        paddingBottom: 16,
        position: 'fixed',
        top: 0,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,

    },
    headerContent: {

        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textContainer: {

    },
    headerText: {
        fontSize: 21,
        fontWeight: '400'
    },
    headerIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '30%'
    },
    headerButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerIcon: {
        width: 24,
        height: 24
    },
    content: {
        // paddingTop: 24,
        flex: 1,
        backgroundColor: '#fff'
    },
})

export default AppointmentView