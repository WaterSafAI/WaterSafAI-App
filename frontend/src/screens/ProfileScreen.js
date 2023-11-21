import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Screens, Inputs, Color, Buttons } from '../styles/index';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from "../services/AuthProvider";

function ProfileScreen({ navigation }) {
    const { user } = useAuth();
    // const userId = user.uid;
    const userId = 'SyvDhW96eWnsp62dEYSb'

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://10.0.2.2:3000/users/${userId}/`);
            const json = await response.json();
            console.log(json)
        }

        fetchData();
    }, [])

    const handleResetPassword = () => {
        // Handle reset
    }

    return (
        <View style={styles.container}>
            <Text style={styles.userName}>Josh Simmons</Text>

            <View style={styles.inputView}>
                <FontAwesome name="envelope" size={20} color="blue" />
                <Text style={styles.inputText}>Email: example1@gmail.com.com</Text>
            </View>

            <View style={styles.inputView}>
                <FontAwesome name="briefcase" size={20} color="blue" />
                <Text style={styles.inputText}>Account Type: Professional</Text>
            </View>

            <View style={styles.inputView}>
                <FontAwesome name="map-marker" size={20} color="blue" />
                <Text style={styles.inputText}>Location: 1234 Research Parkway, Orlando FL 32826</Text>
            </View>

            <View style={styles.inputView}>
                <FontAwesome name="building" size={20} color="blue" />
                <Text style={styles.inputText}>Company: Siemens Energy</Text>
            </View>

            <Pressable
                onPress={handleResetPassword}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? Color.inputButton.pressed : Color.inputButton.fill
                    },
                    styles.resetBtn,
                ]}>
                <Text style={styles.btnText}>Reset Password</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...Screens.mainScreen
    },
    inputView: {
        ...Inputs.fieldContainer,
        flexDirection: 'row',
        alignItems: 'start',
        justifyContent: 'flex-start'
    },
    inputText: {
        ...Inputs.loginInput,
        marginLeft: 10, 
    },
    resetBtn: {
        marginTop: 10,
        ...Buttons.buttonContainer
    },
    btnText: {
        ...Buttons.buttonText
    },
});

export default ProfileScreen;
