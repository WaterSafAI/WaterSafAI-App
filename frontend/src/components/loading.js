import React from 'react';
import {StyleSheet} from "react-native";
import {Screens} from "../styles";
import {ActivityIndicator, View} from "react-native";

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color='#0A3465' />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        ...Screens.mainScreen
    },
});

export default Loading;