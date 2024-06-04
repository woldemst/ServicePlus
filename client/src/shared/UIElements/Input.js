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

    const inputStyles = [
        props.style ? [
            props.disabled && styles.disabled,
            !isValid ? [props.inputInvalid ? props.inputInvalid : [props.textArea ? styles.textAreaInvalid : styles.inputInvalid]] : 
            props.style, (props.textArea && !isValid) && styles.textAreaInvalid
        ] : [
            props.disabled && styles.disabled, !isValid ? styles.inputInvalid : styles.input, props.textArea && styles.textArea
        ]
    ]

    return <>
        <View style={props.thin && styles.inputContainer}>
            <TextInput
                ref={inputRef}
                id={props.id}
                value={props.value}
                placeholder={props.placeholder}
                style={inputStyles}
                onChangeText={handleChange}
                autoCapitalize="none"
                multiline={props.multiline}
                numberOfLines={props.numberOfLines}
                editable={!props.disabled}
                // textArea={props.textArea}
                // onFocus={() => setTouched(true)}
                onBlur={props.onBlur}
                scrollEnabled={props.scrollEnabled}
            />

            {(!isValid && !props.textArea)&& <Text style={props.thin ? styles.thin : [props.errorTextStyle ? props.errorTextStyle : styles.errorText]}>{props.errorText}</Text>}
            {(!isValid && props.textArea) && <Text style={[props.errorTextStyle && props.errorTextStyle, styles.errorTextArea]}>{props.errorText}</Text>}
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
        marginTop: 18,
        padding: 7,
    },
    inputInvalid: {
        width: '100%',
        height: 50,
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 18,
        padding: 7,
    },
    textAreaValid: {
        height: 130,
        borderColor: "#e0e0e0",
        borderWidth: 1,
        marginTop: 16,
        padding: 7,
        fontSize: 18,
        borderRadius: 6,
    },
    textAreaInvalid: {
        height: 130,
        borderColor: "red",
        borderWidth: 1,
        marginTop: 16,
        padding: 7,
        fontSize: 18,
        borderRadius: 6,
    },
    placeholderText: {
        // color: "#e0e0e0",
        fontSize: 18, // Set the font size of the placeholder text
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        position: 'absolute',
        top: 68,
        left: 0,
    },
    errorTextArea: {
        fontSize: 12,
        color: 'red',
        position: 'absolute',
        top: 152,
        left: 0,
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
