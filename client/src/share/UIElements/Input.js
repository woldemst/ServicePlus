import { useState } from "react";
import { TextInput, StyleSheet, Text} from "react-native";
import { useDispatch } from "react-redux";
import { updateUserData , updateField} from '../../actions/userActions'

const Input = props => {
    const [showError, setShowError] = useState(false)

    const dispatch = useDispatch()
    
    const handleChange = (text) => {     
        dispatch(updateField(props.fieldName, text))
    }

 
    return <>

            <TextInput
                id={props.id}
                placeholder={props.placeholder}
                style={showError ? styles.inputInvalid : styles.input }
                onChangeText={handleChange}
                value={props.value}

            />
                
            {showError && <Text style={styles.errorText}>{props.errorText}</Text>}
    </>
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 14,
        padding: 7,
    },
    inputInvalid: {
        width: '100%',
        height: 50,
        borderColor: 'red',
        borderWidth: 1,
        marginTop: 14,
        padding: 7,
    },
    errorText: {
        color: 'red'
    }
})

export default Input;
