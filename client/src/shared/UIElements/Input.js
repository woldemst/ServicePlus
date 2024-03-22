import { TextInput, StyleSheet, Text, View } from "react-native";
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
        <View style={styles.inputContainer}>
            <TextInput
                id={props.id}
                value={inputValue}
                placeholder={props.placeholder}
                style={props.style ? props.style : [props.disabled && styles.disabled, !isValid ? styles.inputInvalid : styles.input, props.textArea && styles.textArea]}
                onChangeText={(text) => handleChange(text)}
                autoCapitalize="none"
                multiline={props.multiline}
                numberOfLines={props.numberOfLines}
                // onFocus={() => setTouched(true)}
                // onBlur={onBlurHandler}
                editable={!props.disabled}
            />

            {!isValid && <Text style={props.thin ? styles.thin : styles.errorText}>{props.errorText}</Text>}
        </View>
    </>
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1

    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#e0e0e0',
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
    textArea: {
        height: 130, // Adjust the height as needed
        borderColor: "#e0e0e0",
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
        // color: "#e0e0e0",
        fontSize: 18, // Set the font size of the placeholder text
    },
    errorText: {
        color: 'red'
    },
    thin: {
        color: 'red',
        // position: 'absolute',
        // flex: 1,
        // width: '100%',
        // bottom: 0,


    },
    disabled: {
        backgroundColor: '#eee',

    }
})

export default Input;
