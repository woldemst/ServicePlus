import { View, StyleSheet, Image, Text } from "react-native";

const AppointmentItem = (props) => {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.indicator}></View>

                <View style={styles.mainContent}>
                    {/* <Text style={styles.date}>{props.order.date}</Text> */}
                    <Text style={styles.date}>{props.appointment.startTime} - {props.appointment.finishTime}</Text>

                    <Text style={styles.workersName}>{props.appointment.worker}</Text>

                    <Text style={styles.order}>{props.appointment.name}</Text>

                </View>

                <View style={styles.iconContainer}>
                    <Image style={styles.filePlusImg} source={require('../../../../assets/file_plus.png')} />
                </View>
            </View>
        </>
    )
}



const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: '#757575',
        marginBottom: 16,
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
    iconContainer: {
        // width: '8%',
        paddingRight: 13,
        alignItems: 'center',
        justifyContent: 'center'
    },
    filePlusImg: {
        // borderColor: 'red', 
        // borderWidth: 2
        // width: 24, 
        // height: 24,
    },

})




export default AppointmentItem; 