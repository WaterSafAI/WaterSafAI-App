import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Buttons, Color } from '../styles';


const ViewResultsScreen = () => {
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
        // Handle view solutions
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Water Quality Results</Text>
            <Text style={styles.subHeader}>Tested by: {results.companyName}</Text>
            <Text style={styles.subHeader}>Test Date: {results.testDate}</Text>

            {/* Header Row */}
            <View style={styles.resultRow}>
                <Text style={[styles.analysis, styles.headerText]}>Analysis</Text>
                <Text style={[styles.result, styles.headerText]}>Results</Text>
                <Text style={[styles.units, styles.headerText]}>Units</Text>
            </View>

            {/* Results Rows */}
            <View style={styles.resultsContainer}>
                {results.data.map((item, index) => (
                    <View key={index} style={styles.resultRow}>
                        <Text style={styles.analysis}>{item.analysis}</Text>
                        <Text style={styles.result}>{item.result}</Text>
                        <Text style={styles.units}>{item.units}</Text>
                    </View>
                ))}
            </View>

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
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    subHeader: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 5,
    },
    resultsContainer: {
        marginVertical: 20,
        paddingHorizontal: 10,
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
    },
    resultRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    analysis: {
        width: '50%', // Adjusted to take half the row width
        fontSize: 16,
        fontWeight: 'bold',
    },
    result: {
        width: '25%', // Adjusted to take a quarter of the row width
        fontSize: 16,
        textAlign: 'right',
    },
    units: {
        width: '25%', // Adjusted to take a quarter of the row width
        fontSize: 16,
        textAlign: 'left',
    },
    solutionBtn: {
        marginTop: 24,
        ...Buttons.buttonContainer
    },
    btnText: {
        ...Buttons.buttonText
    },
});

export default ViewResultsScreen;
