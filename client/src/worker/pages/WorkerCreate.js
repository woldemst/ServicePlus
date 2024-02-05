import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import { VALIDATOR_REQUIRE } from "../../util/validators";
import { AuthContext } from "../../context/auth-context";
import Input from "../../shared/UIElements/Input";
import Button from "../../shared/UIElements/Button";
import { clearWorkerField, createWorker, updateInput } from "../../actions/workerActions";

const WorkerCreate = (props) => {
  const auth = useContext(AuthContext)
  const navigation = useNavigation()
  const fetchedData = useSelector(state => state.worker)

  // console.log(fetchedData);
  const dispatch = useDispatch()
  const handleSubmit = async () => {
    try {
      const URL = `http://localhost:8000/api/workers/${auth.firmId}/new`

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

      dispatch(createWorker(response.data.worker))
      // console.log(response.data);
      alert("Worker created successfully!");
      props.route.params.handleRefresh();
      navigation.goBack()
      dispatch(clearWorkerField())
    } catch (err) {
      console.log("Error if creating a mew worker", err);

    }
  }

  const handleInputChange = (fieldName, value, validators) => {
    dispatch(updateInput(fieldName, value, validators))
  }

  return <>
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Input
          id='workerName'
          fieldName='name'
          placeholder="Name des Mitarabeiters"
          errorText='Geben Sie einen Namen für den Mitarbeiter ein'
          value={fetchedData.inputs.name.value}
          validators={[VALIDATOR_REQUIRE()]}
          onChange={handleInputChange}
        />

        <Input
          id='workerEmail'
          fieldName='email'
          placeholder="E-Mail des Mitarabeiters"
          errorText='Geben Sie ein E-Mail des Mitarbeiters ein'
          value={fetchedData.inputs.email.value}
          validators={[VALIDATOR_REQUIRE()]}
          onChange={handleInputChange}
        />

        <View style={styles.streetContainer}>
          <View style={styles.streetWrapper}>
            <Input
              id='workerStreet'
              fieldName='street'
              placeholder="Straße des Mitarabeiters"
              errorText='Geben Sie die Straße des Mitarbeiters ein'
              value={fetchedData.inputs.street.value}
              validators={[VALIDATOR_REQUIRE()]}
              onChange={handleInputChange}
            />
          </View>

          <View style={styles.nrWrapper}>
            <Input
              id='workerHouseNr'
              fieldName='houseNr'
              placeholder="Nr."
              errorText='Hausnummer'
              value={fetchedData.inputs.houseNr.value}
              validators={[VALIDATOR_REQUIRE()]}
              onChange={handleInputChange}
            />
          </View>
        </View>

        <View style={styles.zipContainer}>
          <View style={styles.zipWrapper}>
            <Input
              id='workerZip'
              fieldName='zip'
              placeholder="PLZ"
              errorText='Geben Sie PLZ des Mitarbeiters ein'
              value={fetchedData.inputs.zip.value}
              validators={[VALIDATOR_REQUIRE()]}
              onChange={handleInputChange}
            />
          </View>

          <View style={styles.placeWrapper}>
            <Input
              id='workerPlace'
              fieldName='place'
              placeholder="Ort"
              errorText='Geben Sie den Ort des Mitarbeiters ein'
              value={fetchedData.inputs.place.value}
              validators={[VALIDATOR_REQUIRE()]}
              onChange={handleInputChange}
            />
          </View>
        </View>

        <Input
          id='workerPhone'
          fieldName='phone'
          placeholder="Mobilenummer"
          errorText='Geben Sie die Telefonnummer des Mitarbeiters ein'
          value={fetchedData.inputs.phone.value}
          validators={[VALIDATOR_REQUIRE()]}
          onChange={handleInputChange}

        />

        <Input
          id='workerDescr'
          fieldName='description'
          placeholder="Beschreibung"
          errorText='Geben Sie die Beschreibung des Mitarbeiters ein'
          value={fetchedData.inputs.description.value}
          validators={[VALIDATOR_REQUIRE()]}
          onChange={handleInputChange}

        />

        <View style={styles.btnContainer}>
          <Button
            style={fetchedData.isFormValid ? [styles.createBtn, styles.button] : styles.invalideButton}
            // style={[styles.createBtn, styles.button]}
            disabled={!fetchedData.isFormValid}
            buttonText={styles.createBtnText}
            onPress={handleSubmit}
            title={'Anlegen'}
          />
        </View>
      </ScrollView>
    </View>
  </>
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