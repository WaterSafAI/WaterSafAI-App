import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, Text } from 'react-native';
import { Screens, Inputs, Color, Buttons } from '../styles/index';
import { useAuth } from "../services/AuthProvider";
import Toast from "../components/Toast"
import { API_URL } from '../../constants';

const AddTestResultsScreen = () => {
    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');
    const [field3, setField3] = useState('');
    const [toast, setToast] = useState({});
    const [toastKey, setToastKey] = useState(0);
    const { user } = useAuth();
    const userId = user.uid;

    /**
     * Send a POST request to the backend server with the test results
     */
    const handleAddResults = async () => {
        setToastKey(toastKey + 1);

        // Check if fields are not empty
        if (!field1 || !field2 || !field3) {
            setToast({type: "error", message: "Please fill out all fields."});
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
            const response = await fetch(`${API_URL}/results/${userId}/`, options);
            if (!response.ok) {
                throw new Error(`Response code: ${response.status}`);
            }

            // Show success and clear form
            setToast({type: "success", message: "Test results added!"});
            clearFields();
        } catch (error) {
            console.error(`Error adding test results: ${error}`);
            setToast({type: "error", message: "Error adding test results."});
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
            {toast.message && <Toast key={toastKey} message={toast.message} type={toast.type}/>}
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
