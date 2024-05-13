import {
    View,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import { useState, useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../../util/validators";
import { AuthContext } from "../../context/auth-context";
import Button from "../../shared/UIElements/Button";
import Input from "../../shared/UIElements/Input";

const Login = () => {
    const auth = useContext(AuthContext)
    const navigation = useNavigation()

    const [isLoginMode, setIsLoginMode] = useState(true)
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleSignIn = async () => {
        setLoading(true);
        // console.log(formData);
        const apiUrl = "http://localhost:8000/api/users/login";

        try {
            const response = await axios.post(apiUrl, {
                email: formData.email,
                password: formData.password,
            });

            // console.log('response', response.data);
            auth.login(response.data.userId, response.data.token, response.data.admin, response.data.firmId)
            console.log(response.data);
            
            if (!auth.firmId) {
                navigation.navigate('overviewNavigator', {
                    screen: 'FirmView',
                });
            } else {
                navigation.navigate('overviewNavigator')
            }

            navigation.reset({
                index: 0,
                routes: [{ name: 'overviewNavigator' }]
            })
        } catch (err) {
            // Handle login failure
            Alert.alert("Login Failed", "Invalid email")
        } finally {
            setLoading(false);
        }




        setIsLoginMode(prev => !prev)
    }


    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>

                    <Text style={styles.logoText}>ServicePlus</Text>
                    <Text style={styles.title}>Sign in</Text>

                    {/* {error && <Text style={styles.error}>{error}</Text>} */}


                    <Input
                        placeholder="Email"
                        errorText="Please enter a valid email"
                        value={formData.email}
                        onChangeText={(text) => setFormData({ ...formData, email: text })}
                        validators={[VALIDATOR_EMAIL()]}
                        isEdit={true}
                    />

                    <Input
                        placeholder="Password"
                        value={formData.password}
                        onChangeText={(text) => setFormData({ ...formData, password: text })}
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        errorText="Password must be at least 6 characters long"

                    // secureTextEntry
                    />

                    {/* <TouchableOpacity onPress={() => navigation.navigate('forgotPassword')}> */}
                    <Text style={styles.notice}>Forgot your password?</Text>
                    {/* </TouchableOpacity> */}

                    <Button
                        style={styles.button}
                        onPress={handleSignIn}
                        title={loading ? "Signing in..." : "Sign in"}
                        disabled={loading}
                    />

                    <View style={styles.inviteContainer}>
                        <Text style={styles.inviteText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('register')}>
                            <Text style={styles.registerBtn}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>


        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',


        // borderWidth: 1,
        // borderColor: 'red'
    },
    inner: {
        paddingLeft: 21,
        paddingRight: 21,
        paddingTop: 21,
        paddingBottom: 105,

    },
    logoText: {
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 60, // Adjust margin to create space between logo and title
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


