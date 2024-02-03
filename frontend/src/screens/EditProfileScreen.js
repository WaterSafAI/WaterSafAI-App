import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Screens, Inputs, Color, Buttons } from '../styles/index';
import { FontAwesome } from '@expo/vector-icons';

function ProfileScreen({ navigation }) {
    const handleSave = () => {
        // Handle save
    }

    return (
        <View style={styles.container}>
            <View style={styles.useNameBackground}>
                <Text style={styles.userName}>Josh Simmons</Text>
            </View>

            <View style={styles.topInput}></View>
            <View style={styles.inputView}>
                <View style={styles.inputBox}>
                    <FontAwesome name="envelope" size={20} color="#0A3465" />
                    <Text style={styles.inputTextHeader}>Email: </Text>
                    <Text style={styles.inputText}>example1@gmail.com.com</Text>
                </View>
            </View>

            <View style={styles.inputView}>
                <View style={styles.inputBox}>
                    <FontAwesome name="briefcase" size={20} color="#0A3465" />
                    <Text style={styles.inputTextHeader}>Account Type: </Text>
                    <Text style={styles.inputText}>Professional</Text>
                </View>
            </View>

            <View style={styles.inputView}>
                <View style={styles.inputBox}>
                    <FontAwesome name="map-marker" size={20} color="#0A3465" />
                    <Text style={styles.inputTextHeader}>Location: </Text>
                    <Text style={styles.inputText}>1234 Research Parkway, Orlando FL 32826</Text>
                </View>
            </View>

            <View style={styles.inputView}>
                <View style={styles.inputBox}>
                    <FontAwesome name="building" size={20} color="#0A3465" />
                    <Text style={styles.inputTextHeader}>Company: </Text>
                    <Text style={styles.inputText}>Siemens Energy</Text>
                </View>
            </View>

            <Pressable
                onPress={handleSave}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? Color.inputButton.pressed : Color.inputButton.fill
                    },
                    styles.saveBtn,
                ]}>
                <Text style={styles.btnText}>Save</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...Screens.mainScreen
    },
    userName:{
        fontSize: 35,
        marginTop: 20,
        marginBottom: 15,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    useNameBackground: {
        backgroundColor: '#0A3465', 
        minWidth: '110%', 
        paddingTop: 10, 
        paddingBottom: 10,
    },
    topInput: {
        paddingTop: 15,
    },
    inputView: {
        ...Inputs.fieldContainer,
        flexDirection: 'row',
        alignItems: 'start',
        justifyContent: 'flex-start',
        textAlign: 'center',
        height: 65,
    },
    inputTextHeader: {
        marginLeft: 10, 
        fontSize: 15,
        padding: 2,
        fontWeight: 'bold',
        color: '#0A3465',
    },
    inputText: {
        fontSize: 15,
        padding: 2,
        color: '#0A3465',
    },
    inputBox: {
        flexDirection: 'row', 
        alignItems: 'center',
        paddingLeft: 3,
        maxWidth: 250,
    },
    saveBtn: {
        marginTop: 10,
        ...Buttons.buttonContainer
    },
    btnText: {
        ...Buttons.buttonText
    },
});

export default ProfileScreen;
