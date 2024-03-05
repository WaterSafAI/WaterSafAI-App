import React, { useLayoutEffect, useNavigation } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, ProfileScreen, EditProfileScreen, AddTestResultsScreen, ViewResultsScreen, ViolationsScreen, PfasScreen, MapScreen, ViewSolutionsScreen } from "../screens";
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeNavigatorSettings = {
    headerStyle: {
        backgroundColor: '#ADD8E6',
    },
    headerTintColor: '#0A3465',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
}

// Home Stack Navigator
const HomeStack = ({ navigation, route }) => {
    useLayoutEffect(() => {
        const screens = ['Add Test Results', 'View Test Results', 'Profile', 'Edit Profile'];
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
        if (screens.includes(routeName)) {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
            navigation.setOptions({ tabBarStyle: { display: 'flex' } });
        }
    }, [navigation, route]);

    return (
        <Stack.Navigator screenOptions={HomeNavigatorSettings}>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerStyle: { backgroundColor: '#ADD8E6' },
                    headerTintColor: '#0A3465',
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                            <FontAwesome name="user" size={24} color="#0A3465" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen name="Add Test Results" component={AddTestResultsScreen} />
            <Stack.Screen name="View Test Results" component={ViewResultsScreen} />
            <Stack.Screen name="ViewSolutionsScreen" component={ViewSolutionsScreen} />
            <Stack.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{
                    headerStyle: { backgroundColor: '#ADD8E6' },
                    headerTintColor: '#0A3465',
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('Edit Profile')}>
                            <FontAwesome name="pencil" size={24} color="#0A3465" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
        </Stack.Navigator>
    );
};

// Violations Stack Navigator (if needed as a stack)
const ViolationsStack = () => {
    return (
        <Stack.Navigator screenOptions={HomeNavigatorSettings}>
            <Stack.Screen name="Violations" component={ViolationsScreen} />
        </Stack.Navigator>
    );
};

// PFAS Stack Navigator (if needed as a stack)
const PfasStack = () => {
    return (
        <Stack.Navigator screenOptions={HomeNavigatorSettings}>
            <Stack.Screen name="PFAS" component={PfasScreen} />
        </Stack.Navigator>
    );
}

// Tab Navigator
const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#66B3CC',
                tabBarInactiveTintColor: '#0A3465',
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="MapTab"
                component={MapScreen}
                options={{
                    tabBarLabel: 'Map',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="map" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="ViolationsTab"
                component={ViolationsStack}
                options={{
                    tabBarLabel: 'Violations',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="exclamation-triangle" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="PFASTab"
                component={PfasStack}
                options={{
                    tabBarLabel: 'PFAS',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="rss" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default TabNavigator;
