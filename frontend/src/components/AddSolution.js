import React, { useEffect, useState, useRef}  from 'react';
import {View, StyleSheet, Pressable, Text, TextInput, Dimensions, Animated} from "react-native";
import {Color} from '../styles/index';

const AddSolution = ({ item, afterAnimationComplete, removeItem, onResultChange }) => {

    const [textInputValue, setTextInputValue] = useState('');

    const width = Dimensions.get('window').width;
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        onResultChange(item.id, textInputValue);
    }, [textInputValue]);

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

    const translateAnimation = animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [-width, 0, width]
    });
    
      const opacityAnimation = animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1, 0]
    });

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

    return(
        <Animated.View style={[
            {
              transform: [{ translateX: translateAnimation }],
              opacity: opacityAnimation
            }]}>
            <View style={styles.addSolutionComponent}>
                <TextInput 
                    style={styles.resultInput} 
                    multiline={true} 
                    placeholder='Input Solution' 
                    placeholderTextColor={"#644535"}
                    onChangeText={textInputValue => setTextInputValue(textInputValue)}
                    />
            </View>
            
            <Pressable 
                style={({ pressed }) => [
                    {
                        backgroundColor: pressed ? Color.inputButton.pressed : Color.inputButton.fill
                    },
                    styles.removeSolutionBtn,
                ]}
                onPress={removeItemHandler}>
                    <Text style={styles.removeBtn}>Remove</Text>
            </Pressable>       
        </Animated.View>
    );
}

const styles = StyleSheet.create({

    addSolutionComponent: {
        width: '80%',
        height: 200,
        backgroundColor: '#66B3CC',
        borderRadius: 5,
        flexDirection: 'row',
        marginBottom: 15,
        marginTop: 15,
        borderRadius: 10,
        shadowColor: '#0A3465',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 10,
    },
    resultInput: {
        backgroundColor: '#D8EBF1',
        borderRadius: 2,
        width: '96%',
        height: '70%',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#644535',
        alignSelf: 'center',
        marginLeft: '2%',
        marginBottom: 40,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    },
    removeSolutionBtn: {
        height: 32,
        width: 74,
        backgroundColor: '#0A3465',
        alignItems: 'center', 
        alignSelf: 'center',
        borderRadius: 5,
        padding: 1,
        marginRight: '20%',
        marginTop: -55,
        marginBottom: 10
    },
    removeBtn: {
        color: 'white',
        fontSize: 18,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 3,
    },
});

export default AddSolution;