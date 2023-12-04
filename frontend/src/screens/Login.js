import React, { useState } from 'react';
import {Pressable, StyleSheet, TextInput, View, Image, Text} from 'react-native';
import { Screens, Inputs, Color, Buttons } from '../styles/index';
import {useAuth} from "../services/AuthProvider";
import Loading from "../components/loading";
function Login({ navigation }) {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

    const { actions, loading } = useAuth();

    const handleLogin = () => {
        actions.login(email, password)
    }

    const handleForgotPassword = () => {
        // TODO add firebase forgot email form
        console.log("Forgot Password Link");
    }

    if (loading) {
        return <Loading/>
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
                    onChangeText={text => setEmail(text)}
                    />
            </View>
            <View style={styles.inputView}>
                <TextInput 
                    style={styles.inputText}
                    secureTextEntry
                    fontSize={18}
                    placeholder='Password'
                    placeholderTextColor={Color.inputs.text}
                    onChangeText={text => setPassword(text)}
                    />
            </View>
            <Pressable onPress={handleForgotPassword} style={{margin: 20}}>
                <Text style={styles.linkText}>Forgot Password?</Text>
            </Pressable>
            <Pressable
                onPress={handleLogin}
                style={({pressed}) => [
                    {
                    backgroundColor: pressed ? Color.inputButton.pressed : Color.inputButton.fill
                    },
                    styles.loginBtn,
                ]}>
                <Text style={styles.btnText}>LOG IN</Text>
            </Pressable>
            <View style={styles.registerView}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>Don't have an account?</Text>
                <Pressable onPress={() => navigation.push("Register")} style={{marginLeft: 4}}>
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
