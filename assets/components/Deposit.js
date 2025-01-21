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
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Deposit() {
  const navigation = useNavigation();
  const [showPopup, setShowPopup] = useState(true);

  const handleSearch = () => {
    navigation.navigate("Search");
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
        {/** Search Row */}
        <View style={styles.searchRow}>
          <TextInput placeholder="Search" style={styles.searchInput} />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeading}>Recent</Text>
        <View style={styles.profileContainer}>
          {[1, 2, 3].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.profileRow}
              onPress={handleProfileNavigation}
            >
              <Image
                source={require("../images/person-6.jpg")}
                style={styles.profileImage}
              />
              <View style={styles.profileTextContainer}>
                <Text style={styles.profileName}>User {item}</Text>
                <Text style={styles.bankName}>Bank Name {item}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/** Nearest Section */}
        <Text style={styles.sectionHeading}>Nearest to You</Text>
        <View style={styles.profileContainer}>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.profileRow}
              onPress={handleProfileNavigation}
            >
              <Image
                source={require("../images/person-6.jpg")}
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

      {/** Bottom Popup */}
      <Modal
        transparent={true}
        visible={showPopup}
        animationType="slide"
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <Image
              source={require("../images/Artwork.png")} // Ensure this path is correct
              style={styles.popupImage}
            />
            <View style={styles.popupTextContainer}>
              <Text style={styles.popupHeading}>Enable Location Services</Text>
              <Text style={styles.popupDescription}>
                To find nearby users and provide better service, we need access
                to your location.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.enableButton}
              onPress={() => setShowPopup(false)}
            >
              <Text style={styles.buttonText}>Enable</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.laterButton}
              onPress={() => setShowPopup(false)}
            >
              <Text style={styles.laterButtonText}>Enable Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
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
  searchButtonText: {
    color: "white",
    fontWeight: "bold",
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
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  bankName: {
    fontSize: 14,
    color: "#666",
  },
  popupContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
    width: "100%",
  },
  popupImage: {
    width: 380,
    height: 380,
    marginBottom: 10,
  },
  popupTextContainer: {
    alignItems: "center",
  },
  popupHeading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
  },
  popupDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 5,
    fontWeight: "bold",
  },
  enableButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    width: "100%",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  laterButton: {
    backgroundColor: "transparent",
    borderRadius: 12,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red",
    marginTop: 15,
  },
  laterButtonText: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  },
});
