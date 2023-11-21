import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Screens, Inputs, Color, Buttons } from '../styles/index';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from "../services/AuthProvider";

function ProfileScreen({ navigation }) {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userAccountType, setUserAccountType] = useState('');
    const { user, actions } = useAuth();
    const userId = user.uid;

    /**
     * This effect will populate the displayed user's data.
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get user document
                const response = await fetch(`http://10.0.2.2:3000/users/${userId}/`);
                const json = await response.json();

                // Deconstruct user document
                const { displayName, email, plan } = json;

                // Set user data
                setUserName(displayName);
                setUserEmail(email);
                setUserAccountType(plan);
            } catch (error) {
                console.error(`Error fetching user data: ${error}`)
            }
        }

        fetchData();
    }, [user])

    const handleResetPassword = () => {
        // Handle reset
    }

    const handleDeleteAccount = async () => {
        try {
            // Delete user
            actions.delete(user);
        } catch (error) {
            console.error(`Error fetching user data: ${error}`)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.userName}>{userName}</Text>

            <View style={styles.inputView}>
                <FontAwesome name="envelope" size={20} color="blue" />
                <Text style={styles.inputText}>Email: {userEmail}</Text>
            </View>

            <View style={styles.inputView}>
                <FontAwesome name="briefcase" size={20} color="blue" />
                <Text style={styles.inputText}>Account Type: {userAccountType}</Text>
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
            <Pressable
                onPress={handleDeleteAccount}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? Color.inputButton.pressed : Color.inputButton.fill
                    },
                    styles.resetBtn,
                ]}>
                <Text style={styles.btnText}>Delete Account</Text>
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
        marginTop: 24,
        ...Buttons.buttonContainer
    },
    btnText: {
        ...Buttons.buttonText
    },
});

export default ProfileScreen;
