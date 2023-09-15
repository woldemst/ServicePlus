import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"

import Appointment from "./Appointment"

const Overview = () => {
    return ( 
        <View style={styles.container}> 
            <View style={styles.header} >
                <View style={styles.headerContent}>

                    <View style={styles.textContainer} >
                        <Text style={styles.headerText}>Terminübersicht</Text>

                    </View>


                    <View style={styles.headerIconContainer} >
                        <TouchableOpacity style={styles.headerButton} >

                            <Image width='24' height='24' source={require('../../assets/calendar_plus.png')} />

                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.headerButton} >
                            <Image width='24' height='24'  source={require('../../assets/filter.png')} />

                        </TouchableOpacity>
                    </View>



                </View>
            </View>
            <View style={styles.mainContent}> 

                <View style={styles.imgContainer}>
                    {/* <Image style={styles.bannerImg} source={require('../../assets/banner0.png')} /> */}
                </View>

                <View style={styles.appointmentsContainer}>
                    <Appointment />

                </View>

            </View>

            <View style={styles.footer} >
                <View style={styles.footerContent}>

                    <View style={styles.footerIconContainer} >
                        <TouchableOpacity style={styles.footerButton} >
                            <Image source={require('../../assets/tabler.png')} />
                            <Text style={styles.footerIconText}>Termine</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footerIconContainer} >
                        <TouchableOpacity style={styles.footerButton} >

                            <Image source={require('../../assets/settings.png')} />
                            <Text style={styles.footerIconText}>Aufträge</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footerIconContainer} >
                        <TouchableOpacity style={styles.footerButton} >
                            <Image source={require('../../assets/betrieb.png')} />
                            <Text style={styles.footerIconText}>Betrieb</Text>
                        </TouchableOpacity>
                    </View>

                </View>


            </View>
        </View>
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

        flexDirection:'row',
        justifyContent: 'space-between'
    },
    textContainer: {

    },
    headerText: {
        fontSize: 21,
        fontWeight:  '400'
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
    // HEADER: END !!!

    // MAIN: START !!!
    mainContent: {
        // borderColor: 'red', 
        // borderWidth: 2,

        flex: 1,
        position: 'relative',
    },
    bannerImg: {
        // bottom: '50%',
    },
    imgContainer: {
        // borderColor: 'red', 
        // borderWidth: 2,

        flex: 1,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        top: 0, 
        right: 0, 
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 0,
        marginBottom: 0
    },
    appointmentsContainer: {
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
        flexDirection:'row',
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

    
})

export default Overview;