import React from 'react';
import {Login, Register} from "../screens";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// configures the navigation bar
const AuthNavigatorSettings = {
    headerStyle: {
        backgroundColor: '#ADD8E6',
    },
    headerTintColor: '#0A3465',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
}

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={AuthNavigatorSettings} initialRouteName={"Log in"}>
            <Stack.Screen component={ Login }  name={"Log in"} />
            <Stack.Screen component={ Register }  name={"Register"} />
        </Stack.Navigator>
    );
};

export default AuthStack;