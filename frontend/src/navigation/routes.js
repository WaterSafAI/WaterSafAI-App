import React, {useCallback, useEffect, useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import * as SplashScreen from "expo-splash-screen";
import {useAuth} from "../services/AuthProvider";
import HomeStack from "./homeStack";
import AuthStack from "./authStack";

const Routes = () => {
    const {user, token, setUser} = useAuth();
    const [initialized, setInitialized] = useState(false);

    // sets initial user if already logged in
    function onAuthStateChanged(user) {
        setUser(user);
        if (!initialized) setInitialized(true);
    }

    // Authentication state listener
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (initialized) {
            // hide splash screen when app is initialized
            await SplashScreen.hideAsync();
        }
    }, [initialized]);

    if (!initialized) {
        return null;
    }

    return (
        <NavigationContainer onReady={onLayoutRootView}>
            {user && token ? <HomeStack/> : <AuthStack/>}
        </NavigationContainer>
    );
};

export default Routes;