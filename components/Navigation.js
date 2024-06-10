import { View, Text,  StyleSheet} from "react-native";
// import { Text } from '@rneui/themed';

const Navigation = () => {
    return(
        <View style={styles.headerMain} >
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Main</Text>
                <Text style={styles.headerText}>Sign in</Text>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    headerMain: {
        backgroundColor: '#21252B',
        top: 0, 
        position: "absolute",
        height: 100,
        width: '100%', 
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    headerContainer: {  
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',

    },
    headerText: {
        color: '#fff',
        textAlign: "center",
        fontSize: 22
    }, 
})


export default Navigation;