import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    Image,
} from "react-native";
import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { getArchivedOrders } from "../../actions/orderActions";
import OrderList from '../components/OrderList'
import ModalComponent from "../../shared/UIElements/Modal";
import OrderCreate from "./OrderCreate";


const OrderView = () => {
    const dispatch = useDispatch()

    const fetchedData = useSelector((state) => state.order.ordersArray);
    const showArchivedOrders = useSelector(state => state.order.showArchivedOrders)
    const admin = useSelector(state => state.context.admin)

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => setModalVisible(!isModalVisible)
    const toggleArchived = () => dispatch(getArchivedOrders())

    return <View style={styles.orderContainer}>
        <View style={styles.header} >
            <View style={styles.headerContent}>

                <View style={styles.textContainer} >
                    <Text style={styles.headerText}>{fetchedData.orders.length === 0 ? 'Noch keinen Auftrag?' : ['Aufträge ', showArchivedOrders && '(archiviert)']}</Text>
                </View>

                <View style={[styles.headerIconContainer, { justifyContent: admin ? 'space-between' : 'flex-end' }]} >
                    <TouchableOpacity style={styles.headerButton} >
                        <Image style={styles.headerIcon} source={require('../../../assets/filter.png')} />
                    </TouchableOpacity>

                    {admin && (
                        <TouchableOpacity disabled={showArchivedOrders} style={styles.headerButton} onPress={toggleModal} >
                            <Image style={styles.headerIcon} source={require('../../../assets/add_new.png')} />
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity onPress={toggleArchived} style={styles.headerButton} >
                        <Image style={styles.headerIcon} source={require('../../../assets/order/archive.png')} />
                    </TouchableOpacity>

                </View>
            </View>
        </View>

        <View style={styles.content} >
            <OrderList />
        </View>

        <ModalComponent
            isVisible={isModalVisible}
            animationIn="slideInUp" // Specify the slide-up animation
            animationOut="slideOutDown" // Specify the slide-down animation
            onBackdropPress={toggleModal}
            onBackButtonPress={toggleModal}
            modalHeight={'85%'}
            header={<Text style={styles.modalHeadline}>Auftrag hinzufügen</Text>}
        >
            <OrderCreate toggle={toggleModal} />
        </ModalComponent>
    </View>

}

const styles = StyleSheet.create({
    orderContainer: {
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
        backgroundColor: '#fff',
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 21,
        fontWeight: '400'
    },
    headerIconContainer: {
        flexDirection: 'row',
        width: '30%',


    },
    headerButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15
    },
    headerIcon: {
        width: 24,
        height: 24,
    },
    content: {
        flex: 1,
        backgroundColor: '#fff'
    },

    suggestHeader: {
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
        backgroundColor: '#fff',

    },
    textContainer: {
        // borderColor: 'red',
        // borderWidth: 2,
    },
    suggestContainer: {
        flex: 1,
        position: "relative",
    },
    addText: {
        fontSize: 21,
        textAlign: "center",
        // position: "absolute",
        // right: 0,
        // left: 0,
    },
    centeredImageContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",

    },
    addImg: {
        // borderColor: 'red',
        // borderWidth: 2
    },
    modalHeadline: {
        fontSize: 21,
        color: "#7a9b76",
        fontWeight: "700",
    },
})

export default OrderView;