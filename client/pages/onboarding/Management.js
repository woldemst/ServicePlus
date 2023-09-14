 import { View, Text,  Image, StyleSheet} from "react-native"


const Management = ({route}) => { 

    const activeTab = route.params.activeTab;

    return (
        <View style={styles.container}>
            <Text style={styles.logoText}>ServicePlus</Text>
            <Image style={styles.image} source={require('../../assets/onboarding_1.png')} />
            <Text style={styles.title}>Verwaltung</Text>
            <Text style={styles.description}>Registrieren Sie Ihren Betrieb und verwalten Sie Ihre Mitarbeiter direct in der App.</Text>

            <View style={styles.pagination}>
                {[0, 1].map((index) => (
                <View
                    key={index}
                    style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: index === activeTab ? '#7A9B76' : 'lightgray',
                    marginHorizontal: 5,
                    }}
                />
                ))}
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
        paddingLeft: 16,
        paddingRight: 16,
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
        marginBottom: 12,
        padding: 8,
    },
    description: {
        fontSize: 16, 
        marginLeft: 46, 
        marginRight: 46,
        lineHeight: 28

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
        bottom: 48,              
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

export default Management;