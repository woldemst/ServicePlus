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


import { VALIDATOR_MINLENGTH } from "../../util/validators";
import { AuthContext } from "../../context/auth-context";
import Button from "../../shared/UIElements/Button";
import Input from "../../shared/UIElements/Input";

const ResetPassword = () => {
    const auth = useContext(AuthContext)
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        actualPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const handleSubmit = async () => {
        if (formData.newPassword !== formData.confirmPassword) {
            Alert.alert('Passwörter stimmen nicht überein');
            return;
        }

        setLoading(true);

        try {
            const URL = `http://localhost:8000/api/workers/resetPassword/${auth.userId}`
            const response = await axios.post(URL, {
                actualPassword: formData.actualPassword,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword
            });

            Alert.alert(response.data.message);

            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'overviewNavigator' }]
            // })
            navigation.navigate('overviewNavigator', { screen: 'FirmView' });
        } catch (err) {
            Alert.alert("Passwortänderung fehlgeschlagen" + err)
        } finally {
            setLoading(false);
        }
    }
    return (
        <View style={styles.inner}>
            <Input
                placeholder="Aktuelles Passwort"
                value={formData.actualPassword}
                onChangeText={(text) => setFormData({ ...formData, actualPassword: text })}
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Geben Sie das alte Passwort ein"
            // secureTextEntry
            />
            <Input
                placeholder="Neues Passwort"
                value={formData.newPassword}
                onChangeText={(text) => setFormData({ ...formData, newPassword: text })}
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Geben Sie neues Passwort ein"
            // secureTextEntry
            />
            <Input
                placeholder="Neues Passwort wiederholen"
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Wiederholen Sie das neue Passwort"
            // secureTextEntry
            />
            <View style={styles.btnContainer}>
                <Button
                    style={styles.button}
                    onPress={handleSubmit}
                    title={"Zurücksetzen"}
                    buttonText={styles.buttonText}
                    disabled={loading}
                />
            </View>

        </View>
    )
}


const styles = StyleSheet.create({

    // join functionality
    inner: {
        flex: 1,
        padding: 20,
        paddingTop: 12,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        // borderColor: 'red',
        // borderWidth: 2
    },
    headline: {
        fontSize: 16,
        // fontWeight: '500',
        marginBottom: 24,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 4,
        // marginTop: 14,
        padding: 7,
    },
    inputInvalid: {
        width: '100%',
        height: 50,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 4,
        // marginTop: 18,
        padding: 7,
    },
    errorTextStyle: {
        fontSize: 12,
        color: 'red',
        position: 'absolute',
        top: 55,
        left: 0,
    },
    btnContainer: {
        flexDirection: "row",
        marginTop: 24,
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

export default ResetPassword