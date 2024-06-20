import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useState } from "react";

import ModalComponent from "../../shared/UIElements/Modal";
import CreateFirm from "./CreateFirm";

const CreateSuggest = props => {
    const [isModalVisible, setIsModalVisible] = useState(false)

    const toggleModal = () => setIsModalVisible(!isModalVisible)
    const createFirmCall = () => toggleModal()

    return <>
        <View style={styles.container}>
            <TouchableOpacity onPress={createFirmCall}>
                <Image style={styles.image} source={require('../../../assets/firm/add.png')} />
            </TouchableOpacity>
        </View>

        <ModalComponent
            isVisible={isModalVisible}
            animationIn="slideInUp" // Specify the slide-up animation
            animationOut="slideOutDown" // Specify the slide-down animation
            onBackdropPress={toggleModal}
            onBackButtonPress={toggleModal}
            header={<Text style={styles.modalHeadline}>Unternehmen hinzufügen</Text>}
        >
            <CreateFirm toggle={toggleModal} />

        </ModalComponent>
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: 'red',
        // borderWidth: 2
    },
    modalHeadline: {
        fontSize: 21,
        color: '#7a9b76',
        fontWeight: '700'
    },

})

export default CreateSuggest