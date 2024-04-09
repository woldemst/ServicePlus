import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";


import ModalComponent from "../../shared/UIElements/Modal";
import AppointmentInfo from "../pages/AppointmentInfo";


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
                    <View style={styles.dateTimeContainer}>
                        <Text style={styles.date}>am {props.date}</Text>
                        <Text> / </Text>
                        <Text style={styles.date}>um {props.time}</Text>
                    </View>

                    <Text style={styles.workersName}>{props.worker}</Text>

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


            <ModalComponent
                isVisible={isModalVisible}
                animationIn="slideInUp" // Specify the slide-up animation
                animationOut="slideOutDown" // Specify the slide-down animation
                onBackdropPress={toggleModal}
                onBackButtonPress={toggleModal}
                modalHeight="50%"
                header={<Text style={styles.modalHeadline}>Termin</Text>}
            >

                <AppointmentInfo
                    key={props._id}
                    creator={props.creator}
                    name={props.name}
                    worker={props.worker}
                    date={props.date}
                    time={props.time}
                    status={props.status}
                    contact={props.contact}
                    description={props.description}
                    o_street={props.o_street}
                    o_houseNr={props.o_houseNr}
                    o_zip={props.o_zip}
                    o_place={props.o_place}
                    o_name={props.o_name}
                />
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
    modalHeadline: {
        fontSize: 21,
        color: "#7a9b76",
        fontWeight: "700",
    },
    dateTimeContainer: {
        flexDirection: 'row',
    },
    orderDetails: {
        // flexDirection: 'row',

    },
    adressContainer: {
        flexDirection: "row",
        // flexWrap: 'wrap',
        // maxWidth: '50%',

        // borderColor: 'red', 
        // borderWidth: 2
    },
    adressItem: {
        marginRight: 5
    },
    orderName: {
        marginRight: 5
    },

})




export default AppointmentItem;
