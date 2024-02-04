import { TextInput, StyleSheet, Text } from "react-native";
import { validate } from "../../util/validators";
import { useState } from "react";

const Input = props => {
    const [touched, setTouched] = useState(false)
    const [inputValue, setInputValue] = useState(props.value)        
    const [isValid, setIsValid] = useState(validate(props.value, props.validators))

    const handleChange = (val) => {
        setInputValue(val)
        setIsValid(validate(val, props.validators))
        props.onChange(props.fieldName, val, props.validators, props.objectId);
    }

    return <>
        <TextInput
            id={props.id}
            value={inputValue}
            placeholder={props.placeholder}
            style={!isValid ? styles.inputInvalid : styles.input}
            onChangeText={(text) => handleChange(text)}
            autoCapitalize="none"
            // onFocus={() => setTouched(true)}
            // onBlur={onBlurHandler}
        />

        {!isValid && <Text style={styles.errorText}>{props.errorText}</Text>}
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
