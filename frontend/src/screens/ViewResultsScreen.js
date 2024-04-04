import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal, Button } from 'react-native';
import { Buttons, Color } from '../styles';
import { useAuth } from "../services/AuthProvider";
import { API_URL } from '../../constants';
import * as Linking from 'expo-linking';

const ViewResultsScreen = ({ navigation}) => {
    const [companyName, setCompanyName] = useState('');
    const [location, setLocation] = useState('');
    const [testDate, setTestDate] = useState('');
    const [data, setDataArray] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const {token} = useAuth();

    /**
     * This effect will populate the test results for the given location.
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

                const response = await fetch(`${API_URL}/results/`, options);
                const json = await response.json();

                // Set data
                setCompanyName(json[0].companyName);
                setTestDate(json[0].testDate);
                setDataArray(json[0].data);
                setLocation(`${json[0].county}, ${json[0].city}, ${json[0].state}`);

            } catch (error) {
                console.error(`Error fetching location's results: ${error}`)
            }
        }
        fetchData();
    }, [])

    const handleViewSolutions = () => {
        navigation.navigate("View Solutions");
    }

    return (
        <ScrollView style={styles.container}>
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
                                <Text style={[styles.modalText, styles.modalTitle]}>{selectedItem.analysis}</Text>
                                <Text style={styles.modalText}>{selectedItem.description}</Text>
                                <Button
                                    title="Learn More"
                                    style={[styles.button]}
                                    onPress={() => Linking.openURL('https://www.google.com/search?q=' + encodeURIComponent(selectedItem.analysis))}
                                />
                            </>
                        )}
                        <Pressable
                            style={[styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>X</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Text style={styles.header}>Water Quality Results</Text>
            <Text style={{textAlign: 'center', marginBottom: 10}}>
                <Text style={styles.subHeader}>Tested By: </Text>
                <Text style={styles.subHeaderRes}>{companyName}</Text>
            </Text>
            <Text style={{textAlign: 'center', marginBottom: 10}}>
                <Text style={styles.subHeader}>Test Date: </Text>
                <Text style={styles.subHeaderRes}>{testDate}</Text>
            </Text>
            <Text style={{textAlign: 'center', marginBottom: 25}}>
                <Text style={styles.subHeader}>Location: </Text>
                <Text style={styles.subHeaderRes}>{location}</Text>
            </Text>

            <View style={styles.resultBox}>
                {/* Header Row */}
                <View style={styles.resultRow}>
                    <Text style={[styles.analysis, styles.headerText, styles.analysisHeader]}>Analysis</Text>
                    <Text style={[styles.result, styles.headerText]}>Results</Text>
                    <Text>{"        "}</Text>
                    <Text style={[styles.units, styles.headerText]}>Units</Text>
                </View>

                {/* Results Rows */}
                <View style={styles.resultsContainer}>
                    {data.map((item, index) => (
                        <Pressable key={index} onPress={() => {setSelectedItem(item); setModalVisible(true);}}>
                            <View style={styles.resultRow}>
                                <Text style={styles.analysis}>{item.analysis}</Text>
                                <Text style={styles.result}>{item.result}</Text>
                                <Text>{"        "}</Text>
                                <Text style={styles.units}>{item.units}</Text>
                            </View>
                        </Pressable>
                    ))}
                </View>
            </View>
            
            <View style={{alignItems: 'center'}}>
                {/* Solutions Button */}
                <Pressable
                    onPress={handleViewSolutions}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? Color.inputButton.pressed : Color.inputButton.fill
                        },
                        styles.solutionBtn,
                    ]}>
                    <Text style={styles.btnText}>Solutions</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6',
        padding: 20,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#0A3465'
    },
    subHeader: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 5,
        color: '#0A3465',
        fontWeight: 'bold',
    },
    subHeaderRes: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 5,
        color: '#0A3465'
    },
    resultsContainer: {
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    resultBox: {
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
    },
    resultRowHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#eef',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    resultRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    analysis: {
        width: '45%', // Adjusted to take half the row width
        fontSize: 16,
        color: '#644535',
        paddingLeft: 5,
    },
    analysisHeader: {       
        paddingLeft: 15,
    },
    result: {
        width: '25%', // Adjusted to take a quarter of the row width
        fontSize: 16,
        textAlign: 'right',
        color: '#644535',
        fontWeight: 'bold',
    },
    units: {
        width: '25%', // Adjusted to take a quarter of the row width
        fontSize: 16,
        textAlign: 'left',
        color: '#644535',
        fontWeight: 'bold',
        paddingRight: 15,
    },
    solutionBtn: {
        marginTop: 24,
        ...Buttons.buttonContainer,            
    },
    btnText: {
        ...Buttons.buttonText
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

export default ViewResultsScreen;
