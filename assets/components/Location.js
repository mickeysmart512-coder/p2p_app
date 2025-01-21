import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react';
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";


export default function Location() {
    const navigation = useNavigation();

    return (
    <ScrollView contentContainerStyle={styles.contentContainer}>

        <View style={styles.searchRow}>
          <TextInput placeholder="Search" style={styles.searchInput} />
          <TouchableOpacity style={styles.searchButton} >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

         {/** Nearest Section */}
         <Text style={styles.sectionHeading}>Nearest to Search Result</Text>
        <View style={styles.profileContainer}>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.profileRow}
            >
            <Ionicons name="location" size={30} color="red" />

              <View style={styles.profileTextContainer}>
                <Text style={styles.locationName}>Location {item}</Text>
                <Text style={styles.country}>Abuja Nigeria {item}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
            style={styles.optionRow}
            onPress={() => navigation.navigate("Saved Location")}
          >
            <Ionicons
              name="location"
              size={24}
              color="red"
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Saved Location</Text>
            <Ionicons name="chevron-forward" size={20} color="red" />
          </TouchableOpacity>


          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Save Location</Text>
          </TouchableOpacity>
         </ScrollView>
  )
}


function SavedLocation() {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.contentRow}>
          <Text style={styles.contentText}>Contact Support</Text>
          <Text style={styles.contentValue}>24/7</Text>
        </View>
        <View style={styles.contentRow}>
          <Text style={styles.contentText}>Phone</Text>
          <Text style={styles.contentValue}>+1-800-123-4567</Text>
        </View>
        <View style={styles.contentRow}>
          <Text style={styles.contentText}>Email</Text>
          <Text style={styles.contentValue}>support@example.com</Text>
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
    
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 10,
    marginRight: 10,
    marginTop: 45,
  },
  searchButton: {
    backgroundColor: "red",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  searchButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  sectionHeading: {
    fontSize: 14,
    color: "#777",
    fontWeight: "bold",
    marginVertical: 10,
  },
  profileContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  profileTextContainer: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  country: {
    fontSize: 14,
    color: "#666",
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 20,
  },
  optionIcon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  searchButton: {
    backgroundColor: "red",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 25,
    marginTop: 40,
  },
  searchButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: 'center',
  },
})


export { SavedLocation };























