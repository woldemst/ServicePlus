import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";
import { useContext, useState } from "react";

import OrderList from '../components/OrderList'
import ModalComponent from "../../shared/UIElements/Modal";
import OrderCreate from "./OrderCreate";

const OrderView = () => {

    const [isModalVisible, setModalVisible] = useState(false);
    const [refresh, setRefresh] = useState(false)

    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    }
    return (
        <>
            <View style={styles.container} >
                <View style={styles.header} >
                    <View style={styles.headerContent}>

                        <View style={styles.textContainer} >
                            <Text style={styles.headerText}>Aufträge</Text>
                        </View>

                        <View style={styles.headerIconContainer} >
                            <TouchableOpacity style={styles.headerButton} onPress={toggleModal} >
                                <Image style={styles.headerIcon} source={require('../../../assets/add_new.png')} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.headerButton} >
                                <Image style={styles.headerIcon} source={require('../../../assets/filter.png')} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <OrderList />
            </View>

            <ModalComponent
                isVisible={isModalVisible}
                animationIn="slideInUp" // Specify the slide-up animation
                animationOut="slideOutDown" // Specify the slide-down animation
                onBackdropPress={toggleModal}
                onBackButtonPress={toggleModal}

                header={<Text style={styles.modalHeadline}>Auftrag hinzufügen</Text>}
            >
                <OrderCreate refresh={refresh} toggle={toggleModal} />
            </ModalComponent>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        padding: 24,
        backgroundColor: '#fff',
        flex: 1,

    },
    header: {
        width: '100%',
        marginBottom: 16,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 0,
        paddingRight: 0,
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
})

export default OrderView;