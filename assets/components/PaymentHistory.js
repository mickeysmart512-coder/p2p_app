import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Import icons if needed
import { useNavigation } from "@react-navigation/native"; // Import navigation

export default function PaymentHistory() {
  const navigation = useNavigation(); // Initialize navigation
  const [filter, setFilter] = useState("All");

  // Example payment data
  const paymentHistory = [
    { type: "water", month: "September", date: "15", year: "2024", status: "Paid", amount: "$30", company: "Water Co." },
    { type: "mobile", month: "September", date: "10", year: "2024", status: "Unpaid", amount: "$50", company: "Mobile Co." },
    { type: "internet", month: "August", date: "20", year: "2024", status: "Paid", amount: "$70", company: "Internet Co." },
    { type: "electric", month: "July", date: "05", year: "2024", status: "Paid", amount: "$100", company: "Electric Co." },
  ];

  // Filtered transactions based on selected filter
  const filteredPayments = paymentHistory.filter(
    (payment) => filter === "All" || payment.type === filter
  );

  const handleFilterPress = (type) => {
    setFilter(type);
  };

  const handleCardPress = (payment) => {
    navigation.navigate("Transaction Details"); // Navigate to Payment screen with payment data
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>

        {/* Filter Buttons */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {["All", "water", "mobile", "internet", "electric"].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.filterButton,
                filter === type && styles.activeFilterButton,
              ]}
              onPress={() => handleFilterPress(type)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filter === type && styles.activeFilterButtonText,
                ]}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Payment Cards */}
        {filteredPayments.map((payment, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={() => handleCardPress(payment)}>
            <View style={styles.dateRow}>
              <Text style={styles.boldText}>{`${payment.month}`}</Text>
              <Text style={styles.date}>{`${payment.date}/${payment.month}/${payment.year}`}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.valueRed}>{`Status: ${payment.status}`}</Text>
              <Text style={styles.valueRed}>{`Amount: ${payment.amount}`}</Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.label}>{`Company: ${payment.company}`}</Text>
              {filter === "All" && (
                <View style={styles.iconContainer}>
                  <MaterialIcons name={payment.type === "water" ? "water" : payment.type === "mobile" ? "phone" : payment.type === "internet" ? "wifi" : "flash-on"} size={20} color="red" />
                  <Text style={styles.label}>{payment.type.charAt(0).toUpperCase() + payment.type.slice(1)}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  contentContainer: { padding: 20 },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 10, // Add some space between buttons
  },
  activeFilterButton: {
    backgroundColor: "red",
  },
  filterButtonText: {
    color: "#888",
    fontWeight: "bold",
  },
  activeFilterButtonText: {
    color: "#fff",
  },
  date: {
    color: "#888",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    color: "#888",
    fontSize: 12,
  },
  valueRed: {
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});