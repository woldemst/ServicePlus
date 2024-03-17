import { StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useState, useEffect } from "react";
import { validate } from "../../util/validators";
import { useDispatch, useSelector } from "react-redux";
import { setSelect } from "../../actions/selectActions";


const Select = props => {
  const dispatch = useDispatch()
  const [touched, setTouched] = useState(false)
  const [isValid, setIsValid] = useState(true)
  const fetchedData = useSelector((state) => state[props.reducerKey]);

  // useEffect(() => {
  //   if (touched) {
  //     setIsValid(validate(props.value, props.validators))
  //   }
  // }, [touched])

  const handleChange = val => {
    setIsValid(validate(val, props.validators))
    dispatch(setSelect(props.fieldName, val, props.validators, props.objectId, props.reducerKey))

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
      dropdownStyles={styles.dropdown}
      defaultOption={props.defaultOption}
      dropdownShown={false}
      disabledItemStyles={!props.disabled ? styles.selectInvalid : styles.select}
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
    borderRadius: 6
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
  placeholderText: {
    color: "#000",
  },
  placeholderTextInvalid: {
    color: "red",

  },
  dropdown: {
    borderRadius: 6
  }

})

export default Select;