import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useContext, useState } from "react";
import { updateFirmData } from "../../actions/firmActions";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../context/auth-context";
import Input from "../../shared/UIElements/Input";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from "../../util/validators";
import Button from "../../shared/UIElements/Button";

const EditProfile = (props) => {
  const auth = useContext(AuthContext)
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const fetchedData = useSelector(state => state.firm)

  console.log('Stored in firmEdit: ',fetchedData);
  const handleSubmit = async () => {
    const URL = `http://localhost:8000/api/firm/update/${auth.firmId}`;

    const updatedData = {
      name: fetchedData.name.value,
      owner: fetchedData.owner.value,
      email: fetchedData.email.value,
      street: fetchedData.street.value,
      houseNr: fetchedData.houseNr.value,
      zip: fetchedData.zip.value,
      place: fetchedData.place.value,
      phone: fetchedData.phone.value,
      website: fetchedData.website.value,
    }

    try {

      const response = await axios.patch(URL, updatedData);
      dispatch(updateFirmData(response.data));
      props.route.params.handleRefresh();
      navigation.goBack()
      console.log("Firm updated!", response.data);
    } catch (err) {
      console.error("Error updating firm:", err);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <Input
            id='firmName'
            fetchedData='firm'
            fieldName='name'
            placeholder="Name des Betriebs"
            value={fetchedData.name.value}
            validators={[VALIDATOR_MINLENGTH(6)]}

          />

          <Input
            id='ownerName'
            fetchedData='firm'
            fieldName='owner'
            placeholder="Name des Inhabers"
            value={fetchedData.owner.value}
            validators={[VALIDATOR_REQUIRE()]}

          />

          <Input
            id='firmEmail'
            fetchedData='firm'
            fieldName='email'
            placeholder="Name des Betriebs"
            value={fetchedData.email.value}
            validators={[VALIDATOR_EMAIL()]}

          />


          <View style={styles.streetContainer}>
            <View style={styles.streetWrapper}>
              <Input
                id='firmStreet'
                fetchedData='firm'
                fieldName='street'
                placeholder="Straße"
                value={fetchedData.street.value}
                validators={[VALIDATOR_REQUIRE()]}
              />
            </View>

            <View style={styles.nrWrapper}>
              <Input
                  id='firmHouseNr'
                  fetchedData='firm'
                  fieldName='houseNr'
                  placeholder="Nr."
                  value={fetchedData.houseNr.value}
                  validators={[VALIDATOR_REQUIRE()]}
                />
            </View>
          </View>

          <View style={styles.zipContainer}>
            <View style={styles.zipWrapper}>
                <Input
                  id='firmZip'
                  fetchedData='firm'
                  fieldName='zip'
                  placeholder="PLZ"
                  value={fetchedData.zip.value}
                  validators={[VALIDATOR_REQUIRE()]}
                />
            </View>

            <View style={styles.placeWrapper}>
              <Input
                id='firmPlace'
                fetchedData='firm'
                fieldName='place'
                placeholder="Ort"
                value={fetchedData.place.value}
                validators={[VALIDATOR_REQUIRE()]}
              />
            </View>
          </View>

          <Input
            id='firmPhone'
            fetchedData='firm'
            fieldName='phone'
            placeholder="Telefon"
            value={fetchedData.phone.value}
            validators={[VALIDATOR_REQUIRE()]}
          />

          {/* <Text style={styles.label}>Branche*</Text>

            <SelectList 
                style={[styles.select, styles.select.placeholderText]}
                search={false} 
                setSelected={(val) => setSelected(val)} 
                data={data} 
                save="value"
                placeholder='Offen'
            /> */}


          <Input
            id='firmWebsite'
            fetchedData='firm'
            fieldName='website'
            placeholder="Webseite"
            value={fetchedData.website.value} 
            validators={[VALIDATOR_REQUIRE()]}
          />

          <View style={styles.btnContainer}>
            <Button 
              style={fetchedData.isFormValid ? [styles.createBtn, styles.button] : styles.invalideButton}
              disabled={!fetchedData.isFormValid} 
              buttonText={styles.createBtnText}
              onPress={handleSubmit}
              title={'Speichern'} 
          />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
    backgroundColor: "#fff",
    flex: 1,
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

export default EditProfile;
