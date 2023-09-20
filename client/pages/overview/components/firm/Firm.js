import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { useState } from "react"


const Firm = () => {
    return (
        <>
            <View style={styles.container} >
                <View style={styles.firmContainer}>
                    <View style={styles.imageContainer} >
                        <Image style={styles.img} source={require('../../../../assets/firmImage.jpeg')} ></Image>
                    </View>
                    <View style={styles.nameContainer} >
                        <Text style={styles.firmName}>Name des Betriebes</Text>
                        <Text style={styles.bossName}>Name des Geschäftsführers</Text>
                    </View>

                </View>
                <View style={styles.listContainer} >
                    <TouchableOpacity style={styles.listItem}>
                        <Image style={styles.icon} source={require('../../../../assets/firm/profile.png')} />
                        <Text style={styles.itemText}>Unternehmensprofile bearbeiten</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listItem}>
                        <Image style={styles.icon} source={require('../../../../assets/firm/worker.png')} />
                        <Text style={styles.itemText}>Mitarbeiter verwalten</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listItem}>
                        <Image style={styles.icon} source={require('../../../../assets/firm/customer.png')} />
                        <Text style={styles.itemText}>Kunden verwalten</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listItem}>
                        <Image style={styles.icon} source={require('../../../../assets/firm/setting.png')} />
                        <Text style={styles.itemText}>Einstellungen</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.logoutContainer}>
                <TouchableOpacity style={styles.listItem}>
                        <Image style={styles.icon} source={require('../../../../assets/firm/logout.png')} />
                        <Text style={styles.itemText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        // borderWidth: 2, 
        // borderColor: 'red'
    },
    firmContainer: {
        flexDirection: 'row'
    },
    imageContainer: {
        justifyContent: 'center'
    },
    img : {
        width: 48, 
        height: 48
    },
    nameContainer: {
        // borderWidth: 2, 
        // borderColor: 'red',
        paddingLeft: 16, 
        paddingRight: 16,
        paddingTop: 9,
        paddingBottom: 9,
    },
    firmName: {
        fontSize: 16,
        fontWeight: '700'
    },
    bossName: {
        color: '#9e9e9e',
        fontSize: 14
    },
    listContainer: {
        paddingTop: 23,
        // flex: 1,
        // height: '100%',
        // borderWidth: 2, 
        // borderColor: 'red',
    },
    listItem: {
        // borderWidth: 2, 
        // borderColor: 'red',

        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 4
        // paddingLeft: 16, 
        // paddingRight: 16,
        // paddingTop: 14,
        // paddingBottom: 14,
        // height: 56
    },
    icon: {
        margin: 12,

    },
    itemText: {
        marginLeft: 16,   
        marginTop: 16, 
        marginBottom: 16,
        fontSize: 16
    },
    logoutContainer: {
        position: 'fixed',
        bottom: 0
    }
})

export default Firm; 