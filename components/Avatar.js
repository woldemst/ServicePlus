import { Image, View, StyleSheet } from 'react-native';

const Avatar = ({ source, style }) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.frame}>
                <Image style={styles.img} source={source} />
                {/* <Image style={styles.img} source={require('../../../assets/customer/customer_avatar.jpg')} /> */}

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%', // Adjusted to set a defined width
        height: '100%', // Adjusted to set a defined height
        backgroundColor: '#fff',
        alignSelf: 'center',
        borderRadius: 20, // Half of width and height to make it circular
        overflow: 'hidden',  // Ensures the image does not spill outside the boundary
        borderWidth: 2,
        borderColor: '#eee', // Light grey border for subtle effect
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    frame: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        // borderWidth: 1,
        // borderColor: 'red',
    },
    img: {
        
        // borderWidth: 1,
        // borderColor: 'red',
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Changed to 'cover' to fill the frame
    }
});

export default Avatar;