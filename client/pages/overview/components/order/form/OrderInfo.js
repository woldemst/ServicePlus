import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";

const OrderInfo = (props) => {
  const [fetchedOrderItem, setFetchedOrderItem] = useState([]);

  const orderId = props.orderId
  const fetchOrderItemById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/orders/${orderId}`
      );
      setFetchedOrderItem(response.data);
      console.log(fetchOrderItemById);
    } catch (err) {
      console.log("Error fetching order", err);
    }
  };

  return (
    <>
      {fetchedOrderItem.map((order) => (
        <View key={order._id} style={styles.profileList}>
          <View style={styles.listItem}>
            <Text style={styles.label}>Datum:</Text>
            <View style={styles.wrapper}>
              <Text style={styles.infoText}>{order.name}</Text>
            </View>
          </View>

          <View style={styles.listItem}>
            <Text style={styles.label}>Auftrag:</Text>
            <View style={styles.wrapper}>
              <Text style={styles.infoText}>{order.owner}</Text>
            </View>
          </View>

          <View style={styles.listItem}>
            <Text style={styles.label}>Mitarbeiter:</Text>
            <View style={styles.wrapper}>
              <Text style={styles.infoText}>{order.email}</Text>
            </View>
          </View>

          <View style={styles.listItem}>
            <Text style={styles.label}>Kunde:</Text>
            <View style={styles.wrapper}>
              <Text style={styles.infoText}>
                {order.street}
                {order.houseNr}
                {order.zip}
                {order.place}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  profileList: {
    marginTop: 20,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 28,
    width: "35%",
  },
  wrapper: {
    justifyContent: "flex-start",
    width: "65%",
    // borderColor: 'red',
    // borderWidth: 2
  },
  infoText: {
    fontSize: 18,
    lineHeight: 28,
  },
});

export default OrderInfo;
