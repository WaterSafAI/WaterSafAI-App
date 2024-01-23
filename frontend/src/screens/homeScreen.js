import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Color, Screens, Buttons } from '../styles/index';
import { useAuth } from '../services/AuthProvider';
import * as Location from 'expo-location';
import { API_URL } from '../../constants';

function HomeScreen(props) {
    const [userName, setUserName] = useState();
    const [userAccountType, setUserAccountType] = useState('');
    const [location, setLocation] = useState(null)
    const [address, setAddress] = useState(null) // [street, city, state, zip]
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

    /**
    * This effect will request access to fetch the user's location.
    */
    useEffect(() => {
        (async() => {
            if (location && Object.keys(location).length !== 0) {
                console.log('Location already fetched');
                const reverseGeocode = await Location.reverseGeocodeAsync(location.coords);
                setAddress(reverseGeocode[0]);
                return;
            }
            try{
                console.log('Fetching user location...');
                const res = await Location.requestForegroundPermissionsAsync()
                let {status} = res;

                // Map the string accuracy to a numeric accuracy
                let accuracy;
                switch (res.android.accuracy) {
                    case 'fine':
                        accuracy = Location.Accuracy.High;
                        break;
                    case 'coarse':
                        accuracy = Location.Accuracy.Low;
                        break;
                    default:
                        accuracy = Location.Accuracy.Balanced;
                        break;
                }

                if(status == 'granted'){
                    console.log('Permission granted')
                    // Get user location
                    const loc = await Location.getCurrentPositionAsync({ accuracy })
                    setLocation(loc)        

                    // Get user address
                    const reverseGeocode = await Location.reverseGeocodeAsync(loc.coords);
                    setAddress(reverseGeocode[0]);

                    const options = {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            latitude: loc.coords.latitude, 
                            longitude: loc.coords.longitude
                        })
                    };

                    //Update user location in database
                    const response = await fetch(`${API_URL}/users/${userId}/`, options);

                    if (!response.ok) {
                        throw new Error(`Response code: ${response.status}`);
                    }
                }
                else{
                    console.log('Permission denied')
                }
            }
            catch(error){
                console.error(`Error fetching user location: ${error}`)
            }
        })()
    }, [])


    // Helper function to display the user address
    const userAddressDisplay = () => {
        return address ? `${address.street} ${address.city}, ${address.region}, ${address.postalCode}` : 'Location not found';
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
            <Text style={{marginBottom: 30, marginTop: 15}}>
                <Text style={styles.locationHeader}>Location: </Text>
                <Text style={styles.location}>{userAddressDisplay()}</Text>
            </Text>

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
