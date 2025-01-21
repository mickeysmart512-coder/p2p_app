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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function TransactionReport() {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const togglePasswordView = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header with Profile Picture, Name, and Notification Icon */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://via.placeholder.com/50" }}
          style={styles.profileImage}
        />
        <Text style={styles.title}>Hi, FirstName LastName</Text>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.formWrapper}>
        {/* Red Card with Password and Eye Icon */}
        <View style={styles.redCardContainer}>
          <View style={styles.redCard}>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>Total Balance</Text>
              <TouchableOpacity onPress={togglePasswordView}>
                <Ionicons
                  name={showPassword ? "eye" : "eye-off"}
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.password}>
              {showPassword ? "5,000,000" : "******"}
            </Text>
          </View>
        </View>

        {/* Report Section */}
        <View style={styles.reportSection}>
          <Text style={styles.reportDate}>Oct 20, 2024</Text>
          <View style={styles.reportRow}>
            <Image
              source={require("../images/waterIcon.png")} // Use require for local images
              style={styles.reportIcon}
            />
            <View style={styles.reportTextWrapper}>
              <Text style={styles.reportHeading}>Water Bill</Text>
              <Text style={styles.reportStatus}>Unsuccessful</Text>
            </View>
            <Text style={[styles.reportAmount, { color: "green" }]}>+100$</Text>
          </View>
          <View style={styles.reportRow}>
            <Image
              source={require("../images/Icon.png")} // Use require for local images
              style={styles.reportIcon}
            />
            <View style={styles.reportTextWrapper}>
              <Text style={styles.reportHeading}>Glo Airtime</Text>
              <Text style={styles.reportStatus}>Successful</Text>
            </View>
            <Text style={[styles.reportAmount, { color: "red" }]}>-50$</Text>
          </View>

          <Text style={styles.reportDate}>Oct 21, 2024</Text>
          <View style={styles.reportRow}>
            <Image
              source={require("../images/Icon.png")} // Use require for local images
              style={styles.reportIcon}
            />
            <View style={styles.reportTextWrapper}>
              <Text style={styles.reportHeading}>Income: Salary Oct</Text>
              <Text style={styles.reportStatus}>Completed</Text>
            </View>
            <Text style={[styles.reportAmount, { color: "green" }]}>
              +1200$
            </Text>
          </View>
          <View style={styles.reportRow}>
            <Image
              source={require("../images/electricalIcon.png")}
              style={styles.reportIcon}
            />
            <View style={styles.reportTextWrapper}>
              <Text style={styles.reportHeading}>Electrical Bill</Text>
              <Text style={styles.reportStatus}>successfully</Text>
            </View>
            <Text style={[styles.reportAmount, { color: "red" }]}>-480$</Text>
          </View>
          <View style={styles.reportRow}>
            <Image
              source={require("../images/incomeIcon.png")} // Use require for local images
              style={styles.reportIcon}
            />
            <View style={styles.reportTextWrapper}>
              <Text style={styles.reportHeading}>Income: Jane transfesr</Text>
              <Text style={styles.reportStatus}>Completed</Text>
            </View>
            <Text style={[styles.reportAmount, { color: "green" }]}>
              +500$
            </Text>
          </View>
          <View style={styles.reportRow}>
            <Image
              source={require("../images/internetIcon.png")} // Use require for local images
              style={styles.reportIcon}
            />
            <View style={styles.reportTextWrapper}>
              <Text style={styles.reportHeading}>Internet Bill</Text>
              <Text style={styles.reportStatus}>successfully</Text>
            </View>
            <Text style={[styles.reportAmount, { color: "red" }]}>
              -100$
            </Text>
          </View>
        </View>
      </ScrollView>
      {/* Footer Section */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => navigation.navigate("Main App")}
        >
          <Ionicons name="home" size={28} color="white" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => navigation.navigate("Settings Page")}
        >
          <Ionicons name="settings" size={28} color="white" />
          <Text style={styles.footerText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  notificationIcon: {
    marginLeft: "auto",
  },
  formWrapper: {
    flexGrow: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  redCardContainer: {
    marginTop: 30,
  },
  redCard: {
    backgroundColor: "red",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardText: {
    color: "white",
    fontSize: 20,
    marginRight: 10,
  },
  password: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  miniCardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  miniCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    marginBottom: 15,
  },
  miniCardIcon: {
    width: 28,
    height: 28,
    tintColor: "red",
  },
  miniCardText: {
    fontSize: 14,
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  reportSection: {
    marginBottom: 30,
  },
  reportDate: {
    fontSize: 12,
    color: "gray",
    marginBottom: 10,
  },
  reportRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 10,
  },
  reportIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  reportTextWrapper: {
    flex: 1,
    marginLeft: 10,
  },
  reportHeading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  reportStatus: {
    fontSize: 14,
    color: "gray",
  },
  reportAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    backgroundColor: "red",
    width: "100%",
    paddingHorizontal: 50,
    position: "absolute",
    bottom: 0,
  },
  footerItem: { flexDirection: "row", alignItems: "center" },
  footerText: { fontSize: 14, color: "white", marginLeft: 5 },
});
