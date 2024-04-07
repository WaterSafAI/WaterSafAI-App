import React, { useEffect, useState, useRef}  from 'react';
import {View, StyleSheet, Pressable, Text, TextInput, Dimensions, Animated} from "react-native";
import {Picker} from '@react-native-picker/picker'
import {Color} from '../styles/index';

const AddResult = ({ item, afterAnimationComplete, removeItem, onResultChange }) => {

    const [pickerValue, setPickerValue] = useState('');
    const [textInputValue, setTextInputValue] = useState('');

    const width = Dimensions.get('window').width;
    const animatedValue = useRef(new Animated.Value(0)).current;
    
    // Handle changes from dropdown picker and value input
    useEffect(() => {
        onResultChange(item.id, pickerValue, textInputValue);
    }, [pickerValue, textInputValue]);

    useEffect(() => {
        Animated.timing(
        animatedValue,
        {
            toValue: 0.5,
            duration: 500,
            useNativeDriver: true
        }
        ).start(() => {
            afterAnimationComplete();
        });
    }, []);
      
    const removeItemHandler = () => {
        Animated.timing(
            animatedValue,
            {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
            }
        ).start(() => {
            removeItem(item.id);
        });
    };

    const translateAnimation = animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [-width, 0, width]
    });
    
      const opacityAnimation = animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1, 0]
    });

    return(
        <Animated.View style={[
            {
              transform: [{ translateX: translateAnimation }],
              opacity: opacityAnimation
            }]}>
            <View style={styles.addResultComponent}>
                <Pressable 
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? Color.inputButton.pressed : Color.inputButton.fill
                    },
                    styles.removeResBtn,
                ]}
                onPress={removeItemHandler}>
                    <Text style={styles.resInputBtn}>-</Text>
                </Pressable>

                <View>
                    <Picker style={styles.picker}
                        selectedValue={pickerValue}
                        dropdownIconColor={'#D8EBF1'}
                        onValueChange={(itemValue) => setPickerValue(itemValue)}>
                        <Picker.Item label="-----" value=""/>
                        <Picker.Item label="Total Coliform Bacteria (#/100ml)" value="Total Coliform Bacteria"/>
                        <Picker.Item label="Nitrate-Nitrogen (mg/l)" value="Nitrate-Nitrogen"/>
                        <Picker.Item label="pH (units)" value="pH"/>
                        <Picker.Item label="Iron (mg/l)" value="Iron"/>
                        <Picker.Item label="Hardness as CaCo3 (mg/l)" value="Hardness as CaCo3"/>
                        <Picker.Item label="Sulfate Sulfur (mg/l)" value="Sulfate Sulfur"/>
                        <Picker.Item label="Chlorine (mg/l)" value="Chlorine"/>
                        <Picker.Item label="Specific Conductance (umhos/cc)" value="Specific Conductance"/>
                    </Picker>
                </View>
                <TextInput 
                    style={styles.resultInput}
                    onChangeText={textInputValue => setTextInputValue(textInputValue)}>
                </TextInput>
            </View>
        </Animated.View>
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    },
    removeResBtn: {
        width: 21,
        height: 21,
        backgroundColor: '#D8EBF1',
        marginTop: 20,
        marginLeft: 15,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    },
    viewHolder: {
        paddingVertical: 15,
        backgroundColor: '#2196f3',
        justifyContent: 'center',
        alignItems: 'flex-start',
        margin: 4,
        paddingLeft: 15,
        borderRadius: 10
      },
});

export default AddResult;
