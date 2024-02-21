import { View, Text, StyleSheet } from "react-native"

import FirmItem from "../components/FirmItem"
import ModalComponent from "../../shared/UIElements/Modal"
import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../context/auth-context"
import CreateSuggest from "./CreateSuggest"

const FirmView = () => {
    const auth = useContext(AuthContext)
    const [refresh, setRefresh] = useState(false)

    const onFirmCreated = () => {
        setRefresh(!refresh); // Toggle refresh state to trigger re-render
    };
    

    return (
        <>
            <View style={styles.firmContainer}>
                <View style={styles.header} >
                    <View style={styles.headerContent}>
                        <View style={styles.textContainer} >
                            <Text style={styles.headerText}>Betrieb</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.content} >
                    {!auth.firmId ? (
                        <CreateSuggest refresh={refresh} onFirmCreated={onFirmCreated} />
                    ) : (
                        <FirmItem />
                    )}
                </View>
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    firmContainer: {
        backgroundColor: '#fff',
        flex: 1,
    },
    header: {
        paddingLeft: 24,
        paddingRight: 24,
        backgroundColor: '#fff',
        marginTop: 50,
        width: '100%',
        paddingTop: 16,
        paddingBottom: 16,
        position: 'fixed',
        top: 0,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,

    },
    headerContent: {

        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textContainer: {

    },
    headerText: {
        fontSize: 21,
        fontWeight: '400'
    },
    headerIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '20%'
    },
    headerButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerIcon: {
        width: 24,
        height: 24
    },
    content: {
        padding: 24,
        flex: 1,
        backgroundColor: '#fff'
    },

})

export default FirmView; 