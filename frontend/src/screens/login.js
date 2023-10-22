import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, TouchableHighlight, View } from 'react-native';
import { Screen, Inputs, Color, Buttons } from '../styles/index';

function Login(props) {

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    })

    const onPressLogin = () => {

    }

    const onPressForgotPassword = () => {

    }

    const onPressSignUp = () => {

    }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo-img.png')} style={{width: 100, height: 100}}/>
            <View style={styles.inputView}>
                <TextInput 
                    style={styles.inputText}
                    placeholder='Email'
                    placeholderTextColor={Color.inputs.text}
                    onChangeText={text => setUserInfo({email:text})}
                    />
            </View>
            <View style={styles.inputView}>
                <TextInput 
                    style={styles.inputText}
                    secureTextEntry
                    placeholder='Password'
                    placeholderTextColor={Color.inputs.text}
                    onChangeText={text => setUserInfo({password:text})}
                    />
            </View>
            <Pressable onPress={onPressForgotPassword}>
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
                <Pressable style={{marginLeft: 4}}>
                    <Text style={styles.linkText}>Sign Up</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...Screen.Login
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
        ...Buttons.loginButton
    },
    btnText: {
        ...Buttons.buttonText
    },
    registerView: {
        flex: 2,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center', 
        width: "80%",
        padding: 20,
    }

    
})

export default Login;