import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../../util/validators";
import Input from "../../shared/UIElements/Input";
import Button from "../../shared/UIElements/Button";
import { refershData } from "../../actions/utilActions";
import { useRoute } from "@react-navigation/native";
import Avatar from "../../../components/Avatar";

const CustomerDetails = (props) => {
    const route = useRoute();
    const customerId = route.params.id;
    const dispatch = useDispatch();

    const firmId = useSelector(state => state.context.firmId)
    const customersArray = useSelector((state) => state.customer.customersArray.customers);
    const admin = useSelector(state => state.context.admin)

    const customer = customersArray.find(customer => customer._id == customerId)
    // console.log(customer);

    const [isLoaded, setIsLoaded] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [formData, setFormData] = useState({ ...customer })
    const [image, setImage] = useState('');
    const [isUploading, setIsUploading] = useState(false);


    useEffect(() => setIsLoaded(true), [])

    useEffect(() => {
        const convertBinaryToBase64 = () => {
            if (customer.profileImg && customer.profileImg.data && customer.profileImg.contentType) {
                const base64Image = `data:${customer.profileImg.contentType};base64,${customer.profileImg.data.toString('base64')}`;
                setImage(base64Image);
            }
        }

        convertBinaryToBase64()
        setIsLoaded(true)

    }, [customer])


    const handleImageChange = useCallback((imageUri) => setImage(imageUri), []);

    const handleEdit = () => setIsEdit(!isEdit)

    const handleSubmit = async () => {
        const URL = `http://192.168.178.96:8000/api/customers/${firmId}/update/${customerId}`

        setIsUploading(true);
        try {
            const formDataToSubmit = new FormData();
            formDataToSubmit.append("customerId", customerId);
            formDataToSubmit.append("firmId", firmId);
            formDataToSubmit.append("name", formData.name);
            formDataToSubmit.append("email", formData.email);
            formDataToSubmit.append("street", formData.street);
            formDataToSubmit.append("houseNr", formData.houseNr);
            formDataToSubmit.append("zip", formData.zip);
            formDataToSubmit.append("place", formData.place);
            formDataToSubmit.append("phone", formData.phone);
            formDataToSubmit.append("website", formData.website);
            formDataToSubmit.append("description", formData.description);


            if (image && image !== `data:${customer.profileImg.contentType};base64,${customer.profileImg.data.toString('base64')}`) {
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
            });

            setIsEdit(false)
            dispatch(refershData())
            window.alert("Customer updated!");
        } catch (err) {
            console.log("Error while updating a customer's profile", err);
        } finally {
            setIsUploading(false)
        }
    };


    return !customer ? (
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
                                placeholder="Name des Kunden"
                                errorText="Geben Sie den Namen des Kunden"
                                disabled={!isEdit}
                                value={formData.name}
                                validators={[VALIDATOR_REQUIRE()]}
                                onChangeText={(value) => setFormData({ ...formData, name: value })}
                            />

                            <Input
                                disabled={!isEdit}
                                placeholder="E-Mail des Kunden"
                                errorText="Geben Sie eine E-Mail des Kunden"
                                value={formData.email}
                                validators={[VALIDATOR_EMAIL()]}
                                onChangeText={(value) => setFormData({ ...formData, email: value })}
                            />
                            <View style={styles.streetContainer}>
                                <View style={styles.streetWrapper}>
                                    <Input
                                        placeholder="Straße des Kunden"
                                        errorText="Geben Sie die Straße des Kunden ein"
                                        disabled={!isEdit}
                                        value={formData.street}
                                        validators={[VALIDATOR_REQUIRE()]}
                                        onChangeText={(value) => setFormData({ ...formData, street: value })}
                                    />
                                </View>

                                <View style={styles.nrWrapper}>
                                    <Input
                                        placeholder="Housnummmer des Kunden"
                                        errorText="Geben Sie die Housnummmer des Kunden ein"
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
                                        placeholder="PLZ des Kunden"
                                        disabled={!isEdit}
                                        value={formData.zip}
                                        validators={[VALIDATOR_REQUIRE()]}
                                        errorText="Geben Sie das PLZ des Kunden ein"
                                        onChangeText={(value) => setFormData({ ...formData, zip: value })}
                                    />
                                </View>


                                <View style={styles.placeWrapper}>
                                    <Input
                                        placeholder="Der Ort des Kunden"
                                        errorText="Geben Sie den Ort des Kunden ein"
                                        disabled={!isEdit}
                                        value={formData.place}
                                        validators={[VALIDATOR_REQUIRE()]}
                                        onChangeText={(value) => setFormData({ ...formData, place: value })}
                                    />
                                </View>
                            </View>


                            <Input
                                placeholder="Telefonnumer"
                                errorText="Geben Sie die Telefonnumer Kunden ein"
                                disabled={!isEdit}
                                value={formData.phone}
                                validators={[VALIDATOR_REQUIRE()]}
                                onChangeText={(value) => setFormData({ ...formData, phone: value })}
                            />

                            <Input
                                placeholder="Website"
                                errorText="Geben Sie die Webseite des Kunden ein"
                                disabled={!isEdit}
                                value={formData.website}
                                validators={[VALIDATOR_REQUIRE()]}
                                onChangeText={(value) => setFormData({ ...formData, website: value })}
                            />

                            <Input
                                placeholder="Beschreibung"
                                errorText="Geben Sie die BEschreibung des Kunden ein"
                                disabled={!isEdit}
                                value={formData.description}
                                validators={[VALIDATOR_REQUIRE()]}
                                onChangeText={(value) => setFormData({ ...formData, description: value })}
                                multiline={true}
                                textArea={true}
                            />

                            {admin && (
                                <View style={styles.btnContainer}>
                                    {!isEdit ? (
                                        <Button
                                            style={[styles.invalideButton, styles.button]}
                                            // disabled={fetchedData.isFormValid}
                                            buttonText={styles.createBtnText}
                                            onPress={handleEdit}
                                            title={'Ändern'}
                                        />
                                    ) : (
                                        <Button
                                            style={[styles.createBtn, styles.button]}
                                            // disabled={fetchedData.isFormValid}
                                            buttonText={styles.createBtnText}
                                            onPress={handleSubmit}
                                            title={'Speichern'}
                                        />
                                    )}
                                </View>
                            )}

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
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingHorizontal: 16,
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
        width: "100%",
        height: 50,
        borderColor: "gray",
        borderBottomWidth: 1,
        borderColor: "#e0e0e0",
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
        width: "100%",
        height: 130, // Adjust the height as needed
        borderColor: "#e0e0e0",
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
        color: "gray",
        fontSize: 18, // Set the font size of the placeholder text
    },
    streetContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    streetWrapper: {
        width: "75%",
    },
    nrWrapper: {
        width: "20%",
    },
    zipContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    zipWrapper: {
        width: "35%",
    },
    placeWrapper: {
        width: "60%",
    },
    label: {
        marginTop: 12,
        marginBottom: 6,
        fontSize: 18,
    },

    btnContainer: {
        flexDirection: "row",
        marginTop: 28,

    },

    button: {
        // height: 53,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 14,
        paddingBottom: 14,
        borderRadius: 5,
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    createBtn: {
        backgroundColor: "#7A9B76",
    },
    createBtnText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "700",
    },
    loader: {
        flex: 1,
        // borderWidth: 1,
        // borderColor: 'red',
    },
    invalideButton: {
        height: 53,
        width: '40%',
        backgroundColor: 'gray',
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
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
});

export default CustomerDetails;
