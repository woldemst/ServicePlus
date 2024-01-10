import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useDispatch, useSelector } from "react-redux";

import {updateAndValidateField, touchDropdown, updateAndValidateDropdown} from '../../actions/userActions'

const Select = props => {
    const dispatch = useDispatch()
    const fetchedData = useSelector(state => state.user)

    const handleChange = (val) => {
        // dispatch(updateAndValidateDropdown(props.fieldName, val)); // Dispatch action for dropdown update
        dispatch(updateAndValidateField(props.fieldName, val, props.validators))

    };

    // New handler for dropdown touch
    // const handleTouch = () => {
    //     dispatch(touchDropdown(props.fieldName)); // Dispatch action for dropdown touch
    // };


    return <>
        <SelectList 
            id={props.id}
            boxStyles={!fetchedData[props.fieldName].isValid ? styles.selectInvalid : styles.select}
            data={props.data}
            save='value'
            search={props.search}
            setSelected={handleChange}
            // onFocus={handleTouch} // Track touch event
            placeholder={props.placeholder}
            inputStyles={!fetchedData[props.fieldName].isValid ? styles.placeholderTextInvalid : styles.placeholderText}
        />

    </>
}
// {!fetchedData[props.fieldName].isValid ? styles.inputInvalid : styles.input}
const styles = StyleSheet.create({
    select: {
        height: 50,
        borderColor: 'gray',
        color: 'red',
        borderWidth: 1,
        marginTop: 14,
        alignItems: 'center',
        borderRadius: 0
      },
      selectInvalid:{
        borderColor: 'red',    
        height: 50,
        color: 'red',
        borderWidth: 1,
        marginTop: 14,
        alignItems: 'center',
        borderRadius: 0
      },
      placeholderText: {
        color: "gray",
      },
      placeholderTextInvalid: {
        color: "red",
        
      }
      
})

export default Select;