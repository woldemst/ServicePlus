import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { updateUserData } from "../../actions/userActions";
import axios from "axios";

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../../util/validators";
import { updateAndValidateLoginField } from "../../actions/loginActions";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../context/auth-context";
import Input from "../../shared/UIElements/Input";
import Button from "../../shared/UIElements/Button";

const Login = () => {
    const auth = useContext(AuthContext)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [isLoginMode, setIsLoginMode] = useState(true)
    const fetchedData = useSelector(state => state.login)

    // console.log(fetchedData);

    const handleSignIn = async () => {
        const apiUrl = "http://localhost:8000/api/users/login";

        const response = await axios.post(apiUrl, {
            email: fetchedData.inputs.email.value,
            password: fetchedData.inputs.password.value,
        })

        // console.log('submited',fetchedData);
        auth.login(response.data.userId, response.data.token, response.data.role, response.data.firmId)
        navigation.navigate('overviewNavigator')

        navigation.reset({
            index: 0,
            routes: [{ name: 'overviewNavigator' }]
        })

        setIsLoginMode(prev => !prev)
    }

    const handleInputChange = (fieldName, value, validators) => {
        dispatch(updateAndValidateLoginField(fieldName, value, validators))
        
    }


    return (
        <View style={styles.container}>

            <Text style={styles.logoText}>ServicePlus</Text>
            <Text style={styles.title}>Sign in</Text>

            {/* {error && <Text style={styles.error}>{error}</Text>} */}

            <Input
                id='email'
                fieldName='email'
                placeholder="Email"
                errorText='Choose another email'
                value={fetchedData.inputs.email.value}
                validators={[VALIDATOR_EMAIL()]}
                onChange={handleInputChange}
            />

            <Input
                id='password'
                fieldName='password'
                placeholder='Password'
                errorText='Type a password'
                value={fetchedData.inputs.password.value}
                validators={[VALIDATOR_MINLENGTH(6)]}
                onChange={handleInputChange}

            />

            <Text style={styles.notice} >Passwort vergessen?</Text>

            <Button
                style={fetchedData.isFormValid ? styles.button : styles.invalideButton}
                disabled={!fetchedData.isFormValid}
                onPress={handleSignIn}
                buttonText={styles.buttonText}
                title={'Sign in'}

            />

            <View style={styles.inviteContainer}>
                <Text style={styles.inviteText} >Haben Sie noch keinen Account? </Text>

                <TouchableOpacity onPress={() => { navigation.navigate('register', { name: '​Registrierung' }) }}>
                    <Text style={styles.registerBtn} >Registrieren</Text>
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

export default Login;