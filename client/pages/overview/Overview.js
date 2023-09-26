import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { useState } from "react"

import AppointmentView from "./pages/AppointmentView"
import OrderView from "./pages/OrderView"
import FirmView from "./pages/FirmView"

import ModalComponent from "../../share/UIElements/Modal"
import OrderCreate from "./components/order/form/OrderCreate"



const Overview = (props) => {
    const [activeTab, setActiveTab] = useState(2)
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible)
      }


    return (
        <>
            <View style={styles.container}>
                <View style={styles.header} >
                    <View style={styles.headerContent}>
                        <View style={styles.textContainer} >
                            {activeTab == 1 && <Text style={styles.headerText}>Terminübersicht</Text>}
                            {activeTab == 2 && <Text style={styles.headerText}>Aufträge</Text>}
                            {activeTab == 3 && <Text style={styles.headerText}>Betrieb</Text>}

                        </View>

                        <View style={styles.headerIconContainer} >
                            {activeTab == 1 && (
                                <TouchableOpacity style={styles.headerButton} >
                                    <Image style={styles.headerIcon} source={require('../../assets/calendar_plus.png')} />
                                </TouchableOpacity>
                            )}
                            {activeTab == 2 && (
                                <TouchableOpacity style={styles.headerButton} onPress={toggleModal} >
                                    <Image style={styles.headerIcon} source={require('../../assets/calendar_plus.png')} />
                                </TouchableOpacity>
                            )}

                            {activeTab !== 3 && (
                                <TouchableOpacity style={styles.headerButton} >
                                    <Image style={styles.headerIcon} source={require('../../assets/filter.png')} />
                                </TouchableOpacity>
                            )}

                        </View>

                    </View>
                </View>

                <View style={styles.mainContent}>
                    <View style={styles.orderContainer}>    
                        {activeTab == 1 && <AppointmentView />}
                        {activeTab == 2 && <OrderView />}
                        {activeTab == 3 && <FirmView />}
                    </View>
                </View> 

                <View style={styles.footer} >
                    <View style={styles.footerContent}>

                        <View style={styles.footerIconContainer} >
                            <TouchableOpacity style={styles.footerButton} number='1' onPress={()=>{setActiveTab(1)}}>
                                <Image source={require('../../assets/tabler.png')} />
                                <Text style={styles.footerIconText}>Termine</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.footerIconContainer} >
                            <TouchableOpacity style={styles.footerButton} number='2' onPress={()=>{setActiveTab(2)}}>

                                <Image source={require('../../assets/settings.png')} />
                                <Text style={styles.footerIconText}>Aufträge</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.footerIconContainer} >
                            <TouchableOpacity style={styles.footerButton} number='3' onPress={()=>{setActiveTab(3)}}>
                                <Image source={require('../../assets/betrieb.png')} />
                                <Text style={styles.footerIconText}>Betrieb</Text>
                            </TouchableOpacity>
                        </View>

                    </View>


                </View>
            </View>

            <ModalComponent 
                isVisible={isModalVisible}
                animationIn="slideInUp" // Specify the slide-up animation
                animationOut="slideOutDown" // Specify the slide-down animation
                onBackdropPress={toggleModal}
                onBackButtonPress={toggleModal}
                
                header={<Text style={styles.modalHeadline}>Auftrag hinzufügen</Text>}
            >
                <OrderCreate toggle={toggleModal} />
            </ModalComponent>


        </>
    )
}

const styles = StyleSheet.create({
    container: {
        // borderColor: 'red', 
        // borderWidth: 2,

        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',


    },

    // HEADER: START !!!
    header: {
        width: '100%',
        paddingTop: 27,
        paddingBottom: 10,
        paddingLeft: 32,
        paddingRight: 32,
        position: 'fixed',
        top: 0,
        borderBottomColor: '#eee',
        borderBottomWidth: 1

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
    // HEADER: END !!!

    // MAIN: START !!!
    mainContent: {
        // borderColor: 'red', 
        // borderWidth: 2,

        flex: 1,
        position: 'relative',
    },

    orderContainer: {
        padding: 32
    },
    // MAIN: END !!!

    // FOOTER: START !!!
    footer: {
        position: 'fixed',
        bottom: 0,
        borderTopColor: '#eee',
        borderTopWidth: 1,
        width: '100%',
        paddingTop: 24,
        paddingBottom: 24,
        paddingLeft: 40,
        paddingRight: 40,
        // position: 'absolute',
    },
    footerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    footerIconContainer: {


    },
    footerButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerIconText: {
        fontSize: 12
    },
    // FOOTER: END !!!
    modalHeadline: {
        fontSize: 21,
        color: '#7a9b76',
        fontWeight: '700'
    },

})

export default Overview;