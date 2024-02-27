import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";

import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "../../util/validators";
import { AuthContext } from "../../context/auth-context";
import { updateWorker } from '../../actions/workerActions'
import Input from '../../shared/UIElements/Input'
import Button from '../../shared/UIElements/Button'


const WorkerDetails = props => {
    const workerId = props.id
    const dispatch = useDispatch()
    const auth = useContext(AuthContext)
    const workersArr = useSelector(state => state.worker.workersArray.workers)
    const worker = workersArr.find(worker => worker._id == workerId)

    // console.log('my worker:', worker);

    const handleSubmit = async () => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/workers/${auth.firmId}/update/${workerId}`, {
                workerId: workerId,
                firmId: auth.firmId,
                name: worker.name,
                email: worker.email,
                street: worker.street,
                houseNr: worker.houseNr,
                zip: worker.zip,
                place: worker.place,
                phone: worker.phone,
                description: worker.description,
            })

            props.toggle()
            props.handleRefresh();
            window.alert('Worker updated!')
        } catch (err) {
            console.log("Error while updating worker's profile", err);
        }
    }


    return !worker ? (
        <ActivityIndicator style={styles.loader} size="large" color="#7A9B76" />
    ) : (
        <View style={styles.container}>

            <Input
                id='workerName'
                objectId={workerId}
                fetchedData='worker'
                fieldName='name'
                placeholder="Name des Mitarbeiter"
                errorText='Type a name of worker'
                value={worker.name}
                validators={[VALIDATOR_REQUIRE()]}
            />

            <Input
                id='workerEmail'
                objectId={workerId}
                fetchedData='worker'
                fieldName='email'
                placeholder="Email des Mitarbeiter"
                errorText='Type an email of worker'
                value={worker.email}
                validators={[VALIDATOR_EMAIL()]}
            />

            <View style={styles.streetContainer}>
                <View style={styles.streetWrapper}>
                    <Input
                        id='workerStreet'
                        objectId={workerId}
                        fetchedData='worker'
                        fieldName='street'
                        placeholder="Straße des Mitarbeiter"
                        errorText='Type an email of worker'
                        value={worker.street}
                        validators={[VALIDATOR_REQUIRE()]}
                    />
                </View>

                <View style={styles.nrWrapper}>
                    <Input
                        id='workerHouseNr'
                        objectId={workerId}
                        fetchedData='worker'
                        fieldName='houseNr'
                        placeholder="Housnummer des Mitarbeiter"
                        errorText='House number'
                        value={worker.houseNr}
                        validators={[VALIDATOR_REQUIRE()]}
                    />
                </View>
            </View>

            <View style={styles.zipContainer}>
                <View style={styles.zipWrapper}>
                    <Input
                        id='workerZip'
                        objectId={workerId}
                        fetchedData='worker'
                        fieldName='zip'
                        placeholder="PLZ des Mitarbeiter"
                        errorText='Type a zip code of worker'
                        value={worker.zip}
                        validators={[VALIDATOR_REQUIRE()]}
                    />
                </View>

                <View style={styles.placeWrapper}>
                    <Input
                        id='workerPlace'
                        objectId={workerId}
                        fetchedData='worker'
                        fieldName='place'
                        placeholder="Ort des Mitarbeiter"
                        errorText='Type a place of worker'
                        value={worker.place}
                        validators={[VALIDATOR_REQUIRE()]}
                    />
                </View>
            </View>

            <Input
                id='workerPhone'
                objectId={workerId}
                fetchedData='worker'
                fieldName='phone'
                placeholder="Phone des Mitarbeiter"
                errorText='Type a phone of worker'
                value={worker.phone}
                validators={[VALIDATOR_REQUIRE()]}
            />

            <Input
                id='workerDeskr'
                objectId={workerId}
                fetchedData='worker'
                fieldName='description'
                placeholder="Beschreibung des Mitarbeiter"
                errorText='Type a description of the worker'
                value={worker.description}
                validators={[VALIDATOR_REQUIRE()]}
            />

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
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,

    },
    input: {
        width: '100%',
        height: 50,
        borderColor: 'gray',
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
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
        width: '75%'
    },
    nrWrapper: {
        width: '20%'
    },
    zipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    zipWrapper: {
        width: '35%'
    },
    placeWrapper: {
        width: '60%'
    },
    label: {
        marginTop: 12,
        marginBottom: 6,
        fontSize: 18
    },

    btnContainer: {
        flexDirection: 'row',
        marginTop: 50
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
    loader: {
        flex: 1,
        // borderWidth: 1,
        // borderColor: 'red',
    },

})

export default WorkerDetails;