import { View, Text, StyleSheet} from "react-native";


const FirmProfile = (props) => {
    return (
        <>
            {props.items.map(firm => (
                <View key={firm._id} style={styles.profileList}>
                    <View style={styles.listItem}>
                        <Text style={styles.label}>Betrieb:</Text>
                        <View style={styles.wrapper}>
                            <Text style={styles.infoText}>{firm.name}</Text>
                        </View>
                    </View>

                    <View style={styles.listItem}>
                        <Text style={styles.label}>Inhaber:</Text>
                        <View style={styles.wrapper}>
                            <Text style={styles.infoText}>{firm.owner}</Text>
                        </View>
                    </View>

                    <View style={styles.listItem}>
                        <Text style={styles.label}>Email:</Text>
                        <View style={styles.wrapper}>
                            <Text style={styles.infoText}>{firm.email}</Text>
                        </View>
                    </View>

                    <View style={styles.listItem}>
                        <Text style={styles.label}>Adresse:</Text>
                        <View style={styles.wrapper}>
                            <Text style={styles.infoText}>{firm.street}{firm.houseNr}{firm.zip}{firm.place}</Text>
                        </View>
                    </View>

                    <View style={styles.listItem}>
                        <Text style={styles.label}>Telefon:</Text>  
                        <View style={styles.wrapper}>
                            <Text style={styles.infoText}>{firm.phone}</Text>
                        </View>
                    </View>

                    <View style={styles.listItem}>
                        <Text style={styles.label}>Webseite:</Text>
                        <View style={styles.wrapper}>
                            <Text style={styles.infoText}>{firm.website}</Text>
                        </View>
                    </View>

                </View>
            ))}

        </>
    )
}

const styles = StyleSheet.create({
    profileList: {
        marginTop: 20
    },  
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    label: {
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 28,
        width: '35%',

    },
    wrapper: {
        justifyContent: 'flex-start',
        width: '65%',
        // borderColor: 'red',
        // borderWidth: 2
    },
    infoText: {
        fontSize: 18,
        lineHeight: 28
    },
})


export default FirmProfile;