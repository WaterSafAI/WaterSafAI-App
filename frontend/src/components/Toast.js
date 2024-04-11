import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

const Toast = ({ message, type, duration = 3000 }) => {
    const [fadeAnim] = useState(new Animated.Value(0));  // Initial value for opacity: 0

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }
        ).start();

        setTimeout(() => {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true
                }
            ).start();
        }, duration - 500);
    }, [fadeAnim, duration]);

    const toastStyle = [styles.toast, type === 'error' ? styles.error : styles.success];

    return (
        <Animated.View style={[...toastStyle, { opacity: fadeAnim }]}>
            <Text style={styles.toastText}>{message}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        margin: 20,
        padding: 10,
        borderRadius: 10,
    },
    error: {
        backgroundColor: 'red',
    },
    success: {
        backgroundColor: 'green',
    },
    toastText: {
        color: 'white',
        textAlign: 'center',
    }
});

export default Toast;