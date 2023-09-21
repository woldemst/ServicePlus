import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { useEffect, useState } from "react"
import { useNavigation } from '@react-navigation/native'
import axios from "axios"

import ModalComponent from "../../../share/UIElements/Modal"
import FirmProfile from "./firm/FirmProfile"

const Firm = () => {
    const navigation = useNavigation()

    const [fetchedFirm, setFetchedFirm] = useState([])
    const [isModalVisible, setModalVisible] = useState(false);
    
    const toggleModal = () => setModalVisible(!isModalVisible)

    useEffect(()=>{

        const fetcheFirm = async () =>{
            try {

                const response = await axios.get("http://localhost:8000/api/firm/profile")
                setFetchedFirm(response.data)
            } catch (err) {
                console.log("Error fetching firm profile", err);
                
            }
        }
        // alert(fetchedFirm)

        fetcheFirm()
    }, [])
    

    return (
        <>
            <View style={styles.container} >
                <TouchableOpacity style={styles.firmContainer} onPress={toggleModal}>
                    <View style={styles.imageContainer} >
                        <Image style={styles.img} source={require('../../../assets/firmImage.jpeg')} ></Image>
                    </View>
                    <View style={styles.nameContainer} >
                        {fetchedFirm.map(firm => (
                            <>
                                <Text style={styles.firmName}>{firm.name}</Text>
                                <Text style={styles.bossName}>{firm.owner}</Text>

                            </>

                        ))}
                    </View>

                </TouchableOpacity>
                <View style={styles.listContainer} >
                    <TouchableOpacity style={styles.listItem} onPress={()=>{navigation.navigate('editProfile', {name: 'Edit Profile'})}}>
                        <Image style={styles.icon} source={require('../../../assets/firm/profile.png')} />
                        <Text style={styles.itemText}>Unternehmensprofile bearbeiten</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listItem}>
                        <Image style={styles.icon} source={require('../../../assets/firm/worker.png')} />
                        <Text style={styles.itemText}>Mitarbeiter verwalten</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listItem}>
                        <Image style={styles.icon} source={require('../../../assets/firm/customer.png')} />
                        <Text style={styles.itemText}>Kunden verwalten</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listItem}>
                        <Image style={styles.icon} source={require('../../../assets/firm/setting.png')} />
                        <Text style={styles.itemText}>Einstellungen</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.logoutContainer}>
                <TouchableOpacity style={styles.listItem}>
                        <Image style={styles.icon} source={require('../../../assets/firm/logout.png')} />
                        <Text style={styles.itemText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ModalComponent 
                isVisible={isModalVisible}
                animationIn="slideInUp" // Specify the slide-up animation
                animationOut="slideOutDown" // Specify the slide-down animation
                onBackdropPress={toggleModal}
                onBackButtonPress={toggleModal}
                modalHeight='40%'
                header={<Text style={styles.modalHeadline}>Betrieb</Text>}
            >
                <FirmProfile items={fetchedFirm} />
            </ModalComponent>

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

export default Firm; 