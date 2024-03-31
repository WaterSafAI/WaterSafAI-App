import React, { useState, useRef } from 'react';
import { Pressable, StyleSheet, View, Text, TouchableOpacity, LayoutAnimation, ScrollView } from 'react-native';
import { Screens, Color, Buttons } from '../styles/index';
import AddSolution from '../components/AddSolution';
import { useAuth } from "../services/AuthProvider";
import Toast from "../components/Toast"
import { API_URL } from '../../constants';


const AddSolutionScreen = () => {

    const [toast, setToast] = useState({});
    const [toastKey, setToastKey] = useState(0);
    const [valueArray, setValueArray] = useState([]);
    const [disabled, setDisabled] = useState(false);

    const { token } = useAuth();
    const addNewEle = useRef(false);
    const index = useRef(0);

    /**
    * Send a POST request to the backend server with the solutions
    */
    const handleAddSolution = async () => {
        setToastKey(toastKey + 1);

        if (Object.keys(valueArray).length === 0) {
            setToast({ type: "error", message: "Please add at least one solution." });
            return;
        }

        const solutions = valueArray.map(item => ({
            solution: item.textInputValue
        }))
        
        // Construct request
        const payload = {
            solutions: solutions
        };

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        };

        console.log(`Sending solution results: ${JSON.stringify(payload)}`);
        
        try {
            const response = await fetch(`${API_URL}/solutions/`, options); //May need to change (Add location?)
            if (!response.ok) {
                throw new Error(`Response code: ${response.status}`);
            }

            // Show success
            setToast({ type: "success", message: "Solutions added!" });
        } catch (error) {
            console.error(`Error adding solutions: ${error}`);
            setToast({ type: "error", message: "Error adding solutions." });
        } finally {
            clearFields();
        }
    }

    //Clear all fields
    const clearFields = () => {
        setValueArray([]);
    }

    const handleResultChange = (id, textInputValue) => {

        try {
            //find index of item
            const index = valueArray.findIndex(item => item.id === id);

            //Update item with new values
            const updateItem = { ...valueArray[index], textInputValue };

            //Update valueArray with updated item
            const newArray = [...valueArray];
            newArray[index] = updateItem;

            setValueArray(newArray);
        }
        catch (error) {
            console.error(`Error handling add solution: ${error}`);
            setToast({ type: "error", message: "Error handling add solution." });
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

    return(
        <View style={styles.container}>
            {toast.message && <Toast key={toastKey} message={toast.message} type={toast.type} />}
            <Text style={{ color: Color.logo, fontSize: 32, fontWeight: 'bold', marginTop: 50, marginBottom: 30 }}>
                Add a New Solution
            </Text>
            <ScrollView style={{ width: '100%', marginLeft: '20%' }}>
                {valueArray.map(ele => (
                    <AddSolution
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
                onPress={handleAddSolution}
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? Color.inputButton.pressed : Color.inputButton.fill
                    },
                    styles.addBtn,
                ]}>
                <Text style={styles.btnText}>Add Solution</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...Screens.mainScreen
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
    },
    plusText: {
        fontSize: 40,
        color: '#0A3465',
    },
})

export default AddSolutionScreen;