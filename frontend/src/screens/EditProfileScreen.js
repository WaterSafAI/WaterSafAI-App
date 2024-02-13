import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { Screens, Inputs, Color, Buttons } from '../styles/index';
import { FontAwesome } from '@expo/vector-icons';
import Toast from '../components/Toast';
import { useAuth } from "../services/AuthProvider";
import { API_URL } from '../../constants';

function EditProfileScreen({ navigation }) {
    const [userEmail, setUserEmail] = useState('');
    const [userAccountType, setUserAccountType] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [toastKey, setToastKey] = useState(0);
    const [toast, setToast] = useState({});

    const { user, token, actions } = useAuth();
    const userId = user.uid;

    const handleSave = async () => {
        setToastKey(toastKey + 1);

        // Validate input
        if (!userEmail || !userAccountType || !companyName || !userLocation) {
            setToast({type:"error", message: 'Please fill out all fields.'});
            return;
        }

        // Construct request
        const options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                email: userEmail,
                plan: userAccountType,
                companyName: companyName,
                location: userLocation
            })
        };

        // Update user document
        const response = await fetch(`${API_URL}/users/${userId}/`, options);

        // Handle response
        if (!response.ok) {
            setToast({type: "error", message: "Error updating profile."});
        } else {
            setToast({type: "success", message: "Profile Updated!"});
        }
    }

    return (
        <View style={styles.container}>
            {toast.message && <Toast key={toastKey} message={toast.message} type={toast.type}/>}
            <View style={styles.useNameBackground}>
                <Text style={styles.userName}></Text>
            </View>

            <View style={styles.topInput}></View>
            <View style={styles.inputView}>
                <View style={styles.inputBox}>
                    <FontAwesome name="envelope" size={20} color="#0A3465" />
                    <TextInput
                        style={styles.inputText}
                        fontSize={16}
                        placeholder='graysoncrozier40@gmail.com'
                        placeholderTextColor={Color.inputs.text}
                        onChangeText={text => setUserEmail(text)}
                        value={userEmail}
                    />
                </View>
            </View>

            <View style={styles.inputView}>
                <View style={styles.inputBox}>
                    <FontAwesome name="briefcase" size={20} color="#0A3465" />
                    <TextInput
                        style={styles.inputText}
                        fontSize={16}
                        placeholder='professional'
                        placeholderTextColor={Color.inputs.text}
                        onChangeText={text => setUserAccountType(text)}
                        value={userAccountType}
                    />
                </View>
            </View>

            <View style={styles.inputView}>
                <View style={styles.inputBox}>
                    <FontAwesome name="map-marker" size={20} color="#0A3465" />
                    <TextInput
                        style={styles.inputText}
                        fontSize={16}
                        placeholder='123 Hey Lane'
                        placeholderTextColor={Color.inputs.text}
                        onChangeText={text => setUserLocation(text)}
                        value={userLocation}
                    />
                </View>
            </View>

            <View style={styles.inputView}>
                <View style={styles.inputBox}>
                    <FontAwesome name="building" size={20} color="#0A3465" />
                    <TextInput
                        style={styles.inputText}
                        fontSize={16}
                        placeholder='Money LLC'
                        placeholderTextColor={Color.inputs.text}
                        onChangeText={text => setCompanyName(text)}
                        value={companyName}
                    />
                </View>
            </View>

            <Pressable
                onPress={handleSave}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? Color.inputButton.pressed : Color.inputButton.fill
                    },
                    styles.saveBtn,
                ]}>
                <Text style={styles.btnText}>Save</Text>
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
    inputTextHeader: {
        marginLeft: 10, 
        fontSize: 15,
        padding: 2,
        fontWeight: 'bold',
        color: '#0A3465',
    },
    inputText: {
        fontSize: 15,
        padding: 8,
        color: '#0A3465',
    },
    inputBox: {
        flexDirection: 'row', 
        alignItems: 'center',
        paddingLeft: 3,
        maxWidth: 250,
    },
    saveBtn: {
        marginTop: 10,
        ...Buttons.buttonContainer
    },
    btnText: {
        ...Buttons.buttonText
    },
});

export default EditProfileScreen;
