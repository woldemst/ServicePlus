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

import { VALIDATOR_REQUIRE, VALIDATOR_SELECT } from "../../util/validators";
import { AuthContext } from "../../context/auth-context";
import { refershData } from "../../actions/utilActions";
import Input from "../../shared/UIElements/Input";
import Button from "../../shared/UIElements/Button";
import Select from "../../shared/UIElements/Select";

const OrderCreate = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    houseNr: '',
    zip: '',
    place: '',
    customerOptions: [],
    workerOptions: [],
    contactOptions: [],
    selectedCustomer: "",
    selectedWorker: "",
    selectedContact: "",
    description: '',
  })

  const auth = useContext(AuthContext)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const [
          workerResponse,
          customerResponse,
          // contactResponse
        ] = await Promise.all([
          axios.get(`http://localhost:8000/api/orders/worker-options/${auth.firmId}`),
          axios.get(`http://localhost:8000/api/orders/customer-options/${auth.firmId}`),
          // axios.get(`http://localhost:8000/api/orders/contact-options/${auth.firmId}`),
        ])

        setFormData((prevFormData) => ({
          ...prevFormData,
          workerOptions: workerResponse.data.workers.map((worker) => ({
            id: worker.id,
            key: worker.id,
            value: worker.name,
          })),
          customerOptions: customerResponse.data.customers.map((customer) => ({
            id: customer.id,
            key: customer.id,
            value: customer.name,
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
  }, [])


  const handleSubmit = async () => {
    const URL = `http://localhost:8000/api/orders/${auth.firmId}/new`;

    // console.log('before api selected customer', formData.selectedCustomer);
    try {
      const response = await axios.post(URL, {
        firmId: auth.firmId,
        name: formData.name,
        worker: formData.selectedWorker,
        customerId: formData.selectedCustomer,
        // contact: formData.selectedContact,
        street: formData.street,
        houseNr: formData.houseNr,
        zip: formData.zip,
        place: formData.place,
        description: formData.description,
      });

      props.toggle();
      dispatch(refershData())
      alert("Order created successfully!");
    } catch (err) {
      alert("An error occurred while creating the order.");
    }
  };

  return !isLoaded ? (
    <ActivityIndicator style={styles.loader} size="large" color="#7A9B76" />
  ) : (
    <View>
      <Text style={styles.label}>Auftragsname</Text>

      <Input
        placeholder="Name"
        value={formData.name}
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Geben Sie einen Namen für den Auftrag ein'
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />

      <Text style={styles.label}>Kunde</Text>

      <Select
        search={false}
        data={formData.customerOptions}
        value={formData.selectedCustomer}
        placeholder='Auswählen'
        errorText="Please select a customer"
        validators={[VALIDATOR_SELECT()]}
        onValueChange={(option) => setFormData({ ...formData, selectedCustomer: option.id })}
      />

      <Text style={styles.label}>Mitarbeiter</Text>

      <Select
        search={false}
        placeholder='Auswählen'
        data={formData.workerOptions}
        value={formData.selectedWorker}
        errorText="Please select a worker"
        validators={[VALIDATOR_SELECT()]}
        onValueChange={(option) => setFormData({ ...formData, selectedWorker: option.id })}
      />

      {/* <Text style={styles.label}>Ansprechspartner</Text>

      <Select
        search={false}
        placeholder='Auswählen'
        data={formData.contactOptions}
        value={formData.selectedContact}
        errorText="Please select a contact"
        validators={[VALIDATOR_SELECT()]}
        onValueChange={(text) => setFormData({ ...formData, selectedContact: text })}
      /> */}


      <Text style={styles.label}>Auftragsadresse</Text>

      <View style={styles.rowContainer}>
        <View style={styles.streetWrapper}>
          <Input
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
            placeholder="PLZ"
            value={formData.zip}
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Geben Sie eine PLZ für den Auftrag ein'
            onChangeText={(text) => setFormData({ ...formData, zip: text })}
          />
        </View>
        <View style={styles.placeWrapper}>
          <Input
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
        multiline={true}
        numberOfLines={4}
        placeholder="Beschreibung"
        value={formData.description}
        validators={[VALIDATOR_REQUIRE()]}
        style={[styles.textArea, styles.placeholderText]}
        errorText='Geben Sie die Beschreibung des Auftrags ein'
        onChangeText={(text) => setFormData({ ...formData, description: text })}
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  streetWrapper: {
    width: '75%'
  },
  nrWrapper: {
    width: '20%'
  },
  zipWrapper: {
    width: '35%'
  },
  placeWrapper: {
    width: '60%'
  },
});

export default OrderCreate;

