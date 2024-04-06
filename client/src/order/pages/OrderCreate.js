import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { AuthContext } from "../../context/auth-context";
import { VALIDATOR_REQUIRE, VALIDATOR_SELECT } from "../../util/validators";
import { updateField, clearOrderData } from "../../actions/orderActions";
import { setInitialInputData, setInput } from "../../actions/inputActions";
import { setInitialSelectData, setSelect } from "../../actions/selectActions";
import Input from "../../shared/UIElements/Input";
import Button from "../../shared/UIElements/Button";
import Select from "../../shared/UIElements/Select";
import { refershData } from "../../actions/utilActions";
import SelectDropdown from "../../shared/UIElements/SelectDropdown";

const OrderCreate = (props) => {
  const auth = useContext(AuthContext)
  const dispatch = useDispatch()

  const [isLoaded, setIsLoaded] = useState(false)

  const fetchedSelectData = useSelector(state => state.select)
  const fetchedInputData = useSelector(state => state.input)

  const [initialSelectState, setInitialSelectState] = useState({
    selects: {
      worker: [],
      contact: [],
      customer: []
    },
  })

  const initialInputState = {
    name: {
      value: "",
      isValid: false,
    },
    description: {
      value: "",
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
    customerOptions = fetchedSelectData.selects.customer.map(customer => ({
      id: customer.id,
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
    // console.log("in options", customerOptions);
  }

  const handleSubmit = async () => {
    const URL = `http://localhost:8000/api/orders/${auth.firmId}/new`;

    // console.log('before api', fetchedSelectData.selectedOptions.customer.id);
    try {
      const response = await axios.post(URL, {
        firmId: auth.firmId,
        name: fetchedInputData.inputs.name.value,
        worker: fetchedSelectData.selectedOptions.worker.value,
        customerId: fetchedSelectData.selectedOptions.customer.id,
        // contact: fetchedSelectData.selectedOptions.contact.value,
        description: fetchedInputData.inputs.description.value,
        // status: status,
      });

      props.toggle();
      dispatch(refershData())
      alert("Order created successfully!");
    } catch (err) {
      alert("An error occurred while creating the order.");
    }
  };

  return isLoaded ? (
    <View>
      <Text style={styles.label}>Auftragsname</Text>
      <Input
        id='orderName'
        reducerKey='order'
        fieldName='name'
        placeholder="Name des Mitarabeiters"
        errorText='Geben Sie einen Namen für den Auftrag ein'
        value={fetchedInputData.inputs.name.value}
        validators={[VALIDATOR_REQUIRE()]}
      />

      <Text style={styles.label}>Kunde</Text>

      <SelectDropdown
        id='customer'
        reducerKey='order'
        search={false}
        fieldName='customer'
        data={customerOptions}
        validators={[VALIDATOR_SELECT()]}
        placeholder='Auswählen'

      />


      <Text style={styles.label}>Mitarbeiter</Text>


      <SelectDropdown
        id='worker'
        reducerKey='order'
        search={false}
        fieldName='worker'
        data={workerOptions}
        validators={[VALIDATOR_SELECT()]}
        placeholder='Auswählen'
      />
{/* 
      <Text style={styles.label}>Ansprechspartner</Text>


      <SelectDropdown
        id='contact'
        reducerKey='order'
        search={false}
        fieldName='contact'
        data={contactOptions}
        validators={[VALIDATOR_SELECT()]}
        placeholder='Auswählen'

      /> */}

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
        multiline={true}
        numberOfLines={4}

      />

      <View style={styles.btnContainer}>
        <Button
          style={[styles.cancelBtn, styles.button]}
          buttonText={styles.cancelBtnText}
          onPress={() => props.toggle()}
          title={'Abbrechen'}
        />

        <Button
          style={[styles.createBtn, styles.button]}
          // style={fetchedData.isFormValid ? [styles.createBtn, styles.button] : styles.invalideButton}
          // disabled={!fetchedData.isFormValid}
          buttonText={styles.createBtnText}
          onPress={handleSubmit}
          title={'Anlegen'}
        />
      </View>
    </View>
  ) : (
    <ActivityIndicator style={styles.loader} size="large" color="#7A9B76" />
  )
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    // borderColor: '#e0e0e0',
    // marginTop: 6,
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
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    width: '40%',
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
  createBtn: {
    backgroundColor: "#7A9B76",
  },
  createBtnText: {
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

export default OrderCreate;

