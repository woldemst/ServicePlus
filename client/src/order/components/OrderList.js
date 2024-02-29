import {
    View,
    StyleSheet,
    Image,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "./OrderItem";

const OrderList = (props) => {
    const fetchedData = useSelector((state) => state.order.ordersArray);
    // console.log(fetchedData);

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
    scroll: {
        flex: 1,
    },
});

export default OrderList;
