import React, {createContext, useCallback, useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {HomeScreen, Login, Register} from './src/screens/index';

const Stack = createNativeStackNavigator();

// TODO Google sign in button needs implementation
GoogleSignin.configure({
    webClientId: '858091661652-vufaedti835kkl5uoaes8drh9ifq96ah',
});

// configures the navigation bar
const NavigatorSettings = {
    headerStyle: {
        backgroundColor: '#ADD8E6',
    },
    headerTintColor: '#0A3465',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
}

// Auth context and services could possibly be refactored to its own component
const AuthContext = createContext(null);

export const useAuth = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('Authentication context not found');
    }
    return authContext;
}

export default function App() {

    // Wait for App to Initialize before loading first screen
    const [initialized, setInitialized] = useState(false);
    const [user, setUser] = useState();

    // sets user when authentication state changes
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
      <AuthContext.Provider value={{user, setUser}}>
        <NavigationContainer onReady={onLayoutRootView}>
          <Stack.Navigator initialRouteName="Login" screenOptions={NavigatorSettings}>
              {user ? (
                  <>
                    <Stack.Screen component={HomeScreen}  name={"Home"} />
                  </>
                  ) : (
                  <>
                    <Stack.Screen component={ Login }  name={"Log in"} />
                    <Stack.Screen component={ Register }  name={"Register"} />
                  </>
              )};
          </Stack.Navigator>
        </NavigationContainer>
    </AuthContext.Provider>

  );
}
