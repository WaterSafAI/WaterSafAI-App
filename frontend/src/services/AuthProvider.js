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
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const actions = useMemo(() => ({
        login: async (email, password) => {
            setLoading(true);
            try {
                const userCredential = await auth().signInWithEmailAndPassword(email, password);
                const token = await userCredential.user.getIdToken(true);
                if (!token) {
                    throw new Error('Unable to get token');
                }
                setToken(token);

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

                // Get the user's ID token
                const token = await currentUser.getIdToken(true);
                if (!token) {
                    throw new Error('Unable to get token');
                }
                setToken(token);

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
                setToken(null);
                console.log('User signed out!');
                // If needed, perform additional actions after successful logout,
                // like updating the user state.
            } catch (error) {
                console.error('Error signing out: ', error);
            }
        },
        delete: (userToDelete) => {
            try {
                if (userToDelete) {
                    userToDelete.delete();
                    console.log('User deleted!');
                } else {
                    console.error('User is null. Unable to delete.');
                }
            } catch (error) {
                console.error(`Error deleting user: `, error)
            }
        },
    }), [])

    return (
        <AuthContext.Provider value={{
            token,
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