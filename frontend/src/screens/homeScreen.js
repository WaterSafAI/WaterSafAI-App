import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Button, PermissionsAndroid } from 'react-native';
import { Color, Screens, Buttons } from '../styles/index';
import { useAuth } from '../services/AuthProvider';
import Geolocation from 'react-native-geolocation-service';

function HomeScreen(props) {
    const [userName, setUserName] = useState();
    const [userAddress, setUserAddress] = useState(false);
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

    //Get permission for location
    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                title: 'Geolocation Permission',
                message: 'Can we access your location?',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
                },
            );
            
            console.log('granted', granted);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use Geolocation');
                return true;
            } 
            else {
                console.log('You cannot use Geolocation');
                return false;
            }
        } 
        catch (err) {
            return false;
        }
    };

    //Check permissions and get location
    const getLocation = async () => {
        const result = requestLocationPermission();
        if (result){
            if (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)) {
                Geolocation.getCurrentPosition(
                    position => {
                        console.log(position);
                        setUserAddress(position);
                    },
                    error => {
                        console.log(error.code, error.message);
                        setUserAddress(null); //set userAddress to null in case of error
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                );
            } else {
                console.log('Permission denied at runtime');
                setUserAddress(null);
            }
        }
        else{
            console.log('Permission denied');
            setUserAddress(null); //set user address to null when permssion denied
        }
    };
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

            {/* delete this btn at some point and have it automatically ask*/}
            <Button title="Get Location" onPress={getLocation} />
            {userAddress && userAddress.coords ? (
                <>
                    <Text>Latitude: {userAddress.coords.latitude}</Text>
                    <Text>Longitude: {userAddress.coords.longitude}</Text>
                </>
            ) : (
                <Text>Location not available</Text>
            )}            

            {/* <Text style={styles.location}>{`Location: ${userAddressDisplay()}`}</Text> */}

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
