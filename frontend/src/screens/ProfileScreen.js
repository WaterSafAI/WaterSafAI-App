import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Screens, Inputs, Color, Buttons } from '../styles/index';
import { FontAwesome } from '@expo/vector-icons';
import Toast from '../components/Toast';
import { useAuth } from "../services/AuthProvider";
import { API_URL } from '../../constants';

function ProfileScreen({ navigation }) {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userAccountType, setUserAccountType] = useState('');
    const [toast, setToast] = useState({});
    const [toastKey, setToastKey] = useState(0);
    const { user, token, actions } = useAuth();
    const userId = user.uid;

    /**
     * This effect will populate the displayed user's data.
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Construct request
                const options = {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                };

                // Get user document
                const response = await fetch(`${API_URL}/users/${userId}/`, options);
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

    const handleLogout = () => {
        actions.logout();
    }

    const handleDeleteAccount = async () => {
        setToastKey(toastKey + 1);
        try {
            // Delete user document
            const options = { method: "DELETE" }
            const response = await fetch(`${API_URL}/users/${userId}/`, options);

            if (!response.ok) {
                throw new Error(`Response code: ${response.status}`)
            }

            // Delete auth user
            actions.delete(user);

            // Show success
            setToast({type: "success", message: "Account deleted."});
        } catch (error) {
            console.error(`Error fetching user data: ${error}`);
            setToast({type: "error", message: "Error deleting account."});
        }
    }

    return (
        <View style={styles.container}>
            {toast.message && <Toast key={toastKey} message={toast.message} type={toast.type} />}
            <View style={styles.useNameBackground}>
                <Text style={styles.userName}>{userName}</Text>
            </View>

            <View style={styles.topInput}></View>
            <View style={styles.inputView}>
                <View  style={styles.inputBox}>
                    <FontAwesome name="envelope" size={20} color="#0A3465"/>
                    <Text style={styles.inputTextHeader}>Email: </Text>
                    <Text style={styles.inputText}>{userEmail}</Text>
                </View>
            </View>

            <View style={styles.inputView}>
                <View style={styles.inputBox}>
                    <FontAwesome name="briefcase" size={20} color="#0A3465" />
                    <Text style={styles.inputTextHeader}>Account Type: </Text>
                    <Text style={styles.inputText}>{userAccountType}</Text>
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
                onPress={handleLogout}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? Color.inputButton.pressed : Color.inputButton.fill
                    },
                    styles.resetBtn,
                ]}>
                <Text style={styles.btnText}>Logout</Text>
            </Pressable>
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
    inputBox: {
        flexDirection: 'row', 
        alignItems: 'center',
        paddingLeft: 3,
        maxWidth: 250,
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
    resetBtn: {
        marginTop: 24,
        ...Buttons.buttonContainer
    },
    btnText: {
        ...Buttons.buttonText
    },
});

export default ProfileScreen;
