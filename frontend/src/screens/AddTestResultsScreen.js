import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, Text } from 'react-native';
import { Screens, Inputs, Color, Buttons } from '../styles/index';
import { useAuth } from "../services/AuthProvider";
import Loading from "../components/loading";

const AddTestResultsScreen = () => {
    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');
    const [field3, setField3] = useState('');

    const handleAddResults = () => {
        // Handle add test results
        console.log('Calling backend to add test results');
    }

    return (
        <View style={styles.container}>
            <Text style={{ color: Color.logo, fontSize: 32, fontWeight: 'bold', marginTop: 50, marginBottom: 30 }}>
                Add Test Results
            </Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    fontSize={18}
                    placeholder='Test Result 1'
                    placeholderTextColor={Color.inputs.text}
                    onChangeText={text => setField1(text)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    fontSize={18}
                    placeholder='Test Result 2'
                    placeholderTextColor={Color.inputs.text}
                    onChangeText={text => setField2(text)}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    secureTextEntry
                    fontSize={18}
                    placeholder='Test Result 3'
                    placeholderTextColor={Color.inputs.text}
                    onChangeText={text => setField3(text)}
                />
            </View>
            <Pressable
                onPress={handleAddResults}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? Color.inputButton.pressed : Color.inputButton.fill
                    },
                    styles.addBtn,
                ]}>
                <Text style={styles.btnText}>Add Results</Text>
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
        marginBottom: 16
    },
    inputText: {
        ...Inputs.loginInput
    },
    linkText: {
        fontSize: 15,
        fontWeight: 'bold',
        ...Inputs.links
    },
    addBtn: {
        ...Buttons.buttonContainer,
        marginTop: 32
    },
    btnText: {
        ...Buttons.buttonText
    },
});

export default AddTestResultsScreen;
