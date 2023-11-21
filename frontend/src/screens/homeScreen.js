import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Color, Screens, Buttons } from '../styles/index';
import { useAuth } from "../services/AuthProvider";

function HomeScreen(props) {
    const { navigation } = props;
    const { actions } = useAuth();

    const handleLogout = () => {
        actions.logout()
    }

    const getUsers = async () => {
        const response = await fetch('http://10.0.2.2:3000/users');
        const json = await response.json()
        console.log(json)
    }

    return (
        <View style={styles.container}>
            <Pressable
                onPress={getUsers}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? Color.inputButton.pressed : Color.inputButton.fill
                    },
                    styles.loginBtn,
                ]}>
                <Text style={styles.btnText}>Get users</Text>
            </Pressable>
            <Pressable
                onPress={handleLogout}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? Color.inputButton.pressed : Color.inputButton.fill
                    },
                    styles.loginBtn,
                ]}>
                <Text style={styles.btnText}>SIGN OUT</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...Screens.mainScreen
    },
    loginBtn: {
        ...Buttons.buttonContainer,
        marginBottom: 24
    },
    btnText: {
        ...Buttons.buttonText
    },
})

export default HomeScreen;