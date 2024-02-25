import { TextInput, StyleSheet, Text } from "react-native";
import { validate } from "../../util/validators";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInput } from "../../actions/inputActions";

const Input = props => {
    const dispatch = useDispatch()
    const [touched, setTouched] = useState(false)
    const [inputValue, setInputValue] = useState(props.value)
    const [isValid, setIsValid] = useState(true)


    const handleChange = (val) => {
        setInputValue(val)
        setIsValid(validate(val, props.validators))
        dispatch(setInput(props.fieldName, val, props.validators));
    }

    return <>
        <TextInput
            id={props.id}
            value={inputValue}
            placeholder={props.placeholder}
            style={!isValid ? styles.inputInvalid : styles.input}
            onChangeText={(text) => handleChange(text)}
            autoCapitalize="none"
            multiline={props.multiline}
            numberOfLines={props.numberOfLines}
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
        borderRadius: 4,
        marginTop: 14,
        padding: 7,
    },
    inputInvalid: {
        width: '100%',
        height: 50,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 14,
        padding: 7,
    },
    errorText: {
        color: 'red'
    }
})

export default Input;
