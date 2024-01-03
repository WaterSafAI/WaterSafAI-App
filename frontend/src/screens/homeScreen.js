import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Color, Screens, Buttons } from '../styles/index';
import { useAuth } from '../services/AuthProvider';

function HomeScreen(props) {
    const [userName, setUserName] = useState();
    const [userAddress, setUserAddress] = useState({});
    const [userAccountType, setUserAccountType] = useState('');
    const { navigation } = props;
    const { user } = useAuth();
    const userId = user.uid;

    /**
     * This effect will populate the displayed user's data.
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get user document
                const response = await fetch(`http://10.0.2.2:3000/users/${userId}/`);
                
                if (!response.ok) {
                    throw new Error(`Response code: ${response.status}`);
                }

                const json = await response.json();

                // Deconstruct user document
                const { displayName, plan } = json;

                // Set user data
                setUserName(displayName);
                setUserAccountType(plan);
            } catch (error) {
                console.error(`Error fetching user data: ${error}`)
            }
        }

        fetchData();
    }, [user])

    // Helper function to display the user address
    const userAddressDisplay = () => {
        return `${userAddress.street} ${userAddress.city}, ${userAddress.state} ${userAddress.zip}`
    }

    const handleAddTestResults = () => {
        // Handle professional add test results
        navigation.navigate('Add Test Results')
    }

    const handleDiscoverWaterQuality = () => {
        // Handle discover water quality button press
        console.log('Calling backend to discover water quality');
    }

    const handleViewResults = () => {
        // Handlde view results button
        navigation.navigate('View Test Results');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{`Welcome ${userName}!`}</Text>
            <Text style={styles.location}>{`Location: ${userAddressDisplay()}`}</Text>

            {userAccountType === 'professional' ?
                <Pressable style={styles.buttonContainer} onPress={handleAddTestResults}>
                    <Text style={styles.buttonText}>Add Test Results</Text>
                </Pressable> : null}

            <Pressable style={styles.buttonContainer} onPress={handleDiscoverWaterQuality}>
                <Text style={styles.buttonText}>Discover Your Water Quality</Text>
            </Pressable>

            <Pressable style={[styles.buttonContainer, styles.loginButton]} onPress={handleViewResults}>
                <Text style={styles.buttonText}>View Your Results</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...Screens.mainScreen
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        margin: 20,
        color: '#0A3465',
    },
    location: {
        fontSize: 18,
        margin: 20,
        color: '#0A3465',
    },
    locationHeader: {
        fontSize: 18,
        margin: 20,
        color: '#0A3465',
        fontWeight: 'bold',
    },
    buttonContainer: {
        ...Buttons.homeScreenBtnContainer,
        marginVertical: 16,
        backgroundColor: Color.inputButton.fill,
    },
    buttonText: {
        ...Buttons.buttonText,
    },
})

export default HomeScreen;
