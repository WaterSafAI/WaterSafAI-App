import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { useAuth } from "../services/AuthProvider";
import { API_URL } from '../../constants';

const SafeLevels = {
  Chloramines: 4,
  Conductivity: 2500,
  Hardness: 120,
  Organic_carbon: 2,
  Potability: 1, // Assuming potability is a boolean
  Solids: 10000,
  Sulfate: 250,
  Trihalomethanes: 80,
  Turbidity: 1,
  pH: 8.5,
};

const ProgressBar = ({ value, safeLevel }) => {
  const ratio = value / safeLevel;
  let backgroundColor;

  if (ratio < 0.9) {
    backgroundColor = 'green';
  } else if (ratio < 1) {
    backgroundColor = 'yellow';
  } else {
    backgroundColor = 'red';
  }

  const width = ratio > 1 ? '100%' : `${ratio * 100}%`;

  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width, backgroundColor }]} />
    </View>
  );
};

const WaterQualityScreen = () => {
  const [data, setData] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      fetchData(currentLocation.coords);
    })();
  }, []);

  const fetchData = async (coords) => {
    try {
      const options = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      };

      const response = await fetch(`${API_URL}/samples/?lat=${coords.latitude}&long=${coords.longitude}`, options);
      const json = await response.json();

      setData(json.averages); // Assuming the endpoint returns an object with a key 'averages'

    } catch (error) {
      console.error(`Error fetching water quality results: ${error}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Water Quality Averages</Text>
        <Text style={styles.helpText}>
            This is an aggregation of all samples within a 10-mile radius of your current location. Each bar represents a different chemical found in the samples. The height of the bar indicates the concentration of the chemical. Higher bars mean higher concentrations.
        </Text>
      {data && (
        <View style={styles.resultsContainer}>
          {Object.entries(data).map(([key, value]) => (
            <View key={key} style={styles.resultRow}>
              <Text style={styles.analysis}>{key.replace(/_/g, ' ')}</Text>
              <ProgressBar value={value} safeLevel={SafeLevels[key]} />
              <Text style={styles.result}>{value ? value.toFixed(2) : 'N/A'}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    helpText: {
        fontSize: 14,
        color: 'gray',
    },
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
      color: '#0A3465',
    },
    resultsContainer: {
      marginVertical: 20,
    },
    resultRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: '#ddd',
    },
    analysis: {
      width: '40%',
      fontSize: 16,
      color: '#644535',
    },
    result: {
      width: '30%',
      fontSize: 16,
      color: '#644535',
      textAlign: 'right',
    },
    progressBarContainer: {
      width: '30%',
      height: 20,
      backgroundColor: '#e0e0e0',
      borderRadius: 10,
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      borderRadius: 10,
    },
  });
  
  export default WaterQualityScreen;