import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth-context";
import axios from "axios";

const OrderList = (props) => {
    const isLoaded = props.isLoaded

    const fetchedData = useSelector((state) => state.order.ordersArray);
    // console.log(isLoaded);
    console.log(fetchedData.orders);
    return (
        <View style={styles.orderList}>
            {!isLoaded ? (
                <ActivityIndicator style={styles.loader} size="large" color="#7A9B76" />
            ) : (
                <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                    {fetchedData.orders.map((order) => (
                        <OrderItem
                            id={order._id}
                            key={order._id}
                            name={order.name}
                            c_street={order.c_street}
                            c_houseNr={order.c_houseNr}
                            c_zip={order.c_zip}
                            c_place={order.c_place}
                            c_name={order.c_name}
                            creator={order.creator}
                            worker={order.worker}
                            date={order.date}
                            status={order.status}
                            contact={order.contact}
                            description={order.description}
                        />
                    ))}
                </ScrollView>
            )}

        </View>
    )
};

const styles = StyleSheet.create({
    scroll: {
        // flex: 1,
    },
    orderList: {
        // paddingTop: 32,
        // paddingBottom: 32,
        // paddingLeft: 16,
        // paddingRight: 16
    },
    loader: {
        flex: 1,
    },
});

export default OrderList;
