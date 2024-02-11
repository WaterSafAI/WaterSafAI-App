import React, { useEffect, useState }  from 'react';
import {View, StyleSheet, Pressable, Text, TextInput} from "react-native";
import {Picker} from '@react-native-picker/picker'

const AddResult = () => {

    const [pickerValue, setPickerValue] = useState('');

    return (
        <View style={styles.addResultComponent}>
        <Pressable style={styles.addResBtn}>
            {/* onPress={}  */}
            {/* style = {(pressed) => [
                //if pressed, change + icon to - icon
            ]}  */}
            <Text style={styles.resInputBtn}>+</Text>
        </Pressable>

        <View>
            <Picker style={styles.picker}
                selectedValue={pickerValue}
                arrowIconStyle={{tintColor: '#D8EBF1'}}
                onValueChange={(itemValue) => setPickerValue(itemValue)}>
                <Picker.Item label="pH" value="pH"/>
                <Picker.Item label="Chlorine" value="Chlorine"/>
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
        marginTop: 10,
    },
    resultInput: {
        backgroundColor: '#D8EBF1',
        borderColor: '#644535',
        borderWidth: 2,
        width: 82,
        height: 51,
        alignSelf: 'flex-end',
        marginLeft: 20,
        marginBottom: 7,
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
