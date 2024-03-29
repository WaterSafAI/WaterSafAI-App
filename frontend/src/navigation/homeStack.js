import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, ProfileScreen, EditProfileScreen } from "../screens";
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AddTestResultsScreen from '../screens/AddTestResultsScreen';
import ViewResultsScreen from '../screens/ViewResultsScreen';

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
    const navigation = useNavigation()

    return (
        <Stack.Navigator screenOptions={HomeNavigatorSettings}>
            <Stack.Screen
                component={HomeScreen}
                name={"Home"}
                options={{
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                            <FontAwesome name="gear" size={24} color="#0A3465" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen 
                component={ProfileScreen} 
                name={"Profile"} 
                options={{
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('Edit Profile')}>
                            <FontAwesome name="pencil" size={24} color="#0A3465" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen 
                component={EditProfileScreen} 
                name={"Edit Profile"} 
            />
            <Stack.Screen 
                component={AddTestResultsScreen} 
                name={"Add Test Results"} 
            />
            <Stack.Screen 
                component={ViewResultsScreen} 
                name={"View Test Results"} 
            />
        </Stack.Navigator>
    );
};

export default HomeStack;