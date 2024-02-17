import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { useEffect, useState, useContext } from "react"
import { useNavigation } from '@react-navigation/native'
import { useRoute } from "@react-navigation/native"
import axios from "axios"

import { useDispatch, useSelector } from "react-redux"
import { getFirmData } from '../../actions/firmActions'
import { AuthContext } from "../../context/auth-context"


const FirmItem = () => {
    const auth = useContext(AuthContext)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const fetchedData = useSelector(state => state.firm.inputs)
    const [refresh, setRefresh] = useState(false)
    const handleRefresh = () => setRefresh(prevData => !prevData);

    // console.log('Stored as Profile:',fetchedData);

    useEffect(() => {
        const fetcheFirm = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/firm/profile/${auth.userId}`)
                dispatch(getFirmData(response.data));
                // console.log('Goten:',response.data); 

            } catch (err) {
                console.log("Error if fetching firm profile", err);
            }
        }
        fetcheFirm()
    }, [dispatch, refresh])

    const logout = () => {
        auth.logout()
        navigation.navigate('onboarding')
    }


    return <>

        <TouchableOpacity style={styles.firmContainer} onPress={() => {
            navigation.navigate('updateProfile', {
                name: 'Update Profile',
                handleRefresh: handleRefresh
            }
            )
        }}>

            <View style={styles.imageContainer} >
                <Image style={styles.img} source={require('../../../assets/firmImage.jpeg')} ></Image>
            </View>

            <View style={styles.nameContainer} >
                <View>
                    <Text style={styles.firmName}>{fetchedData.name.value}</Text>
                    <Text style={styles.ownerName}>{fetchedData.ownerName.value}</Text>
                </View>
            </View>

        </TouchableOpacity>

        <View style={styles.listContainer} >
            <TouchableOpacity style={styles.listItem}
                onPress={() => {
                    navigation.navigate('workerList', {
                        name: 'Workers'
                    })
                }}
            >

                <Image style={styles.icon} source={require('../../../assets/firm/customer.png')} />
                <Text style={styles.itemText}>Mitarbeiter verwalten</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.listItem} onPress={() => {
                navigation.navigate('customerList', {
                    name: 'Customers'
                })
            }}>
                <Image style={styles.icon} source={require('../../../assets/firm/worker.png')} />
                <Text style={styles.itemText}>Kunden verwalten</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.listItem}>
                <Image style={styles.icon} source={require('../../../assets/firm/setting.png')} />
                <Text style={styles.itemText}>Einstellungen</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.logoutContainer}>
            <TouchableOpacity style={styles.listItem} onPress={logout} >
                <Image style={styles.icon} source={require('../../../assets/firm/logout.png')} />
                <Text style={styles.itemText}>Logout</Text>
            </TouchableOpacity>
        </View>
    </>
}


const styles = StyleSheet.create({

    firmContainer: {
        flexDirection: 'row'
    },
    imageContainer: {
        justifyContent: 'center'
    },
    img: {
        width: 48,
        height: 48
    },
    nameContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 9,
        paddingBottom: 9,
    },
    firmName: {
        fontSize: 16,
        fontWeight: '700'
    },
    ownerName: {
        color: '#9e9e9e',
        fontSize: 14
    },
    listContainer: {
        paddingTop: 23,
    },
    listItem: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 4
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
    },
    modalHeadline: {
        fontSize: 21,
        color: '#7a9b76',
        fontWeight: '700'
    },
})

export default FirmItem;