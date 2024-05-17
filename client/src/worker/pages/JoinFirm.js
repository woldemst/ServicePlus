import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useContext, useState } from "react";
import axios from "axios";

import { AuthContext } from "../../context/auth-context";
import Input from "../../shared/UIElements/Input";
import { VALIDATOR_REQUIRE } from "../../util/validators";
import Button from "../../shared/UIElements/Button";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { refershData } from "../../actions/utilActions";


const JoinFirm = props => {
    const auth = useContext(AuthContext)
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [formData, setFormData] = useState({ firmId: '' })

    const joinHandler = async () => {
        try {
            const URL = `http://localhost:8000/api/workers/${formData.firmId}/join/${auth.userId}`
            // console.log('URL', URL);
            const response = await axios.post(URL)
            alert("Erfolgreich beigetreten!");
            // console.log('response', response.data)
            auth.updateId(response.data.firmId)
            dispatch(refershData())
        } catch (err) {
            alert("Fehler beim Beitreten!");
        }
    }


    return <>
        <View style={styles.container}>
            <Text style={styles.headline}>Gib die Betriebs-ID ein, um beizutreten.</Text>
            <Input
                placeholder="Betrieb ID"
                errorText="Bitte geben Sie eine gültige Betrieb-ID ein"
                style={styles.input}
                inputInvalid={styles.inputInvalid}
                errorTextStyle={styles.errorTextStyle}
                value={formData.firmId}
                onChangeText={(value) => setFormData({ ...formData, firmId: value })}
                validators={[VALIDATOR_REQUIRE()]}
                isEdit={true}
            />
            <View style={styles.btnContainer}>
                <Button
                    style={styles.button}
                    onPress={joinHandler}
                    title="Weiter"
                    buttonText={styles.buttonText}
                    disabled={!!formData.firmId ? false : true}
                />
            </View>
        </View>
    </>
}

const styles = StyleSheet.create({

    // join functionality
    container: {
        flex: 1,
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

export default JoinFirm;

