import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Color } from '../styles';

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

const PfasScreen = () => {
    const [search, setSearch] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [data, setDataArray] = useState([]);
    const [filters, setFiltersArray] = useState([]);

    // const filters = ['All', 'Isotopes', 'Multi Component'];
    //     // Dummy data for example
    //     const results = {
    //         data: [
    //             { name: '1-Pentafluoroethylethanol'},
    //             { name: 'Perfluoroglutaryl difluoride'},
    //             { name: '4:2 Fluorotelomer alcohol'},
    //             { name: 'Sevoflurane'},
    //             { name: '3:1 Fluorotelomer alcohol'},
    //             { name: 'Perfluoropentanamide'},
    //             { name: 'Methyl 2H,2H,3H,3H-perfluoroheptanoate'},
    //             { name: 'Perfluorooctanoic acid'},
    //             { name: '2H,2H,3H,3H-Perfluorooctanoic acid'},
    //             { name: 'Perfluoroisobutyl methyl ether'},
    //             { name: '6H-Perfluorohex-1-ene'},
    //             { name: 'Potassium perfluorobutanesulfonate'},
    //             { name: 'Nonafluoropentanamide'},
    //             { name: '2-(Perfluorobutyl)-1-ethanesulfonic acid'},
    //             { name: 'Methyl perfluorobutanoate'},
    //             { name: '4H-Perfluorobutanoic acid'},
    //             { name: 'Methyl perfluoroethyl ketone'},
    //             { name: '2-(Trifluoromethoxy)ethyl trifluoromethanesulfonate'},
    //             { name: 'Hexafluoroamylene glycol'},
    //             { name: '2-(Perfluorohexyl)ethanol'},
    //             { name: 'Perfluorobutanoic acid'},
    //         ],
    //     };

    /**
     * This effect will populate the list of PFAS
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
            
                            const response = await fetch(`${API_URL}/PFAS/${userId}/`, options); //Not sure if ${userId} is needed?
                            const json = await response.json();
            
                            const {filters, res} = json;  
   
                            // Set data
                            setDataArray(res);
                            setFiltersArray(filters);

                        } catch (error) {
                            console.error(`Error fetching PFAS list: ${error}`)
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

export default PfasScreen;