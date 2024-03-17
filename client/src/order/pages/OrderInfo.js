import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../context/auth-context";
import axios from "axios";

import { VALIDATOR_REQUIRE, VALIDATOR_SELECT } from "../../util/validators";
import { updateField, clearOrderData } from "../../actions/orderActions";
import { setInitialInputData, setInput } from "../../actions/inputActions";
import { setInitialSelectData, setSelect } from "../../actions/selectActions";
import { useNavigation, useRoute } from "@react-navigation/native";
import Button from "../../shared/UIElements/Button";
import Select from "../../shared/UIElements/Select";
import Input from "../../shared/UIElements/Input";
import SelectDropdown from "../../shared/UIElements/SelectDropdown";

const OrderInfo = (props) => {
  const navigation = useNavigation()
  const auth = useContext(AuthContext)
  const dispatch = useDispatch()
  const route = useRoute()
  const orderId = route.params.id
  const [isLoaded, setIsLoaded] = useState(false)
  const fetchedSelectData = useSelector(state => state.select)
  const fetchedInputData = useSelector(state => state.input)
  const fetchedArray = useSelector((state) => state.order.ordersArray.orders);
  const order = fetchedArray.find(order => order._id == orderId)

  const edit = useSelector(state => state.order.edit)
  console.log(edit);
  const [initialSelectState, setInitialSelectState] = useState({
    selects: {
      worker: [],
      customer: [],
      contact: [],
    },
  })

  const initialInputState = {
    description: {
      value: order.description,
      isValid: false,
    },
  }

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const workerList = await axios.get(`http://localhost:8000/api/orders/worker-options/${auth.firmId}`)
        const customerList = await axios.get(`http://localhost:8000/api/orders/customer-options/${auth.firmId}`)
        const contactList = await axios.get(`http://localhost:8000/api/orders/contact-options/${auth.firmId}`)

        setInitialSelectState(prevState => ({
          ...prevState,
          selects: {
            ...prevState.selects,
            worker: workerList.data.workers,
            customer: customerList.data.customers,
            contact: contactList.data.contacts,
          },
        }))

      } catch (err) {
        console.error('Error fetching options:', err);
      }
    }

    fetchedData()
  }, [])


  useEffect(() => {
    if (initialSelectState.selects.contact.length > 0) {
      setIsLoaded(true)
      dispatch(setInitialInputData(initialInputState));
      dispatch(setInitialSelectData(initialSelectState));
      // console.log(initialSelectState);
    }
  }, [initialSelectState.selects.contact])


  let workerOptions;
  let customerOptions;
  let contactOptions;

  if (isLoaded) {
    workerOptions = fetchedSelectData.selects.worker.map(worker => ({
      label: worker.name,
      value: worker.name
    }));
    customerOptions = fetchedSelectData.selects.customer.map(customer => ({
      label: customer.name,
      value: customer.name
    }));
    contactOptions = fetchedSelectData.selects.contact.map(contact => ({
      label: contact.name,
      value: contact.name
    }));
    // console.log("in options", workerOptions);
  }

  // console.log('initial input data', initialInputState);
  const handleSubmit = async () => {

    console.log('before API',
      auth.firmId,
      fetchedSelectData.selectedOptions.worker.value,
      fetchedSelectData.selectedOptions.customer.value,
      fetchedSelectData.selectedOptions.contact.value,
      fetchedInputData.inputs.description.value,
    );
    const URL = `http://localhost:8000/api/orders/update/${orderId}`;

    try {
      const response = await axios.patch(URL, {
        firmId: auth.firmId,
        // name: fetchedInputData.inputs.name.value,
        worker: fetchedSelectData.selectedOptions.worker.value,
        customer: fetchedSelectData.selectedOptions.customer.value,
        contact: fetchedSelectData.selectedOptions.contact.value,
        description: fetchedInputData.inputs.description.value,
        // status: status,
      });
      alert('Order updated successfuly')
      navigation.goBack()
      // props.handleRefresh();
    } catch (err) {
      alert("An error occurred while editing the order.");
    }
  };


  return isLoaded && (

    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Kunde</Text>
        <SelectDropdown
          id='customer'
          reducerKey='order'
          search={false}
          fieldName='customer'
          data={customerOptions}
          validators={[VALIDATOR_SELECT()]}
          initialSelectedValue={order.customer}
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

        <Text style={styles.label}>Ansprechspartner</Text>

        <SelectDropdown
          id='contact'
          reducerKey='order'
          search={false}
          fieldName='contact'
          data={contactOptions}
          validators={[VALIDATOR_SELECT()]}
          initialSelectedValue={order.contact}
          disable={!edit}
        />

        <Text style={styles.label}>Beschreibung</Text>

        <Input
          id='workerDescr'
          reducerKey='order'
          fieldName='description'
          placeholder="Beschreibung"
          style={[styles.textArea, styles.placeholderText]}
          errorText='Geben Sie die Beschreibung des Auftrags ein'
          value={fetchedInputData.inputs.description.value}
          validators={[VALIDATOR_REQUIRE()]}
          numberOfLines={4}
          disabled={!edit}
        />

        <View style={styles.btnContainer}>
          {/* <Button
          style={[styles.cancelBtn, styles.button]}
          buttonText={styles.cancelBtnText}
          onPress={() => props.toggle()}
          title={'Abbrechen'}
        /> */}
          {edit && (
            <Button
              style={[styles.editButton, styles.button]}
              buttonText={styles.editButtonText}
              onPress={handleSubmit}
              title={'Speichern'}
            />
          )}
        </View>
      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 7,
    borderRadius: 6,
    fontSize: 18,
  },
  select: {
    margin: 15,
    fontSize: 18,
    borderRadius: 6,
  },
  textArea: {
    width: "100%",
    height: 130, // Adjust the height as needed
    borderColor: "#e0e0e0",
    borderWidth: 1,
    marginBottom: 30,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 7,
    paddingRight: 7,
    fontSize: 18,
    borderRadius: 6,
  },
  placeholderText: {
    color: "gray",
    fontSize: 18, // Set the font size of the placeholder text
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
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
});


export default OrderInfo;
