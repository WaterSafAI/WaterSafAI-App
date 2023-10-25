import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {HomeScreen} from "../screens";

const Stack = createNativeStackNavigator();

// configures the navigation bar
const HomeNavigatorSettings = {
    headerStyle: {
        backgroundColor: '#ADD8E6',
    },
    headerTintColor: '#0A3465',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
}

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={HomeNavigatorSettings}>
            <Stack.Screen component={HomeScreen}  name={"Home"} />
        </Stack.Navigator>
    );
};

export default HomeStack;