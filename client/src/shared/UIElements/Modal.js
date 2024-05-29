import React, { useState, useRef } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, PanResponder } from 'react-native';
import Modal from 'react-native-modal'




const ModalComponent = (props) => {
  return (
    <View>

      <Modal
        style={styles.container}
        isVisible={props.isVisible}
        animationIn={props.animationIn} // Specify the slide-up animation
        animationOut={props.animationOut} // Specify the slide-down animation
        onBackdropPress={props.onBackdropPress}
        onBackButtonPress={props.onBackButtonPress}
      >

        <View style={[styles.modalContainer, { height: props.modalHeight && props.modalHeight }]}>
          <View style={styles.modalHeader}>{props.header}</View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            <View style={styles.modalContent}>{props.children}</View>

            {props.footer && <View style={styles.modalFooter}>{props.footer}</View>}
          </ScrollView>
        </View>

      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,

  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 32,
    borderRadius: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flex: 1,
  },
  modalContent: {
    // borderColor: 'red',
    // borderWidth: 4,
    flex: 1,
    minHeight: "100%",
  },
  scrollViewContent: {
    flexGrow: 1,
  },


});

export default ModalComponent