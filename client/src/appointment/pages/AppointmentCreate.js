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
import DateTimePicker from '@react-native-community/datetimepicker';

import { AuthContext } from "../../context/auth-context";
import Select from "../../shared/UIElements/Select";
import { VALIDATOR_SELECT, VALIDATOR_REQUIRE } from "../../util/validators";
import Input from "../../shared/UIElements/Input";
import Button from "../../shared/UIElements/Button";
import { refershData } from "../../actions/utilActions";

const AppointmentCreate = props => {
    const dispatch = useDispatch()
    const auth = useContext(AuthContext)
    const [isLoaded, setIsLoaded] = useState(false)

    const [date, setDate] = useState(new Date());
    const [selectedDateOnly, setSelectedDateOnly] = useState('');
    const [selectedTimeOnly, setSelectedTimeOnly] = useState('');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);


        // Extract date and time components
        const selectedDateTime = new Date(currentDate);
        const dateOnly = selectedDateTime.toISOString().split('T')[0];
        const timeOnly = selectedDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setSelectedDateOnly(dateOnly);
        setSelectedTimeOnly(timeOnly);

    };

    const [formData, setFormData] = useState({
        orderOptions: [],
        workerOptions: [],
        customerOptions: [],
        contactOptions: [],
        selectedOrder: "",
        selectedCustomer: "",
        selectedWorker: "",
        selectedContact: "",
        description: '',
    })

    useEffect(() => {
        const fetchedData = async () => {
            try {
                const [
                    orderResponse,
                    workerResponse,
                    customerResponse,
                    // contactResponse,
                ] = await Promise.all([
                    axios.get(`http://localhost:8000/api/appointments/order-options/${auth.firmId}`),
                    axios.get(`http://localhost:8000/api/appointments/worker-options/${auth.firmId}`),
                    axios.get(`http://localhost:8000/api/appointments/customer-options/${auth.firmId}`),
                    // axios.get(`http://localhost:8000/api/appointments/contact-options/${auth.firmId}`),
                ])

                setFormData(prevFormData => ({
                    ...prevFormData,
                    orderOptions: orderResponse.data.orders.map((order) => ({
                      label: order.name,
                      value: order.id,
                    })),
                    workerOptions: workerResponse.data.workers.map((worker) => ({
                        label: worker.name,
                        value: worker.id,
                    })),
                    customerOptions: customerResponse.data.customers.map((customer) => ({
                        label: customer.name,
                        value: customer.id,
                    })),
                    // contactOptions: contactResponse.data.contacts.map((contact) => ({
                    //   key: contact.id,
                    //   value: contact.name,
                    // })),
                }))

                setIsLoaded(true)

            } catch (err) {
                console.error('Error fetching options:', err);
            }
        }
        fetchedData()
    }, [])


    const handleSubmit = async () => {
        const URL = `http://localhost:8000/api/appointments/new`;
        try {
            const response = await axios.post(URL, {
                firmId: auth.firmId,
                orderId: formData.selectedOrder,
                workerId: formData.selectedWorker,
                description: formData.description,
                date: selectedDateOnly,
                time: selectedTimeOnly,
                // status: status,

            });
            dispatch(refershData())
            props.toggleModal()

            alert('Appointment created successfuly')
            // navigation.goBack()
        } catch (err) {
            alert("An error occurred while editing the order.");
        }
    };


    return isLoaded && (
        <View style={styles.container}>

            <Text style={styles.label}>Datum und Uhrzeit</Text>

            <View style={styles.dataTimeContainer}>
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="datetime"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                // style={styles.picker}
                />

            </View>

            <Text style={styles.label}>Auftrag</Text>

            <Select
                search={false}
                data={formData.orderOptions}
                errorText="Please select an order"
                validators={[VALIDATOR_SELECT()]}
                onValueChange={(option) => setFormData({ ...formData, selectedOrder: option })}
            />

            <Text style={styles.label}>Mitarbeiter</Text>

            <Select
                search={false}
                data={formData.workerOptions}
                errorText="Please select a worker"
                validators={[VALIDATOR_SELECT()]}
                onValueChange={(option) => setFormData({ ...formData, selectedWorker: option })}
            />

            <Text style={styles.label}>Beschreibung</Text>


            <Input
                multiline={true}
                numberOfLines={4}
                textArea={true}
                placeholder="Beschreibung"
                value={formData.description}
                validators={[VALIDATOR_REQUIRE()]}
                // style={[styles.textArea, styles.placeholderText]}
                errorText='Geben Sie die Beschreibung des Termins ein'
                onChangeText={(text) => setFormData({ ...formData, description: text })}
            />

            <View style={styles.btnContainer}>
                <Button
                    style={[styles.cancelBtn, styles.button]}
                    buttonText={styles.cancelBtnText}
                    onPress={() => props.toggleModal()}
                    title={'Abbrechen'}
                />

                <Button
                    style={[styles.createBtn, styles.button]}
                    // style={fetchedData.isFormValid ? [styles.createBtn, styles.button] : styles.invalideButton}
                    // disabled={!fetchedData.isFormValid}
                    buttonText={styles.createBtnText}
                    onPress={handleSubmit}
                    title={'Anlegen'}
                />
            </View>
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
        width: '45%',
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
    createBtn: {
        backgroundColor: "#7A9B76",
    },
    createBtnText: {
        fontSize: 18,
        color: "#fff",
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
    dataTimeContainer: {
        // borderWidth: 2,
        // borderColor: '#eee',
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "flex-start",
        // paddingTop: 4,
        // paddingBottom: 4
    },
    picker: {
        borderColor: "red",
        borderWidth: 2,

    },
});

export default AppointmentCreate;