import React from 'react';
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import AuthProvider from "./src/services/AuthProvider";
import Routes from "./src/navigation/routes";

// TODO Google sign in button needs implementation
GoogleSignin.configure({
    webClientId: '858091661652-vufaedti835kkl5uoaes8drh9ifq96ah',
});

export default function App() {

  return (
      <AuthProvider>
        <Routes/>
      </AuthProvider>
  );
}
