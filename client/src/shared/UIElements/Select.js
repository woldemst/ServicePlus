import { StyleSheet, TouchableWithoutFeedback} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateAndValidateRegisterDropdown, updateAndValidateRegisterField, updateRegisterField } from "../../actions/registerActions";
import { SelectList } from "react-native-dropdown-select-list";
import { useState } from "react";

const Select = props => {
    const dispatch = useDispatch()
    const [touched, setTouched] = useState(false)

    let fetchedData
    switch (props.fetchedData) {
        case 'user':
            fetchedData = useSelector(state => state.user)
            break
        case 'register':
            fetchedData = useSelector(state => state.register)
            break
        case 'firm':
            fetchedData = useSelector(state => state.firm)
            break
        case 'client':
            fetchedData = useSelector(state => state.client)
            break
        default:
            break;
    }

    const handleChange = (val) => {

          switch (props.fetchedData) {
              case 'register':
                  // dispatch(updateAndValidateRegisterDropdown(props.fieldName, val, props.validators))
                  dispatch(updateAndValidateRegisterField(props.fieldName, val, props.validators))

                  break
              case 'firm':

                  break
              case 'client':

                  break
              default:
                  break;
          }
  }

    return <>
        <SelectList 
            save='value'
            id={props.id} 
            data={props.data}
            search={props.search}
            setSelected={handleChange}
            onFocus={() => setTouched(true)}  
            placeholder={props.placeholder}
            boxStyles={!fetchedData[props.fieldName].isValid  ? styles.selectInvalid : styles.select}
            inputStyles={!fetchedData[props.fieldName].isValid ? styles.placeholderTextInvalid : styles.placeholderText}
        />

    </>
}

const styles = StyleSheet.create({
    select: {
        height: 50,
        borderColor: 'gray',
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
        color: "#000",
      },
      placeholderTextInvalid: {
        color: "red",
        
      }
      
})

export default Select;