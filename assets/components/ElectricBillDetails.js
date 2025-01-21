import React from "react";
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

export default function ElectricBillDetails() {
  const handlePrint = () => {
    // Define your print logic here
    alert("Print functionality not implemented yet.");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.formWrapper}>
        {/* Transaction Card */}
        <View style={styles.card}>
          <Image
            source={require("../images/Frame 34.png")}
            style={styles.overlayImage}
            resizeMode="cover"
          />

          {/* Centered Text */}
          <Text style={styles.transactionText}>Abuja</Text>

          {/* Status Row */}
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Status</Text>
            <Text style={styles.successfulStatus}>Successful</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Token</Text>
            <Text style={styles.successfulToken}>
              2345-5432-3456-2357-2376-2356
            </Text>
          </View>
        </View>

        {/* Details Card */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Meter Number</Text>
            <Text style={styles.detailValue}>263784590</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Customer Name</Text>
            <Text style={styles.detailValue}>Full Name</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction Type</Text>
            <Text style={styles.detailValue}>Electricity</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Address</Text>
            <Text style={styles.detailValue}>
              <Text>Abuja.</Text>
              <Text>{"\n"}</Text>
              <Text>Santa Ana</Text>
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction Number</Text>
            <Text style={styles.detailValue}>235678907653234567876</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction Date</Text>
            <Text style={styles.detailValue}>Oct 29th, 2024 12:07:54</Text>
          </View>

          <View style={styles.dashedLine} />

          {/* Fee Row */}
          <View style={styles.feeRow}>
            <Text style={styles.largeLabel}>Fee</Text>
            <Text style={styles.feeValue}>$5.00</Text>
          </View>
        </View>
        <View style={styles.dashedLines} />

        <View style={styles.totalContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.largeValueRed}>{`$60.00`}</Text>
          </View>
        </View>
      </ScrollView>
      {/* Print Button */}
      <TouchableOpacity style={styles.printButton} onPress={handlePrint}>
        <Text style={styles.printButtonText}>Print</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  formWrapper: {
    padding: 16,
    alignItems: "center",
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    overflow: "visible", // Allow overflow for the image
    position: "relative",
    marginTop: 25, // Set relative positioning for overlay
  },
  overlayImage: {
    top: -50, // Adjust as needed for overlap
    left: "50%",
    transform: [{ translateX: -180 }], // Center the image
    width: 80, // Set image width
    height: 80, // Set image height
    borderRadius: 40,
    marginBottom: -35,
  },
  transactionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  statusLabel: {
    fontSize: 16,
    color: "#555",
  },
  largeLabel: {
    color: "#aaa",
    fontSize: 20,
    fontWeight: "bold",
  },
  successfulStatus: {
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
  successfulToken: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  detailsCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: "100%",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  detailLabel: {
    fontSize: 15,
    color: "#888",
    fontWeight: "bold",
  },
  detailValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    textAlign: "right",
    flex: 1,
  },
  dashedLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderStyle: "dashed",
    marginBottom: 15,
    marginTop: 50,
  },
  dashedLines: {
    borderBottomWidth: 1.2,
    borderBottomColor: "#ccc",
    borderStyle: "dashed",
    width: "95%",
  },
  largeValueRed: {
    fontSize: 24,
    color: "red",
    fontWeight: "bold",
  },
  totalContainer: {
    marginTop: 0,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    width: "100%",
    maxWidth: 400,
  },
  totalLabel: {
    fontSize: 28,
    fontWeight: "bold",
  },
  feeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  feeValue: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingTop: 8,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  printButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  printButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
