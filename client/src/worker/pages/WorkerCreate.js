import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { clearWorkerField, createWorker } from "../../actions/workerActions";
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "../../util/validators";
import { AuthContext } from "../../context/auth-context";
import Input from "../../shared/UIElements/Input";
import Button from "../../shared/UIElements/Button";
import { setInitialInputData } from "../../actions/inputActions";

const WorkerCreate = (props) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const auth = useContext(AuthContext)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    houseNr: '',
    zip: '',
    place: '',
    phone: '',
    description: '',
  })


  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // console.log('worker create', fetchedData);
  const handleSubmit = async () => {
    try {
      const URL = `http://localhost:8000/api/workers/${auth.firmId}/new`

      const response = await axios.post(URL, {
        firmId: auth.firmId,
        name: formData.name,
        email: formData.email,
        street: formData.street,
        houseNr: formData.houseNr,
        zip: formData.zip,
        place: formData.place,
        phone: formData.phone,
        description: formData.description,
      })

      alert("Worker created successfully!");

      props.route.params.handleRefresh();
      navigation.goBack()
      // dispatch(clearWorkerField())
    } catch (err) {
      console.log("Error if creating a mew worker", err);
    }
  }


  return isLoaded && (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Input
          placeholder="Name"
          value={formData.name}
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Geben Sie einen Namen für den Mitarbeiter ein'
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />

        <Input
          placeholder="E-Mail"
          value={formData.email}
          validators={[VALIDATOR_EMAIL()]}
          errorText='Geben Sie ein E-Mail des Mitarbeiters ein'
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />

        <View style={styles.streetContainer}>
          <View style={styles.streetWrapper}>
            <Input
              placeholder="Straße"
              value={formData.street}
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Geben Sie die Straße des Mitarbeiters ein'
              onChangeText={(text) => setFormData({ ...formData, street: text })}
            />
          </View>

          <View style={styles.nrWrapper}>
            <Input
              placeholder="Housenummer"
              value={formData.houseNr}
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Hausnummer'
              onChangeText={(text) => setFormData({ ...formData, houseNr: text })}
            />
          </View>
        </View>

        <View style={styles.zipContainer}>
          <View style={styles.zipWrapper}>
            <Input
              placeholder="PLZ"
              value={formData.zip}
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Geben Sie PLZ des Mitarbeiters ein'
              onChangeText={(text) => setFormData({ ...formData, zip: text })}
            />
          </View>

          <View style={styles.placeWrapper}>
            <Input
              placeholder="Ort"
              value={formData.place}
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Geben Sie den Ort des Mitarbeiters ein'
              onChangeText={(text) => setFormData({ ...formData, place: text })}
            />
          </View>
        </View>

        <Input
          placeholder="Telefonnummer"
          value={formData.phone}
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Geben Sie die Telefonnummer des Mitarbeiters ein'
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
        />

        <Input
          placeholder="Beschreibung"
          value={formData.description}
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Geben Sie die Beschreibung des Mitarbeiters ein'
          onChangeText={(text) => setFormData({ ...formData, description: text })}
        />

        <View style={styles.btnContainer}>
          <Button
            style={[styles.createBtn, styles.button]}
            // disabled={!fetchedData.isFormValid}
            buttonText={styles.createBtnText}
            onPress={handleSubmit}
            title={'Anlegen'}
          />
        </View>
      </ScrollView>
    </View>
  )
}


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

export default WorkerCreate;