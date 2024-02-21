import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { VALIDATOR_REQUIRE, VALIDATOR_SELECT } from "../../util/validators";
import { AuthContext } from "../../context/auth-context";
import Input from "../../shared/UIElements/Input";
import Button from "../../shared/UIElements/Button";
import Select from "../../shared/UIElements/Select";
import { updateField, clearOrderData } from "../../actions/orderActions";

const OrderCreate = (props) => {
  const auth = useContext(AuthContext)

  const dispatch = useDispatch()
  const fetchedData = useSelector(state => state.order)
  const contactOptions = fetchedData.selects.contact;
  const workerOptions = fetchedData.selects.worker;
  const customerOptions = fetchedData.selects.customer;

  // console.log(fetchedData.selectedOptions);
  // console.log('props', props);

  const handleSubmit = async () => {
    const URL = `http://localhost:8000/api/orders/${auth.firmId}/new`;

    try {
      const response = await axios.post(URL, {
        firmId: auth.firmId,
        name: fetchedData.inputs.name.value,
        worker: fetchedData.selectedOptions.worker,
        customer: fetchedData.selectedOptions.customer,
        contact: fetchedData.selectedOptions.contact,
        description: fetchedData.inputs.description.value,
        // status: status,
      });

      props.toggle();
      props.handleRefresh();
      // dispatch(clearOrderData())

      alert("Order created successfully!");
    } catch (err) {
      alert("An error occurred while creating the order.");
    }
  };

  const handleInputChange = (fieldName, value, validators, objectId) => {
    dispatch(updateField(fieldName, value, validators, objectId))
  }

  return (
    <>
      <View>
        <Text style={styles.label}>Auftragsname</Text>

        <Input
          id='workerName'
          fieldName='name'
          placeholder="Name des Mitarabeiters"
          errorText='Geben Sie einen Namen für den Auftrag ein'
          value={fetchedData.inputs.name.value}
          validators={[VALIDATOR_REQUIRE()]}
          onChange={handleInputChange}
        />

        <Text style={styles.label}>Kunde</Text>

        <Select
          id='customer'
          objectId='select'
          search={false}
          fieldName='customer'
          placeholder="Auswählen"
          style={[styles.select, styles.select.placeholderText]}
          data={customerOptions}
          validators={[VALIDATOR_SELECT()]}
          onChange={handleInputChange}
        />

        <Text style={styles.label}>Mitarbeiter</Text>

        <Select
          id='worker'
          objectId='select'
          search={false}
          fieldName='worker'
          placeholder="Auswählen"
          style={[styles.select, styles.select.placeholderText]}
          data={workerOptions}
          validators={[VALIDATOR_SELECT()]}
          onChange={handleInputChange}
        />

        <Text style={styles.label}>Ansprechspartner</Text>

        <Select
          id='contact'
          objectId='select'
          search={false}
          fieldName='contact'
          placeholder="Auswählen"
          style={[styles.select, styles.select.placeholderText]}
          data={contactOptions}
          validators={[VALIDATOR_SELECT()]}
          onChange={handleInputChange}
        />

        <Text style={styles.label}>Beschreibung</Text>

        {/* <TextInput
          style={[styles.textArea, styles.placeholderText]}
          placeholder="Beschreibung"
          onChangeText={(text) => setDescription(text)}
          value={description}
          multiline={true}
          numberOfLines={4} // Adjust the number of lines as needed
        /> */}

        <Input
          id='workerDescr'
          fieldName='description'
          // placeholder="Beschreibung"
          style={[styles.textArea, styles.placeholderText]}
          errorText='Geben Sie die Beschreibung des Auftrags ein'
          value={fetchedData.inputs.description.value}
          validators={[VALIDATOR_REQUIRE()]}
          onChange={handleInputChange}
          // multiline={true}
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
            style={fetchedData.isFormValid ? [styles.createBtn, styles.button] : styles.invalideButton}
            // disabled={!fetchedData.isFormValid}
            buttonText={styles.createBtnText}
            onPress={handleSubmit}
            title={'Anlegen'}
          />
        </View>
      </View>
    </>
  );
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
});

export default OrderCreate;
