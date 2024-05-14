import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_SELECT } from "../../util/validators";
import { AuthContext } from "../../context/auth-context";
import Button from "../../shared/UIElements/Button";
import Select from "../../shared/UIElements/Select";
import Input from "../../shared/UIElements/Input";



const Register = () => {
    const auth = useContext(AuthContext)
    const navigation = useNavigation()

    const [isLoaded, setIsLoaded] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        admin: null,
    })

    useEffect(() => {
        setIsLoaded(true);
    }, []);


    async function handleSubmit() {
        const URL = "http://localhost:8000/api/users/register";

        try {
            const response = await axios.post(URL, {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                admin: formData.admin
            });

            // console.log(formData); 
            // console.log(response.status);

            if (response.status === 201) {
                auth.login(response.data.userId, response.data.token, response.data.admin, response.data.firmId)
                navigation.navigate('overviewNavigator', {
                    screen: 'FirmView',
                });
                console.log(response.data);
                // alert('User created');
            } else {
                console.log(response.data);
                alert('User already exists, please log in instead');

            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 403) {
                    Alert.alert('Der Benutzer ist bereits als Nicht-Administrator registriert. Bitte melden Sie sich stattdessen an');
                } else {
                    alert('Forbidden: You do not have permission to access this resource');
                }
            } else {
                console.error(error);
            }
        }
    }

    return (
        <View style={styles.container}>

            <Text style={styles.logoText}>ServicePlus</Text>
            <Text style={styles.title}>Registrieren</Text>

            {isLoaded && (
                <>
                    <Input
                        placeholder="Name"
                        value={formData.name}
                        onChangeText={(text) => setFormData({ ...formData, name: text })}
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter your name"
                        isEdit={true}
                    />

                    <Input
                        placeholder="Email"
                        value={formData.email}
                        onChangeText={(text) => setFormData({ ...formData, email: text })}
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email"
                    />

                    <Input
                        placeholder="Password"
                        value={formData.password}
                        onChangeText={(text) => setFormData({ ...formData, password: text })}

                        validators={[VALIDATOR_MINLENGTH(6)]}
                        errorText="Password must be at least 6 characters long"
                        secureTextEntry
                    />

                    <Select
                        placeholder="Role"
                        value={formData.admin}
                        onValueChange={(option) => setFormData({ ...formData, admin: option })}
                        data={[
                            { label: "Owner", value: true },
                            { label: "Worker", value: false },
                        ]}
                        validators={[VALIDATOR_SELECT()]}
                        errorText="Please select a role"
                        search={false}
                    />
                </>
            )}


            <Text style={styles.notice}>Passwort vergessen?</Text>

            <Button
                style={styles.button}
                buttonText={styles.buttonText}
                onPress={handleSubmit}
                title={'Sign up'}

            />


            <View style={styles.inviteContainer}>
                <Text style={styles.inviteText}>Sie haben schon einen Account?</Text>
                <TouchableOpacity onPress={() => { navigation.navigate('login') }}>
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
    select: {
        height: 50,
        borderColor: 'gray',
        color: 'red',
        borderWidth: 1,
        marginTop: 14,
        alignItems: 'center',
        borderRadius: 0
    },
    placeholder: {
        color: "red",
        fontSize: 18,
    }
})

export default Register;



