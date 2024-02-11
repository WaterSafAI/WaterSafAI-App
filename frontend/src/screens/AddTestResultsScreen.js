import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View, Text } from 'react-native';
import { Screens, Inputs, Color, Buttons } from '../styles/index';
import { useAuth } from "../services/AuthProvider";
import Toast from "../components/Toast"
import { API_URL } from '../../constants';
import AddResult from '../components/AddResult';

const AddTestResultsScreen = () => {
    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');
    const [field3, setField3] = useState('');
    const [toast, setToast] = useState({});
    const [toastKey, setToastKey] = useState(0);
    const [pickerValue, setPickerValue] = useState('');
    const { user, token } = useAuth();
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
                'Authorization': `Bearer ${token}`
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

            <View style={styles.header}>
                <Text style={styles.headerTextType}>Type</Text>
                <Text style={styles.headerTextValue}>Value</Text>
            </View>
            <AddResult></AddResult>
            <AddResult></AddResult>
            <AddResult></AddResult>
            <AddResult></AddResult>

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
        marginTop: 32,
    },
    btnText: {
        ...Buttons.buttonText
    },
    addResultComponent: {
        width: '80%',
        height: 64,
        backgroundColor: '#66B3CC',
        borderRadius: 5,
        flexDirection: 'row',
    },
    header: {
        flexDirection: 'row',
        textAlign: 'left',
        marginBottom: 5,
        marginTop: 10,
        width: '60%'
    },
    headerTextType: {
        color: '#644535',
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 30, 
        fontSize: 18,
    },
    headerTextValue:{
        color: '#644535',
        fontWeight: 'bold',
        marginLeft: 110,
        fontSize: 18,
    },
    resultInput: {
        backgroundColor: '#D8EBF1',
        borderColor: '#644535',
        borderWidth: 2,
        width: 82,
        height: 51,
        alignSelf: 'flex-end',
        marginLeft: 20,
        marginBottom: 7
    },
    addResBtn: {
        width: 21,
        height: 21,
        backgroundColor: '#D8EBF1',
        marginTop: 20,
        marginLeft: 15,
        borderRadius: 5,
    },
    resInputBtn: {
        textAlign: 'center',
        color: '#644535',
        fontWeight: 'bold',
    },
    picker: {
        width: 160,
        minHeight: 52,
        backgroundColor: '#644535',
        borderRadius: 5,
        borderWidth: 2,
        color: '#D8EBF1',
        marginLeft: 15,
        marginTop: 5,
    }
});

export default AddTestResultsScreen;
