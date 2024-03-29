import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { AuthContext } from "../../context/auth-context";
import { setInitialInputData } from "../../actions/inputActions";
import { setInitialSelectData } from "../../actions/selectActions";
import SelectDropdown from "../../shared/UIElements/SelectDropdown";
import { VALIDATOR_SELECT, VALIDATOR_REQUIRE } from "../../util/validators";
import Input from "../../shared/UIElements/Input";

const AppointmentCreate = props => {
    const dispatch = useDispatch()
    const auth = useContext(AuthContext)
    const [isLoaded, setIsLoaded] = useState(false)

    const fetchedSelectData = useSelector(state => state.select)
    const fetchedInputData = useSelector(state => state.input)

    const [initialSelectState, setInitialSelectState] = useState({
        selects: {
            worker: [],
            contact: [],
            customer: []
        },
    })

    const initialInputState = {
        name: {
            value: "",
            isValid: false,
        },
        description: {
            value: "",
            isValid: false,
        },
    }

    useEffect(() => {
        const fetchedData = async () => {
            try {
                const customerList = await axios.get(`http://localhost:8000/api/appointments/customer-options/${auth.firmId}`)
                const workerList = await axios.get(`http://localhost:8000/api/appointments/worker-options/${auth.firmId}`)
                const contactList = await axios.get(`http://localhost:8000/api/appointments/contact-options/${auth.firmId}`)

                // console.log(contactList.data.contacts);
                // console.log(customerList.data.customers);

                setInitialSelectState(prevState => ({
                    ...prevState,
                    selects: {
                        ...prevState.selects,
                        customer: customerList.data.customers,
                        worker: workerList.data.workers,
                        contact: contactList.data.contacts,
                    },
                }))

            } catch (err) {
                console.error('Error fetching options:', err);
            }
        }
        fetchedData()

    }, [])


    useEffect(() => {
        if (initialSelectState.selects.contact.length > 0) {

            dispatch(setInitialInputData(initialInputState));
            dispatch(setInitialSelectData(initialSelectState));
            setIsLoaded(true)
        }
    }, [initialSelectState.selects.contact])


    let workerOptions;
    let customerOptions;
    let contactOptions;

    if (isLoaded) {
        customerOptions = fetchedSelectData.selects.customer.map(customer => ({
            label: customer.name,
            value: customer.name
        }));
        workerOptions = fetchedSelectData.selects.worker.map(worker => ({
            label: worker.name,
            value: worker.name
        }));
        contactOptions = fetchedSelectData.selects.contact.map(contact => ({
            label: contact.name,
            value: contact.name
        }));
        // console.log("in options", fetchedSelectData.selects);
    }

    //   const handleSubmit = async () => {

    //     // console.log('before api', fetchedInputData);
    //     // console.log('before API', fetchedSelectData.selectedOptions );

    //     const URL = `http://localhost:8000/api/appointments/new`;
    //     try {
    //       const response = await axios.patch(URL, {
    //         firmId: auth.firmId,
    //         name: fetchedInputData.inputs.name.value,
    //         worker: fetchedSelectData.selectedOptions.worker.value,
    //         customer: fetchedSelectData.selectedOptions.customer.value,
    //         contact: fetchedSelectData.selectedOptions.contact.value,
    //         description: fetchedInputData.inputs.description.value,
    //         // status: status,
    //       });
    //       dispatch(refershData())
    //       dispatch(toggleToFalseEditOrder())
    //       alert('Order updated successfuly')
    //       // navigation.goBack()
    //     } catch (err) {
    //       alert("An error occurred while editing the order.");
    //     }
    //   };


    return isLoaded && (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <Text style={styles.label}>Kunde</Text>
                <SelectDropdown
                    id='appointmentCustomer'
                    reducerKey='appointment'
                    search={false}
                    fieldName='customer'
                    data={customerOptions}
                    validators={[VALIDATOR_SELECT()]}
                // initialSelectedValue={order.customer}
                // disable={!edit}
                />

                <Text style={styles.label}>Mitarbeiter</Text>

                <SelectDropdown
                    id='appointmentWorker'
                    reducerKey='appointment'
                    search={false}
                    fieldName='worker'
                    data={workerOptions}
                    validators={[VALIDATOR_SELECT()]}
                />

                <Text style={styles.label}>Ansprechspartner</Text>

                <SelectDropdown
                    id='cappointmentCntact'
                    reducerKey='appointment'
                    search={false}
                    fieldName='contact'
                    data={contactOptions}
                    validators={[VALIDATOR_SELECT()]}
                />

                <Text style={styles.label}>Beschreibung</Text>

                <Input
                    id='appointmentrDescr'
                    reducerKey='appointment'
                    fieldName='description'
                    placeholder="Beschreibung"
                    textArea={true}
                    errorText='Geben Sie die Beschreibung des Termins ein'
                    value={fetchedInputData.inputs.description.value}
                    validators={[VALIDATOR_REQUIRE()]}
                    multiline={true}
                    numberOfLines={4}
                />

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // padding: 16,
        backgroundColor: '#fff',
        flex: 1
    },
    label: {
        marginTop: 12,
        marginBottom: 6,
        fontSize: 18,
    },

    btnContainer: {
        marginTop: 16,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    button: {
        // height: 53,
        padding: 16,
        width: '100%',
        borderRadius: 5,
        justifyContent: "center",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    cancelBtn: {
        borderColor: "#7A9B76",
        borderWidth: 2,
    },
    cancelBtnText: {
        fontSize: 18,
        color: "#7A9B76",
        fontWeight: "700",
    },
    editButton: {
        backgroundColor: "#7A9B76",
    },
    editButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "700",
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
    loader: {
        flex: 1,
    },
});

export default AppointmentCreate;