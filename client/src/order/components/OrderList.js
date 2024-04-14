import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    FlatList
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
    // console.log(fetchedData.orders);
    return (
        <View style={styles.orderList}>
            {!isLoaded ? (
                <ActivityIndicator style={styles.loader} size="large" color="#7A9B76" />
            ) : (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={styles.scroll}
                    data={fetchedData.orders}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => (
                        <OrderItem
                            id={item._id}
                            key={item._id}
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
                        />
                    )}
                >
                </FlatList>
            )}

        </View>
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
});

export default OrderList;
