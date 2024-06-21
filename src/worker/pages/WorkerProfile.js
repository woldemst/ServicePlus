import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const WorkerProfile = (props) => {
    const userId = useSelector(state => state.context.userId)

    const workersArray = useSelector(state => state.worker.workersArray.workers)
    const worker = workersArray.find(worker => worker._id == userId)


    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.container} onPress={() => { navigation.navigate('workerDetails', { id: userId }) }}>
            <View style={styles.content}>
                <View style={styles.imgContainer} >
                    <View style={styles.imgSet}>
                        <Image style={styles.img} source={require('../../../assets/customer/customer.png')} />
                    </View>
                </View>
                <View style={styles.nameContainer} >
                    <Text style={styles.customerName}>Profile</Text>
                </View>
            </View>
            <View style={styles.arrowWrapper}>
                <Image style={styles.img} source={require('../../../assets/right_arrow.png')} />
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 6,
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    content: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    nameContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 9,
        paddingBottom: 9,
        justifyContent: 'center'
    },
    customerName: {
        fontSize: 16,
        fontWeight: '700',
    },
    imgSet: {
        backgroundColor: '#7a9b76',
        borderRadius: 50,
        padding: 10
    },
    imgContainer: {
        justifyContent: 'center'
    },
    img: {
        width: 24,
        height: 24
    },
    arrowWrapper: {
        justifyContent: 'center',
    },
})

export default WorkerProfile;