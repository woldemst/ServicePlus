import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import axios from "axios";

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../context/auth-context";
import Input from "../../shared/UIElements/Input";
import Button from "../../shared/UIElements/Button";
import { updateAndValidateField } from "../../actions/firmActions";

const CreateFirm = props => {
  const auth = useContext(AuthContext)
  const navigation = useNavigation();

  const dispatch = useDispatch()
  const fetchedData = useSelector((state) => state.firm);

  // console.log(props);
  const handleSubmit = async () => {
    const URL = "http://localhost:8000/api/firm/register";

    try {

      const updatedData = {
        role: auth.role,
        userId: auth.userId,
        name: fetchedData.inputs.name.value,
        ownerName: fetchedData.inputs.ownerName.value,
        email: fetchedData.inputs.email.value,
        street: fetchedData.inputs.street.value,
        houseNr: fetchedData.inputs.houseNr.value,
        zip: fetchedData.inputs.zip.value,
        place: fetchedData.inputs.place.value,
        phone: fetchedData.inputs.phone.value,
        website: fetchedData.inputs.website.value,
      }
      const response = await axios.post(URL, updatedData)
      auth.updateId(response.data.firmId)
      props.toggle()
      navigation.navigate('overview')

      console.log("Firm created!", response.data);
    } catch (err) {
      console.error("Error when creating a firm:", err);

    }

  }


  const handleInputChange = (fieldName, value, validators) => {
    dispatch(updateAndValidateField(fieldName, value, validators))
}
  return <>
    <View style={styles.container}>
      <Input
        id='firmName'
        fieldName='name'
        placeholder="Name des Betriebs"
        errorText='Type a name of firm'
        value={fetchedData.inputs.name.value}
        validators={[VALIDATOR_REQUIRE()]}
        onChange={handleInputChange}
      />

      <Input
        id='ownerName'
        fieldName='ownerName'
        placeholder="Name des Inhabers"
        value={fetchedData.inputs.ownerName.value}
        validators={[VALIDATOR_MINLENGTH(6)]}
        onChange={handleInputChange}
      />

      <Input
        id='firmEmail'
        fieldName='email'
        placeholder="Email"
        value={fetchedData.inputs.email.value}
        validators={[VALIDATOR_EMAIL()]}
        onChange={handleInputChange}
      />

      <View style={styles.streetContainer}>
        <View style={styles.streetWrapper}>
          <Input
            id='firmStreet'
            fieldName='street'
            placeholder="Straße"
            value={fetchedData.inputs.street.value}
            validators={[VALIDATOR_REQUIRE()]}
            onChange={handleInputChange}
          />
        </View>

        <View style={styles.nrWrapper}>
          <Input
            fieldName='houseNr'
            placeholder="Nr."
            errorText='Number'
            value={fetchedData.inputs.houseNr.value}
            validators={[VALIDATOR_REQUIRE()]}
            onChange={handleInputChange}
          />
        </View>
      </View>

      <View style={styles.zipContainer}>
        <View style={styles.zipWrapper}>
          <Input
            id='firmZip'
            fieldName='zip'
            placeholder="PLZ"
            errorText='Type a ZIP code'
            value={fetchedData.inputs.zip.value}
            validators={[VALIDATOR_REQUIRE()]}
            onChange={handleInputChange}
          />
        </View>

        <View style={styles.placeWrapper}>
          <Input
            id='firmPlace'
            fieldName='place'
            placeholder="Ort"
            errorText='Type a place'
            value={fetchedData.inputs.place.value}
            validators={[VALIDATOR_REQUIRE()]}
            onChange={handleInputChange} 
          />
        </View>
      </View>

      <Input
        id='firmPhone'
        fieldName='phone'
        placeholder="Telefon"
        errorText='Type a phone'
        value={fetchedData.inputs.phone.value}
        validators={[VALIDATOR_REQUIRE()]}
        onChange={handleInputChange}
      />

      <Input
        id='firmWebsite'
        fieldName='website'
        placeholder="Webseite"
        errorText='Type a website'
        value={fetchedData.inputs.website.value}
        validators={[VALIDATOR_REQUIRE()]}
        onChange={handleInputChange}
      />

      <View style={styles.btnContainer}>
        <Button
          style={!fetchedData.isFormValid ? styles.invalideButton :
            [styles.createBtn, styles.button]}
          disabled={!fetchedData.isFormValid}
          buttonText={styles.createBtnText}
          onPress={handleSubmit}
          title={'Speichern'}
        />
      </View>
    </View>
  </>
}

const styles = StyleSheet.create({
  container: {
    //   padding: 32,
    paddingTop: 22,
    backgroundColor: "#fff",
    flex: 1,

    //   borderColor: 'red',
    //   borderWidth: 2
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
  invalideButton: {
    height: 53,
    width: '100%',
    backgroundColor: 'gray',
    borderRadius: 5,
    justifyContent: 'center',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center'
  },

});

export default CreateFirm;