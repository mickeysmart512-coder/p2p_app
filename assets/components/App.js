import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeFooterItem, setActiveFooterItem] = useState("Home");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("Loading...");
  const [accountBalance, setAccountBalance] = useState("******");
  const navigation = useNavigation();

  const togglePasswordView = () => {
    setShowPassword(!showPassword);
  };

  const handleGestureEnd = (event) => {
    if (event.nativeEvent.translationY < -20) {
      navigation.navigate("Transaction History");
    }
  };

  const handleFooterItemPress = (item) => {
    setActiveFooterItem(item);
    navigation.navigate(item);
  };

  useFocusEffect(
    useCallback(() => {
      setActiveFooterItem("Home");
    }, [])
  );

  const handleRowPress = (route) => {
    navigation.navigate(route);
  };

  // Fetch user data on component mount
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
            setFirstName(userData.firstName || "John");
            setLastName(userData.lastName || "Doe");
            setAccountBalance(userData.accountBalance || "0");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header with Profile Picture, Name, and Notification Icon */}
        <View style={styles.header}>
          <Image
            source={require("../images/person-6.jpg")}
            style={styles.profileImage}
          />
          <Text style={styles.title}>Hi, {firstName} {lastName}</Text>
        </View>

        {/* Main Content with ScrollView */}
        <ScrollView contentContainerStyle={styles.formWrapper}>
          {/* Red Card with Password and Eye Icon */}
          <PanGestureHandler onEnded={handleGestureEnd}>
            <View style={styles.redCardContainer}>
              <View style={styles.redCard}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardText}>Account Balance</Text>
                  <TouchableOpacity onPress={togglePasswordView}>
                    <Ionicons
                      name={showPassword ? "eye" : "eye-off"}
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.password}>
                  {showPassword ? accountBalance : "******"}
                </Text>
              </View>
            </View>
          </PanGestureHandler>

        {/* Mini Cards Section */}
        <View style={styles.miniCardsContainer}>
          {[
            {
              name: "P2P",
              imageUrl: require("../images/Frame 6.png"),
              route: "P2P Cash Exchange",
            },
            {
              name: "Deposit",
              imageUrl: require("../images/sync-devices.png"),
              route: "Transfer",
            },
            {
              name: "Pay the bill",
              imageUrl: require("../images/receipt-list.png"),
              route: "Pay the bill",
            },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.miniCard}
              onPress={() => navigation.navigate(item.route)}
            >
              <Image source={item.imageUrl} style={styles.miniCardIcon} />
              <Text style={styles.miniCardText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Report Section (Non-Scrollable) */}
        <PanGestureHandler onHandlerStateChange={handleGestureEnd}>
          <View style={styles.reportSection}>
            <Text style={styles.reportDate}>Today</Text>
            <TouchableOpacity
              onPress={() => handleRowPress("Electricity Details")}
            >
              <View style={styles.reportRow}>
                <Image
                  source={require("../images/waterIcon.png")}
                  style={styles.reportIcon}
                />
                <View style={styles.reportTextWrapper}>
                  <Text style={styles.reportHeading}>Water Bill</Text>
                  <Text style={styles.reportDate}>Oct 20, 2024</Text>
                </View>
                <View style={styles.reportTextWrapper2}>
                  <Text style={[styles.reportAmount, { color: "green" }]}>
                    +100$
                  </Text>
                  <Text style={[styles.reportStatus, { color: "green" }]}>
                    Successful
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleRowPress("Subscription")}>
              <View style={styles.reportRow}>
                <Image
                  source={require("../images/Icon.png")}
                  style={styles.reportIcon}
                />
                <View style={styles.reportTextWrapper}>
                  <Text style={styles.reportHeading}>Airtel Airtime</Text>
                  <Text style={styles.reportDate}>Oct 21, 2024</Text>
                </View>
                <View style={styles.reportTextWrapper2}>
                  <Text style={[styles.reportAmount, { color: "red" }]}>
                    -50$
                  </Text>
                  <Text style={[styles.reportStatus, { color: "red" }]}>
                    Unsuccessful
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <Text style={styles.reportDate}>Oct 21, 2024</Text>
            <TouchableOpacity onPress={() => handleRowPress("Transaction Details")}>
              <View style={styles.reportRow}>
                <Image
                  source={require("../images/Icon.png")}
                  style={styles.reportIcon}
                />
                <View style={styles.reportTextWrapper}>
                  <Text style={styles.reportHeading}>Income: Salary Oct</Text>
                  <Text style={styles.reportDate}>Oct 21, 2024</Text>
                </View>
                <View style={styles.reportTextWrapper2}>
                  <Text style={[styles.reportAmount, { color: "green" }]}>
                    +1200$
                  </Text>
                  <Text style={[styles.reportStatus, { color: "green" }]}>
                    Successful
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Repeat for other rows */}
          </View>
        </PanGestureHandler>
      </ScrollView>

      {/* Footer Section */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.footerItem,
            activeFooterItem === "Home" && styles.activeFooterItem,
          ]}
          onPress={() => handleFooterItemPress("Main App")}
        >
          <Ionicons name="home" size={20} color="white" />
          <Text style={[styles.footerText, { color: "white" }]}>Home</Text>
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
          <Ionicons name="settings" size={28} color="grey" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    </GestureHandlerRootView>
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
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  notificationIcon: {
    marginLeft: "auto",
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
    marginBottom: 5,
    
  },
  miniCard: {
    backgroundColor: "white",
    padding: 25,
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
    color: "grey",
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
    marginTop: 10,
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
  reportTextWrapper2: {
    flex: 1,
    alignItems: "flex-end",
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
});
