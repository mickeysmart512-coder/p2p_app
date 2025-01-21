import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();

  const handleSearch = () => {
    // Trigger search functionality or filter results based on searchQuery
  };

  const handleProfileNavigation = () => {
    navigation.navigate("Profile");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Search Row */}
        <View style={styles.searchRow}>
          <TextInput
            placeholder="Search verified payers"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* Display Verified Payers */}
        <Text style={styles.sectionHeading}>Verified Payers</Text>
        <View style={styles.profileContainer}>
          {[1, 2, 3].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.profileRow}
              onPress={handleProfileNavigation}
            >
              <Image
                source={{ uri: "https://via.placeholder.com/50" }}
                style={styles.profileImage}
              />
              <View style={styles.profileTextContainer}>
                <Text style={styles.profileName}>User {item}</Text>
                <Text style={styles.bankName}>Bank Name {item}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  contentContainer: { paddingHorizontal: 20, paddingVertical: 30 },
  searchRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "red",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  searchButtonText: { color: "white", fontWeight: "bold" },
  sectionHeading: {
    fontSize: 14,
    color: "#777",
    fontWeight: "bold",
    marginVertical: 10,
  },
  profileContainer: { marginBottom: 20, backgroundColor: "#fff", borderRadius: 8 },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  profileImage: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  profileTextContainer: { flex: 1 },
  profileName: { fontSize: 16, fontWeight: "bold", color: "#333" },
  bankName: { fontSize: 14, color: "#666" },
});
