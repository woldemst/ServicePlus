import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/auth-context";
import { getOrders } from "../../actions/orderActions";
import OrderItem from "./OrderItem";
import ModalComponent from "../../shared/UIElements/Modal";
import OrderCreate from "../pages/OrderCreate";

const OrderList = (props) => {
    const dispatch = useDispatch();
    const auth = useContext(AuthContext);
    const navigation = useNavigation();

    const [isModalVisible, setModalVisible] = useState(false);

    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    const fetchedData = useSelector((state) => state.order.ordersArray);
    const handleRefresh = useCallback(() => setRefresh(!props.refresh), []);


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/orders/${auth.firmId}/all`
                );
                dispatch(getOrders(response.data));
                setLoading(false);
            } catch (err) {
                console.log("Error fetching orders", err);
                setLoading(false);
            }
        };
        fetchOrders();
    }, [refresh]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    if (fetchedData.orders.length === 0) {
        return (
            <>
                <View style={styles.suggestContainer}>
                    <Text style={styles.addText}>Noch kein Auftrag</Text>
                    <View style={styles.centeredImageContainer}>
                        <TouchableOpacity onPress={toggleModal}>
                            <Image
                                style={styles.addImg}
                                source={require("../../../assets/firm/add.png")}
                            />
                        </TouchableOpacity>
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
        );
    }

    return (
        <>
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                {fetchedData.orders.map((order) => (
                    <OrderItem
                        id={order._id}
                        key={order._id}
                        name={order.name}
                        customer={order.customer}
                        address={order.address}
                        creator={order.creator}
                        worker={order.worker}
                        date={order.date}
                        status={order.status}
                        contact={order.contact}
                        description={order.description}
                    />
                ))}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    suggestContainer: {
        flex: 1,
        position: "relative",
        // borderColor: "green",
        // borderWidth: 2,
    },
    addText: {
        fontSize: 21,
        textAlign: "center",
        position: "absolute",
        right: 0,
        left: 0,

    },
    centeredImageContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // borderColor: 'red',
        // borderWidth: 2
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
    scroll: {
        flex: 1,
        // borderWidth: 2,
        // borderColor: 'red',
    },
});

export default OrderList;
