
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
import { setInitialSelectData, setSelect } from "../../actions/selectActions";
import { setInitialInputData, setInput } from "../../actions/inputActions";
import { toggleToFalseEditOrder } from "../../actions/orderActions";
import { refershData } from "../../actions/utilActions";
import SelectDropdown from "../../shared/UIElements/SelectDropdown";
import Button from "../../shared/UIElements/Button";
import Input from "../../shared/UIElements/Input";

const OrderInfo = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeStatus, setActiveStatus] = useState(1);

  const navigation = useNavigation()
  const auth = useContext(AuthContext)
  const dispatch = useDispatch()
  const route = useRoute()

  const fetchedSelectData = useSelector(state => state.select)
  const fetchedInputData = useSelector(state => state.input)
  const fetchedArray = useSelector((state) => state.order.ordersArray.orders);

  const orderId = route.params.id
  const order = fetchedArray.find(order => order._id == orderId)
  const edit = useSelector(state => state.order.edit);




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

  const [initialSelectState, setInitialSelectState] = useState({
    selects: {
      customer: [],
      worker: [],
      contact: [],
    },
    selectedOptions: {
      customer: { value: order.c_name },
      worker: { value: order.worker },
      contact: { value: order.contact },
    }
  })

  const initialInputState = {
    name: {
      value: order.name
    },
    street: {
      value: order.street
    },
    houseNr: {
      value: order.houseNr
    },
    zip: {
      value: order.zip
    },
    place: {
      value: order.place
    },
    description: {
      value: order.description
    },
  }


  useEffect(() => {
    const fetchedData = async () => {
      try {
        const customerList = await axios.get(`http://localhost:8000/api/orders/customer-options/${auth.firmId}`)
        const workerList = await axios.get(`http://localhost:8000/api/orders/worker-options/${auth.firmId}`)
        const contactList = await axios.get(`http://localhost:8000/api/orders/contact-options/${auth.firmId}`)

        setInitialSelectState(prevState => ({
          ...prevState,
          selects: {
            ...prevState.selects,
            customer: customerList.data.customers,
            worker: workerList.data.workers,
            contact: contactList.data.contacts,
          },
        }))

        // console.log(customerList.data.customers);
      } catch (err) {
        console.error('Error fetching options:', err);
      }
    }
    fetchedData()

  }, [edit])


  useEffect(() => {
    dispatch(setInitialInputData(initialInputState));
    dispatch(setInitialSelectData(initialSelectState));
    setIsLoaded(true)

    setActiveStatus(route.params.status)


  }, [edit])

  useEffect(() => {
    if (activeStatus !== route.params.status) {
      navigation.setParams({ status: activeStatus });
    }
  }, [activeStatus])


  // Other variables
  const customerOptions = isLoaded
    ? fetchedSelectData.selects.customer.map((customer) => ({
      label: customer.name,
      value: customer.name,
    }))
    : [];
  const workerOptions = isLoaded
    ? fetchedSelectData.selects.worker.map((worker) => ({
      label: worker.name,
      value: worker.name,
    }))
    : [];
  const contactOptions = isLoaded
    ? fetchedSelectData.selects.contact.map((contact) => ({
      label: contact.name,
      value: contact.name,
    }))
    : [];


  const handleSubmit = async () => {
    const URL = `http://localhost:8000/api/orders/update/${orderId}`;
    try {
      const response = await axios.patch(URL, {
        firmId: auth.firmId,
        name: fetchedInputData.inputs.name.value,
        worker: fetchedSelectData.selectedOptions.worker.value,
        customer: fetchedSelectData.selectedOptions.customer.value,
        // contact: fetchedSelectData.selectedOptions.contact.value,
        street: fetchedInputData.inputs.street.value,
        houseNr: fetchedInputData.inputs.houseNr.value,
        zip: fetchedInputData.inputs.zip.value,
        place: fetchedInputData.inputs.place.value,
        description: fetchedInputData.inputs.description.value,
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
        <SelectDropdown
          id='customer'
          reducerKey='order'
          search={false}
          fieldName='customer'
          data={customerOptions}
          validators={[VALIDATOR_SELECT()]}
          initialSelectedValue={order.c_name}
          disable={!edit}
        />

        <Text style={styles.label}>Mitarbeiter</Text>

        <SelectDropdown
          id='worker'
          reducerKey='order'
          search={false}
          fieldName='worker'
          data={workerOptions}
          validators={[VALIDATOR_SELECT()]}
          initialSelectedValue={order.worker}
          disable={!edit}
        />

        <Text style={styles.label}>Auftragsadresse</Text>

        <View style={styles.rowContainer}>
          <View style={styles.streetWrapper}>
            <Input
              id='orderStreet'
              reducerKey='order'
              fieldName='street'
              placeholder="Straße"
              errorText='Geben Sie eine Straße für den Auftrag ein'
              value={fetchedInputData.inputs.street.value}
              validators={[VALIDATOR_REQUIRE()]}
              disabled={!edit}

            />
          </View>
          <View style={styles.nrWrapper}>
            <Input
              id='orderHouseNr'
              reducerKey='order'
              fieldName='houseNr'
              placeholder="Nr."
              errorText='Housenummer'
              value={fetchedInputData.inputs.houseNr.value}
              validators={[VALIDATOR_REQUIRE()]}
              disabled={!edit}

            />
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.zipWrapper}>
            <Input
              id='orderZip'
              reducerKey='order'
              fieldName='zip'
              placeholder="PLZ"
              errorText='Geben Sie eine PLZ für den Auftrag ein'
              value={fetchedInputData.inputs.zip.value}
              validators={[VALIDATOR_REQUIRE()]}
              disabled={!edit}

            />
          </View>
          <View style={styles.placeWrapper}>
            <Input
              id='orderPlace'
              reducerKey='order'
              fieldName='place'
              placeholder="Ort"
              errorText='Geben Sie den Ort für den Auftrag ein'
              value={fetchedInputData.inputs.place.value}
              validators={[VALIDATOR_REQUIRE()]}
              disabled={!edit}

            />
          </View>
        </View>

        <Text style={styles.label}>Beschreibung</Text>

        <Input
          id='workerDescr'
          reducerKey='order'
          fieldName='description'
          placeholder="Beschreibung"
          textArea={true}
          errorText='Geben Sie die Beschreibung des Auftrags ein'
          value={fetchedInputData.inputs.description.value}
          validators={[VALIDATOR_REQUIRE()]}
          multiline={true}
          numberOfLines={4}
          disabled={!edit}
        />

        <View style={[styles.statusContainer]}>
          <TouchableOpacity
            style={[
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
