import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Modal, Button, Pressable } from 'react-native';
import { Color } from '../styles';
import { useAuth } from "../services/AuthProvider";
import { API_URL } from '../../constants';
import * as Linking from 'expo-linking';

const Card = ({ item, onSelect }) => (
    <TouchableOpacity style={styles.card} onPress={onSelect}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardText}>Location: {item.city}, {item.county}, {item.state}</Text>
    </TouchableOpacity>
);

const FilterPill = ({ label, selected, onSelect }) => (
    <TouchableOpacity style={selected ? styles.selectedPill : styles.pill} onPress={onSelect}>
        <Text style={selected ? styles.selectedPillText : styles.pillText}>{label}</Text>
    </TouchableOpacity>
);

const ViolationsScreen = () => {
    const [search, setSearch] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('State');
    const [data, setDataArray] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const {token} = useAuth();
    const filters = ['County', 'City', 'State'];

    /**
     * This effect will populate the list of violations
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

                const response = await fetch(`${API_URL}/violations/`, options);
                const json = await response.json();

                // Set data
                setDataArray(json);

            } catch (error) {
                console.error(`Error fetching violation list: ${error}`)
            }
        }
        fetchData();
    }, [])

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
                                <Text style={styles.modalText}>{selectedItem.city}, {selectedItem.county}, {selectedItem.state}</Text>
                                <Button
                                    title="Learn More"
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
            <TextInput
                style={styles.searchBar}
                value={search}
                onChangeText={setSearch}
                placeholder="Search..."
            />
            <View style={styles.filterContainer}>
                {filters.map(filter => (
                    <FilterPill
                        key={filter}
                        label={filter}
                        selected={filter === selectedFilter}
                        onSelect={() => setSelectedFilter(filter)}
                    />
                ))}
            </View>
            <ScrollView>
                {data.map((item, index) => (
                    <Card key={index} item={item} onSelect={() => { setSelectedItem(item); setModalVisible(true); }} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: Color.screens.background,
    },
    searchBar: {
        height: 40,
        borderColor: '#0A3465',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
        color: '#0A3465',
    },
    filterContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    pill: {
        backgroundColor: '#66B3CC',
        borderRadius: 20,
        padding: 10,
        marginRight: 10,
    },
    selectedPill: {
        backgroundColor: '#0A3465',
        borderRadius: 20,
        padding: 10,
        marginRight: 10,
    },
    pillText: {
        color: 'white',
    },
    selectedPillText: {
        color: 'white',
        fontWeight: 'bold',
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
        fontSize: 16
    },
    cardTitle: {
        color: '#0A3465',
        fontWeight: 'bold',
        fontSize: 20
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

export default ViolationsScreen;