import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import {Color, Screens, Buttons} from '../styles/index';
import {useAuth} from "../../App";
import auth from '@react-native-firebase/auth';

function HomeScreen(props) {
    const { setUser } = useAuth();

    const onPressSignOut = () => {
        auth()
            .signOut()
            .then(() => {
                setUser(null);
                console.log('User signed out!');
            });
    }

    return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
        <Pressable
            onPress={onPressSignOut}
            style={({pressed}) => [
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