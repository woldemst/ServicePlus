import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

const AppointmentInfo = props => {

    console.log(props);
    return <>
        <View style={styles.container}>
            <View style={styles.table}>
                <View style={styles.row}>
                    <Text style={[styles.boldCell, styles.cell]}>Datum:</Text>
                    <Text style={[styles.thinCell, styles.cell]}>{props.date}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.boldCell, styles.cell]}>Zeit:</Text>
                    <Text style={[styles.thinCell, styles.cell]}>{props.time}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.boldCell, styles.cell]}>Auftrag:</Text>
                    <Text style={[styles.thinCell, styles.cell]}>Auftrag X</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.boldCell, styles.cell]}>Mitarbeiter:</Text>
                    <Text style={[styles.thinCell, styles.cell]}>Some Worker</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.boldCell, styles.cell]}>Kunde:</Text>
                    <Text style={[styles.thinCell, styles.cell]}>Herr Musterman</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.boldCell, styles.cell]}>Adresse:</Text>
                    <Text style={[styles.thinCell, styles.cell]}>{props.o_street} {props.o_houseNr} {props.o_zip} {props.o_place}</Text>
                </View>
            </View>
        </View>
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
        paddingBottom: 16
    },
    table: {

    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
        // borderColor: 'green',
        // borderWidth: 2
    },
    cell: {

        // borderColor: 'red',
        // borderWidth: 2
    },
    boldCell: {
        fontSize: 20,
        fontWeight: '600'
    },
    thinCell: {
        width: '60%',
        fontSize: 20,
        fontWeight: '400'
    }
})

export default AppointmentInfo;