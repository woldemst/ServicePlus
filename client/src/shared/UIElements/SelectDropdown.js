import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSelect } from "../../actions/selectActions";
import { validate } from "../../util/validators";


const SelectDropdown = props => {
    const [touched, setTouched] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [isValue, setIsValue] = useState('')
    const [selectedValue, setSelectedValue] = useState(props.initialSelectedValue || ''); // Set initial selected value

    const handleChange = val => {
        props.onValueChange(val);
        setIsValid(validate(val, props.validators));
      }

    return <>
        <Dropdown
            id={props.id}
            style={[props.disable && styles.disaabled, !isValid ? styles.selectInvalid : styles.select]}
            // placeholderStyle={styles.placeholderStyle}
            // inputSearchStyle={styles.inputSearchStyle}
            value={isValue}
            data={props.data}
            search={props.search}
            maxHeight={300}
            labelField="label"
            valueField="value"
            // placeholder={!isFocus ? 'Select item' : '...'}
            placeholder={selectedValue ? selectedValue : props.placeholder} // Display initial selected value if exists
            disable={props.disable}
            onChange={handleChange}
            selectedTextStyle={styles.selectedTextStyle}
        // visibleSelectedItem={true}
        // searchPlaceholder={props.searchPlaceholder}
        // onFocus={() => setIsFocus(true)}
        // onBlur={() => setIsFocus(false)}
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

export default SelectDropdown;