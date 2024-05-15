import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Alert,
  TextInput
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native"
import { SwipeListView } from "react-native-swipe-list-view";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { deleteOrder } from "../../actions/orderActions";
import { deleteAppointmentsByOrder } from "../../actions/appointmentActions";

const OrderItem = (props) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const orderId = props.id
  const orders = useSelector(state => state.order.ordersArray.orders)
  const orderItem = orders.find(order => order._id == orderId)

  const [isModalVisible, setModalVisible] = useState(false);
  // const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  // const [isEdit, setIsEdit] = useState(false)

  const deleteHandler = async () => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this order and its appointments?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await axios.delete(`http://localhost:8000/api/orders/${orderId}/delete`);
              dispatch(deleteOrder(orderId));
              dispatch(deleteAppointmentsByOrder(orderId))
            } catch (err) {
              console.log("Error while deleting order:", err);
            }
          },
        },
      ],
      { cancelable: false }
    )
  };

  // const longPressHandler = (event) => {
  //   const { pageX, pageY } = event.nativeEvent;
  //   setModalPosition({ x: pageX, y: pageY });
  //   setModalVisible(true)
  // }


  const onPressHandler = () => {
    navigation.navigate('orderMain', {
      id: orderId,
      name: props.name,
      description: props.description,
      worker: props.worker,
      customer: props.customer,
      contact: props.contact,
      status: props.status
    })
  }
  // const toggleModal = () => setModalVisible(!isModalVisible)

  const renderItem = () => (
    <View style={[styles.rowFront, props.style]}>
      <TouchableOpacity style={styles.container} onPress={onPressHandler} >
        <View style={[
          styles.indicator,
          orderItem.status == 1 ? styles.notStarted : null,
          orderItem.status == 2 ? styles.inProgress : null,
          orderItem.status == 3 ? styles.completed : null,
          orderItem.status == 4 ? styles.canceled : null,
        ]}></View>

        <View style={styles.mainContent}>
          <View style={styles.nameContainer}>
            <Text style={styles.order}>{props.name}</Text>
          </View>

          <View style={styles.adressContainer}>
            <Text style={styles.adressItem}>{props.street}</Text>
            <Text style={styles.adressItem}>{props.houseNr}</Text>
            <Text style={styles.adressItem}>{props.zip}</Text>
            <Text style={styles.adressItem}>{props.place}</Text>
          </View>

          <Text style={styles.customerName}>{props.c_name}</Text>
        </View>

        {/* <View style={styles.iconContainer}>
              <Image style={styles.filePlusImg} source={require('../../../assets/file_plus.png')} />
          </View> */}
      </TouchableOpacity>
    </View>
  )

  return <>
    <SwipeListView
      renderItem={renderItem}
      rightOpenValue={-75}
      // leftOpenValue={75}
      disableRightSwipe={true}
      closeOnRowOpen={true}
      data={[props]}
      renderHiddenItem={(data, rowMap) => (
        <View style={[styles.rowBack, props.style]}>
          <TouchableOpacity style={styles.hiddenItrem} onPress={deleteHandler}>
            <Image style={styles.deleteImage} source={require('../../../assets/buttons/delete.png')} />
          </TouchableOpacity>
        </View>
      )}
    />
  </>
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    position: 'relative'
  },
  indicator: {
    width: "3%",
    backgroundColor: "#7A9B76",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  mainContent: {
    flex: 1,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 16,
    textAlign: "left",
  },
  modalHeadline: {
    fontSize: 21,
    color: '#7a9b76',
    fontWeight: '700'
  },
  iconContainer: {
    // width: '8%',
    paddingRight: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  adressContainer: {
    flexDirection: "row",
  },
  adressItem: {
    marginRight: 5
  },
  date: {
    fontSize: 14,
    color: "#171717",
    fontWeight: "700",
  },
  customerName: {
    fontSize: 14,
    marginTop: 6,
  },
  order: {
    fontSize: 14,
    fontWeight: '600',
    // marginTop: 7
  },

  filePlusImg: {
    // borderColor: 'red',
    // borderWidth: 2
    // width: 24,
    // height: 24,
  },

  // swipeable styles
  rowFront: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginRight: 24,
    marginLeft: 24,
    marginTop: 16,

    borderWidth: 1,
    borderColor: '#757575',
    borderRadius: 10,
  },
  rowBack: {
    backgroundColor: '#C70000',
    borderWidth: 1,
    borderColor: '#C70000',
    borderRadius: 10,
    marginRight: 24,
    marginLeft: 24,
    marginTop: 16,



  },
  deleteImage: {
    width: 30,
    height: 30
  },
  // status indicator 
  notStarted: {
    backgroundColor: '#808080',
  },
  inProgress: {
    backgroundColor: '#1769FF',
  },
  completed: {
    backgroundColor: '#7A9B76',
  },
  canceled: {
    backgroundColor: '#DB504A',
  },
  modal: {
    margin: 0,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',

  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a semi-transparent background
  },
  hiddenItrem: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
    height: '100%',
  }
});

export default OrderItem;