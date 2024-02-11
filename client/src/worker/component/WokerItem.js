import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { useEffect, useState } from "react"
import ModalComponent from "../../../src/shared/UIElements/Modal"
import WorkerDetails from "../pages/WorkerDetails"

const WorkerItem = (props) => {

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    }
  
    // console.log(props);
    return (
        <>
            <TouchableOpacity
                style={styles.workerContainer}
                onPress={toggleModal}
            >
                <View style={styles.workerContent}>
                    <View style={styles.circleWrapper}>
                        <Image style={styles.img} source={require('../../../assets/circle.png')} />
                    </View>
                    <View style={styles.imageContainer} >
                        <View style={styles.imgSet}>
                            <Image style={styles.img} source={require('../../../assets/customer/customer.png')} />
                        </View>
                    </View>
                    <View style={styles.nameContainer} >
                        <View key={props._id}>
                            <Text style={styles.workerName}>{props.name}</Text>
                            <Text style={styles.bossName}>{props.workerNr}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.arrowWrapper}>
                    <Image style={styles.img} source={require('../../../assets/right_arrow.png')} />
                </View>
            </TouchableOpacity>

            <ModalComponent
                isVisible={isModalVisible}
                animationIn="slideInUp" // Specify the slide-up animation
                animationOut="slideOutDown" // Specify the slide-down animation
                onBackdropPress={toggleModal}
                onBackButtonPress={toggleModal}
                header={<Text style={styles.modalHeadline}>Miterbeiteriformtaion</Text>}
            >
                <WorkerDetails
                    id={props.id}
                    key={props.id}
                    name={props.name}
                    email={props.email}
                    phone={props.phone}
                    workerNr={props.workerNr}
                    description={props.description}
                    handleRefresh={props.handleRefresh}
                    street={props.street}
                    houseNr={props.houseNr}
                    zip={props.zip}
                    place={props.place}
                    toggle={toggleModal}
                />
            </ModalComponent>

        </>
    )
}


const styles = StyleSheet.create({
    imgSet: {
        backgroundColor: '#7a9b76',
        borderRadius: 50,
        padding: 10
    },
    textContainer: {

    },
    workerList: {
        paddingTop: 32,
        paddingBottom: 32,
        paddingLeft: 16,
        paddingRight: 16
    },
    workerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12
        // borderColor: 'red',
        // borderWidth: 2
    },
    workerContent: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    imageContainer: {
        justifyContent: 'center'
    },
    img: {
        width: 24,
        height: 24
    },
    nameContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 9,
        paddingBottom: 9,
    },
    workerName: {
        fontSize: 16,
        fontWeight: '700'
    },
    bossName: {
        color: '#9e9e9e',
        fontSize: 14
    },
    listContainer: {
        paddingTop: 23,
    },
    listItem: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 4
    },
    icon: {
        margin: 12,

    },
    itemText: {
        marginLeft: 16,
        marginTop: 16,
        marginBottom: 16,
        fontSize: 16
    },
    logoutContainer: {
        position: 'fixed',
        bottom: 0
    },
    modalHeadline: {
        fontSize: 21,
        color: '#7a9b76',
        fontWeight: '700'
    },
    arrowWrapper: {
        justifyContent: 'center'
    },
    circleWrapper: {
        justifyContent: 'center',
        width: '13%',
        // borderColor: 'red',
        // borderWidth: 2
    }
})

export default WorkerItem;