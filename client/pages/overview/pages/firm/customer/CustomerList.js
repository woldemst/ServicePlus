import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { useEffect, useState } from "react"
// import { useNavigation } from '@react-navigation/native'
import axios from "axios"
import CustomerItem from "./CustomerItem"


const CustomerList = () => {
    const [fetchedCustomers, setFetchedCustomers] = useState([])

    useEffect(()=> {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/customers/all')
                setFetchedCustomers(response.data)
            } catch (err) {
                console.log('Error fetching customers', err);
            }
        }
        fetchCustomers()
    }, [])

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header} >
                    <View style={styles.headerContent}>
                        <View style={styles.textContainer} >
                            <Text style={styles.headerText}>Kunden</Text>
                        </View>

                        <View style={styles.headerIconContainer} >
                            <TouchableOpacity style={styles.headerButton} >
                                <Image style={styles.headerIcon} source={require('../../../../../assets/customer/user_plus.png')} />
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>

                <View style={styles.customerList}>
                    {fetchedCustomers.map(customer => (
                        <CustomerItem 
                            id={customer.id} 
                            key={customer.id} 
                            name={customer.name}
                            // email={customer.email}
                            customerNr={customer.customerNr}
                            address={customer.address}
                            // worker={customer.worker}
                        
                            organisation
                            street
                            houseNr
                            zip
                            place
                            phone
                            mobilePhone
                            // contact={customer.contact}
                            worker
                            nextAppointment
                            description
                          
                        />
                    ))}
                </View>

            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        // borderWidth: 2, 
        // borderColor: 'red'

        backgroundColor: '#fff',
        flex: 1,

    },
    header: {
        width: '100%',
        paddingTop: 27,
        paddingBottom: 10,
        paddingLeft: 32,
        paddingRight: 32,
        position: 'fixed',
        top: 0,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        backgroundColor: '#fff'

    },
    headerContent: {

        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 21,
        fontWeight: '400'
    },
    imgSet: {
        backgroundColor: '#7a9b76',
        borderRadius: 50,
        padding: 10
    },
    textContainer: {

    },
    customerList: {
        paddingTop: 32,
        paddingBottom: 32, 
        paddingLeft: 16, 
        paddingRight: 16
    },
    customerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

        // borderColor: 'red',
        // borderWidth: 2
    },
    customerContent: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    imageContainer: {
        justifyContent: 'center'
    },
    img: {
        width: 24,
        height: 24
    },
    nameContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 9,
        paddingBottom: 9,
    },
    customerName: {
        fontSize: 16,
        fontWeight: '700'
    },
    bossName: {
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
    arrowWrapper:{
        justifyContent: 'center'
    },
    circleWrapper: {
        justifyContent: 'center',
        width: '13%',
        // borderColor: 'red',
        // borderWidth: 2
    }
})


export default CustomerList;