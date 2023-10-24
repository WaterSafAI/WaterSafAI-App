import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, Image, Text } from 'react-native';
import { Screens, Inputs, Color, Buttons } from '../styles/index';
import auth from '@react-native-firebase/auth';

function Register({ navigation, onRegisterSubmit }) {

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',
        plan: 'personal'
    });

    const onPressCreate = () => {
        //TODO save user name to their profile
        // TODO set up user access roles
        onRegisterSubmit(userInfo.email, userInfo.password)
            .then(() => console.log('User account created!'))
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }
                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
                console.error(error);
            })
    }

    return (
        <View style={styles.container}>
            <Text style={{color: Color.logo, fontSize: 32, fontWeight: 'bold', marginTop: 50}}>
                Create Account
            </Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    fontSize={18}
                    placeholder='Name'
                    placeholderTextColor={Color.inputs.text}
                    onChangeText={text => setUserInfo({name: text})}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    fontSize={18}
                    placeholder='Email'
                    placeholderTextColor={Color.inputs.text}
                    onChangeText={text => setUserInfo({email: text})}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    secureTextEntry
                    fontSize={18}
                    placeholder='Password'
                    placeholderTextColor={Color.inputs.text}
                    onChangeText={text => setUserInfo({password: text})}
                />
            </View>
            <View style={styles.planView}>
                <Pressable
                    onPress={setUserInfo({plan: 'personal'})}
                    style={[{backgroundColor: userInfo.plan === 'personal' ? '#0A3465' : '#ADD8E6'},
                    styles.planBtn]}>
                    <Text style={[{color: userInfo.plan === 'personal' ? '#ADD8E6' : '#0A3465'},
                        styles.planText]}>Personal</Text>
                </Pressable>
                <Pressable
                    onPress={setUserInfo({plan: 'professional'})}
                    style={[{backgroundColor: userInfo.plan === 'professional' ? '#0A3465' : '#ADD8E6'},
                    styles.planBtn]}>
                    <Text style={[{color: userInfo.plan === 'professional' ? '#ADD8E6' : '#0A3465'},
                        styles.planText]}>Professional</Text>
                </Pressable>
            </View>
            <Pressable
                onPress={onPressCreate}
                style={({pressed}) => [
                    {
                        backgroundColor: pressed ? Color.inputButton.pressed : Color.inputButton.fill
                    },
                    styles.loginBtn,
                ]}>
                <Text style={styles.btnText}>LOG IN</Text>
            </Pressable>
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
    planView: {
        height: 45,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        margin: 20
    },
    planBtn: {
        ...Buttons.planButton
    },
    planText: {
        ...Buttons.planText
    }
});

export default Register;