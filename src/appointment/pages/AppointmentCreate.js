import { View, Text, StyleSheet } from "react-native";
import { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";

import { VALIDATOR_SELECT, VALIDATOR_REQUIRE } from "../../util/validators";
import Select from "../../shared/UIElements/Select";
import Input from "../../shared/UIElements/Input";
import Button from "../../shared/UIElements/Button";
import { refershData } from "../../actions/utilActions";

const AppointmentCreate = props => {
    const dispatch = useDispatch()
    const firmId = useSelector(state => state.context.firmId)

    const [isLoaded, setIsLoaded] = useState(false)
    const [date, setDate] = useState(new Date(Date.now()));
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [formData, setFormData] = useState({
        orderOptions: [],
        workerOptions: [],
        customerOptions: [],
        selectedOrder: "",
        selectedCustomer: "",
        selectedWorkers: [],
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
                    axios.get(`http://192.168.178.96:8000/api/appointments/order-options/${firmId}`),
                    axios.get(`http://192.168.178.96:8000/api/appointments/worker-options/${firmId}`),
                    axios.get(`http://192.168.178.96:8000/api/appointments/customer-options/${firmId}`),
                    // axios.get(`http://192.168.178.96:8000/api/appointments/contact-options/${firmId}`),
                ])

                const filteredOrders = orderResponse.data.orders.filter(order => order.status !== '3' && order.status !== '4')

                setFormData(prevFormData => ({
                    ...prevFormData,
                    orderOptions: filteredOrders.map((order) => ({
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
        const URL = `http://192.168.178.96:8000/api/appointments/new`;
        try {
            const response = await axios.post(URL, {
                firmId: firmId,
                orderId: formData.selectedOrder,
                workers: formData.selectedWorkers,
                description: formData.description,
                date: date.toISOString().split('T')[0],
                time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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

    // START: date picker logic
    const showDatePicker = () => setDatePickerVisibility(true)
    const hideDatePicker = () => setDatePickerVisibility(false)

    const handleConfirm = (selectedDate) => {
        const currentDate = new Date(date);
        currentDate.setHours(selectedDate.getHours());
        currentDate.setMinutes(selectedDate.getMinutes());
        setDate(currentDate);
        hideDatePicker();
    };
    // END: date picker logic 

    return isLoaded && (
        <View style={styles.container}>

            <Text style={styles.label}>Datum und Uhrzeit</Text>

            <Button
                style={styles.pickerBtn}
                onPress={showDatePicker}
                title={`${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
            />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

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
                multi={true}
                search={false}
                data={formData.workerOptions}
                errorText="Please select workers"
                validators={[VALIDATOR_SELECT()]}
                onValueChange={(option) => setFormData({ ...formData, selectedWorkers: option })}
            />

            <Text style={styles.label}>Beschreibung</Text>


            <Input
                placeholder="Beschreibung"
                value={formData.description}
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Geben Sie die Beschreibung des Termins ein'
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                style={[styles.textArea, styles.placeholderText]}
                multiline={true}
                numberOfLines={4}
                textArea={true}
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
    textArea: {
        width: "100%",
        height: 130, // Adjust the height as needed
        borderColor: "#e0e0e0",
        borderWidth: 1,
        marginTop: 12,
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
    pickerBtn: {
        borderColor: '#e0e0e0',
        borderWidth: 1,
        padding: 16,
        borderRadius: 5,
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
    },
});

export default AppointmentCreate;