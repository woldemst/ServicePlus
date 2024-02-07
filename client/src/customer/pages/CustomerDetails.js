import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getCustomerData, updateCustomerData} from '../../actions/customerActions'
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/auth-context";
 
const CustomerDetails = props => {
    const auth = useContext(AuthContext)
    const navigation = useNavigation()
    const [formData, setFormData] = useState({})
    const customerId = props.id 
    const dispatch = useDispatch()
    // const fetchedData = useSelector(state => state.customer)


    useEffect(()=> {    
        const fetchCustomer = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/customers/${customerId}`)

                dispatch(getCustomerData(response.data.customer))
                setFormData(response.data.customer)
            } catch (err) {
                console.log("Error fetching customer profile", err);
            }
        }
        fetchCustomer()

    }, [dispatch])


    const handleChange = (field, value) => {
        setFormData(prevData => ({
            ...prevData, 
            [field]: value
        }))
    }


    const handleSubmit = async () => {

        try {
            const response = await axios.patch(`http://localhost:8000/api/customers/${customerId}`, formData)
            dispatch(updateCustomerData(response.data))
            props.toggle()
            props.handleRefresh();
            window.alert('Customer updated!')
        } catch (err) {
            console.log("Error fetching while updating customers' profile", err);
        }
    }
    

    return <>
        <View>
            <View style={styles.container}> 
                <ScrollView showsVerticalScrollIndicator={false}>

                <TextInput
                    style={[styles.input, styles.input.placeholderText]}
                    placeholder="Name"
                    onChangeText={(text) => handleChange('name', text)}
                    value={formData.name}
                />

                <TextInput
                    style={[styles.input, styles.input.placeholderText]}
                    placeholder="Email"
                    onChangeText={(text) => handleChange('email', text)}
                    value={formData.email}
                />

                <View style={styles.streetContainer}>
                    <View style={styles.streetWrapper}>
                        <TextInput
                            style={[styles.input, styles.input.placeholderText]}
                            placeholder="Straße"
                            onChangeText={(text) => handleChange('street', text)}
                            value={formData.street}
                        />
                    </View>

                    <View style={styles.nrWrapper}>
                        <TextInput
                            style={[styles.input, styles.input.placeholderText]}
                            placeholder="Nr."
                            onChangeText={(text) => handleChange('houseNr', text)}
                            value={formData.houseNr}
                        />
                    </View>
                </View>

                <View style={styles.zipContainer}>
                    <View style={styles.zipWrapper}>
                        <TextInput
                            style={[styles.input, styles.input.placeholderText]}
                            placeholder="PLZ"
                            onChangeText={(text) => handleChange('zip', text)}
                            value={formData.zip}
                        />
                    </View>
                
                    <View style={styles.placeWrapper}>
                        <TextInput
                            style={[styles.input, styles.input.placeholderText]}
                            placeholder="Ort"
                            onChangeText={(text) => handleChange('place', text)}
                            value={formData.place}
                        />
                    </View>
                </View>

                <TextInput
                    style={[styles.input, styles.input.placeholderText]}
                    placeholder="Telefon"
                    onChangeText={(text) => handleChange('phone', text)}
                    value={formData.phone}
                />

                <TextInput
                    style={[styles.input, styles.input.placeholderText]}
                    placeholder="Webseite"
                    onChangeText={(text) => handleChange('website', text)}
                    value={formData.website}
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