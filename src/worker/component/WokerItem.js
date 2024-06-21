import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native"
import { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { SwipeListView } from "react-native-swipe-list-view";
import axios from "axios";

import { deleteWorker } from "../../actions/workerActions"
import { refershData } from "../../actions/utilActions";

const WorkerItem = (props) => {
    const workerId = props.id
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const firmId = useSelector(state => state.context.firmId)
    const admin = useSelector(state => state.context.admin)

    const workersArray = useSelector(state => state.worker.workersArray.workers)
    const worker = workersArray.find(worker => worker._id === workerId);
    const [image, setImage] = useState('');

    useEffect(() => {
        if (worker.profileImg && worker.profileImg.data) {
            const base64Image = `data:${worker.profileImg.contentType};base64,${worker.profileImg.data.toString('base64')}`;
            setImage(base64Image);
        }
    }, [])
    const deleteHandler = async () => {
        Alert.alert(
            'Löschbestätigung',
            'Bist du sicher, dass du diesen Mitarbeiter löschen möchtest??',
            [
                {
                    text: 'Abbrechen',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await axios.delete(`http://192.168.178.96:8000/api/workers/${firmId}/delete/${workerId}`);
                            dispatch(deleteWorker(workerId))
                            dispatch(refershData())

                        } catch (err) {
                            console.log("Error while deleting ther customer:", err);
                        }
                    },
                },
            ],
            { cancelable: false }
        )
    };

    const renderItem = () => (
        <View style={styles.rowFront}>
            <TouchableOpacity style={styles.workerContainer} onPress={() => { navigation.navigate('workerDetails', { id: props.id }) }}>
                {/* onLongPress={longPressHandler} */}

                <View style={styles.content}>
                    {/* <View style={styles.circleWrapper}>  
                        <Image style={styles.img} source={require('../../../assets/circle.png')} />
                    </View> */}
                    <View style={styles.imgContainer} >
                        <View style={styles.imgSet}>
                            <Image
                                style={styles.img}
                                source={image ? { uri: image } : require('../../../assets/customer/customer.png')}
                            />
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
        </View>
    )

    return <>
        <SwipeListView
            renderItem={renderItem}
            rightOpenValue={-75}
            // leftOpenValue={75}
            disableRightSwipe={true}
            disableLeftSwipe={!admin}
            closeOnRowOpen={true}
            data={[props]}
            renderHiddenItem={(data, rowMap) => (
                <View style={styles.rowBack}>
                    <TouchableOpacity onPress={deleteHandler} style={styles.hiddenItem}>
                        <Image style={styles.deleteImage} source={require('../../../assets/buttons/delete.png')} />
                    </TouchableOpacity>
                </View>
            )}

        />
    </>
}


const styles = StyleSheet.create({
    imgSet: {
        backgroundColor: '#7a9b76',
        borderRadius: 50,
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
        width: '100%',
        padding: 6,
        paddingHorizontal: 24,
        // borderColor: 'red',
        // borderWidth: 2
    },
    content: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    imgContainer: {
        justifyContent: 'center'
    },
    img: {
        width: 34,
        height: 34,
        // borderWidth: 1, 
        borderRadius: 50,
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
    // swipeable styles
    rowFront: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        // marginBottom: 16,
        borderBottomWidth: 1,
        borderColor: '#eee',
        // borderRadius: 10,
    },
    rowBack: {
        backgroundColor: '#C70000',
        // borderWidth: 1,
        // borderColor: '#C70000',
        // borderRadius: 10,
        // marginBottom: 16,
    },
    deleteImage: {
        width: 30,
        height: 30
    },
    hiddenItem: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 20,
        height: '100%',
    },
})

export default WorkerItem;