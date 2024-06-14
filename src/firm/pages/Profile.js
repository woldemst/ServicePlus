import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from "../../util/validators";
import { AuthContext } from "../../context/auth-context";
import Input from "../../shared/UIElements/Input";
import Button from "../../shared/UIElements/Button";
import Avatar from "../../../components/Avatar";
import { refershData } from "../../actions/utilActions";


const Profile = (props) => {
  const auth = useContext(AuthContext)
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const fetchedData = useSelector(state => state.firm)
  const firmId = useSelector(state => state.context.firmId)
  const userRole = useSelector(state => state.context.userRole)

  const [isLoaded, setIsLoaded] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [formData, setFormData] = useState({ ...fetchedData });

  useEffect(() => setIsLoaded(true), [])

  const handleEdit = () => setIsEdit(!isEdit)
  // console.log(fetchedData.name);


  const handleSubmit = async () => {
    const URL = `http://192.168.178.96:8000/api/firm/update/${firmId}`;

    try {
      const response = await axios.patch(URL, {
        name: formData.name,
        ownerName: formData.ownerName,
        email: formData.email,
        street: formData.street,
        houseNr: formData.houseNr,
        zip: formData.zip,
        place: formData.place,
        phone: formData.phone,
        website: formData.website,
      });

      // navigation.goBack()
      dispatch(refershData())
      setIsEdit(false);
      window.alert("Firm updated!");
      console.log("Firm updated!", response.data);
    } catch (err) {
      console.error("Error updating firm:", err);
    }
  };

  return isLoaded && (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.inner}>
          <View style={styles.imgContainer}>
            <Avatar source={require('../../../assets/firm/company_avatar.jpg')} />
          </View>
          <View style={styles.content}>
            <Input
              placeholder="Name des Betriebs"
              errorText='Type a name of firm'
              disabled={!isEdit}
              value={formData.name}
              validators={[VALIDATOR_REQUIRE()]}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />

            <Input
              placeholder="Name des Inhabers"
              disabled={!isEdit}
              value={formData.ownerName}
              validators={[VALIDATOR_MINLENGTH(6)]}
              onChangeText={(text) => setFormData({ ...formData, ownerName: text })}
            />

            <Input
              placeholder="Email"
              errorText='Type an email'
              disabled={!isEdit}
              value={formData.email}
              validators={[VALIDATOR_EMAIL()]}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />

            <View style={styles.streetContainer}>
              <View style={styles.streetWrapper}>
                <Input
                  placeholder="Straße"
                  errorText='Type a street'
                  disabled={!isEdit}
                  value={formData.street}
                  validators={[VALIDATOR_REQUIRE()]}
                  onChangeText={(text) => setFormData({ ...formData, street: text })}
                />
              </View>

              <View style={styles.nrWrapper}>
                <Input
                  placeholder="Nr."
                  errorText='Number'
                  disabled={!isEdit}
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
                  disabled={!isEdit}
                  value={formData.zip}
                  validators={[VALIDATOR_REQUIRE()]}
                  onChangeText={(text) => setFormData({ ...formData, zip: text })}
                />
              </View>

              <View style={styles.placeWrapper}>
                <Input
                  placeholder="Ort"
                  errorText='Type a place'
                  disabled={!isEdit}
                  value={formData.place}
                  validators={[VALIDATOR_REQUIRE()]}
                  onChangeText={(text) => setFormData({ ...formData, place: text })}
                />
              </View>
            </View>

            <Input
              placeholder="Telefon"
              errorText='Type a phone'
              disabled={!isEdit}
              value={formData.phone}
              validators={[VALIDATOR_REQUIRE()]}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
            />

            <Input
              placeholder="Webseite"
              errorText='Type a website'
              disabled={!isEdit}
              value={formData.website}
              validators={[VALIDATOR_REQUIRE()]}
              onChangeText={(text) => setFormData({ ...formData, website: text })}
            />

            {userRole && (
              <View style={styles.btnContainer}>
                {!isEdit ? (
                  <Button
                    style={[styles.invalideButton, styles.button]}
                    // disabled={fetchedData.isFormValid}
                    buttonText={styles.createBtnText}
                    onPress={handleEdit}
                    title={'Ändern'}
                  />
                ) : (
                  <Button
                    style={[styles.createBtn, styles.button]}
                    // disabled={fetchedData.isFormValid}
                    buttonText={styles.createBtnText}
                    onPress={handleSubmit}
                    title={'Speichern'}
                  />
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'space-between',
    borderWifth: 1,
    borderColor: 'red',
  },
  inner: {
    paddingVertical: 16,
  },
  content: {
    // flex: 1,
    // justifyContent: 'flex-end',
    // borderWifth: 1,
    // borderColor: 'red',
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
    marginTop: 28,
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
  imgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    height: 400,
    // borderWidth: 1,
    // borderColor: 'red',
  },

});

export default Profile;
