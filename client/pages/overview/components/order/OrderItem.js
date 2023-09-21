import { View, StyleSheet, Image, Text } from "react-native";



const OrderItem = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.indicator}></View>

            <View style={styles.mainContent}>
                <View style={styles.nameContainer} >
                    <Text style={styles.order}>{props.order.name}</Text>
                    <Text style={styles.date}>{props.order._id}</Text>
                </View>


                <View style={styles.adressContainer}>

                    <Text style={styles.workersName}>{props.order.address}</Text>


                </View>

                <Text style={styles.workersName}>{props.order.customer}</Text>
                
            </View>

            {/* <View style={styles.iconContainer}>
                <Image style={styles.filePlusImg} source={require('../../../assets/file_plus.png')} />
            </View> */}
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: '#757575',
        marginBottom: 16, 
    },
    indicator: {
        width: '3%',
        backgroundColor: '#7A9B76',
        borderTopLeftRadius: 10, 
        borderBottomLeftRadius: 10

    },  
    mainContent: {
        flex: 1,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 16,
        paddingRight: 16,
        textAlign: 'left', 

    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'

    },  
    adressContainer: {
        flexDirection: 'row'
    },  
    date: {
        fontSize: 14, 
        color: '#171717', 
        fontWeight: '700'
    },  
    workersName: {
        fontSize: 14, 
        marginTop: 6  
    },
    order: {
        fontSize: 14, 
        // marginTop: 7
    },
    iconContainer: {
        // width: '8%',
        paddingRight: 13,
        alignItems: 'center',
        justifyContent: 'center'
    },
    filePlusImg: {
        // borderColor: 'red', 
        // borderWidth: 2
        // width: 24, 
        // height: 24,
    },

})




export default OrderItem; 