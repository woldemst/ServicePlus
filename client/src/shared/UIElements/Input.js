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
    // const fetchedData = useSelector((state) => state[props.reducerKey]);
    // console.log(fetchedData);

    const handleChange = (val) => {
        setInputValue(val)
        setIsValid(validate(val, props.validators))
        dispatch(setInput(props.fieldName, val, props.validators, props.objectId, props.reducerKey));
    }

    return <>
        <TextInput
            id={props.id}
            value={inputValue}
            placeholder={props.placeholder}
            style={[props.disabled && styles.disabled, !isValid ? styles.inputInvalid : styles.input]}
            onChangeText={(text) => handleChange(text)}
            autoCapitalize="none"
            multiline={props.multiline}
            numberOfLines={props.numberOfLines}
            // onFocus={() => setTouched(true)}
            // onBlur={onBlurHandler}
            editable={!props.disabled}
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
    },
    disabled: {
        backgroundColor: '#eee'
    }
})

export default Input;
