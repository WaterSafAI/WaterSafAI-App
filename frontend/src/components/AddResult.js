import React, { useEffect, useState }  from 'react';
import {View, StyleSheet, Pressable, Text, TextInput, ScrollView} from "react-native";
import {Picker} from '@react-native-picker/picker'
import {Color} from '../styles/index';

const AddResult = () => {

    const [pickerValue, setPickerValue] = useState('');
    const [buttonText, setButtonText] = useState('+');

    const addComponent = () => {

        try{
            if(buttonText == '+'){

                setButtonText('-');
                //add another component
            }
            else{
                //delete current component
            }    
        }
        catch(error){
            console.error(`Error adding/deleting addResult component: ${error}`);
        }
    }

    return (
        <View style={styles.addResultComponent}>
            <Pressable 
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? Color.inputButton.pressed : Color.inputButton.fill
                },
                styles.addResBtn,
            ]}
            onPress={addComponent}>
                <Text style={styles.resInputBtn}>{buttonText}</Text>
            </Pressable>

            <View>
                <Picker style={styles.picker}
                    selectedValue={pickerValue}
                    dropdownIconColor={'#D8EBF1'}
                    onValueChange={(itemValue) => setPickerValue(itemValue)}>
                    <Picker.Item label="-----" value=""/>
                    <Picker.Item label="Total Coliform Bacteria" value="Total Coliform Bacteria"/>
                    <Picker.Item label="Nitrate-Nitrogen" value="Nitrate-Nitrogen"/>
                    <Picker.Item label="pH" value="pH"/>
                    <Picker.Item label="Iron" value="Iron"/>
                    <Picker.Item label="Hardness as CaCo3" value="Hardness as CaCo3"/>
                    <Picker.Item label="Sulfate Sulfur" value="Sulfate Sulfur"/>
                    <Picker.Item label="Chlorine" value="Chlorine"/>
                    <Picker.Item label="Specific Conductance" value="Specific Conductance"/>
                </Picker>
            </View>
            <TextInput style={styles.resultInput}></TextInput>
        </View>
    );
};

const styles = StyleSheet.create({
    addResultComponent: {
        width: '80%',
        height: 64,
        backgroundColor: '#66B3CC',
        borderRadius: 5,
        flexDirection: 'row',
        marginBottom: 15,
    },
    resultInput: {
        backgroundColor: '#D8EBF1',
        borderColor: '#644535',
        borderWidth: 2,
        borderRadius: 2,
        width: 82,
        height: 51,
        alignSelf: 'flex-end',
        marginLeft: 20,
        marginBottom: 7,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#644535',
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

export default AddResult;
