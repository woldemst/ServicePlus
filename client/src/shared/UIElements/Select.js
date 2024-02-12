import { StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useState, useEffect } from "react";
import { validate } from "../../util/validators";


const Select = props => {
  const [touched, setTouched] = useState(false)
  const [isValid, setIsValid] = useState(true)



  useEffect(() => {
    if (touched) {
      setIsValid(validate(props.value, props.validators))
    }
  }, [touched])

  const handleChange = val => {
    setIsValid(validate(val, props.validators))
    props.onChange(props.fieldName, val, props.validators);


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
      boxStyles={!isValid ? styles.selectInvalid : styles.select}
      inputStyles={!isValid ? styles.placeholderTextInvalid : styles.placeholderText}
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
  selectInvalid: {
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