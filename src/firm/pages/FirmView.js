import { View, Text, StyleSheet } from "react-native"
import { useState, useEffect } from "react"
import CreateSuggest from "./CreateSuggest"
import JoinFirm from "../../worker/pages/JoinFirm"
import { useSelector } from "react-redux"

import FirmItem from "../components/FirmItem"

const FirmView = () => {
    const userRole = useSelector(state => state.context.userRole)
    const refresh = useSelector(state => state.util.refresh)
    const firmId = useSelector(state => state.context.firmId)
    const [content, setContent] = useState(null);

    useEffect(() => {
        const renderContent = () => {
            if (!firmId) {
                return !userRole ? <JoinFirm /> : <CreateSuggest />
            }
            return <FirmItem />
        }
        setContent(renderContent());

    }, [refresh, firmId])

    // console.log(refresh, firmId)

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

                <View style={styles.content}>{content}</View>
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
    textContainer: {},
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