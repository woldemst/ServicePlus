import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";


import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE, VALIDATOR_SELECT } from "../../util/validators";
import { AuthContext } from "../../context/auth-context";
import Button from "../../shared/UIElements/Button";
import Select from "../../shared/UIElements/Select";
import Input from "../../shared/UIElements/Input";
import { setInitialSelectData } from "../../actions/selectActions";
import { setInitialInputData } from "../../actions/inputActions";


const Register = () => {
    const auth = useContext(AuthContext)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [isLoaded, setIsLoaded] = useState(false)

    const initialInputState = {
        name: {
            value: "",
            isValid: false,
        },
        email: {
            value: "",
            isValid: false,
        },
        password: {
            value: "",
            isValid: false,
        },
    }

    const initialSelectState = {
        selects: {
            role: [
                { key: "1", value: "Owner" },
                { key: "2", value: "Worker" },
            ],
        },
        selectedOptions: {
            role: {
                value: "",
                isValid: false,
            }
        },
    };

    useEffect(() => {
        setIsLoaded(true)
        dispatch(setInitialInputData(initialInputState))
        dispatch(setInitialSelectData(initialSelectState))
    }, [])

    const fetchedInputData = useSelector(state => state.input)
    const fetchedSelectData = useSelector(state => state.select)
    const options = initialSelectState.selects.role;

    console.log('register' ,fetchedSelectData)
    async function handleSubmit() {
        const URL = "http://localhost:8000/api/users/register";

        console.log('before api', fetchedSelectData);
        try {
            const response = await axios.post(URL, {
                name: fetchedInputData.inputs.name.value,
                email: fetchedInputData.inputs.email.value,
                password: fetchedInputData.inputs.password.value,
                role: fetchedSelectData.selectedOptions.role.value
            });



            if (response.status === 201) {
                auth.login(response.data.userId, response.data.token, response.data.role, response.data.firmId)
                navigation.navigate('overviewNavigator');
                // alert('User created');
            } else {
                alert('User already exists, please log in instead');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>

            <Text style={styles.logoText}>ServicePlus</Text>
            <Text style={styles.title}>Registrieren</Text>

            {isLoaded && (
                <>

                    <Input
                        id='name'
                        reducerKey='register'
                        fieldName='name'
                        placeholder="Name"
                        errorText='Type a name'
                        value={fetchedInputData.inputs.name.value}
                        validators={[VALIDATOR_REQUIRE()]}

                    />

                    <Input
                        id='email'
                        reducerKey='register'
                        fieldName='email'
                        placeholder="Email"
                        errorText='Choose another email'
                        value={fetchedInputData.inputs.email.value}
                        validators={[VALIDATOR_EMAIL()]}

                    />

                    <Input
                        id='password'
                        reducerKey='register'
                        fieldName='password'
                        placeholder="Password"
                        errorText='Type a password'
                        value={fetchedInputData.inputs.password.value}
                        validators={[VALIDATOR_MINLENGTH(6)]}
                    />

                    <Select
                        id='role'
                        reducerKey='register'
                        search={false}
                        fieldName='role'
                        placeholder="Role"
                        data={options}
                        validators={[VALIDATOR_SELECT()]}

                    />
                </>
            )}



            <Text style={styles.notice}>Passwort vergessen?</Text>

            <Button
                style={styles.button}
                // style={fetchedData.isFormValid ? styles.button : styles.invalideButton}
                // disabled={!fetchedData.isFormValid}
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