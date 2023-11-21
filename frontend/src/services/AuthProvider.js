import React, {createContext, useContext, useMemo, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AuthContext = createContext({});

export const useAuth = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('Authentication context not found');
    }
    return authContext;
}
const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const actions = useMemo(() => ({
        login: async (email, password) => {
            setLoading(true);
            try {
                const userCredential = await auth().signInWithEmailAndPassword(email, password);
                const currentUser = userCredential.user;

                console.log('User account signed in!');
            } catch (error) {
                console.error('Error signing in: ', error);
            } finally {
                setLoading(false);
            }
        },
        register: async (name, email, password, plan) => {
            setLoading(true);
            try {
                const userCredential = await auth().createUserWithEmailAndPassword(email, password);
                const currentUser = userCredential.user;

                // Create a new user document in Firestore
                await firestore().collection('users').doc(currentUser.uid).set({
                    displayName: name,
                    email: email,
                    isNewUser: true,
                    plan: plan
                });

                console.log('User account created!');
            } catch (error) {
                console.error('Error registering user: ', error);
            } finally {
                setLoading(false);
            }
        },
        logout: async () => {
            try {
                await auth().signOut();
                console.log('User signed out!');
                // If needed, perform additional actions after successful logout,
                // like updating the user state.
            } catch (error) {
                console.error('Error signing out: ', error);
            }
        }        
    }), [])

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            loading,
            setLoading,
            actions
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;