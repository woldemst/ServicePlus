import { TextInput, StyleSheet, Text, View } from "react-native";
import { validate } from "../../util/validators";
import { useEffect, useState, useRef } from "react";
import { forwardRef } from 'react';

const Input = forwardRef((props, ref) => {
    // const [touched, setTouched] = useState(false)
    const [isValid, setIsValid] = useState(true)

    const inputRef = useRef(null);

    const handleChange = (val) => {
        props.onChangeText(val);
        setIsValid(validate(val, props.validators));
    };

    useEffect(() => {
        // Focus on TextInput if isEdit is true
        if (props.isEdit && inputRef.current) {
            inputRef.current.focus();
            // console.log('inputRef', inputRef.current);
        }
    }, [props.isEdit]);

    return <>
        <View style={props.thin && styles.inputContainer}>
            <TextInput
                ref={inputRef}
                id={props.id}
                value={props.value}
                placeholder={props.placeholder}
                style={props.style ? props.style : [props.disabled && styles.disabled, !isValid ? styles.inputInvalid : styles.input, props.textArea && styles.textArea]}
                onChangeText={handleChange}
                autoCapitalize="none"
                multiline={props.multiline}
                numberOfLines={props.numberOfLines}
                editable={!props.disabled}
                textArea={props.textArea}
                // onFocus={() => setTouched(true)}
                onBlur={props.onBlur}
            />

            {!isValid && <Text style={props.thin ? styles.thin : styles.errorText}>{props.errorText}</Text>}
        </View>
    </>
})

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
