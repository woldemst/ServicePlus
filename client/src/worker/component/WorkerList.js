import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native"
import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import axios from "axios"

import { getWorkerData } from "../../actions/workerActions"
import { AuthContext } from "../../context/auth-context"
import WorkerItem from "./WokerItem"


const WorkerList = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const auth = useContext(AuthContext)

    const [isLoaded, setisLoaded] = useState(true)
    const [refresh, setRefresh] = useState(false)

    const fetchedData = useSelector(state => state.worker.workersArray)
    const handleRefresh = () => setRefresh(prevData => !prevData);

    // console.log(fetchedData);
    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/workers/${auth.firmId}/all`)
                dispatch(getWorkerData(response.data))
                setisLoaded(false)
            } catch (err) {
                console.log('Error while fetching workers', err);
                setisLoaded(false)
            }
        }
        fetchWorkers()
    }, [refresh])


    if (isLoaded || fetchedData.workers.length === 0) {
        return (
            <View style={styles.suggestContainer}>
                <Text style={styles.addText}>Noch kein Mitarbeiter</Text>

                <View style={styles.centeredImageContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('createWorker', {
                                handleRefresh: () => handleRefresh()

                            })
                        }} >
                        <Image style={styles.addImg} source={require('../../../assets/firm/add.png')} />
                    </TouchableOpacity>

                </View>

            </View>
        )
    }

    return !isLoaded && (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header} >
                    <View style={styles.headerContent}>
                        <View style={styles.textContainer} >
                            <Text style={styles.headerText}>Mitarbeiter</Text>
                        </View>

                        <View style={styles.headerIconContainer} >
                            <TouchableOpacity
                                style={styles.headerButton}
                                onPress={() => {
                                    navigation.navigate('createWorker', {
                                        name: 'Create worker',
                                        handleRefresh: () => handleRefresh()

                                    })
                                }} >
                                <Image style={styles.headerIcon} source={require('../../../assets/customer/user_plus.png')} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

                <View style={styles.workerList}>
                    {isLoaded ? (
                        <ActivityIndicator style={styles.loader} size="large" color="#7A9B76" />

                    ) : (
                        fetchedData.workers.map(worker => (
                            <WorkerItem
                                id={worker._id}
                                key={worker._id}
                                workerNr={worker._id}
                                name={worker.name}
                                email={worker.email}
                                phone={worker.phone}
                                description={worker.description}
                                // nextAppointment
                                street={worker.street}
                                houseNr={worker.houseNr}
                                zip={worker.zip}
                                place={worker.place}
                                handleRefresh={handleRefresh}
                            />
                        ))

                    )}
                </View>
            </ScrollView>
        </View>
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
        paddingTop: 32,
        paddingBottom: 32,
        paddingLeft: 16,
        paddingRight: 16,
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

    }
})


export default WorkerList;