import {
  View,
  Text,
  StyleSheet,
} from "react-native";

const OrderInfo = (props) => {
  return (
    <>
        <View style={styles.profileList}>
            <View style={styles.listItem}>
                <Text style={styles.label}>Auftrag:</Text>
                <View style={styles.wrapper}>
                    <Text style={styles.infoText}>{props.name}</Text>
                </View>
            </View>
    
            <View style={styles.listItem}>
                <Text style={styles.label}>Mitarbeiter:</Text>
                <View style={styles.wrapper}>
                    <Text style={styles.infoText}>{props.worker}</Text>
                </View>
            </View>
            <View style={styles.listItem}>
                <Text style={styles.label}>Kunde:</Text>
                <View style={styles.wrapper}>
                    <Text style={styles.infoText}>{props.customer}</Text>
                </View>
            </View>
    
            <View style={styles.listItem}>
                <Text style={styles.label}>Adresse:</Text>
                <View style={styles.wrapper}>
                    <Text style={styles.infoText}>{props.address}</Text>
                </View>
            </View>
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  profileList: {
    // marginTop: 20,
  },
  listItem: {
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
  label: {
    // fontSize: 18,
    // fontWeight: "700",
    // lineHeight: 28,
    // width: "35%",
  },
  wrapper: {
    // justifyContent: "flex-start",
    // width: "65%",
    // borderColor: 'red',
    // borderWidth: 2
  },
  infoText: {
    // fontSize: 18,
    // lineHeight: 28,
  },
});

export default OrderInfo;

