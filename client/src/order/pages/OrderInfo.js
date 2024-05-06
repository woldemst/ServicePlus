import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../context/auth-context";
import { Alert } from "react-native";
import axios from "axios";

import { VALIDATOR_REQUIRE, VALIDATOR_SELECT } from "../../util/validators";
import { toggleToFalseEditOrder } from "../../actions/orderActions";
import { refershData } from "../../actions/utilActions";
import Button from "../../shared/UIElements/Button";
import Input from "../../shared/UIElements/Input";
import Select from "../../shared/UIElements/Select";

const OrderInfo = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeStatus, setActiveStatus] = useState(1);

  const navigation = useNavigation()
  const auth = useContext(AuthContext)
  const dispatch = useDispatch()
  const route = useRoute()

  const orderId = route.params.id
  const fetchedArray = useSelector((state) => state.order.ordersArray.orders);
  const order = fetchedArray.find(order => order._id == orderId)
  const edit = useSelector(state => state.order.edit);

  const [formData, setFormData] = useState({
    street: order.street,
    houseNr: order.houseNr,
    zip: order.zip,
    place: order.place,
    description: order.description,

    // contactOption: {value: order.contact},
    customerOptions: [],
    workerOptions: [],

    selectedCustomer: order.customerId,
    selectedWorker: order.workerId,

  })

  // console.log(formData.name);
  const handleChange = async newStatus => {

    Alert.alert(
      'Changing Confirmation',
      'Are you sure you want to change the information of this order?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: "Change",
          onPress: handleSubmit
        }
      ],
      { cancelable: false }
    )

  };


  useEffect(() => {
    const fetchedData = async () => {
      try {
        const [
          customerResponse,
          workerResponse,
          // contactResponse
        ] = await Promise.all([
          axios.get(`http://localhost:8000/api/orders/customer-options/${auth.firmId}`),
          axios.get(`http://localhost:8000/api/orders/worker-options/${auth.firmId}`),
          // axios.get(`http://localhost:8000/api/orders/contact-options/${auth.firmId}`),
        ])

        setFormData((prevFormData) => ({
          ...prevFormData,
          customerOptions: customerResponse.data.customers.map((customer) => ({
            label: customer.name,
            value: customer.id,
          })),
          workerOptions: workerResponse.data.workers.map((worker) => ({
            label: worker.name,
            value: worker.id,
          })),
          // contactOptions: contactResponse.data.contacts.map((contact) => ({
          //   key: contact.id,
          //   value: contact.name,
          // })),
        }));
        setIsLoaded(true)

      } catch (err) {
        console.error('Error fetching options:', err);
      }
    }
    fetchedData()

  }, [edit])


  useEffect(() => {
    setActiveStatus(route.params.status)
  }, [edit])

  useEffect(() => {
    if (activeStatus !== route.params.status) {
      navigation.setParams({ status: activeStatus });
    }
  }, [activeStatus])


  const handleSubmit = async () => {
    const URL = `http://localhost:8000/api/orders/update/${orderId}`;
    try {
      const response = await axios.patch(URL, {
        firmId: auth.firmId,
        name: order.name,
        customerId: formData.selectedCustomer,
        workerId: formData.selectedWorker,
        // contact: formData.contact,
        street: formData.street,
        houseNr: formData.houseNr,
        zip: formData.zip,
        place: formData.place,
        description: formData.description,
        status: activeStatus,
      });
      dispatch(refershData())
      dispatch(toggleToFalseEditOrder())
      alert('Order updated successfuly')
      // navigation.goBack()
    } catch (err) {
      alert("An error occurred while editing the order.");
    }
  };


  return isLoaded && (

    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} >
        <Text style={styles.label}>Kunde</Text>

        <Select
          search={false}
          data={formData.customerOptions}
          validators={[VALIDATOR_SELECT()]}
          initialSelectedValue={order.c_name}
          onValueChange={(option) => setFormData({ ...formData, selectedCustomer: option })}
          disable={!edit}
        />

        <Text style={styles.label}>Mitarbeiter</Text>

        <Select
          search={false}
          data={formData.workerOptions}
          validators={[VALIDATOR_SELECT()]}
          initialSelectedValue={order.w_name}
          onValueChange={(option) => setFormData({ ...formData, selectedWorker: option })}
          disable={!edit}
        />

        <Text style={styles.label}>Auftragsadresse</Text>

        <View style={styles.rowContainer}>
          <View style={styles.streetWrapper}>
            <Input
              disabled={!edit}
              placeholder="Straße"
              value={formData.street}
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Geben Sie eine Straße für den Auftrag ein'
              onChangeText={(text) => setFormData({ ...formData, street: text })}

            />
          </View>
          <View style={styles.nrWrapper}>
            <Input
              placeholder="Nr."
              disabled={!edit}
              errorText='Housenummer'
              value={formData.houseNr}
              validators={[VALIDATOR_REQUIRE()]}
              onChangeText={(text) => setFormData({ ...formData, houseNr: text })}

            />
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.zipWrapper}>
            <Input
              disabled={!edit}
              placeholder="PLZ"
              value={formData.zip}
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Geben Sie eine PLZ für den Auftrag ein'
              onChangeText={(text) => setFormData({ ...formData, zip: text })}
            />
          </View>
          <View style={styles.placeWrapper}>
            <Input
              disabled={!edit}
              placeholder="Ort"
              value={formData.place}
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Geben Sie den Ort für den Auftrag ein'
              onChangeText={(text) => setFormData({ ...formData, place: text })}

            />
          </View>
        </View>

        <Text style={styles.label}>Beschreibung</Text>

        <Input
          textArea={true}
          disabled={!edit}
          multiline={true}
          numberOfLines={4}
          placeholder="Beschreibung"
          value={formData.description}
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Geben Sie die Beschreibung des Auftrags ein'
          onChangeText={(text) => setFormData({ ...formData, description: text })}
        />

        <View style={[styles.statusContainer]}>
          <TouchableOpacity
            style={[
              {
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4
              },
              styles.statusButton,
              edit ? [activeStatus == 2 ? styles.inProgress : styles.disabledButton] : [activeStatus == 2 ? styles.currentOfflineStatus : styles.disabledButton],
            ]}
            onPress={() => setActiveStatus(2)}
            disabled={!edit}
          >
            <Text style={styles.statusButtonText}>In Progress</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.statusButton,
              edit ? [activeStatus == 3 ? styles.completed : styles.disabledButton] : [activeStatus == 3 ? styles.currentOfflineStatus : styles.disabledButton],
            ]}
            onPress={() => setActiveStatus(3)}
            disabled={!edit}
          >
            <Text style={styles.statusButtonText}>Completed</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              {
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4
              },
              styles.statusButton,
              edit ? [activeStatus == 4 ? styles.canceled : styles.disabledButton] : [activeStatus == 4 ? styles.currentOfflineStatus : styles.disabledButton],
            ]}
            onPress={() => setActiveStatus(4)}
            disabled={!edit}>
            <Text style={styles.statusButtonText}>Canceled</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.btnContainer}>
          {edit && (
            <Button
              style={[styles.editButton, styles.button]}
              buttonText={styles.editButtonText}
              onPress={handleChange}
              title={'Speichern'}
            />
          )}
        </View>
      </ScrollView>
    </View>

  )
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1
  },
  label: {
    marginTop: 18,
    fontSize: 18,
  },

  btnContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    // height: 53,    
    padding: 16,
    width: '100%',
    borderRadius: 5,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelBtn: {
    borderColor: "#7A9B76",
    borderWidth: 2,
  },
  cancelBtnText: {
    fontSize: 18,
    color: "#7A9B76",
    fontWeight: "700",
  },
  editButton: {
    backgroundColor: "#7A9B76",
  },
  editButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
  invalideButton: {
    height: 53,
    width: '40%',
    backgroundColor: 'gray',
    borderRadius: 5,
    justifyContent: 'center',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center'
  },
  loader: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  streetWrapper: {
    width: '75%'
  },
  nrWrapper: {
    width: '22%'
  },
  zipWrapper: {
    width: '37%'
  },
  placeWrapper: {
    width: '60%'
  },

  // status 
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
    // borderWidth: 2,
    // borderColor: 'red'
  },
  statusButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  statusButtonText: {
    fontWeight: 'bold',
    color: 'white',
    borderColor: 'red'

  },
  disabledButton: {
    backgroundColor: 'grey',
    color: 'white',
    opacity: 0.7,
    borderColor: '#222',
    borderWidth: 1

  },
  notStarted: {
    backgroundColor: '#eee',
    color: 'white',
    borderWidth: 1,
  },
  inProgress: {
    backgroundColor: '#1769FF',
    color: 'white',
    borderColor: '#1769FF',
    borderWidth: 1,
  },
  completed: {
    backgroundColor: '#7A9B76',
    color: 'white',
    borderWidth: 2,
    borderColor: '#7A9B76',
    borderRightWidth: 0,
    borderLeftWidth: 0
  },
  canceled: {
    backgroundColor: '#DB504A',
    color: 'white',
    borderWidth: 1,
    borderColor: '#DB504A',
  },
  currentOfflineStatus: {
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: '#222',
    opacity: 0.7,
  },
});


export default OrderInfo;
