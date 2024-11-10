import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

const LocationMap = () => {
  const TOKEN = "2dfecacbc07752";
  const [location, setLocation] = useState({
    latitude: 37.78825, 
    longitude: -122.4324, 
  });

  const [zoomLevel, setZoomLevel] = useState({
    latitudeDelta: 0.0922, 
    longitudeDelta: 0.0421, 
  });

  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    // Fetch the current location of the user
    fetch(`https://ipinfo.io/json?token=${TOKEN}`)
      .then(response => response.json())
      .then(data => {
        if (data.loc) {
          const [latitude, longitude] = data.loc.split(',');
          setLocation({
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          });

          setZoomLevel({
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          });
        } else {
          console.error('Location data not found');
        }
      })
      .catch(error => {
        console.error('Error fetching location:', error);
      });

    // Read incidents from the local file
    const filePath = FileSystem.documentDirectory + 'incidents.json';
    FileSystem.readAsStringAsync(filePath)
      .then(fileContents => {
        const existingData = JSON.parse(fileContents);
        
        // Ensure that latitude and longitude are numbers
        const updatedIncidents = existingData.map(incident => ({
          ...incident,
          latitude: parseFloat(incident.latitude),   // Ensure latitude is a number
          longitude: parseFloat(incident.longitude), // Ensure longitude is a number
        }));

        setIncidents(updatedIncidents);  // Set incidents data for markers
      })
      .catch(error => {
        console.error('Error reading incidents data:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: zoomLevel.latitudeDelta,
            longitudeDelta: zoomLevel.longitudeDelta,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {/* Loop through incidents and add a marker for each */}
          {incidents.map((incident, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: incident.latitude,
                longitude: incident.longitude,
              }}
              title={`${incident.description}`}
            >
              <View style={styles.dangerMarker}>
                <MaterialIcons name="warning" size={24} color="black" />
              </View>
            </Marker>
          ))}

          {/* Marker for current location */}
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Current location"
          />
        </MapView>
      </View>
    </View>
  );
};

export default LocationMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  mapContainer: {
    width: '95%',
    height: '100%',
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 20,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  dangerMarker: {
    backgroundColor: 'yellow',
    padding: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'orange',
  },
});
