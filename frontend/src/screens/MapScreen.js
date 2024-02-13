import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MapScreen = () => (
    <View style={styles.container}>
        <Text>This is the map.</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MapScreen;