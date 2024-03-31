import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../context/auth-context";
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


  const [initialSelectState, setInitialSelectState] = useState({
    selects: {
      customer: [],
      worker: [],
      contact: [],
    },
    selectedOptions: {
      customer: { value: order.customer },
      worker: { value: order.worker },
      contact: { value: order.contact },
    }
  })

  const initialInputState = {
    name: {
      value: order.name
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
  }, [edit])


  let workerOptions;
  let customerOptions;
  let contactOptions;

  if (isLoaded) {
    customerOptions = fetchedSelectData.selects.customer.map(customer => ({
      label: customer.name,
      value: customer.name
    }));
    workerOptions = fetchedSelectData.selects.worker.map(worker => ({
      label: worker.name,
      value: worker.name
    }));
    contactOptions = fetchedSelectData.selects.contact.map(contact => ({
      label: contact.name,
      value: contact.name
    }));
    // console.log("in options", fetchedSelectData.selects);
  }


  const handleSubmit = async () => {

    // console.log('before api', fetchedInputData);
    // console.log('before API', fetchedSelectData.selectedOptions );

    const URL = `http://localhost:8000/api/orders/update/${orderId}`;
    try {
      const response = await axios.patch(URL, {
        firmId: auth.firmId,
        name: fetchedInputData.inputs.name.value,
        worker: fetchedSelectData.selectedOptions.worker.value,
        customer: fetchedSelectData.selectedOptions.customer.value,
        contact: fetchedSelectData.selectedOptions.contact.value,
        description: fetchedInputData.inputs.description.value,
        // status: status,
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
          textArea={true}
          errorText='Geben Sie die Beschreibung des Auftrags ein'
          value={fetchedInputData.inputs.description.value}
          validators={[VALIDATOR_REQUIRE()]}
          multiline={true}
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

  )
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1
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
