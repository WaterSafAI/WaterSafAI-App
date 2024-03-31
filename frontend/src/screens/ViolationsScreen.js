import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Color } from '../styles';
import { useAuth } from "../services/AuthProvider";
import { API_URL } from '../../constants';

const Card = ({ title }) => (
    <View style={styles.card}>
        <Text style={styles.cardText}>{title}</Text>
    </View>
);

const FilterPill = ({ label, selected, onSelect }) => (
    <TouchableOpacity style={selected ? styles.selectedPill : styles.pill} onPress={onSelect}>
        <Text style={selected ? styles.selectedPillText : styles.pillText}>{label}</Text>
    </TouchableOpacity>
);

const ViolationsScreen = () => {
    const [search, setSearch] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [data, setDataArray] = useState([]);
    const [filters, setFiltersArray] = useState([]);
    const {token} = useAuth();

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

                const response = await fetch(`${API_URL}/violations/`, options); //May need to change
                const json = await response.json();

                const {filters, res} = json;  

                // Set data
                setDataArray(res);
                setFiltersArray(filters);

            } catch (error) {
                console.error(`Error fetching violation list: ${error}`)
            }
        }
        fetchData();
    })

    return (
        <View style={styles.container}>
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
                    <Card key={index} title={item.name} />
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
    }
});

export default ViolationsScreen;