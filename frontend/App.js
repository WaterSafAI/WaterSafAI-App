import React, {createContext, useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {HomeScreen, Login, Register} from './src/screens/index';

const Stack = createNativeStackNavigator();

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

export default function App() {

    // Wait for App to Initialize before loading first screen
    const [initialized, setInitialized] = useState(false);
    const [user, setUser] = useState();

    const signUp = (email, password) => {
        return auth().createUserWithEmailAndPassword(email, password);
    }
    const login = (credentials) => {
        return auth().signInWithCredential(credentials);
    };

    const logout = () => {
        return auth().signOut();
    }

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
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator initialRouteName="Login" screenOptions={NavigatorSettings}>
          {user ? (
              <>
                <Stack.Screen component={HomeScreen}  name={"Home"} />
              </>
              ) : (
              <>
                <Stack.Screen component={<Login onLoginSubmit={login} />}  name={"Log in"} />
                <Stack.Screen component={<Register onRegisterSubmit={signUp} />}  name={"Register"} />
              </>
          )};
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
