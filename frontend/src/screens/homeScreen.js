import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Color, Screens, Buttons } from '../styles/index';
import { useAuth } from '../services/AuthProvider';
import * as Location from 'expo-location';
import { API_URL } from '../../constants';

function HomeScreen(props) {
    const [userName, setUserName] = useState();
    const [userAddress, setUserAddress] = useState({});
    const [userAccountType, setUserAccountType] = useState('');
    const [location, setLocation] = useState(null)
    const { navigation } = props;
    const { user, token } = useAuth();
    const userId = user.uid;

    /**
     * This effect will populate the displayed user's data.
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Construct request
                const options = {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                };

                // Get user document
                const response = await fetch(`${API_URL}/users/${userId}/`, options);
                
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

    // const [location, setLocation] = useState({})

    useEffect(() => {
        
        (async() => {

            let {status} = await  Location.requestForegroundPermissionsAsync()

            if(status == 'granted'){
                console.log('Permission granted')
            }
            else{
                console.log('Permission denied')
            }

            const loc = await Location.getCurrentPositionAsync()
            console.log(loc)

            setLocation(loc)
        })()

    }, [])


    // Helper function to display the user address
    const userAddressDisplay = () => {
        
        // return `${userAddress.street} ${userAddress.city}, ${userAddress.state} ${userAddress.zip}`
        return <Text>{JSON.stringify(location)}</Text>
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
            {/* <Text style={styles.location}>{`Location: ${userAddressDisplay()}`}</Text> */}
            <Text>{JSON.stringify(location)}</Text>

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
