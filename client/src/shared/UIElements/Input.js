import { TextInput, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateAndValidateField, updateField } from '../../actions/userActions'
import { useState } from "react";

const Input = props => {
    const dispatch = useDispatch()
    const fetchedData = useSelector(state => state.user)
    const [touched, setTouched] = useState(false)

    // console.log(fetchedData);
    const handleChange = (val) => {
        if(touched){
            dispatch(updateAndValidateField(props.fieldName, val, props.validators))
        }else{
            dispatch(updateField(props.fieldName, val))
        }

    }

    const touchHandler = (val) => {
        // console.log('toushed', touched);
        setTouched(true)

    }

    const onBlurHandler = () => {
        // console.log('not');
    }



    return <>

        <TextInput
            id={props.id}
            placeholder={props.placeholder}
            style={!fetchedData[props.fieldName].isValid ? styles.inputInvalid : styles.input}
            onChangeText={handleChange}
            value={props.value}
            onFocus={touchHandler}
            onBlur={onBlurHandler}

        />

        {!fetchedData[props.fieldName].isValid && <Text style={styles.errorText}>{props.errorText}</Text>}
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
