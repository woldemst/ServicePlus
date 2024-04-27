import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";

import { validate } from "../../util/validators";

const Select = props => {
    const [touched, setTouched] = useState(false)
    const [isFocus, setIsFocus] = useState(false);
    const [isValid, setIsValid] = useState(true)
    const [value, setValue] = useState(null)

    const [selectedValue, setSelectedValue] = useState(props.initialSelectedValue); // Set initial selected value

    const handleChange = item => {
        props.onValueChange(item.value)
        // setIsFocus(false);
        setIsValid(validate(item.value, props.validators));
        setSelectedValue(item.value)
        setValue(item.value)
    }

    return <>
        <Dropdown
            // placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            style={[props.disable && styles.disaabled, !isValid ? styles.selectInvalid : styles.select]}
            iconStyle={styles.iconStyle}
            data={props.data}
            search={props.search}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={selectedValue ? selectedValue : 'Auswählen'}
            visibleSelectedItem={true}
            value={value}
            disable={props.disable}
            // onFocus={() => setIsFocus(true)}
            // onBlur={() => setIsFocus(false)}
            onChange={handleChange}
        />
    </>
}

const styles = StyleSheet.create({
    select: {
        height: 50,
        borderColor: "#e0e0e0",
        borderWidth: 1,
        marginTop: 8,
        alignItems: 'center',
        borderRadius: 6,
        paddingHorizontal: 8
    },
    selectInvalid: {
        borderColor: 'red',
        height: 50,
        color: 'red',
        borderWidth: 1,
        marginTop: 14,
        alignItems: 'center',
        borderRadius: 6
    },
    disaabled: {
        backgroundColor: '#eee'
    },
    placeholderText: {
        color: "#000",
    },
    placeholderTextInvalid: {
        color: "red",

    },
    dropdown: {
        borderRadius: 6
    },
    selectedTextStyle: {
        // color: 'red'
    }

})

export default Select;