import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from "react-native"
import { useNavigation } from '@react-navigation/native'


const Appointments = ({route}) => {
    const navigation = useNavigation()
    const activeTab = route.params.activeTab
    return (

        <View style={styles.container}>
            <Text style={styles.logoText}>ServicePlus</Text>
            <Image style={styles.image} source={require('../../assets/onboarding_2.png')} />
            <Text style={styles.title}>Kundentermine</Text>
            <Text style={styles.description}>Behalten Sie Ihre Kunden, Termine und Berichte zentral und mobil im Blick.</Text>


            <View style={styles.btnContainer}>

                <View style={styles.pagination}>
                    {[0, 1].map((index) => (
                    <View
                        key={index}
                        style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: index === activeTab ? 'lightgray' : '#7A9B76',
                        marginHorizontal: 5,
                        }}
                    />
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {navigation.navigate('login', { name: 'Login' });}}>
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
        paddingLeft: 36,
        paddingRight: 36,
        paddingBottom: 0,
        backgroundColor: '#fff',
    },
    logoText: {
        fontSize: 32,
        marginBottom: 50,
        position: 'absolute',
        top: 160
    },
    image: {
        marginTop: 0,
        marginBottom: 0,
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    title: {
        fontSize: 31,
        marginTop: 51,
        marginBottom: 19,
        textAlign: 'center'
      },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 13,
        padding: 8,
    },
    description: {
        fontSize: 16, 
        marginLeft: 46, 
        marginRight: 46,
        lineHeight: 28

    },
    btnContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        textAlign: "center",
        position: 'absolute',
        bottom: 36,
        // right: 36,
        // left: 36, 
        // borderColor: 'red',
        // borderWidth: 2, 
        width: '100%'

    },
    button: {
        width: 77,
        height: 32, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7A9B76',
        
    },
    buttonText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: '#FFFFFF',
        fontSize: 11, 
        fontWeight: 700,


    },
    pagination: {
        position: 'absolute',
        bottom: 12,              
        // right: "100%", 
        left: '50%',
        right: '50%',
        // marginTop: 0, 
        // marginEnd: 0,
        // marginLeft: 'auto',
        // marginRight: 'auto',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'row', 
        justifyContent: 'center', 
        // marginBottom: 30, 
        // borderColor: 'red',
        // borderWidth: 2
    }
})

export default  Appointments;        

