import { View, ScrollView} from "react-native"
import OrderList from '../components/order/OrderList'


const OrderView = () => {
    return(

        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <OrderList />
            </ScrollView>
        </View>

    )
}


export default OrderView;