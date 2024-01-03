import { TextInput, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateAndValidateField, touchField } from '../../actions/userActions'
import { useState } from "react";

const Input = props => {
    const dispatch = useDispatch()
    const fetchedData = useSelector(state => state.user)
    const [touched, setTouched] = useState(false)

    // console.log(fetchedData);
    const handleChange = (val) => {
        dispatch(updateAndValidateField(props.fieldName, val, props.validators))
    }

    const touchHandler = (fieldName) => {
        dispatch(touchField(fieldName))
        setTouched(true)

    }


    return <>

        <TextInput
            id={props.id}
            placeholder={props.placeholder}
            style={!fetchedData[props.fieldName].isValid ? styles.inputInvalid : styles.input}
            onChangeText={handleChange}
            value={props.value.value}
            // onFocus={touchHandler}


        />

        {!fetchedData[props.fieldName].isValid && <Text style={styles.errorText}>{props.errorText}</Text>}
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
