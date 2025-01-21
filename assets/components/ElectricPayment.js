import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

export default function Payment({ route }) {
  const payment = route.params.payment;

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.receiptContainer}>
        <Text style={styles.receiptHeader}>
          {payment.type.charAt(0).toUpperCase() + payment.type.slice(1)} Receipt
        </Text>

        <View style={styles.receiptDetails}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>John Doe</Text>
        </View>
        <View style={styles.receiptDetails}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>123 Main St</Text>
        </View>
        <View style={styles.receiptDetails}>
          <Text style={styles.label}>Phone No:</Text>
          <Text style={styles.value}>123-456-7890</Text>
        </View>
        <View style={styles.receiptDetails}>
          <Text style={styles.label}>Code:</Text>
          <Text style={styles.value}>ABC123</Text>
        </View>
        <View style={styles.receiptDetails}>
          <Text style={styles.label}>From:</Text>
          <Text style={styles.value}>2024-01-01</Text>
        </View>
        <View style={styles.receiptDetails}>
          <Text style={styles.label}>To:</Text>
          <Text style={styles.value}>2024-01-31</Text>
        </View>

        <View style={styles.receiptDetails}>
          <Text style={styles.largeLabel}>Internet Fee:</Text>
          <Text style={styles.valueRed}>$50.00</Text>
        </View>
        <View style={styles.dashedLine} />

        <View style={styles.receiptDetails}>
          <Text style={styles.largeLabel}>Tax:</Text>
          <Text style={styles.valueRed}>$10.00</Text>
        </View>
      </View>
      <View style={styles.dashedLines} />
      <View style={styles.totalContainer}>
        <View style={styles.receiptDetails}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.largeValueRed}>{`$60.00`}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: { 
    flexGrow: 1,
    alignItems: 'center', // Center horizontally
    padding: 20 
  },
  receiptContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    width: '100%', // Full width to center properly
    maxWidth: 400, // Set a max width for better appearance
  },
  receiptHeader: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: 'Arial', // Set font to Arial
  },
  receiptDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    color: "#aaa", // Lighter color for labels
    fontSize: 14,
    fontWeight: "bold", // Smaller font size for labels
    fontFamily: 'Arial', // Set font to Arial
  },
  largeLabel: {
    color: "#aaa", // Lighter color for larger labels
    fontSize: 16,
    fontWeight: "bold", // Increased font size for Internet Fee and Tax labels
    fontFamily: 'Arial', // Set font to Arial
  },
  value: {
    fontSize: 14,
    fontWeight: "bold", // Make values bold
    fontFamily: 'Arial', // Set font to Arial
  },
  valueRed: {
    fontSize: 18, // Increased font size for red values
    color: "red",
    fontWeight: "bold", // Ensure values are bold
    fontFamily: 'Arial', // Set font to Arial
  },
  largeValueRed: {
    fontSize: 24, // Increased font size for red values
    color: "red",
    fontWeight: "bold", // Ensure values are bold
    fontFamily: 'Arial', // Set font to Arial
  },
  totalContainer: {
    marginTop: 0,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#fff", // Light background for the total container
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    width: '100%', // Full width to center properly
    maxWidth: 400, // Set a max width for better appearance
  },
  totalLabel: {
    fontSize: 28, // Larger font size for the total label
    fontWeight: "bold",
    fontFamily: 'Arial', // Set font to Arial
  },
  dashedLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderStyle: "dashed", // Ensure dashed lines are displayed correctly
    marginBottom: 10, // Ensure dashed lines are displayed correctly
    marginTop: 10,
  },
  dashedLines: {
    borderBottomWidth: 1.2,
    borderBottomColor: "#ccc",
    borderStyle: "dashed",
    width: "90%",
  },
});