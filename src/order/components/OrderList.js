import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Alert
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { getOrders } from "../../actions/orderActions";
import ModalComponent from "../../shared/UIElements/Modal";
import OrderCreate from "../pages/OrderCreate";
import OrderItem from "./OrderItem";

const OrderList = (props) => {
    const dispatch = useDispatch()

    const fetchedActiveOrders = useSelector((state) => state.order.activeOrders);
    const fetchedArchivedOrders = useSelector((state) => state.order.archivedOrders);
    const refresh = useSelector(state => state.util.refresh)
    const showArchivedOrders = useSelector(state => state.order.showArchivedOrders)
    const firmId = useSelector(state => state.context.firmId)

    const [isLoaded, setIsLoaded] = useState(false)
    const [fetchedCustomers, setFetchedCustomers] = useState([])
    const [fetchedWorkers, setFetchedWorkers] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    `http://192.168.178.96:8000/api/orders/${firmId}/all`
                );
                dispatch(getOrders(response.data));
                // console.log('response', response.data);
                setIsLoaded(true)
            } catch (err) {
                console.log("Error if fetching orders", err);
                setIsLoaded(true)

            }
        };
        fetchOrders();
    }, [refresh, refreshing]);

    useEffect(() => {
        const fetcheCustomers = async () => {
            try {
                const response = await axios.get(`http://192.168.178.96:8000/api/customers/${firmId}/all`)
                setFetchedCustomers(response.data.customers)
            } catch (err) {
                console.log('Error while fetching', err);

            }
        }
        fetcheCustomers()
    }, [refresh])

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await axios.get(`http://192.168.178.96:8000/api/workers/${firmId}/all`)
                setFetchedWorkers(response.data.workers)

            } catch (err) {
                console.log('Error while fetching', err);

            }
        }
        fetchWorkers()
    }, [refresh])

    const toggleModal = () => {
        if (fetchedCustomers.length <= 0 || fetchedWorkers.length <= 0) {
            Alert.alert('To create a new order, you need at least one worker and one customer.')
        } else {
            setModalVisible(!isModalVisible)
        }
    }

    const ordersToRender = showArchivedOrders ? fetchedArchivedOrders : fetchedActiveOrders

    // console.log(ordersToRender);
    // console.log(fetchedCustomers.length, fetchedWorkers.length);
    return fetchedActiveOrders.length === 0 ? (
        <>
            <View style={styles.orderContainer}>
                <View style={styles.suggestContainer}>
                    <View style={styles.centeredImageContainer}>
                        <TouchableOpacity onPress={toggleModal}>
                            <Image style={styles.addImg} source={require("../../../assets/firm/add.png")} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <ModalComponent
                isVisible={isModalVisible}
                animationIn="slideInUp" // Specify the slide-up animation
                animationOut="slideOutDown" // Specify the slide-down animation
                onBackdropPress={toggleModal}
                onBackButtonPress={toggleModal}
                modalHeight={'70%'}
                header={<Text style={styles.modalHeadline}>Auftrag hinzufügen</Text>}
            >
                <OrderCreate toggle={toggleModal} />
            </ModalComponent>
        </>
    ) : (
        <>
            <View style={styles.orderList}>
                {!isLoaded ? (
                    <ActivityIndicator style={styles.loader} size="large" color="#7A9B76" />
                ) : (
                    <FlatList
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        showsVerticalScrollIndicator={false}
                        style={styles.scroll}
                        data={ordersToRender}
                        keyExtractor={item => item._id}
                        renderItem={({ item, index }) => (
                            <OrderItem
                                id={item._id}
                                // key={item._id}
                                name={item.name}
                                street={item.street}
                                houseNr={item.houseNr}
                                zip={item.zip}
                                place={item.place}
                                c_name={item.c_name}
                                creator={item.creator}
                                worker={item.worker}
                                date={item.date}
                                status={item.status}
                                contact={item.contact}
                                description={item.description}
                                style={index === 0 ? { marginTop: 24 } : {}}

                            />
                        )}
                    >
                    </FlatList>
                )}

            </View>

        </>
    )
};

const styles = StyleSheet.create({
    scroll: {
        // flex: 1,
    },
    orderList: {
        flex: 1
    },
    loader: {
        flex: 1,
    },
    orderContainer: {
        backgroundColor: '#fff',
        flex: 1,

    },
    header: {
        paddingLeft: 24,
        paddingRight: 24,
        backgroundColor: '#fff',
        marginTop: 50,
        width: '100%',
        paddingTop: 16,
        paddingBottom: 16,
        position: 'fixed',
        top: 0,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 21,
        fontWeight: '400'
    },
    headerIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '20%'
    },
    headerButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerIcon: {
        width: 24,
        height: 24
    },
    content: {
        paddingTop: 24,
        flex: 1,
        backgroundColor: '#fff'
    },
    suggestHeader: {
        paddingLeft: 24,
        paddingRight: 24,
        backgroundColor: '#fff',
        marginTop: 50,
        width: '100%',
        paddingTop: 16,
        paddingBottom: 16,
        position: 'fixed',
        top: 0,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
    },
    textContainer: {
        // borderColor: 'red',
        // borderWidth: 2,
    },
    suggestContainer: {
        flex: 1,
        position: "relative",
    },
    addText: {
        fontSize: 21,
        textAlign: "center",
        // position: "absolute",
        // right: 0,
        // left: 0,
    },
    centeredImageContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",

    },
    addImg: {
        // borderColor: 'red',
        // borderWidth: 2
    },
    modalHeadline: {
        fontSize: 21,
        color: "#7a9b76",
        fontWeight: "700",
    },
});

export default OrderList;
