import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react"


const CustomerDetails = props => {
    const [firmName, setFirmName] = useState('')
    const [email, setEmail] = useState('')
    const [street, setStreet] = useState('')
    const [houseNr, setHouseNr] = useState('')
    const [zip, setZip] = useState('')
    const [place, setPlace] = useState('')
    const [phone, setPhone] = useState('')
    const [website, setWebsite] = useState('')



    return <>
        <View>
            <View style={styles.container}> 
                <ScrollView showsVerticalScrollIndicator={false}>

                <TextInput
                    style={[styles.input, styles.input.placeholderText]}
                    placeholder="Name"
                    onChangeText={(text) => setFirmName(text)}
                    value={firmName}
                />

                <TextInput
                    style={[styles.input, styles.input.placeholderText]}
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />

                <View style={styles.streetContainer}>

                    <View style={styles.streetWrapper}>

                        <TextInput
                            style={[styles.input, styles.input.placeholderText]}
                            placeholder="Straße"
                            onChangeText={(text) => setStreet(text)}
                            value={street}
                        />
                    </View>

                    <View style={styles.nrWrapper}>

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
                        <TextInput
                            style={[styles.input, styles.input.placeholderText]}
                            placeholder="PLZ"
                            onChangeText={(text) => setZip(text)}
                            value={zip}
                        />
                    </View>
                
                    <View style={styles.placeWrapper}>
                        <TextInput
                            style={[styles.input, styles.input.placeholderText]}
                            placeholder="Ort"
                            onChangeText={(text) => setPlace(text)}
                            value={place}
                        />
                    </View>

                </View>

                <TextInput
                    style={[styles.input, styles.input.placeholderText]}
                    placeholder="Telefon"
                    onChangeText={(text) => setPhone(text)}
                    value={phone}
                />

                <TextInput
                    style={[styles.input, styles.input.placeholderText]}
                    placeholder="Webseite"
                    onChangeText={(text) => setWebsite(text)}
                    value={website}
                />

                <View style={styles.btnContainer}>
                    <TouchableOpacity style={[styles.createBtn, styles.button]} >
                        <Text style={styles.createBtnText}>Speichern</Text>
                    </TouchableOpacity>
                </View>

                </ScrollView>
            </View>
        </View>  
    </>
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: 20
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: 'gray',
        borderBottomWidth: 1, 
        borderColor: '#e0e0e0', 
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

export default CustomerDetails;