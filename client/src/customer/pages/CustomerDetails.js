import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from "../../util/validators";
import { AuthContext } from "../../context/auth-context";
import { clearCustomerField } from "../../actions/customerActions";
import Input from "../../shared/UIElements/Input";
import { setInitialInputData } from "../../actions/inputActions";
import Button from "../../shared/UIElements/Button";

const CustomerDetails = (props) => {
    const customerId = props.id;
    const auth = useContext(AuthContext);

    const dispatch = useDispatch();
    const customersArray = useSelector((state) => state.customer.customersArray.customers);
    const customer = customersArray.find(customer => customer._id == customerId)
    // console.log(customer);

    const [isLoaded, setIsLoaded] = useState(false)
    const fetchedData = useSelector(state => state.input)

    const initialState = {
        name: {
            value: customer.name,
            isValid: false,
        },
        email: {
            value: customer.email,
            isValid: false,
        },
        street: {
            value: customer.street,
            isValid: false,
        },
        houseNr: {
            value: customer.houseNr,
            isValid: false,
        },
        zip: {
            value: customer.zip,
            isValid: false,
        },
        place: {
            value: customer.place,
            isValid: false,
        },
        phone: {
            value: customer.phone,
            isValid: false,
        },
        website: {
            value: customer.website,
            isValid: false,
        },
        description: {
            value: customer.description,
            isValid: false,
        },
    };

    useEffect(() => {
        dispatch(setInitialInputData(initialState))
        setIsLoaded(true)
    }, [])

    const handleSubmit = async () => {
        try {
            const response = await axios.patch(
                `http://localhost:8000/api/customers/${auth.firmId}/update/${customerId}`, {
                customerId: customerId,
                firmId: auth.firmId,
                name: fetchedData.inputs.name.value,
                email: fetchedData.inputs.email.value,
                street: fetchedData.inputs.street.value,
                houseNr: fetchedData.inputs.houseNr.value,
                zip: fetchedData.inputs.zip.value,
                place: fetchedData.inputs.place.value,
                phone: fetchedData.inputs.phone.value,
                website: fetchedData.inputs.website.value,
                description: fetchedData.inputs.description.value,
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
            {isLoaded && (
                <>
                    <Input
                        id="customerName"
                        fieldName="name"
                        objectId={customerId}
                        reducerKey="customer"
                        placeholder="Name des Kunden"
                        errorText="Geben Sie den Namen des Kunden"
                        value={fetchedData.inputs.name.value}
                        validators={[VALIDATOR_REQUIRE()]}
                    />

                    <Input
                        id="customerEmail"
                        fieldName="email"
                        objectId={customerId}
                        reducerKey="customer"
                        placeholder="E-Mail des Kunden"
                        errorText="Geben Sie eine E-Mail des Kunden"
                        value={fetchedData.inputs.email.value}
                        validators={[VALIDATOR_EMAIL()]}

                    />
                    <View style={styles.streetContainer}>
                        <View style={styles.streetWrapper}>
                            <Input
                                id="customerStreet"
                                objectId={customerId}
                                reducerKey="customer"
                                fieldName="street"
                                placeholder="Straße des Kunden"
                                errorText="Geben Sie die Straße des Kunden ein"
                                value={fetchedData.inputs.street.value}
                                validators={[VALIDATOR_REQUIRE()]}
                            />
                        </View>

                        <View style={styles.nrWrapper}>
                            <Input
                                id="customerHouseNr"
                                objectId={customerId}
                                reducerKey="customer"
                                fieldName="houseNr"
                                placeholder="Housnummmer des Kunden"
                                errorText="Geben Sie die Housnummmer des Kunden ein"
                                value={fetchedData.inputs.houseNr.value}
                                validators={[VALIDATOR_REQUIRE()]}
                            />
                        </View>
                    </View>
                    <View style={styles.zipContainer}>
                        <View style={styles.zipWrapper}>
                            <Input
                                id="customerZip"
                                objectId={customerId}
                                reducerKey="customer"
                                fieldName="zip"
                                placeholder="PLZ des Kunden"
                                errorText="Geben Sie das PLZ des Kunden ein"
                                value={fetchedData.inputs.zip.value}
                                validators={[VALIDATOR_REQUIRE()]}
                            />
                        </View>


                        <View style={styles.placeWrapper}>
                            <Input
                                id="customerPlace"
                                objectId={customerId}
                                reducerKey="customer"
                                fieldName="place"
                                placeholder="Der Ort des Kunden"
                                errorText="Geben Sie den Ort des Kunden ein"
                                value={fetchedData.inputs.place.value}
                                validators={[VALIDATOR_REQUIRE()]}
                            />
                        </View>
                    </View>


                    <Input
                        id="customerPhone"
                        objectId={customerId}
                        reducerKey="customer"
                        fieldName="place"
                        placeholder="Telefonnumer"
                        errorText="Geben Sie die Telefonnumer Kunden ein"
                        value={fetchedData.inputs.phone.value}
                        validators={[VALIDATOR_REQUIRE()]}
                    />

                    <Input
                        id="customerWebsite"
                        objectId={customerId}
                        reducerKey="customer"
                        fieldName="website"
                        placeholder="Website"
                        errorText="Geben Sie die Webseite des Kunden ein"
                        value={fetchedData.inputs.website.value}
                        validators={[VALIDATOR_REQUIRE()]}
                    />

                    <Input
                        id="customerDescription"
                        objectId={customerId}
                        reducerKey="customer"
                        fieldName="description"
                        placeholder="Beschreibung"
                        errorText="Geben Sie die BEschreibung des Kunden ein"
                        value={fetchedData.inputs.description.value}
                        validators={[VALIDATOR_REQUIRE()]}
                    /></>
            )}


            <View style={styles.btnContainer}>
                <Button
                    // style={!fetchedData.isFormValid ? [styles.createBtn, styles.button] : styles.invalideButton}
                    style={[styles.createBtn, styles.button]}
                    // disabled={fetchedData.isFormValid}
                    buttonText={styles.createBtnText}
                    onPress={handleSubmit}
                    title={'Speichern'}
                />
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
