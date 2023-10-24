import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, Image, Text } from 'react-native';
import { Screens, Inputs, Color, Buttons } from '../styles/index';
import auth from '@react-native-firebase/auth';
import {useAuth} from "../../App";
function Login({ navigation }) {

    const { setUser } = useAuth();

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    })
    const onPressLogin = () => {

        const provider = auth.EmailAuthProvider;
        const authCredential = provider.credential(userInfo.email, userInfo.password);
        auth().signInWithCredential(authCredential)
            .then((userCredential) => {
                setUser(userCredential.user);
                console.log('User account signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/user-not-found') {
                    console.log("This email is not yet registered.");
                }
                if (error.code === 'auth/wrong-password') {
                    console.log("Invalid password.");
                }
                console.log(error);
            })
    }

    const onPressForgotPassword = () => {
        // TODO add firebase forgot email form
    }

    const onPressSignUp = () => {
        navigation.push("Register");
    }

    return (
        <View style={styles.container}>
            <Text style={{color: Color.logo, fontSize: 32, marginTop: 50}}>
                WaterSaf
                <Text style={{fontWeight: 'bold'}}>AI</Text>
            </Text>
            <Image source={require('../assets/logo-img.png')} style={{width: 150, height: 150, marginBottom: 20}}/>
            <View style={styles.inputView}>
                <TextInput 
                    style={styles.inputText}
                    fontSize={18}
                    placeholder='Email'
                    placeholderTextColor={Color.inputs.text}
                    onChangeText={text => setUserInfo({email:text})}
                    />
            </View>
            <View style={styles.inputView}>
                <TextInput 
                    style={styles.inputText}
                    secureTextEntry
                    fontSize={18}
                    placeholder='Password'
                    placeholderTextColor={Color.inputs.text}
                    onChangeText={text => setUserInfo({password:text})}
                    />
            </View>
            <Pressable onPress={onPressForgotPassword} style={{margin: 20}}>
                <Text style={styles.linkText}>Forgot Password?</Text>
            </Pressable>
            <Pressable
                onPress={onPressLogin}
                style={({pressed}) => [
                    {
                    backgroundColor: pressed ? Color.inputButton.pressed : Color.inputButton.fill
                    },
                    styles.loginBtn,
                ]}>
                <Text style={styles.btnText}>LOG IN</Text>
            </Pressable>
            <View style={styles.registerView}>
                <Text style={styles.registerText}>Don't have an account?</Text>
                <Pressable onPress={onPressSignUp} style={{marginLeft: 4}}>
                    <Text style={styles.linkText}>Sign Up</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...Screens.mainScreen
    },
    inputView: {
        ...Inputs.fieldContainer
    },
    inputText: {
        ...Inputs.loginInput
    },
    linkText: {
        fontSize: 15,
        fontWeight: 'bold',
        ...Inputs.links
    },
    loginBtn: {
        ...Buttons.buttonContainer
    },
    btnText: {
        ...Buttons.buttonText
    },
    registerView: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        margin: 20
    }
});

export default Login;