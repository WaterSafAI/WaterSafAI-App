import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, Text } from 'react-native';
import { Screens, Inputs, Color, Buttons } from '../styles/index';
import Toast from 'react-native-toast-message';
import { useAuth } from "../services/AuthProvider";

const AddTestResultsScreen = () => {
    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');
    const [field3, setField3] = useState('');
    const { user } = useAuth();
    const userId = user.uid;

    /**
     * Send a POST request to the backend server with the test results
     */
    const handleAddResults = async () => {
        // Check if fields are not empty
        if (!field1 || !field2 || !field3) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'All fields must be filled out.',
                position: 'bottom'
            });
            return;
        }

        // Construct request
        const payload = {
            result1: field1,
            result2: field2,
            result3: field3
        };
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        };
        try {
            const response = await fetch(`http://10.0.2.2:3000/results/${userId}/`, options);
            if (!response.ok) {
                throw new Error(`Response code: ${response.status}`);
            }

            // Show success and clear form
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Test results added!',
                position: 'bottom'
            });
            clearFields();
        } catch (error) {
            console.error(`Error adding test results: ${error}`);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Error adding test results.',
                position: 'bottom'
            });
        }
    }

    /**
     * Helper function to clear fields on form submit
     */
    const clearFields = () => {
        setField1('');
        setField2('');
        setField3('');
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
                    value={field1}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    fontSize={18}
                    placeholder='Test Result 2'
                    placeholderTextColor={Color.inputs.text}
                    onChangeText={text => setField2(text)}
                    value={field2}
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    fontSize={18}
                    placeholder='Test Result 3'
                    placeholderTextColor={Color.inputs.text}
                    onChangeText={text => setField3(text)}
                    value={field3}
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
            <Toast ref={(ref) => Toast.setRef(ref)} />
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
