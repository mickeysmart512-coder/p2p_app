import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ElectricBill() {
  const navigation = useNavigation();

  const [activeButton, setActiveButton] = useState("prepaid");
  const [selectedCard, setSelectedCard] = useState(null);
  const [amount, setAmount] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pin, setPin] = useState("");

  const handleButtonToggle = (type) => {
    setActiveButton(type);
    setSelectedCard(null);
    setAmount("");
  };

  const handleCardSelection = (value) => {
    setSelectedCard(value);
    setAmount(value.toString());
  };

  const handleVerify = () => {
    setIsModalVisible(true);
  };

  const handleConfirmPin = () => {
    if (pin.length === 6) {
      setIsModalVisible(false);
      navigation.navigate("Electricity Details");
    } else {
      alert("Please enter a valid 6-digit PIN.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setPin(""); // Optionally clear the PIN
  };

  const isVerifyButtonDisabled = !mobileNumber || (!amount && !selectedCard);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.formWrapper}>
          {/* Top Container with Logo and Company Name */}
          <View style={styles.topMainContainer}>
            <View style={styles.topContainer}>
              <Image
                source={require("../images/Frame 34.png")}
                style={styles.logo}
              />
              <Text style={styles.companyName}>Electricity Company</Text>
            </View>

            {/* Toggle Buttons for Prepaid and Postpaid */}
            <View style={styles.toggleButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  activeButton === "prepaid" && styles.activeButton,
                ]}
                onPress={() => handleButtonToggle("prepaid")}
              >
                <Text
                  style={[
                    styles.toggleButtonText,
                    activeButton === "prepaid" && styles.activeButtonText,
                  ]}
                >
                  Prepaid
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  activeButton === "postpaid" && styles.activeButton,
                ]}
                onPress={() => handleButtonToggle("postpaid")}
              >
                <Text
                  style={[
                    styles.toggleButtonText,
                    activeButton === "postpaid" && styles.activeButtonText,
                  ]}
                >
                  Postpaid
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              value={mobileNumber}
              onChangeText={setMobileNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              editable={!selectedCard}
            />
            <Text style={styles.currencyText}>Currency: {currency}</Text>
          </View>

          {/* Cards for Selecting Fixed Amounts */}
          <View style={styles.cardsContainer}>
            {[100, 200, 300, 400, 500, 600].map((value, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.card,
                  selectedCard === value && styles.activeCard,
                ]}
                onPress={() => handleCardSelection(value)}
              >
                <Text
                  style={[
                    styles.cardText,
                    selectedCard === value && styles.active,
                  ]}
                >
                  ${value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Verify Button at the bottom */}
        <TouchableOpacity
          style={[
            styles.verifyButton,
            isVerifyButtonDisabled && styles.disabledButton,
          ]}
          onPress={handleVerify}
          disabled={isVerifyButtonDisabled}
        >
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
      </View>

      {/* PIN Modal */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Enter Transaction Pin or Use Fingerprint
            </Text>
            <TextInput
              style={styles.pinInput}
              placeholder="PIN"
              keyboardType="numeric"
              secureTextEntry
              maxLength={6}
              value={pin}
              onChangeText={setPin}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirmPin}
              >
                <Text style={styles.confirmButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
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
  formWrapper: {
    padding: 20,
    paddingBottom: 100, // Additional space for the Verify button
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  topMainContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 25,
    marginBottom: 20,
    elevation: 1,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  toggleButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    marginHorizontal: 5,
    borderRadius: 15,
  },
  activeButton: {
    backgroundColor: "red",
  },
  toggleButtonText: {
    fontSize: 16,
    color: "#333",
  },
  activeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 15,
    marginBottom: 18,
  },
  currencyText: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "30%",
    padding: 25,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    marginVertical: 5,
  },
  activeCard: {
    backgroundColor: "red",
  },
  cardText: {
    fontSize: 16,
    color: "#333",
  },
  activeCardText: {
    color: "#fff",
    fontWeight: "bold",
  },
  verifyButton: {
    backgroundColor: "red",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginTop: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#aaa",
  },
  pinInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 15,
    width: "100%",
    marginBottom: 20,
    textAlign: "center",
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: "red",
    paddingVertical: 15,
    borderRadius: 15,
    width: "48%",
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  wrapper: {
    flex: 1,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    paddingVertical: 15,
    borderRadius: 15,
    width: "48%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 16,
  },
});
