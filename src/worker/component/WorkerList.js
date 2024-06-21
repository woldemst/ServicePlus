import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, RefreshControl } from "react-native"
import { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"

import { getWorkerData } from "../../actions/workerActions"
import WorkerItem from "./WokerItem"
import WorkerCreate from "../pages/WorkerCreate"

import ModalComponent from "../../shared/UIElements/Modal"
import WorkerProfile from "../pages/WorkerProfile"

const WorkerList = () => {
    const dispatch = useDispatch()

    const firmId = useSelector(state => state.context.firmId)
    const refresh = useSelector(state => state.util.refresh)
    const fetchedData = useSelector(state => state.worker.workersArray)
    const admin = useSelector(state => state.context.admin)
    const userId = useSelector(state => state.context.userId)

    const [isLoaded, setisLoaded] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false)

    const toggleModal = () => setModalVisible(!isModalVisible)

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    // console.log(fetchedData);
    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await axios.get(`http://192.168.178.96:8000/api/workers/${firmId}/all`)
                dispatch(getWorkerData(response.data))
                setisLoaded(true)
            } catch (err) {
                console.log('Error while fetching workers', err);
                setisLoaded(true)
            }
        }
        fetchWorkers()
    }, [refresh, refreshing])

    // Filetering worker's data based on userId and workerId
    const filteredData = fetchedData.workers.filter(worker => worker._id !== userId)

    const EmptyWorkerList = ({ isModalVisible, toggleModal }) => {
        return (
            <>
                <View style={styles.suggestContainer}>
                    <Text style={styles.addText}>Noch kein Mitarbeiter</Text>
                    <View style={styles.centeredImageContainer}>
                        <TouchableOpacity onPress={toggleModal}>
                            <Image style={styles.addImg} source={require('../../../assets/firm/add.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ModalComponent
                    isVisible={isModalVisible}
                    animationIn="slideInUp" // Specify the slide-up animation
                    animationOut="slideOutDown" // Specify the slide-down animation
                    onBackdropPress={toggleModal}
                    onBackButtonPress={toggleModal}
                    header={<Text style={styles.modalHeadline}>Miterbeiter hinzufügen</Text>}
                >
                    <WorkerCreate toggle={toggleModal} />
                </ModalComponent>
            </>
        )
    }

    if (!isLoaded) {
        return <ActivityIndicator style={styles.loader} size="large" color="#7A9B76" />
    } else if (fetchedData.workers.length === 0) {
        return <EmptyWorkerList isModalVisible={isModalVisible} toggleModal={toggleModal} />
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <View style={styles.textContainer}>
                            <Text style={styles.headerText}>Mitarbeiter</Text>
                        </View>
                        {admin && (
                            <View style={styles.headerIconContainer}>
                                <TouchableOpacity style={styles.headerButton} onPress={toggleModal}>
                                    <Image
                                        style={styles.headerIcon}
                                        source={require("../../../assets/customer/user_plus.png")}
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>

                {!admin && (
                    <View style={styles.workerProfileConainer}>
                        <WorkerProfile />
                    </View>
                )}

                <View style={styles.workerList}>
                    <FlatList
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        showsVerticalScrollIndicator={false}
                        style={styles.scroll}
                        data={!admin ? filteredData : fetchedData.workers}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => (
                            <WorkerItem
                                id={item._id}
                                workerNr={item._id}
                                name={item.name}
                                email={item.email}
                                phone={item.phone}
                                description={item.description}
                                // nextAppointment
                                street={item.street}
                                houseNr={item.houseNr}
                                zip={item.zip}
                                place={item.place}
                            />
                        )}
                    />
                </View>
            </View >

            <ModalComponent
                isVisible={isModalVisible}
                animationIn="slideInUp" // Specify the slide-up animation
                animationOut="slideOutDown" // Specify the slide-down animation
                onBackdropPress={toggleModal}
                onBackButtonPress={toggleModal}
                header={<Text style={styles.modalHeadline}>Miterbeiter hinzufügen</Text>}
            >
                <WorkerCreate toggle={toggleModal} />
            </ModalComponent>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        // borderWidth: 2,
        // borderColor: 'red',  

        backgroundColor: '#fff',
        flex: 1,
    },
    header: {

        width: '100%',
        paddingTop: 27,
        paddingBottom: 10,
        paddingLeft: 32,
        paddingRight: 32,
        position: 'fixed',
        top: 0,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        backgroundColor: '#fff'

    },
    headerContent: {

        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 21,
        fontWeight: '400'
    },
    imgSet: {
        backgroundColor: '#7a9b76',
        borderRadius: 50,
        padding: 10
    },
    textContainer: {

    },
    workerList: {
        flex: 1,

        // paddingTop: 32,
        // paddingBottom: 32,
        // paddingLeft: 16,
        // paddingRight: 16,
    },
    workerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

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
    },
    loader: {
        flex: 1,
    },
    // if no worker 
    suggestContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 16,

    },
    addText: {
        fontSize: 21,
        textAlign: 'center',

    },
    centeredImageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addImg: {
        // borderColor: 'red',
        // borderWidth: 2

    },
    workerProfileConainer: {
        // borderColor: 'red',
        // borderWidth: 2
    }
})


export default WorkerList;