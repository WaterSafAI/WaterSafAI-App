import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {Color, Screens, Buttons} from '../styles/index';
import {useAuth} from "../services/AuthProvider";

function HomeScreen(props) {
    const { actions } = useAuth();

    const handleLogout = () => {
        actions.logout()
    }

    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>
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
        ...Buttons.buttonContainer
    },
    btnText: {
        ...Buttons.buttonText
    },
})

export default HomeScreen;