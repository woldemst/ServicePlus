import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator } from "react-native";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../../util/validators";
import { AuthContext } from "../../context/auth-context";
import { clearCustomerField } from "../../actions/customerActions";
import Input from "../../shared/UIElements/Input";
import { setInitialInputData } from "../../actions/inputActions";
import Button from "../../shared/UIElements/Button";
import { refershData } from "../../actions/utilActions";
import { useRoute } from "@react-navigation/native";
import Avatar from "../../../components/Avatar";

const CustomerDetails = (props) => {
    const route = useRoute();
    const customerId = route.params.id;
    const auth = useContext(AuthContext);

    const dispatch = useDispatch();
    const customersArray = useSelector((state) => state.customer.customersArray.customers);
    const customer = customersArray.find(customer => customer._id == customerId)
    // console.log(customer);

    const [isLoaded, setIsLoaded] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [formData, setFormData] = useState({ ...customer });

    useEffect(() => setIsLoaded(true), [])

    const handleEdit = () => setIsEdit(!isEdit)

    const handleSubmit = async () => {
        try {
            const response = await axios.patch(
                `http://localhost:8000/api/customers/${auth.firmId}/update/${customerId}`, {
                customerId: customerId,
                firmId: auth.firmId,
                name: formData.name,
                email: formData.email,
                street: formData.street,
                houseNr: formData.houseNr,
                zip: formData.zip,
                place: formData.place,
                phone: formData.phone,
                website: formData.website,
                description: formData.description,
            });
            setIsEdit(false)
            dispatch(refershData())
            window.alert("Customer updated!");
        } catch (err) {
            console.log("Error fetching while updating customers' profile", err);
        }
    };


    return !customer ? (
        <ActivityIndicator style={styles.loader} size="large" color="#7A9B76" />

    ) : (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.imgContainer}>
                    <Avatar source={require('../../../assets/customer/customer_avatar.jpg')} />
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

                        {auth.admin && (
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
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 16,
        paddingBottom: 30,
        flex: 1,
        justifyContent: 'space-between',
        borderWifth: 1,
        borderColor: 'red',
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
});

export default CustomerDetails;
