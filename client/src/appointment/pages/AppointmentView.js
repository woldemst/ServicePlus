import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import AppointmentList from '../components/AppointmentList'

const AppointmentView = () => {
    return (
        <>
            <View style={styles.header} >
                <View style={styles.headerContent}>
                    <View style={styles.textContainer} >
                        <Text style={styles.headerText}>Terminübersicht</Text>
                    </View>

                    <View style={styles.headerIconContainer} >
                        <TouchableOpacity style={styles.headerButton} >
                            <Image style={styles.headerIcon} source={require('../../../assets/add_new.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.headerButton} >
                            <Image style={styles.headerIcon} source={require('../../../assets/filter.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.content}>
                <AppointmentList />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
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
        width: '20%'
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
        padding: 24,
        flex: 1,
    },
})

export default AppointmentView