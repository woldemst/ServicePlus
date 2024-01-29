import { TextInput, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "../../util/validators";
import { useState } from "react";

import { updateAndValidateRegisterField } from "../../actions/registerActions";
import { updateAndValidateLoginField } from "../../actions/loginActions";
import { updateAndValidateRegisterFirmField } from "../../actions/firmActions";
import { updateAndValidateWorker } from "../../actions/workerActions";

const Input = props => {
    const dispatch = useDispatch()
    const [touched, setTouched] = useState(false)
    const isValid = validate(props.value, props.validators)

    let fetchedData
    switch (props.fetchedData) {
        case 'user':
            fetchedData = useSelector(state => state.user)
            break
        case 'register':
            fetchedData = useSelector(state => state.register)
            break
        case 'login':
            fetchedData = useSelector(state => state.login)
            break
        case 'firm':
            fetchedData = useSelector(state => state.firm)
            break
        case 'worker':
            fetchedData = useSelector(state => state.worker)
            break
        case 'client':
            fetchedData = useSelector(state => state.client)
            break
        default:
            break;
    }


    // console.log(fetchedData);
    const handleChange = (val) => {
        switch (props.fetchedData) {
            case 'register':
                dispatch(updateAndValidateRegisterField(props.fieldName, val, props.validators))
                break
            case 'login':
                dispatch(updateAndValidateLoginField(props.fieldName, val, props.validators))
                break
            case 'firm':
                dispatch(updateAndValidateRegisterFirmField(props.fieldName, val, props.validators))
                break
            case 'worker':
                dispatch(updateAndValidateWorker(props.fieldName, val, props.validators))

                break
            case 'client':

                break
            default:
                break;
        }

    }


    // const onBlurHandler = () => {

    // }



    return <>

        <TextInput
            id={props.id}
            value={props.value}
            placeholder={props.placeholder}
            style={!fetchedData.inputs[props.fieldName].isValid ? styles.inputInvalid : styles.input}
            onChangeText={(text) => handleChange(text)}
            autoCapitalize="none"
            // onFocus={() => setTouched(true)}
            // onBlur={onBlurHandler}

        />

        {!fetchedData.inputs[props.fieldName].isValid && <Text style={styles.errorText}>{props.errorText}</Text>}
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
