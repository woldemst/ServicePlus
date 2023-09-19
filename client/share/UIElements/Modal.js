import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal'




const ModalComponent = (props) => {


    return (
      <View style={styles.container}>

        <Modal
          isVisible={props.isVisible}
          animationIn="slideInUp" // Specify the slide-up animation
          animationOut="slideOutDown" // Specify the slide-down animation
          onBackdropPress={props.onBackdropPress}
          onBackButtonPress={props.onBackButtonPress}
        >

          <View style={styles.modalContainer}>
            {props.children}
            <Text>This is your modal content.</Text>
            <TouchableOpacity >
              <Text>Close Modal</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'red'
    },
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
    },
  });

export default ModalComponent