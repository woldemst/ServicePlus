import { TouchableOpacity, Text} from "react-native";

const Button = props => {
    return <>
        <TouchableOpacity onPress={props.onPress} style={props.style} disabled={props.disabled} >
            <Text style={props.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    </>
    
}

export default Button;