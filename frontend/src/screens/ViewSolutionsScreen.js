import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal, Button, TouchableOpacity } from 'react-native';
import { Buttons, Color } from '../styles';
import { useAuth } from "../services/AuthProvider";
import { API_URL } from '../../constants';
import * as Linking from 'expo-linking';

const ViewSolutionsScreen = () => {

    const [data, setDataArray] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const {token} = useAuth();

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

                const response = await fetch(`${API_URL}/solutions/`, options);
                const json = await response.json();

                console.log(json);

                // Set data
                setDataArray(json);

            } catch (error) {
                console.error(`Error fetching location's solutions: ${error}`)
            }
        }
        fetchData();
    },[])
    
    const Card = ({ solution, onSelect }) => (
        <TouchableOpacity style={styles.card} onPress={onSelect}>
                <View style={styles.cardContent}>
                    <Text style={styles.title}>{solution.name}</Text>
                    <Text style={styles.specs}>Filter Life: {solution.specs.filterLife}</Text>
                    <Text style={styles.specs}>Filter Capacity: {solution.specs.filterCapacity}</Text>
                    <Text style={styles.specs}>Technology: {solution.specs.technology}</Text>
                    <Text style={styles.specs}>Removes:</Text>
                    <View style={styles.removesContainer}>
                        {solution.specs.removes.map((item, index) => (
                            <Text key={index} style={styles.removesItem}>• {item}</Text>
                        ))}
                    </View>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>${solution.price.toFixed(2)}</Text>
                </View>
        </TouchableOpacity>
    );
    
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {selectedItem && (
                            <>
                                <Text style={[styles.modalText, styles.modalTitle]}>{selectedItem.name}</Text>
                                <Text style={styles.modalText}>{selectedItem.specs.technology}</Text>
                                <Button
                                    title="Buy Now"
                                    style={[styles.button]}
                                    onPress={() => Linking.openURL('https://www.google.com/search?q=' + encodeURIComponent(selectedItem.name))}
                                />
                                <Pressable
                                    style={styles.buttonClose}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>X</Text>
                                </Pressable>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
            <Text style={styles.header}>Quality Solutions</Text>
            <ScrollView>
                {data.map((solution, index) => (
                    <Card key={index} solution={solution} onSelect={() => { setSelectedItem(solution); setModalVisible(true); }} />
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
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardContent: {
        flex: 3,
    },
    removesContainer: {
        marginLeft: 10,
    },
    removesItem: {
        color: 'gray',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    specs: {
        fontSize: 14,
    },
    priceContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    price: {
        fontSize: 24,
        color: '#f00',
        fontWeight: 'bold',
        width: 90,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        position: 'absolute',
        top: 10,
        left: 10,
        padding: 10,
    },
    textStyle: {
        color: "gray",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
    },
});

export default ViewSolutionsScreen;