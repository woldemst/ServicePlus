import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

import { SelectList } from 'react-native-dropdown-select-list' 

const EditProfile = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [selectedValue, setSelectedValue] = useState('');


    const [selected, setSelected] = useState("");
    
    const data = [
        {key:'1', value:'Herr Kunde', disabled:true},
        {key:'2', value:'Frau Kundin'},
        {key:'3', value:'A'},
        {key:'4', value:'B', disabled:true},
        {key:'5', value:'c'},
    ]
  
    return (
        <>
            <View style={styles.container}> 
                <ScrollView showsVerticalScrollIndicator={false}>


                
                <Text style={styles.label}>Name des Betriebs*</Text>

                <TextInput
                    style={[styles.input, styles.input.placeholderText]}
                    placeholder="Name des Betriebs"
                    onChangeText={(text) => setName(text)}
                    value={name}
                />

                <Text style={styles.label}>Name des Inhabers*</Text>

                <TextInput
                    style={[styles.input, styles.input.placeholderText]}
                    placeholder="Name des Inhabers"
                    onChangeText={(text) => setName(text)}
                    value={name}
                />

                <Text style={styles.label}>E-Mail*</Text>

                <TextInput
                    style={[styles.input, styles.input.placeholderText]}
                    placeholder="Email"
                    onChangeText={(text) => setName(text)}
                    value={name}
                />

                <View style={styles.streetContainer}>
                
                    <Text style={styles.label}>Straße*</Text>

                    <TextInput
                        style={[styles.input, styles.input.placeholderText]}
                        placeholder="Straße"
                        onChangeText={(text) => setName(text)}
                        value={name}
                    />
                    <Text style={styles.label}>Nr.*</Text>

                    <TextInput
                        style={[styles.input, styles.input.placeholderText]}
                        placeholder="Nr."
                        onChangeText={(text) => setName(text)}
                        value={name}
                    />

                </View>
                <View style={styles.zipContainer}>
                
                    <Text style={styles.label}>PLZ*</Text>

                    <TextInput
                        style={[styles.input, styles.input.placeholderText]}
                        placeholder="PLZ"
                        onChangeText={(text) => setName(text)}
                        value={name}
                    />
                    <Text style={styles.label}>Ort*</Text>

                    <TextInput
                        style={[styles.input, styles.input.placeholderText]}
                        placeholder="Ort"
                        onChangeText={(text) => setName(text)}
                        value={name}
                    />

                </View>

                <Text style={styles.label}>Telefon</Text>

                <TextInput
                    style={[styles.input, styles.input.placeholderText]}
                    placeholder="Telefon"
                    onChangeText={(text) => setName(text)}
                    value={name}
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
                    onChangeText={(text) => setName(text)}
                    value={name}
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

    },
    zipContainer: {

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