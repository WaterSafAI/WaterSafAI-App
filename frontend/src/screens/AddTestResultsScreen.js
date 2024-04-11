import React, { useState, useRef } from 'react';
import { Pressable, StyleSheet, TextInput, View, Text, TouchableOpacity, LayoutAnimation, Item, ScrollView } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Screens, Inputs, Color, Buttons } from '../styles/index';
import { useAuth } from "../services/AuthProvider";
import Toast from "../components/Toast"
import { API_URL } from '../../constants';
import AddResult from '../components/AddResult';

const AddTestResultsScreen = () => {

    const [testDate, setTestDate] = useState('');
    const [toast, setToast] = useState({});
    const [toastKey, setToastKey] = useState(0);
    const [valueArray, setValueArray] = useState([]);
    const [disabled, setDisabled] = useState(false);

    const { user, token } = useAuth();
    const userId = user.uid;
    const addNewEle = useRef(false);
    const index = useRef(0);

    /**
     * Send a POST request to the backend server with the test results
     */
    const handleAddResults = async () => {
        setToastKey(toastKey + 1);

        if (Object.keys(valueArray).length === 0) {
            setToast({ type: "error", message: "Please add at least one test result." });
            return;
        }

        const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[01])\/\d{4}$/;
        if (testDate && !dateRegex.test(testDate)) {
            setToast({ type: "error", message: "Please enter a valid date (mm/dd/yyyy)." });
            return;
        }

        const results = valueArray.reduce((acc, item) => ({
            ...acc,
            [String(item.pickerValue)]: Number(item.textInputValue)
        }), {});

        // Construct request
        const payload = {
            testDate: testDate,
            results: results
        };
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        };

        console.log(`Sending test results: ${JSON.stringify(payload)}`);

        try {
            const response = await fetch(`${API_URL}/results/${userId}/`, options); //Possibly change userId to locationId?
            if (!response.ok) {
                throw new Error(`Response code: ${response.status}`);
            }

            // Show success
            setToast({ type: "success", message: "Test results added!" });
        } catch (error) {
            console.error(`Error adding test results: ${error}`);
            setToast({ type: "error", message: "Error adding test results." });
        } finally {
            clearFields();
        }
    }

    const clearFields = () => {
        setValueArray([]);
        setTestDate('');
    }

    const handleResultChange = (id, pickerValue, textInputValue) => {

        try {
            //find index of item
            const index = valueArray.findIndex(item => item.id === id);

            //Update item with new values
            const updateItem = { ...valueArray[index], pickerValue, textInputValue };

            //Update valueArray with updated item
            const newArray = [...valueArray];
            newArray[index] = updateItem;

            setValueArray(newArray);
        }
        catch (error) {
            console.error(`Error handling result change: ${error}`);
            setToast({ type: "error", message: "Error handling result change." });
        }
    };

    const afterAnimationComplete = () => {
        index.current += 1;
        setDisabled(false);
    };

    const addMore = () => {
        addNewEle.current = true;
        const newlyAddedValue = { id: "id_" + index.current, text: index.current + 1 };

        setDisabled(true);
        setValueArray([...valueArray, newlyAddedValue]);
    };

    const remove = (id) => {
        addNewEle.current = false;
        const newArray = [...valueArray];
        newArray.splice(newArray.findIndex(ele => ele.id === id), 1);

        setValueArray(newArray);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };

    return (
        <View style={styles.container}>
            {toast.message && <Toast key={toastKey} message={toast.message} type={toast.type} />}
            <Text style={{ color: Color.logo, fontSize: 32, fontWeight: 'bold', marginTop: 50, marginBottom: 30 }}>
                Add Test Results
            </Text>

            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>Test Date:</Text>
                <TextInputMask
                    type={'datetime'}
                    options={{
                        format: 'MM/DD/YYYY'
                    }}
                    value={testDate}
                    onChangeText={text => setTestDate(text)}
                    style={styles.dateInput}
                    placeholder='MM/DD/YYYY'
                    placeholderTextColor='#644535'
                />
            </View>
            <View style={styles.header}>
                <Text style={styles.headerTextType}>Type</Text>
                <Text style={styles.headerTextValue}>Value</Text>
            </View>

            <ScrollView style={{ width: '100%', marginLeft: '20%' }}>
                {valueArray.map(ele => (
                    <AddResult
                        key={ele.id}
                        item={ele}  // Pass the 'item' prop to AddResult
                        afterAnimationComplete={afterAnimationComplete}
                        removeItem={(id) => remove(id)}
                        onResultChange={handleResultChange}
                    />
                ))}
            </ScrollView>

            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.addComponent}
                disabled={disabled}
                onPress={addMore}
            >
                <Text style={styles.plusText}>+</Text>
            </TouchableOpacity>

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
        width: "60%",
        height: 60,
        borderRadius: 15,
        padding: 15,
        marginTop: 32,
        marginBottom: 30,
        marginRight: 60,
    },
    btnText: {
        ...Buttons.buttonText
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
    headerTextValue: {
        color: '#644535',
        fontWeight: 'bold',
        marginLeft: 110,
        fontSize: 18,
    },
    dateInput: {
        backgroundColor: '#D8EBF1',
        borderColor: '#644535',
        borderWidth: 2,
        borderRadius: 2,
        width: 150,
        height: 40,
        alignSelf: 'flex-end',
        marginLeft: 20,
        marginBottom: 7,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#644535',
    },
    dateContainer: {
        flexDirection: 'row',
    },
    dateText: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 5,
        color: '#0A3465',
        fontWeight: 'bold',
    },
    addComponent: {
        position: 'absolute',
        right: 25,
        bottom: 25,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#0A3465',
        backgroundColor: '#66B3CC',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 10,
    },
    plusText: {
        fontSize: 40,
        color: '#0A3465',
    },
});

export default AddTestResultsScreen;
