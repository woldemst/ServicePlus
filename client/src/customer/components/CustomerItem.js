import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native"
import { useContext, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { AuthContext } from "../../context/auth-context"
import { useDispatch } from "react-redux"
import { deleteCustomer } from "../../actions/customerActions"
import { SwipeListView } from "react-native-swipe-list-view";
import axios from "axios"

const CustomerItem = (props) => {
    const customerId = props.id
    const auth = useContext(AuthContext)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [isSelected, setIsSelected] = useState(false)

    const longPressHandler = () => {
        setIsSelected(!isSelected)
    }


    // console.log(auth);
    const deleteHandler = async () => {
        Alert.alert(
            'Delete Confirmation',
            'Are you sure you want to delete this customer?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await axios.delete(`http://localhost:8000/api/customers/${auth.firmId}/delete/${customerId}`);
                            dispatch(deleteCustomer(customerId))

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
            <TouchableOpacity onPress={() => { navigation.navigate('customerDetails', { id: props.id }) }}
                style={styles.container}
            // onLongPress={longPressHandler}
            >
                <View style={styles.content}>
                    {/* <View style={styles.circleWrapper}>
                        <Image style={styles.img} source={require('../../../assets/circle.png')} />
                    </View> */}

                    <View style={styles.imageContainer} >
                        <View style={styles.imgSet}>
                            <Image style={styles.img} source={require('../../../assets/customer/customer.png')} />
                        </View>
                    </View>
                    <View style={styles.nameContainer} >
                        <View key={props._id}>
                            <Text style={styles.customerName}>{props.name}</Text>
                            <Text style={styles.bossName}>{props.customerNr}</Text>
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
            // disableLeftSwipe={!isEdit}
            closeOnRowOpen={true}
            data={[
                {
                    id: props.id,
                    name: props.name,
                    c_name: props.o_name,
                    o_street: props.o_street,
                    o_houseNr: props.o_houseNr,
                    o_zip: props.o_zip,
                    o_place: props.o_place,
                },
            ]}
            renderHiddenItem={(data, rowMap) => (
                <View style={styles.rowBack}>
                    <TouchableOpacity onPress={deleteHandler} style={styles.hiddenItrem}>
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
        padding: 10
    },
    textContainer: {

    },
    customerList: {
        paddingTop: 32,
        paddingBottom: 32,
        paddingLeft: 16,
        paddingRight: 16
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginBottom: 12, 
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
    customerName: {
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
    hiddenItrem: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 20,
        height: '100%',
    }
})

export default CustomerItem;
