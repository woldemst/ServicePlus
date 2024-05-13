import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, RefreshControl } from "react-native"
import { useContext, useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import axios from "axios"

import { getCustomerData } from "../../actions/customerActions"
import { AuthContext } from "../../context/auth-context"
import CustomerItem from "./CustomerItem"
import CreateCustomer from "../pages/CreateCustomer"
import ModalComponent from "../../shared/UIElements/Modal"

const CustomerList = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const auth = useContext(AuthContext)

    const refresh = useSelector(state => state.util.refresh)
    const fetchedData = useSelector(state => state.customer.customersArray)

    const [isLoaded, setisLoaded] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    }

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/customers/${auth.firmId}/all`)
                dispatch(getCustomerData(response.data))
                setisLoaded(true)
            } catch (err) {
                console.log('Error while fetching customers', err);
                setisLoaded(true)
            }
        }
        fetchCustomers()
    }, [refresh, refreshing])




    return fetchedData.customers.length === 0 ? (
        <>
            <View style={styles.suggestContainer}>
                <Text style={styles.addText}>Noch kein Kunde</Text>

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
                header={<Text style={styles.modalHeadline}>Kunde hinzufügen</Text>}
                modalHeight={'70%'}
            >
                <CreateCustomer toggle={toggleModal} />
            </ModalComponent>
        </>
    ) : (
        <>
            <View style={styles.container}>
                <View style={styles.header} >
                    <View style={styles.headerContent}>
                        <View style={styles.textContainer} >
                            <Text style={styles.headerText}>Kunden</Text>
                        </View>

                        <View style={styles.headerIconContainer} >
                            <TouchableOpacity style={styles.headerButton} onPress={toggleModal}>
                                <Image style={styles.headerIcon} source={require('../../../assets/customer/user_plus.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.customerList}>
                    {!isLoaded ? (
                        <ActivityIndicator style={styles.loader} size="large" color="#7A9B76" />
                    ) : (
                        <FlatList
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                            showsVerticalScrollIndicator={false}
                            style={styles.scroll}
                            data={fetchedData.customers}
                            keyExtractor={item => item._id}
                            renderItem={({ item }) => (
                                <CustomerItem
                                    id={item._id}
                                    // key={item._id}
                                    name={item.name}
                                    customerNr={item._id}
                                    email={item.email}
                                    worker={item.worker}
                                    phone={item.phone}
                                    // nextAppointment
                                    description={item.description}
                                    website={item.website}
                                    street={item.street}
                                    houseNr={item.houseNr}
                                    zip={item.zip}
                                    place={item.place}
                                />
                            )}
                        />
                    )}
                </View>
            </View>

            <ModalComponent
                isVisible={isModalVisible}
                animationIn="slideInUp" // Specify the slide-up animation
                animationOut="slideOutDown" // Specify the slide-down animation
                onBackdropPress={toggleModal}
                onBackButtonPress={toggleModal}
                header={<Text style={styles.modalHeadline}>Kunde hinzufügen</Text>}
                modalHeight={'70%'}
            >
                <CreateCustomer toggle={toggleModal} />
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
    customerList: {
        // borderWidth: 1,
        // borderColor: 'red',

        flex: 1,
        // paddingTop: 32,
        // paddingBottom: 32,
        // paddingLeft: 24,
        // paddingRight: 24
    },
    customerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

        // borderColor: 'red',
        // borderWidth: 2
    },
    customerContent: {
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
    loader: {
        flex: 1,
    },
    // if no customer yet 
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


export default CustomerList;