import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    Image,
} from "react-native";
import { useContext, useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import OrderList from '../components/OrderList'
import ModalComponent from "../../shared/UIElements/Modal";
import OrderCreate from "./OrderCreate";
import { AuthContext } from "../../context/auth-context";
import { getOrders } from "../../actions/orderActions";

const OrderView = () => {
    const dispatch = useDispatch()
    const auth = useContext(AuthContext)
    const fetchedData = useSelector((state) => state.order.ordersArray);

    console.log(fetchedData.orders);
    const [isModalVisible, setModalVisible] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const handleRefresh = () => setRefresh(!refresh);
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/orders/${auth.firmId}/all`
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
    }, [refresh]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    }

    return fetchedData.orders.length === 0 ? (
        <>
            <View style={styles.orderContainer}>
                <View style={styles.suggestHeader} >
                    <View style={styles.headerContent} >

                        <View style={styles.textContainer} >
                            <Text style={styles.addText}>Noch kein Auftrag</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.suggestContainer}>
                    <View style={styles.centeredImageContainer}>
                        <TouchableOpacity onPress={toggleModal}>
                            <Image
                                style={styles.addImg}
                                source={require("../../../assets/firm/add.png")}
                            />
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

                header={<Text style={styles.modalHeadline}>Auftrag hinzufügen</Text>}
            >
                <OrderCreate handleRefresh={handleRefresh} toggle={toggleModal} />
            </ModalComponent>
        </>
    ) : (
        <>
            <View style={styles.orderContainer}>
                <View style={styles.header} >
                    <View style={styles.headerContent}>

                        <View style={styles.textContainer} >
                            <Text style={styles.headerText}>Aufträge</Text>
                        </View>

                        <View style={styles.headerIconContainer} >
                            <TouchableOpacity style={styles.headerButton} onPress={toggleModal} >
                                <Image style={styles.headerIcon} source={require('../../../assets/add_new.png')} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.headerButton} >
                                <Image style={styles.headerIcon} source={require('../../../assets/filter.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.content} >
                    <OrderList isLoaded={isLoaded} />
                </View>

                <ModalComponent
                    isVisible={isModalVisible}
                    animationIn="slideInUp" // Specify the slide-up animation
                    animationOut="slideOutDown" // Specify the slide-down animation
                    onBackdropPress={toggleModal}
                    onBackButtonPress={toggleModal}

                    header={<Text style={styles.modalHeadline}>Auftrag hinzufügen</Text>}
                >
                    <OrderCreate handleRefresh={handleRefresh} toggle={toggleModal} />
                </ModalComponent>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
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
        padding: 24,
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
})

export default OrderView;