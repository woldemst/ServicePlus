import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import { SelectList } from 'react-native-dropdown-select-list' 

const OrderCreate = () =>{
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
            <View>
                <Text style={styles.label}>Auftrags-Nr.* (wird automatisch vergeben)</Text>

                <TextInput
                    style={[styles.input, styles.input.placeholderText]}
                    placeholder="Name"
                    onChangeText={(text) => setName(text)}
                    value={name}
                />
            
                <Text style={styles.label}>Kunde </Text>
                <SelectList 
                    style={[styles.select, styles.select.placeholderText]}
                    setSelected={(val) => setSelected(val)} 
                    data={data} 
                    search={false} 
                    save="value"
                    placeholder='Auswählen'
                />

                <Text style={styles.label}>Status</Text>

                <SelectList 
                    style={[styles.select, styles.select.placeholderText]}
                    search={false} 
                    setSelected={(val) => setSelected(val)} 
                    data={data} 
                    save="value"
                    placeholder='Offen'
                />

                <Text style={styles.label}>Ansprechspartner</Text>

                <SelectList 
                    style={[styles.select, styles.select.placeholderText]}
                    search={false} 
                    setSelected={(val) => setSelected(val)} 
                    data={data} 
                    save="value"
                    placeholder='Auswählen'
                />
                <Text style={styles.label}>Beschreibung</Text>

                <TextInput
                        style={[styles.textArea, styles.textArea.placeholderText]}
                        
                        placeholder="Beschreibung"
                        onChangeText={(text) => setDescription(text)}
                        value={description}
                        multiline={true}
                        numberOfLines={4} // Adjust the number of lines as needed
                    />



                    <View style={styles.btnContainer}>
                            <TouchableOpacity style={[styles.cancelBtn, styles.button]}  >
                                <Text style={styles.cancelBtnText}>Abbrechen</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.createBtn, styles.button]}  >
                                <Text style={styles.createBtnText}>Anlegen</Text>
                            </TouchableOpacity>
                    
                    </View>
 
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        // borderColor: '#e0e0e0', 
        // marginTop: 6,
        marginBottom: 16,
        padding: 7,
        borderRadius: 6,
        fontSize: 18,
    },
    select: {
        margin: 15, 
        fontSize: 18,
        borderRadius: 6,
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
    },
    placeholderText: {
        color: 'gray',
        fontSize: 18, // Set the font size of the placeholder text
    },
    label: {
        marginTop: 12,
        marginBottom: 6,
        fontSize: 18
    },

    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    button: {
        // height: 53,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        width: 140,
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: "row",
        justifyContent: "center", 
        alignItems: 'center'
    },
    cancelBtn:{
        borderColor: '#7A9B76',
        borderWidth: 2
    },
    cancelBtnText:{
        fontSize: 18,
        color: '#7A9B76',
        fontWeight: '700'
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

export default OrderCreate; 