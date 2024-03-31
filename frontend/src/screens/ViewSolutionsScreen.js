import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Buttons, Color } from '../styles';
import { useAuth } from "../services/AuthProvider";
import { API_URL } from '../../constants';

const ViewSolutionsScreen = () => {

    const [data, setDataArray] = useState([]);
    const {token} = useAuth();

    // Dummy data for example
    // const results = {
    //     data: [
    //         { solution: 'Call a professional'},
    //         { solution: 'Install a water filter'},
    //         { solution: 'Alkalize your water'},
    //         { solution: 'Clean or replace your pipes'},
    //         { solution: 'Iron filtration system'},
    //         { solution: 'Chlorine filtration system'},
    //         { solution: 'Ultraviolet water disinfection system'},
    //         { solution: 'Reverse Osmosis'},
    //     ],
    // };

        /**
     * This effect will populate the water solutions for the given location.
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
    
                    const response = await fetch(`${API_URL}/solutions/`, options); //may need to change (Add specific location)
                    const json = await response.json();
    
                    const {res} = json; 

                    // Set data
                    setDataArray(res);
    
                } catch (error) {
                    console.error(`Error fetching location's solutions: ${error}`)
                }
            }
            fetchData();
        })
    
    const Card = ({ title }) => (
        <View style={styles.card}>
            <Text style={styles.cardText}>{title}</Text>
        </View>
    );
    
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Quality Solutions</Text>
            <ScrollView >
                {data.map((item, index) => (
                    <Card key={index} title={item.solution} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: Color.screens.background,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#0A3465',
        marginBottom: 40,
        marginTop: 30,
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        marginBottom: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    },
    cardText: {
        color: '#0A3465',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default ViewSolutionsScreen;