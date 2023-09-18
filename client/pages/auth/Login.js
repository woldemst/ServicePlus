import { View, Text, TextInput, TouchableOpacity ,StyleSheet} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Login = () => {

    const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = async() =>{
        const apiUrl = "http://localhost:8000/api/users/login";

        const response = await axios.post(apiUrl, {
            email: email,
            password: password
        })

        // alert(response)
        navigation.navigate('overview', {title: 'Overview'})
    }


    return (
        <View style={styles.container}>

            <Text style={styles.logoText}>ServicePlus</Text>
            <Text style={styles.title}>Sign in</Text>

            {/* {error && <Text style={styles.error}>{error}</Text>} */}

        
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />

            <Text style={styles.notice} >Passwort vergessen?</Text>

            <TouchableOpacity style={styles.button} onPress={handleSignIn} >
                <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>


            <View style={styles.inviteContainer}>
                <Text style={styles.inviteText} >Haben Sie noch keinen Account? </Text>

                <TouchableOpacity onPress={()=>{navigation.navigate('register', {name: '​Registrierung'})}}>
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