import { View, StyleSheet, Image, Text } from "react-native";
<script src="http://localhost:8097"></script>


const Appointment = () => {
    return (
        <View style={styles.container}>
            <View style={styles.indicator}></View>

            <View style={styles.mainContent}>
                <Text style={styles.date}>8:30 - 12:30</Text>

                <Text style={styles.workersName}>Herr Mitarbeiter</Text>

                <Text style={styles.appointment}>Auftrag X - Kaiserstrasse 12, 46537 Dinslaken</Text>
                
            </View>

            <View style={styles.iconContainer}>
                <Image style={styles.filePlusImg} source={require('../../assets/file_plus.png')} />

            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: '#757575'
    },
    indicator: {
        width: '3%',
        backgroundColor: '#7A9B76',
        borderTopLeftRadius: 10, 
        borderBottomLeftRadius: 10

    },  
    mainContent: {
        padding: 6,
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
    appointment: {
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




export default Appointment; 