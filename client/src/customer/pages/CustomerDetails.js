import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../../util/validators";
import { AuthContext } from "../../context/auth-context";
import { updateCustomer } from "../../actions/customerActions";
import Input from "../../shared/UIElements/Input";

const CustomerDetails = (props) => {
    const customerId = props.id;
    const auth = useContext(AuthContext);

    const dispatch = useDispatch();
    const customersArray = useSelector((state) => state.customer.customersArray.customers);
    const customer = customersArray.find(customer => customer._id == customerId)
    // console.log(customer);

    const handleInputChange = (fieldName, value, validators, objectId) => {
        dispatch(updateCustomer(fieldName, value, validators, objectId));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.patch(
                `http://localhost:8000/api/customers/${auth.firmId}/update/${customerId}`, {
                customerId: customerId,
                firmId: auth.firmId,
                name: customer.name,
                email: customer.email,
                street: customer.street,
                houseNr: customer.houseNr,
                zip: customer.zip,
                place: customer.place,
                phone: customer.phone,
                website: customer.website,
                description: customer.description,
            });
            props.toggle();
            props.handleRefresh();
            window.alert("Customer updated!");
        } catch (err) {
            console.log("Error fetching while updating customers' profile", err);
        }
    };


    return !customer ? (
        <ActivityIndicator style={styles.loader} size="large" color="#7A9B76" />

    ) : (
        <View style={styles.container}>
            <Input
                id="customerName"
                fieldName="name"
                placeholder="Name des Kunden"
                errorText="Geben Sie den Namen des Kunden"
                objectId={customerId}
                value={customer.name}
                validators={[VALIDATOR_REQUIRE()]}
                onChange={handleInputChange}
            />

            <Input
                id="customerEmail"
                objectId={customerId}
                fieldName="email"
                placeholder="E-Mail des Kunden"
                errorText="Geben Sie eine E-Mail des Kunden"
                value={customer.email}
                validators={[VALIDATOR_EMAIL()]}
                onChange={handleInputChange}
            />
            <View style={styles.streetContainer}>
                <View style={styles.streetWrapper}>
                    <Input
                        id="customerStreet"
                        objectId={customerId}
                        fieldName="street"
                        placeholder="Straße des Kunden"
                        errorText="Geben Sie die Straße des Kunden ein"
                        value={customer.street}
                        validators={[VALIDATOR_REQUIRE()]}
                        onChange={handleInputChange}
                    />
                </View>

                <View style={styles.nrWrapper}>
                    <Input
                        id="customerHouseNr"
                        objectId={customerId}
                        fieldName="houseNr"
                        placeholder="Housnummmer des Kunden"
                        errorText="Geben Sie die Housnummmer des Kunden ein"
                        value={customer.houseNr}
                        validators={[VALIDATOR_REQUIRE()]}
                        onChange={handleInputChange}
                    />
                </View>
            </View>
            <View style={styles.zipContainer}>
                <View style={styles.zipWrapper}>
                    <Input
                        id="customerZip"
                        objectId={customerId}
                        fieldName="zip"
                        placeholder="PLZ des Kunden"
                        errorText="Geben Sie das PLZ des Kunden ein"
                        value={customer.zip}
                        validators={[VALIDATOR_REQUIRE()]}
                        onChange={handleInputChange}
                    />
                </View>


                <View style={styles.placeWrapper}>
                    <Input
                        id="customerPlace"
                        objectId={customerId}
                        fieldName="place"
                        placeholder="Der Ort des Kunden"
                        errorText="Geben Sie den Ort des Kunden ein"
                        value={customer.place}
                        validators={[VALIDATOR_REQUIRE()]}
                        onChange={handleInputChange}
                    />
                </View>
            </View>


            <Input
                id="customerPhone"
                objectId={customerId}
                fieldName="place"
                placeholder="Telefonnumer"
                errorText="Geben Sie die Telefonnumer Kunden ein"
                value={customer.phone}
                validators={[VALIDATOR_REQUIRE()]}
                onChange={handleInputChange}
            />

            <Input
                id="customerWebsite"
                objectId={customerId}
                fieldName="website"
                placeholder="Website"
                errorText="Geben Sie die Webseite des Kunden ein"
                value={customer.website}
                validators={[VALIDATOR_REQUIRE()]}
                onChange={handleInputChange}
            />

            <Input
                id="customerDescription"
                objectId={customerId}
                fieldName="description"
                placeholder="Beschreibung"
                errorText="Geben Sie die BEschreibung des Kunden ein"
                value={customer.description}
                validators={[VALIDATOR_REQUIRE()]}
                onChange={handleInputChange}
            />

            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={[styles.createBtn, styles.button]}
                    onPress={handleSubmit}
                >
                    <Text style={styles.createBtnText}>Speichern</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingTop: 20,
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
        marginTop: 50,
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
});

export default CustomerDetails;
