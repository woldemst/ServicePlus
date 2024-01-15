import { TextInput, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateAndValidateRegisterField, updateRegisterField } from "../../actions/registerActions";
import { updateAndValidateLoginField, updateLoginField } from "../../actions/loginActions";
import { useState } from "react";

const Input = props => {
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
        case 'login':
            fetchedData = useSelector(state => state.login)
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
        if(touched){
            switch (props.fetchedData) {
                case 'register':
                    dispatch(updateAndValidateRegisterField(props.fieldName, val, props.validators))
                    break
                case 'login':
                    dispatch(updateAndValidateLoginField(props.fieldName, val, props.validators))
                    break
                case 'firm':

                    break
                case 'client':

                    break
                default:
                    break;
            }
    
        }else{  

            switch (props.fetchedData) {
                case 'register':
                    dispatch(updateRegisterField(props.fieldName, val))
                    break
                case 'login':
                    dispatch(updateLoginField(props.fieldName, val))
                    break
                case 'firm':

                    break
                case 'client':

                    break
                default:
                    break;
            }
        }
    }


    // const onBlurHandler = () => {

    // }



    return <>

        <TextInput
            id={props.id}
            value={props.value}
            placeholder={props.placeholder}
            style={!fetchedData[props.fieldName].isValid && touched ? styles.inputInvalid : styles.input}
            onChangeText={(text) => handleChange(text)}
            onFocus={() => setTouched(true)}  
            // onBlur={onBlurHandler}

        />

        {!fetchedData[props.fieldName].isValid && touched && <Text style={styles.errorText}>{props.errorText}</Text>}
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
