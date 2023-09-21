import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import axios from "axios";

import { SelectList } from 'react-native-dropdown-select-list' 

const EditProfile = () => {

    const [selectedValue, setSelectedValue] = useState('');
    const [selected, setSelected] = useState("");

    const [firmName, setFirmName] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [email, setEmail] = useState('')
    const [street, setStreet] = useState('')
    const [houseNr, setHouseNr] = useState('')
    const [zip, setZip] = useState('')
    const [phone, setPhone] = useState('')
    const [website, setWebsite] = useState('')


    const data = [
        {key:'1', value:'Herr Kunde', disabled:true},
        {key:'2', value:'Frau Kundin'},
        {key:'3', value:'A'},
        {key:'4', value:'B', disabled:true},
        {key:'5', value:'c'},
    ]

    const haldleSubmit = async () => {
        const URL = "http://localhost:8000/api/firm/update";

        const response = await axios.post(URL, {
            firmName: firmName,
            ownerName: ownerName, 
            email: email,
            street: street, 
            houseNr: houseNr, 
            zip: zip, 
            phone: phone,
            website: website
        })

        alert(response)
    }
  
    return (
        <>
            <View style={styles.container}> 
                <ScrollView showsVerticalScrollIndicator={false}>

                <Text style={styles.label}>Name des Betriebs*</Text>

                <TextInput
                    style={[styles.input, styles.input.placeholderText]}
                    placeholder="Name des Betriebs"
                    onChangeText={(text) => setFirmName(text)}
                    value={firmName}
                />

                <Text style={styles.label}>Name des Inhabers*</Text>

                <TextInput
                    style={[styles.input, styles.input.placeholderText]}
                    placeholder="Name des Inhabers"
                    onChangeText={(text) => setOwnerName(text)}
                    value={ownerName}
                />

                <Text style={styles.label}>E-Mail*</Text>

                <TextInput
                    style={[styles.input, styles.input.placeholderText]}
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />

                <View style={styles.streetContainer}>

                <View style={styles.streetWrapper}>
                        <Text style={styles.label}>Straße*</Text>

                        <TextInput
                            style={[styles.input, styles.input.placeholderText]}
                            placeholder="Straße"
                            onChangeText={(text) => setStreet(text)}
                            value={street}
                        />
                    </View>

                    <View style={styles.nrWrapper}>
                        <Text style={styles.label}>Nr.*</Text>

                        <TextInput
                            style={[styles.input, styles.input.placeholderText]}
                            placeholder="Nr."
                            onChangeText={(text) => setHouseNr(text)}
                            value={houseNr}
                        />
                    </View>


                </View>

                <View style={styles.zipContainer}>
                    <View style={styles.zipWrapper}>
                        <Text style={styles.label}>PLZ*</Text>

                        <TextInput
                            style={[styles.input, styles.input.placeholderText]}
                            placeholder="PLZ"
                            onChangeText={(text) => setZip(text)}
                            value={zip}
                        />
                    </View>
                
                    <View style={styles.placeWrapper}>
                        <Text style={styles.label}>Ort*</Text>

                        <TextInput
                            style={[styles.input, styles.input.placeholderText]}
                            placeholder="Ort"
                            onChangeText={(text) => setPlace(text)}
                            value={place}
                        />
                    </View>

                </View>

                <Text style={styles.label}>Telefon</Text>

                <TextInput
                    style={[styles.input, styles.input.placeholderText]}
                    placeholder="Telefon"
                    onChangeText={(text) => setPhone(text)}
                    value={phone}
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


                <Text style={styles.label}>Webseite</Text>

                <TextInput
                    style={[styles.input, styles.input.placeholderText]}
                    placeholder="Webseite"
                    onChangeText={(text) => setWebsite(text)}
                    value={website}
                />

                <View style={styles.btnContainer}>
                    <TouchableOpacity style={[styles.createBtn, styles.button]}  >
                        <Text style={styles.createBtnText}>Speichern</Text>
                    </TouchableOpacity>
                </View>

                </ScrollView>
 
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 32,
        backgroundColor: '#fff'
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderColor: '#e0e0e0', 
        // marginTop: 6,
        marginBottom: 16,
        padding: 7,
        borderRadius: 6,
        fontSize: 16,
        placeholderText: {
            color: 'gray',
            fontSize: 18, // Set the font size of the placeholder text
          },

    },
    select: {
        margin: 15, 
        fontSize: 18,
        borderRadius: 6,
        placeholderText: {
            color: 'gray',
            fontSize: 18, // Set the font size of the placeholder text
          },

    },
    textArea: {
        width: '100%',
        height: 130, // Adjust the height as needed
        borderColor: '#e0e0e0', 
        borderWidth: 1,
        marginBottom: 30, 
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 7, 
        paddingRight: 7,
        fontSize: 18,
        borderRadius: 6,
        placeholderText: {
            color: 'gray',
            fontSize: 18, // Set the font size of the placeholder text
          },


    },
    streetContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    streetWrapper: {
        width: '75%'
    },
    nrWrapper: {
        width: '20%' 
    },
    zipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    zipWrapper: {
        width: '35%'
    },
    placeWrapper: {
        width: '60%'
    },
    label: {
        marginTop: 12,
        marginBottom: 6,
        fontSize: 18
    },

    btnContainer: {
        flexDirection: 'row',
        marginTop: 50
    },

    button: {
        // height: 53,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 5,
        width: '100%',
        justifyContent: 'center',
        flexDirection: "row",
        justifyContent: "center", 
        alignItems: 'center'
    },



    createBtn:{
        backgroundColor: '#7A9B76', 
    },
    createBtnText:{
        fontSize: 18,
        color: '#fff',
        fontWeight: '700'
    },

})


export default EditProfile; 