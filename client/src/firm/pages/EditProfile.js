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
import { useState } from "react";
import { updateFirmData } from "../../actions/firmActions";
import { useDispatch, useSelector } from "react-redux";

const EditProfile = (props) => {
  const navigation = useNavigation();
  const { firmId, firmArr, refreshScreen } = useRoute().params;
  // const fetchedData = useSelector((state) => state.firm);
  
  const [firmData, setFirmData] = useState(firmArr);
  const dispatch = useDispatch();

  const handleChange = (field, value) => {
    setFirmData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
      const URL = `http://localhost:8000/api/firm/update/${firmId}`;
      
    try {
      const response = await axios.patch(URL, firmData);
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
          <TextInput
            style={[styles.input, styles.input.placeholderText]}
            placeholder="Name des Betriebs"
            onChangeText={(text) => handleChange("name", text)}
            value={firmData.name}
          />

          <TextInput
            style={[styles.input, styles.input.placeholderText]}
            placeholder="Name des Inhabers"
            onChangeText={(text) => handleChange("owner", text)}
            value={firmData.owner}
          />

          <TextInput
            style={[styles.input, styles.input.placeholderText]}
            placeholder="Email"
            onChangeText={(text) => handleChange("email", text)}
            value={firmData.email}
          />

          <View style={styles.streetContainer}>
            <View style={styles.streetWrapper}>
              <TextInput
                style={[styles.input, styles.input.placeholderText]}
                placeholder="Straße"
                onChangeText={(text) => handleChange("street", text)}
                value={firmData.street}
              />
            </View>

            <View style={styles.nrWrapper}>
              <TextInput
                style={[styles.input, styles.input.placeholderText]}
                placeholder="Nr."
                onChangeText={(text) => handleChange("houseNr", text)}
                value={firmData.houseNr}
              />
            </View>
          </View>

          <View style={styles.zipContainer}>
            <View style={styles.zipWrapper}>
              <TextInput
                style={[styles.input, styles.input.placeholderText]}
                placeholder="PLZ"
                onChangeText={(text) => handleChange("zip", text)}
                value={firmData.zip}
              />
            </View>

            <View style={styles.placeWrapper}>
              <TextInput
                style={[styles.input, styles.input.placeholderText]}
                placeholder="Ort"
                onChangeText={(text) => handleChange("place", text)}
                value={firmData.place}
              />
            </View>
          </View>

          <TextInput
            style={[styles.input, styles.input.placeholderText]}
            placeholder="Telefon"
            onChangeText={(text) => handleChange("phone", text)}
            value={firmData.phone}
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

          <TextInput
            style={[styles.input, styles.input.placeholderText]}
            placeholder="Webseite"
            onChangeText={(text) => handleChange("website", text)}
            value={firmData.website}
          />

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[styles.createBtn, styles.button]}
              onPress={handleSubmit}
            >
              <Text style={styles.createBtnText}>Speichern</Text>
            </TouchableOpacity>
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
});

export default EditProfile;
