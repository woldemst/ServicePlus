import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../context/auth-context";
import Input from "../../shared/UIElements/Input";
import Button from "../../shared/UIElements/Button";
import { getFirmData } from "../../actions/firmActions";
import { updateFirmId } from "../../actions/contextActions";

const CreateFirm = props => {
  const auth = useContext(AuthContext)
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  const [formData, setFormData] = useState({
    ownerName: "",
    name: "",
    email: "",
    street: "",
    houseNr: "",
    zip: "",
    place: "",
    phone: "",
    website: "",
  })


  const handleSubmit = async () => {
    // console.log('fetched data before api', fetchedData);
    const URL = "http://localhost:8000/api/firm/register";

    try {
      const firmData = {
        role: auth.role,
        userId: auth.userId,
        ownerName: formData.ownerName,
        name: formData.name,
        email: formData.email,
        street: formData.street,
        houseNr: formData.houseNr,
        zip: formData.zip,
        place: formData.place,
        phone: formData.phone,
        website: formData.website,
      }
      const response = await axios.post(URL, firmData)

      dispatch(getFirmData(response.data))
      dispatch(updateFirmId(response.data.firmId))

      props.toggle()

      navigation.navigate('overviewNavigator', { screen: 'FirmView' });

      console.log("Firm created!", response.data);
    } catch (err) {
      console.error("Error when creating a firm:", err);

    }

  }

  return <View style={styles.container}>

    <Input
      placeholder="Name des Betriebs"
      errorText='Type a name of firm'
      value={formData.name}
      validators={[VALIDATOR_REQUIRE()]}
      onChangeText={(text) => setFormData({ ...formData, name: text })}
    />

    <Input
      placeholder="Name des Inhabers"
      value={formData.ownerName}
      validators={[VALIDATOR_MINLENGTH(6)]}
      onChangeText={(text) => setFormData({ ...formData, ownerName: text })}
    />

    <Input
      placeholder="Email"
      value={formData.email}
      validators={[VALIDATOR_EMAIL()]}
      onChangeText={(text) => setFormData({ ...formData, email: text })}
    />

    <View style={styles.streetContainer}>
      <View style={styles.streetWrapper}>
        <Input
          placeholder="Straße"
          value={formData.street}
          validators={[VALIDATOR_REQUIRE()]}
          onChangeText={(text) => setFormData({ ...formData, street: text })}
        />
      </View>

      <View style={styles.nrWrapper}>
        <Input
          placeholder="Nr."
          errorText='Number'
          value={formData.houseNr}
          validators={[VALIDATOR_REQUIRE()]}
          onChangeText={(text) => setFormData({ ...formData, houseNr: text })}
        />
      </View>
    </View>

    <View style={styles.zipContainer}>
      <View style={styles.zipWrapper}>
        <Input
          placeholder="PLZ"
          errorText='Type a ZIP code'
          value={formData.zip}
          validators={[VALIDATOR_REQUIRE()]}
          onChangeText={(text) => setFormData({ ...formData, zip: text })}
        />
      </View>

      <View style={styles.placeWrapper}>
        <Input
          placeholder="Ort"
          errorText='Type a place'
          value={formData.place}
          validators={[VALIDATOR_REQUIRE()]}
          onChangeText={(text) => setFormData({ ...formData, place: text })}
        />
      </View>
    </View>

    <Input
      placeholder="Telefon"
      errorText='Type a phone'
      value={formData.phone}
      validators={[VALIDATOR_REQUIRE()]}
      onChangeText={(text) => setFormData({ ...formData, phone: text })}
    />

    <Input
      placeholder="Webseite"
      errorText='Type a website'
      value={formData.website}
      validators={[VALIDATOR_REQUIRE()]}
      onChangeText={(text) => setFormData({ ...formData, website: text })}
    />

    <View style={styles.btnContainer}>
      <Button
        style={[styles.createBtn, styles.button]}
        // disabled={!fetchedData.isFormValid}
        buttonText={styles.createBtnText}
        onPress={handleSubmit}
        title={'Speichern'}
      />
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    //   padding: 32,
    paddingTop: 22,
    backgroundColor: "#fff",
    justifyContent: 'flex-end',
    flex: 1,


    // borderColor: 'red',
    // borderWidth: 2
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