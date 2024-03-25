import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import ModalComponent from "../../shared/UIElements/Modal";
import AppointmentInfo from "../pages/AppointmenrInfo";


const AppointmentItem = (props) => {

    const [isModalVisible, setModalVisible] = useState(false);


    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    }


    return (
        <>
            <TouchableOpacity style={styles.container} onPress={toggleModal} >
                <View style={styles.indicator}></View>

                <View style={styles.mainContent}>
                    <Text style={styles.date}>{props.date}</Text>
                    <Text style={styles.date}>{props.startTime} - {props.finishTime}</Text>

                    <Text style={styles.workersName}>{props.worker}</Text>

                    <Text style={styles.order}>{props.name}</Text>

                </View>

                {/* <View style={styles.iconContainer}>
                    <Image style={styles.filePlusImg} source={require('../../../assets/file_plus.png')} />
                </View> */}
            </TouchableOpacity>


            <ModalComponent
                isVisible={isModalVisible}
                animationIn="slideInUp" // Specify the slide-up animation
                animationOut="slideOutDown" // Specify the slide-down animation
                onBackdropPress={toggleModal}
                onBackButtonPress={toggleModal}

                header={<Text style={styles.modalHeadline}>Termin</Text>}
            >

                {/* <OrderCreate handleRefresh={handleRefresh} toggle={toggleModal} /> */}
                <AppointmentInfo />
            </ModalComponent>
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

// id: props.id,
// name: props.name,
// description: props.description,
// worker: props.worker,
// customer: props.customer,
// contact: props.contact,