import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Buttons, Color } from '../styles';

const ViewResultsScreen = ({ navigation}) => {
    // Dummy data for example
    const results = {
        companyName: 'Company name',
        testDate: '08/28/2013',
        data: [
            { analysis: 'Total Coliform Bacteria', result: '50', units: '#/100ml' },
            { analysis: 'Nitrate-Nitrogen', result: '4.55', units: 'mg/l' },
            { analysis: 'pH', result: '7.50', units: 'units' },
            { analysis: 'Iron', result: '0.55', units: 'mg/l' },
            { analysis: 'Hardness as CaCo3', result: '280', units: 'mg/l' },
            { analysis: 'Sulfate Sulfur', result: '32.0', units: 'mg/l' },
            { analysis: 'Chlorine', result: '25.4', units: 'mg/l' },
            { analysis: 'Specific Conductance', result: '344', units: 'umhos/cc' },
        ],
    };

    const handleViewSolutions = () => {
        navigation.navigate("View Solutions");
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Water Quality Results</Text>
            <Text style={{textAlign: 'center', marginBottom: 10}}>
                <Text style={styles.subHeader}>Tested By: </Text>
                <Text style={styles.subHeaderRes}>{results.companyName}</Text>
            </Text>
            <Text style={{textAlign: 'center', marginBottom: 25}}>
                <Text style={styles.subHeader}>Test Date: </Text>
                <Text style={styles.subHeaderRes}>{results.testDate}</Text>
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
                    {results.data.map((item, index) => (
                        <View key={index} style={styles.resultRow}>
                            <Text style={styles.analysis}>{item.analysis}</Text>
                            <Text style={styles.result}>{item.result}</Text>
                            <Text>{"        "}</Text>
                            <Text style={styles.units}>{item.units}</Text>
                        </View>
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
});

export default ViewResultsScreen;
