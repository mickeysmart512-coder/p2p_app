import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function SettingsPage() {
  const navigation = useNavigation();
  const [activeFooterItem, setActiveFooterItem] = useState("Settings");
  const [userName, setUserName] = useState("Loading...");


  const handleFooterItemPress = (item) => {
    setActiveFooterItem(item);
    // Navigate to the respective screen
    navigation.navigate(item);
  };

  useFocusEffect(
    useCallback(() => {
      setActiveFooterItem("Settings"); // Set this to the screen name when returning
    }, [])
  );


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const db = getFirestore();
        const userId = auth.currentUser?.uid;

        if (userId) {
          const userDoc = await getDoc(doc(db, "users", userId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.fullName || "User");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);




// Inside your component
const handleLogout = async () => {
  try {
    // Clear the saved mobile number and sign out from Firebase
    await AsyncStorage.removeItem("lastMobileNumber");
    await signOut(auth);

    // Navigate to the Sign In screen
    navigation.navigate("Sign In");
  } catch (error) {
    console.error("Error logging out:", error);
    Alert.alert("Logout failed", "Please try again.");
  }
};
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header with Profile Picture and Name */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            source={require("../images/person-6.jpg")}
            style={styles.profileImage}
          />
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.formWrapper}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.profileName}>{userName}</Text>

          {/* Settings Options */}
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => navigation.navigate("Password Settings")}
          >
            <Ionicons
              name="lock-closed"
              size={24}
              color="red"
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Password</Text>
            <Ionicons name="chevron-forward" size={20} color="red" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => navigation.navigate("Transaction History")}
          >
            <Ionicons
              name="time"
              size={24}
              color="red"
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Transaction History</Text>
            <Ionicons name="chevron-forward" size={20} color="red" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => navigation.navigate("Location")}
          >
            <Ionicons
              name="location"
              size={24}
              color="red"
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Your Location</Text>
            <Ionicons name="chevron-forward" size={20} color="red" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => navigation.navigate("App Information")}
          >
            <Ionicons
              name="information-circle"
              size={24}
              color="red"
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>App Information</Text>
            <Ionicons name="chevron-forward" size={20} color="red" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => navigation.navigate("Customer Care")}
          >
            <Ionicons
              name="call"
              size={24}
              color="red"
              style={styles.optionIcon}
            />
            <Text style={styles.optionText}>Customer Care</Text>
            <Ionicons name="chevron-forward" size={20} color="red" />
          </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton} onPress={handleLogout}>
            <Text style={styles.searchButtonText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.footerItem,
            activeFooterItem === "Home" && styles.activeFooterItem,
          ]}
          onPress={() => handleFooterItemPress("Main App")}
        >
          <Ionicons name="home" size={28} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.footerItem,
            activeFooterItem === "Chat" && styles.activeFooterItem,
          ]}
          onPress={() => handleFooterItemPress("Inbox")}
        >
          <View style={styles.messageIconContainer}>
            <Ionicons name="chatbubbles" size={28} color="grey" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.footerItem,
            activeFooterItem === "Settings" && styles.activeFooterItem,
          ]}
          onPress={() => handleFooterItemPress("Settings Page")}
        >
          <Ionicons name="settings" size={20} color="white" />
          <Text style={[styles.footerText, { color: "white" }]}>Settings</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

function AppInformation() {
  return (
    <View style={styles.contentContainer}>
      {/* <Text style={styles.contentHeader}>App Information</Text> */}
      <View style={styles.contentRow}>
        <Text style={styles.contentText}>Version</Text>
        <Text style={styles.contentValue}>1.0.0</Text>
      </View>
      <View style={styles.contentRow}>
        <Text style={styles.contentText}>License</Text>
        <Text style={styles.contentValue}>Standard</Text>
      </View>
      <View style={styles.contentRow}>
        <Text style={styles.contentText}>Developer</Text>
        <Text style={styles.contentValue}>Example Co.</Text>
      </View>
      <View style={styles.contentRow}>
        <Text style={styles.contentText}>Language</Text>
        <Text style={styles.contentValue}>English</Text>
      </View>
    </View>
  );
}

function PasswordSettings() {
  const navigation = useNavigation();
  return (
    <View style={styles.contentContainer}>
      {/* <Text style={styles.contentHeader}>Password Settings</Text> */}
      <View style={styles.contentRow}>
        <Text style={styles.contentText}>Change Password</Text>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => navigation.navigate("Change Password")}
        >
          <Text style={styles.contentValue}>Update</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentRow}>
        <Text style={styles.contentText}>Password Requirements</Text>
        <Text style={styles.contentValue}>8+ Characters</Text>
      </View>
      <View style={styles.contentRow}>
        <Text style={styles.contentText}>Two-Factor Authentication</Text>
        <Text style={styles.contentValue}>Enabled</Text>
      </View>
    </View>
  );
}

function CustomerCare() {
  return (
    <View style={styles.contentContainer}>
      {/* <Text style={styles.contentHeader}>Customer Care</Text> */}
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
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    backgroundColor: "red",
    paddingTop: 60,
    paddingBottom: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: -30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#f9f9f9",
  },
  profileName: {
    fontSize: 24,
    color: "red",
    marginTop: 10,
    marginBottom: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  formWrapper: {
    flexGrow: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    marginTop: -30,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionIcon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    backgroundColor: "#fff",
    width: "100%",
    paddingHorizontal: 50,
    position: "absolute",
    bottom: 0,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  footerText: {
    fontSize: 14,
    color: "grey",
    marginLeft: 5,
  },
  activeFooterItem: {
    backgroundColor: "red",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 25,
  },
  badge: {
    position: "absolute",
    right: -10,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  contentHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
  contentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  contentText: {
    fontSize: 16,
    color: "#333",
  },
  contentValue: {
    fontSize: 16,
    color: "red",
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
});

export { AppInformation, PasswordSettings, CustomerCare };
