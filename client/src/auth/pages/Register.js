import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import { clearField } from "../../actions/userActions";
import Button from "../../shared/UIElements/Button";
import Input from "../../shared/UIElements/Input";

const Register = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const fetchedData = useSelector(state => state.user)


    const handleSubmit = async () => {
        const URL = "http://localhost:8000/api/users/register";


        try {
            const response = await axios.post(URL, {
                name: fetchedData.name.value,
                email: fetchedData.email.value,
                password: fetchedData.password.value
            })

            dispatch(clearField())

            if (response.status === 201) {
                navigation.navigate('overview');
                alert('User created');
            } else {
                // alert('User already exists, please log in instead');

            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>

            <Text style={styles.logoText}>ServicePlus</Text>
            <Text style={styles.title}>Registrieren</Text>

            <Input
                id='name'
                fieldName='name'
                placeholder="Name"
                errorText='Type a name'
                value={fetchedData.name.value}
                validators={[VALIDATOR_REQUIRE()]}
            />

            <Input
                id='email'
                fieldName='email'
                placeholder="Email"
                errorText='Choose another email'
                value={fetchedData.email.value}
                validators={[VALIDATOR_EMAIL()]}
            />

            <Input
                id='password'
                fieldName='password'
                placeholder="Password"
                errorText='Type a password'
                value={fetchedData.password.value}
                validators={[VALIDATOR_MINLENGTH(6)]}
            />

            <Text style={styles.notice}>Passwort vergessen?</Text>

            <Button 
                style={fetchedData.isFormValid ? styles.button : styles.invalideButton}
                disabled={!fetchedData.isFormValid} 
                buttonText={styles.buttonText}
                onPress={handleSubmit}
                title={'Sign up'} 
            />


            <View style={styles.inviteContainer}>
                <Text style={styles.inviteText}>Sie haben schon einen Account?</Text>

                <TouchableOpacity onPress={() => {navigation.navigate('login') }}>
                    <Text style={styles.registerBtn}>Zurück zum Login</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 21,
        paddingBottom: 45,

    },
    logoText: {
        fontSize: 32,
        position: 'absolute',
        textAlign: 'center',
        top: 160,
        right: 0,
        left: 0,
    },
    title: {
        fontSize: 27,
        fontWeight: '700',
        marginBottom: 16,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 14,
        padding: 7,
    },
    notice: {
        marginTop: 21,
        marginBottom: 21,
        textAlign: 'right',
        fontSize: 14,
        fontWeight: '700'

    },
    inviteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        // borderColor: 'red',
        // borderWidth: 2,

    },
    inviteText: {
        fontSize: 14,
        fontWeight: '400',

    },
    registerBtn: {
        fontSize: 14,
        fontWeight: '700',
        color: '#7A9B76'
    },
    button: {
        height: 53,
        width: '100%',
        backgroundColor: '#7A9B76',
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
        // flex: 1
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
    buttonText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '700'
    },
    error: {
        color: 'red',
        marginBottom: 12,
    },

})

export default Register;