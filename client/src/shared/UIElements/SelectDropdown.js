import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSelect } from "../../actions/selectActions";
import { validate } from "../../util/validators";


const SelectDropdown = props => {
    const dispatch = useDispatch()
    const [touched, setTouched] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [isValue, setIsValue] = useState('')
    const [selectedValue, setSelectedValue] = useState(props.initialSelectedValue || ''); // Set initial selected value
    const fetchedData = useSelector((state) => state[props.reducerKey]);

    // useEffect(() => {
    //   if (touched) {
    //     setIsValid(validate(props.value, props.validators))
    //   }
    // }, [touched])

    const handleChange = val => {
        setIsValid(validate(val, props.validators))
        dispatch(setSelect(props.fieldName, val, props.validators, props.objectId, props.reducerKey))
        setIsValue(val)
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
        borderColor: 'gray',
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