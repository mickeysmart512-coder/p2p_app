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
import { MaterialIcons } from "@expo/vector-icons";

export default function Withdraw() {
  const navigation = useNavigation();
  const [showPopup, setShowPopup] = useState(false);
  const [account, setAccount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [error, setError] = useState("");

  // Mock balance for demonstration
  const balance = 50000000; // Set available balance here

  const accountOptions = [
    "1234567890123456",
    "2345678901234567",
    "3456789012345678",
  ];

  const handleAccountSelect = (accountNumber) => {
    // Toggle account selection
    if (account === accountNumber) {
      setAccount(""); // Deselect if already selected
    } else {
      setAccount(accountNumber);
    }
    setShowPopup(false);
    setError(""); // Clear error when account is selected
  };

  const handleVerify = () => {
    const amount = selectedAmount || parseInt(customAmount);

    if (!amount || !account || phoneNumber.length < 11) {
      setError("Please fill in all fields correctly.");
      return;
    }

    // Check if the selected amount exceeds the balance
    if (amount > balance) {
      setError("Insufficient balance. Please enter a lower amount.");
    } else {
      setError("");
      navigation.navigate("Success Page");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Top Image */}
        <Image
          source={require("../images/Illustration 4.png")} // Ensure the correct path to the image
          style={styles.topImage}
        />

        {/* Choose Account Field */}
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowPopup(true)}
        >
          <View style={styles.accountRow}>
            <Text style={styles.inputText}>
              {account
                ? `VISA **** **** **** ${account.slice(-4)}`
                : "Choose Account"}
            </Text>
            {account && (
              <MaterialIcons name="credit-card" size={20} color="#888" />
            )}
          </View>
        </TouchableOpacity>

        {/* Error Message */}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Phone Number Input */}
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          maxLength={11}
        />

        {/* Choose Amount Text */}
        <Text style={styles.label}>Choose Amount</Text>

        {/* Amount Selection Cards */}
        <View style={styles.amountContainer}>
          {[100, 200, 500, 1000, 5000].map((amount) => (
            <TouchableOpacity
              key={amount}
              style={[
                styles.amountCard,
                selectedAmount === amount && styles.selectedCard,
              ]}
              onPress={() => {
                setSelectedAmount(amount);
                setShowCustomInput(false);
                setCustomAmount("");
                setError(""); // Clear error when a valid amount is selected
              }}
            >
              <Text style={styles.amountText}>${amount}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.amountCard, showCustomInput && styles.selectedCard]}
            onPress={() => {
              setSelectedAmount(null);
              setShowCustomInput(true);
            }}
          >
            <Text style={styles.amountText}>Other</Text>
          </TouchableOpacity>
        </View>

        {/* Custom Amount Input */}
        {showCustomInput && (
          <TextInput
            style={styles.input}
            placeholder="Enter Amount"
            keyboardType="numeric"
            value={customAmount}
            onChangeText={(text) => {
              setCustomAmount(text);
              setError(""); // Clear error when entering a custom amount
            }}
          />
        )}
      </ScrollView>

      {/* Verify Button */}
      <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
        <TouchableOpacity
          style={[
            styles.verifyButton,
            (selectedAmount || customAmount) &&
            account &&
            phoneNumber.length >= 11
              ? styles.activeButton
              : null,
          ]}
          disabled={
            !(
              (selectedAmount || customAmount) &&
              account &&
              phoneNumber.length >= 11
            )
          }
          onPress={handleVerify}
        >
          <Text style={styles.verifyText}>Verify</Text>
        </TouchableOpacity>
      </View>

      {/* Account Modal */}
      <Modal visible={showPopup} transparent={true} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
          }}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Account</Text>
            {accountOptions.map((accountNumber) => (
              <TouchableOpacity
                key={accountNumber}
                style={[
                  styles.modalButton,
                  account === accountNumber && styles.selectedModalButton,
                ]}
                onPress={() => handleAccountSelect(accountNumber)}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.modalButtonText}>
                    VISA **** **** **** {accountNumber.slice(-4)}
                  </Text>
                  {account === accountNumber && (
                    <MaterialIcons name="check" size={24} color="red" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.modalCloseButton, { marginTop: 15 }]}
              onPress={() => setShowPopup(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  contentContainer: { padding: 20, flex: 1 },
  topImage: { width: "100%", height: 200, marginTop: 10, marginBottom: 50 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputText: { color: "#888" },
  errorText: { color: "red", fontSize: 14, marginBottom: 10 },
  label: { fontWeight: "bold", marginBottom: 15, fontSize: 14, color: "#777" },
  amountContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  amountCard: {
    width: "30%",
    padding: 25,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    marginBottom: 15,
  },
  selectedCard: { backgroundColor: "#cde" },
  amountText: { fontSize: 16, fontWeight: "bold" },
  verifyButton: {
    backgroundColor: "#ccc",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
  },
  activeButton: { backgroundColor: "red" },
  verifyText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "90%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
    textAlign: "center",
  },
  modalButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "transparent",
    marginBottom: 10,
  },
  selectedModalButton: { color: "red" },
  modalButtonText: { color: "#777", fontWeight: "bold", fontSize: 16, },
  modalCloseButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "red",
  },
  modalCloseText: { color: "black", fontWeight: "bold" },
});
