import { View, Text, StyleSheet, ScrollView } from "react-native"

import OrderList from '../components/OrderList'


const OrderView = () => {
    return (

        <View style={styles.container} >
            {/* <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}> */}
            <OrderList />
            {/* </ScrollView> */}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        // borderWidth: 2,
        // borderColor: 'red',
        backgroundColor: '#fff',
        flex: 1,
    },
    scroll: {
        flex: 1,
        borderWidth: 2,
        borderColor: 'red',
    }
})

export default OrderView;