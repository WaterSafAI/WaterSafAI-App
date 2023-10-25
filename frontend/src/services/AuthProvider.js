import React, {createContext, useContext, useMemo, useState} from 'react';
import auth from '@react-native-firebase/auth';

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

    const actions = useMemo(
        () => ({
            login: async (email, password) => {
                setLoading(true);
                auth().signInWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        const currentUser = userCredential.user;
                        console.log('User account signed in!');
                    })
                    .catch(error => {
                        if (error.code === 'auth/user-not-found') {
                            console.log("This email is not yet registered.");
                        }
                        if (error.code === 'auth/wrong-password') {
                            console.log("Invalid password.");
                        }
                        console.log(error);
                    })
                    .finally(() => setLoading(false));
            },
            register: async (name, email, password) => {
                setLoading(true);

                auth().createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {

                        auth().currentUser.updateProfile({displayName: name});

                        const currentUser = userCredential.user;

                        console.log('User account created!');
                    })
                    .catch(error => {
                        if (error.code === 'auth/email-already-in-use') {
                            console.log('That email address is already in use!');
                        }
                        if (error.code === 'auth/invalid-email') {
                            console.log('That email address is invalid!');
                        }
                        console.error(error);
                    })
                    .finally(() => setLoading(true))
            },
            logout: async () => {
                auth()
                    .signOut()
                    .then(() => {
                        const currentUser = null;
                        console.log('User signed out!');
                    });
            }
        }),
        []
    )

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