import { View, Text, TextInput, TouchableOpacity ,StyleSheet} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Register = () => {
    const navigation = useNavigation()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showError, setShowError] = useState(false)

    const handleSubmit = async () => {
        const URL = "http://localhost:8000/api/users/register";

     




        try {
            const response = await axios.post(URL, {
                name: name,
                email: email, 
                password: password
            })

            if (response.status === 201) {
                navigation.navigate('overview');
                alert('User created');
            } else {
                setShowError(true);
                // alert('User already exists, please log in instead');
            }
        } catch (error) {
            setShowError(true);
            // alert('User already exists, please log in instead');
            // You can log the error to see more details in the console
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>

            <Text style={styles.logoText}>ServicePlus</Text>
            <Text style={styles.title}>Registrieren</Text>

            {/* {error && <Text style={styles.error}>{error}</Text>} */}

            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={(text) => setName(text)}
                value={name}
            />
        
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}

            />
            {showError && <Text>User already exists, please log in instead or choose another email</Text>}

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />

            <Text style={styles.notice} >Passwort vergessen?</Text>

            <TouchableOpacity style={styles.button} onPress={handleSubmit} >
                <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>


            <View style={styles.inviteContainer}>

                <Text style={styles.inviteText} >Sie haben schon einen Account? </Text>

                <TouchableOpacity onPress={()=>{navigation.navigate('login')}}>
                    <Text style={styles.registerBtn} >Zurück zum Login</Text>
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