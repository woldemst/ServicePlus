import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { useEffect, useState } from "react"


const CustomerDetails = props => {
    return <>
        <View>
            <Text>Kundeninfos</Text>
            <Text>{props.name}</Text>

        </View>  
    </>
}

export default CustomerDetails;