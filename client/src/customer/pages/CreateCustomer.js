import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import { clearCustomerField, createCustomer, getCustomerData, updateInput } from "../../actions/customerActions";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/auth-context";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../shared/UIElements/Input";
import { VALIDATOR_REQUIRE } from "../../util/validators";

const CreateCustomer = (props) => {
  const auth = useContext(AuthContext)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const fetchedData = useSelector(state => state.customer)

  // console.log(fetchedData);

  const handleSubmit = async () => {
    try {
      const URL = `http://localhost:8000/api/customers/${auth.firmId}/new`
      const response = await axios.post(URL, {
        firmId: auth.firmId,
        name: fetchedData.inputs.name.value,
        email: fetchedData.inputs.email.value,
        street: fetchedData.inputs.street.value,
        houseNr: fetchedData.inputs.houseNr.value,
        zip: fetchedData.inputs.zip.value,
        place: fetchedData.inputs.place.value,
        phone: fetchedData.inputs.phone.value,
        description: fetchedData.inputs.description.value,
      })

      dispatch(createCustomer(response.data.customer))
      alert("Customer created successfully!");
      props.route.params.handleRefresh();
      navigation.goBack()
      dispatch(clearCustomerField())
    } catch (err) {
      console.log("Error if creating customer", err);

    }
  };

  const handleInputChange = (fieldName, value, validators) => {
    dispatch(updateInput(fieldName, value, validators))
  }


  return (
    <>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Input
            id='customerName'
            fieldName='name'
            placeholder="Kundenname"
            errorText='Geben Sie einen Namen für den Kunde ein'
            value={fetchedData.inputs.name.value}
            validators={[VALIDATOR_REQUIRE()]}
            onChange={handleInputChange}
          />

          <Input
            id='customerEmail'
            fieldName='email'
            placeholder="Kundenemail"
            errorText='Geben Sie eine E-Mail Adresse des Kunden ein'
            value={fetchedData.inputs.email.value}
            validators={[VALIDATOR_REQUIRE()]}
            onChange={handleInputChange}
          />

          <View style={styles.streetContainer}>
            <View style={styles.streetWrapper}>
              <Input
                id='customerStreet'
                fieldName='street'
                placeholder="Straße des Kunden"
                errorText='Geben Sie die Straße des Kunden ein'
                value={fetchedData.inputs.street.value}
                validators={[VALIDATOR_REQUIRE()]}
                onChange={handleInputChange}
              />
            </View>

            <View style={styles.nrWrapper}>
              <Input
                id='customerHouseNr'
                fieldName='houseNr'
                placeholder="Housenummer des Kunden"
                errorText='Geben Sie die Housenummer des Kunden ein'
                value={fetchedData.inputs.houseNr.value}
                validators={[VALIDATOR_REQUIRE()]}
                onChange={handleInputChange}
              />
            </View>
          </View>

          <View style={styles.zipContainer}>
            <View style={styles.zipWrapper}>
              <Input
                id='customerZip'
                fieldName='zip'
                placeholder="PLZ des Kunden"
                errorText='Geben Sie PLZ des Kunden ein'
                value={fetchedData.inputs.zip.value}
                validators={[VALIDATOR_REQUIRE()]}
                onChange={handleInputChange}
              />
            </View>

            <View style={styles.placeWrapper}>
              <Input
                id='customerPlace'
                fieldName='place'
                placeholder="Straße des Kunden"
                errorText='Geben Sie den Ort des Kunden ein'
                value={fetchedData.inputs.place.value}
                validators={[VALIDATOR_REQUIRE()]}
                onChange={handleInputChange}
              />
            </View>
          </View>

          <Input
            id='customerPhone'
            fieldName='phone'
            placeholder="Telefonnummer des Kunden"
            errorText='Geben Sie die Telefonnummer des Kunden ein'
            value={fetchedData.inputs.phone.value}
            validators={[VALIDATOR_REQUIRE()]}
            onChange={handleInputChange}
          />

          {/* <Input
            id='customerWebsite'
            fieldName='website'
            placeholder="Website des Kunden"
            errorText='Geben Sie Website des Kunden ein'
            value={fetchedData.inputs.website.value}
            validators={[VALIDATOR_REQUIRE()]}
            onChange={handleInputChange}
          /> */}


          <Input
            id='customerDescription'
            fieldName='description'
            placeholder="Beschreibung des Kunden"
            errorText='Geben Sie die Beschreibung des Kunden ein'
            value={fetchedData.inputs.description.value}
            validators={[VALIDATOR_REQUIRE()]}
            onChange={handleInputChange}
          />

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[styles.createBtn, styles.button]}
              onPress={handleSubmit}
            >
              <Text style={styles.createBtnText}>Anlegen</Text>
            </TouchableOpacity>
          </View>


        </ScrollView>
      </View>

    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  container: {
    backgroundColor: "#fff",
    padding: 30,
    flex: 1,
    // borderColor: 'red',
    // borderWidth: 1,

  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    // marginTop: 6,
    marginBottom: 16,
    padding: 7,
    borderRadius: 6,
    fontSize: 16,
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
  streetContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  streetWrapper: {
    width: "75%",
  },
  nrWrapper: {
    width: "20%",
  },
  zipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  zipWrapper: {
    width: "35%",
  },
  placeWrapper: {
    width: "60%",
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
    fontSize: 18,
  },

  btnContainer: {
    flexDirection: "row",
    marginTop: 50,
  },

  button: {
    // height: 53,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 5,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  createBtn: {
    backgroundColor: "#7A9B76",
  },
  createBtnText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
});

export default CreateCustomer;
