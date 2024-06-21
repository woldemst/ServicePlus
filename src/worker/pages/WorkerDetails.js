import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";

import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "../../util/validators";
import Input from '../../shared/UIElements/Input'
import Button from '../../shared/UIElements/Button'
import { refershData } from "../../actions/utilActions";
import { useNavigation, useRoute } from "@react-navigation/native";
import Avatar from "../../../components/Avatar";


const WorkerDetails = props => {
    const route = useRoute()
    const workerId = route.params.id
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const firmId = useSelector(state => state.context.firmId)
    const workersArr = useSelector(state => state.worker.workersArray.workers)
    const worker = workersArr.find(worker => worker._id == workerId)
    const admin = useSelector(state => state.context.admin)
    const userId = useSelector(state => state.context.userId)

    const [isLoaded, setIsLoaded] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const [formData, setFormData] = useState({
        name: worker.name,
        email: worker.email,
        street: worker.street,
        houseNr: worker.houseNr,
        zip: worker.zip,
        place: worker.place,
        phone: worker.phone,
        website: worker.website,
        description: worker.description,
    })

    useEffect(() => setIsLoaded(true), [])

    useEffect(() => {
        const convertBinaryToBase64 = () => {
            if (worker.profileImg && worker.profileImg.data && worker.profileImg.contentType) {
                const base64Image = `data:${worker.profileImg.contentType};base64,${worker.profileImg.data.toString('base64')}`;
                setImage(base64Image);
            }
        }

        convertBinaryToBase64()
        setIsLoaded(true)

    }, [worker])

    const handleEdit = () => setIsEdit(!isEdit)
    const handleImageChange = useCallback((imageUri) => setImage(imageUri), []);


    const resetPasswordHandler = () => {
        navigation.navigate('resetPassword')
    }

    const handleSubmit = async () => {
        const URL = `http://192.168.178.96:8000/api/workers/${firmId}/update/${workerId}`

        setIsUploading(true);

        try {

            const formDataToSubmit = new FormData();
            formDataToSubmit.append("workerId", workerId);
            formDataToSubmit.append("firmId", firmId);
            formDataToSubmit.append("name", formData.name);
            formDataToSubmit.append("email", formData.email);
            formDataToSubmit.append("street", formData.street);
            formDataToSubmit.append("houseNr", formData.houseNr);
            formDataToSubmit.append("zip", formData.zip);
            formDataToSubmit.append("place", formData.place);
            formDataToSubmit.append("phone", formData.phone);
            formDataToSubmit.append("description", formData.description);

            if (image && image !== `data:${worker.profileImg.contentType};base64,${worker.profileImg.data.toString('base64')}`) {
                const uriParts = image.split('.');
                const fileType = uriParts[uriParts.length - 1];
                formDataToSubmit.append('avatar', {
                    uri: image,
                    name: `profile.${fileType}`,
                    type: `image/${fileType}`,
                });
            }

            await axios.patch(URL, formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            setIsEdit(false)
            window.alert('Profile aktualisiert!')
        } catch (err) {
            console.log("Error while updating worker's profile", err);
        } finally {
            dispatch(refershData())
            setIsUploading(false)
        }
    }


    return !worker ? (
        <ActivityIndicator style={styles.loader} size="large" color="#7A9B76" />
    ) : (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.inner}>
                    <View style={styles.imgContainer}>
                        <Avatar
                            source={image ? { uri: image } : require('../../../assets/customer/customer_avatar.jpg')}
                            onImagePicked={handleImageChange}
                            isEdit={!isEdit}
                        />
                    </View>
                    {isLoaded && (
                        <View style={styles.content}>
                            <Input
                                placeholder="Name des Mitarbeiter"
                                errorText='Type a name of worker'
                                disabled={!isEdit}
                                value={formData.name}
                                validators={[VALIDATOR_REQUIRE()]}
                                onChangeText={(value) => setFormData({ ...formData, name: value })}

                            />

                            <Input
                                placeholder="Email des Mitarbeiter"
                                errorText='Type an email of worker'
                                disabled={!isEdit}
                                value={formData.email}
                                validators={[VALIDATOR_EMAIL()]}
                                onChangeText={(value) => setFormData({ ...formData, email: value })}
                            />


                            <View style={styles.streetContainer}>
                                <View style={styles.streetWrapper}>
                                    <Input
                                        placeholder="Straße des Mitarbeiter"
                                        errorText='Type an email of worker'
                                        disabled={!isEdit}
                                        value={formData.street}
                                        validators={[VALIDATOR_REQUIRE()]}
                                        onChangeText={(value) => setFormData({ ...formData, street: value })}
                                    />
                                </View>

                                <View style={styles.nrWrapper}>
                                    <Input
                                        placeholder="Housnummer des Mitarbeiter"
                                        errorText='House number'
                                        disabled={!isEdit}
                                        value={formData.houseNr}
                                        validators={[VALIDATOR_REQUIRE()]}
                                        onChangeText={(value) => setFormData({ ...formData, houseNr: value })}
                                    />
                                </View>
                            </View>

                            <View style={styles.zipContainer}>
                                <View style={styles.zipWrapper}>
                                    <Input
                                        placeholder="PLZ des Mitarbeiter"
                                        errorText='Type a zip code of worker'
                                        disabled={!isEdit}
                                        value={formData.zip}
                                        validators={[VALIDATOR_REQUIRE()]}
                                        onChangeText={(value) => setFormData({ ...formData, zip: value })}

                                    />
                                </View>

                                <View style={styles.placeWrapper}>
                                    <Input
                                        placeholder="Ort des Mitarbeiter"
                                        errorText='Type a place of worker'
                                        disabled={!isEdit}
                                        value={formData.place}
                                        validators={[VALIDATOR_REQUIRE()]}
                                        onChangeText={(value) => setFormData({ ...formData, place: value })}
                                    />
                                </View>
                            </View>

                            <Input
                                placeholder="Phone des Mitarbeiter"
                                errorText='Type a phone of worker'
                                disabled={!isEdit}
                                value={formData.phone}
                                validators={[VALIDATOR_REQUIRE()]}
                                onChangeText={(value) => setFormData({ ...formData, phone: value })}
                            />

                            <Input
                                placeholder="Beschreibung des Mitarbeiter"
                                errorText='Type a description of the worker'
                                disabled={!isEdit}
                                value={formData.description}
                                validators={[VALIDATOR_REQUIRE()]}
                                onChangeText={(value) => setFormData({ ...formData, description: value })}
                                multiline={true}
                                textArea={true}
                            />


                            {(!admin && userId === workerId) && (
                                <View style={styles.passwortBtnContainer}>
                                    <Button
                                        style={isEdit ? [styles.passwordBtn, styles.button] : [styles.invalidePasswordButton, styles.button]}
                                        buttonText={styles.changePasswordBtn}
                                        onPress={resetPasswordHandler}
                                        title={"Passwort ändern"}
                                        disabled={!isEdit}
                                    />
                                </View>
                            )}

                            {admin || userId === workerId ? (
                                <View style={styles.btnContainer}>
                                    <Button
                                        style={isEdit ? [styles.createBtn, styles.button] : [styles.invalideButton, styles.button]}
                                        buttonText={styles.createBtnText}
                                        onPress={isEdit ? handleSubmit : handleEdit}
                                        title={isEdit ? "Speichern" : "Ändern"}
                                    />
                                </View>
                            ) : null}

                        </View>
                    )}
                </View>
            </ScrollView>
            {isUploading && (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#7A9B76" />
                </View>
            )}
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        // paddingBottom: 30,
        flex: 1,
        justifyContent: 'space-between',
        borderWifth: 1,
        borderColor: 'red',
    },
    inner: {
        paddingVertical: 16,
    },
    content: {
        // flex: 1,
        // justifyContent: 'flex-end',
        // borderWifth: 1,
        // borderColor: 'red',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: 'gray',
        borderBottomWidth: 1,
        borderColor: 'gray',
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
        width: '76%'
    },
    nrWrapper: {
        width: '21%'
    },
    zipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    zipWrapper: {
        width: '36%'
    },
    placeWrapper: {
        width: '61%'
    },
    label: {
        marginTop: 12,
        marginBottom: 6,
        fontSize: 18
    },

    btnContainer: {
        flexDirection: 'row',
        marginTop: 16
    },
    passwortBtnContainer: {
        marginTop: 12

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
    createBtn: {
        backgroundColor: '#7A9B76',
    },
    createBtnText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '700'
    },
    passwordBtn: {
        borderColor: '#e0e0e0',
        borderWidth: 1
    },
    changePasswordBtn: {
        fontSize: 16,
        color: 'gray',
        // fontWeight: '700'
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
    invalidePasswordButton: {
        height: 53,
        backgroundColor: '#eee',
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        borderColor: '#e0e0e0',
        borderWidth: 1,
    },
    loader: {
        flex: 1,
        // borderWidth: 1,
        // borderColor: 'red',
    },
    imgContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        height: 400,
        // borderWidth: 1,
        // borderColor: 'red',
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

})

export default WorkerDetails;