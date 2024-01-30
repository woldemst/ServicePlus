import { TextInput, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "../../util/validators";
import { useState, useReducer } from "react";
import dataReducer from "../../reducer/dataReducer";

import { updateAndValidateRegisterField } from "../../actions/registerActions";
import { updateAndValidateLoginField } from "../../actions/loginActions";
import { updateAndValidateRegisterFirmField } from "../../actions/firmActions";
import { updateAndValidateWorker } from "../../actions/workerActions";
import { updateAndValidateDataField } from "../../actions/dataActions";



const Input = props => {

    const dispatch = useDispatch()
    const [touched, setTouched] = useState(false)
    // const isValid = validate(props.value, props.validators)


    const fetchedData = useSelector((state) => state[props.fetchedData]);
    // const fetchedData = useSelector((state) => state.dataReducer);
    // const isValid = fetchedData.inputs[props.fieldName]?.isValid || true;
    const isValid = fetchedData.inputs[props.fieldName] ? fetchedData.inputs[props.fieldName].isValid : false;


    const handleChange = (val) => {
        dispatch(updateAndValidateDataField(props.fieldName, val, props.validators));
    };

    // const onBlurHandler = () => {

    // }



    return <>

        <TextInput
            id={props.id}
            value={props.value}
            placeholder={props.placeholder}
            style={!fetchedData.inputs[props.fieldName]?.isValid ? styles.inputInvalid : styles.input}
            onChangeText={(text) => handleChange(text)}
            autoCapitalize="none"
            // onFocus={() => setTouched(true)}
            // onBlur={onBlurHandler}

        />

        {!fetchedData.inputs[props.fieldName]?.isValid && <Text style={styles.errorText}>{props.errorText}</Text>}
    </>
}
const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 14,
        padding: 7,
    },
    inputInvalid: {
        width: '100%',
        height: 50,
        borderColor: 'red',
        borderWidth: 1,
        marginTop: 14,
        padding: 7,
    },
    errorText: {
        color: 'red'
    }
})

export default Input;
