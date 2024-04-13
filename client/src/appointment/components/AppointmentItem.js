import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { SwipeListView } from 'react-native-swipe-list-view';

import { useState } from "react";


import ModalComponent from "../../shared/UIElements/Modal";
import AppointmentInfo from "../pages/AppointmentInfo";
import Button from "../../shared/UIElements/Button";

const AppointmentItem = (props) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    }


    const renderItem = (data) => (
        <View style={styles.rowFront}>
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
        </View>
    )

    const handleDelete = () => {
        console.log('delete');
    }


    return (
        <>
            <SwipeListView

                data={[
                    {
                        id: '1', // unique identifier for the item
                        date: props.date,
                        time: props.time,
                        worker: props.worker,
                        o_name: props.o_name,
                        o_street: props.o_street,
                        o_houseNr: props.o_houseNr,
                        o_zip: props.o_zip,
                        o_place: props.o_place,
                        // other properties as needed
                    },
                ]} // pass your data array here
                renderItem={renderItem}
                renderHiddenItem={(data, rowMap) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity
                            style={{
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                                backgroundColor: 'red',
                                paddingRight: 20,
                                height: '100%',

                            }}
                            onPress={handleDelete}
                        >
                            <Text style={{ color: 'white' }}>Löschen</Text>
                        </TouchableOpacity>

                    </View>
                )}
                // leftOpenValue={75}
                rightOpenValue={-100}
                disableRightSwipe={true}
            />

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
                    // creator={props.creator}
                    name={props.name}
                    worker={props.worker}
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

    adressContainer: {
        flexDirection: "row",

    },
    adressItem: {
        marginRight: 5
    },
    orderName: {
        marginRight: 5
    },
    // swipeable styles
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
        backgroundColor: 'red',
        borderWidth: 3,
        borderColor: 'red',
        borderRadius: 10,
        marginRight: 24,
        marginLeft: 24,
        marginBottom: 16,
    }

})




export default AppointmentItem;
