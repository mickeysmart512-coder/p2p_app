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
import { useNavigation } from "@react-navigation/native";

const dropdownOptions = [
  { label: "Option 1", image: require("../images/Frame 35.png") },
  { label: "Option 2", image: require("../images/Frame 35.png") },
  { label: "Option 3", image: require("../images/Frame 35.png") },
];

export default function Airtime() {
  const navigation = useNavigation();

  const [activeButton, setActiveButton] = useState("prepaid");
  const [selectedCard, setSelectedCard] = useState(null);
  const [amount, setAmount] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pin, setPin] = useState("");
  const [selectedDropdown, setSelectedDropdown] = useState(dropdownOptions[0]);
  const [isDropdownModalVisible, setIsDropdownModalVisible] = useState(false);

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
      navigation.navigate("Subscription");
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
          {/* Top Container with Logo, Company Name, Dropdown, and Number Field */}
          <View style={styles.topMainContainer}>
            <View style={styles.topContainer}>
              <Text style={styles.companyName}>Service Provider</Text>
            </View>
            <View style={styles.inputDropdownContainer}>
              <TouchableOpacity onPress={() => setIsDropdownModalVisible(true)}>
                <View style={styles.dropdownButton}>
                  <Image
                    source={selectedDropdown.image}
                    style={styles.dropdownImage}
                  />
                </View>
              </TouchableOpacity>
              <Text style={styles.divider}>|</Text>
              <TextInput
                style={styles.mobileInput}
                placeholder="Mobile Number"
                keyboardType="numeric"
                value={mobileNumber}
                onChangeText={setMobileNumber}
              />
            </View>
          </View>

          <Text style={styles.currencyText}>Choose amount</Text>

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
                    selectedCard === value && styles.activeCardText,
                  ]}
                >
                  ${value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              editable={!selectedCard}
            />
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

        {/* Dropdown Modal */}
        <Modal
          visible={isDropdownModalVisible}
          transparent
          animationType="slide"
        >
          <View style={styles.dropdownModalContainer}>
            <View style={styles.dropdownModalContent}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsDropdownModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              {dropdownOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownOption}
                  onPress={() => {
                    setSelectedDropdown(option);
                    setIsDropdownModalVisible(false);
                  }}
                >
                  <Image
                    source={option.image}
                    style={styles.dropdownOptionImage}
                  />
                  <Text>{option.label}</Text>
                  {option === selectedDropdown && (
                    <Text
                      style={{
                        fontSize: 20,
                        color: "red",
                        marginLeft: 10,
                      }}
                    >
                      &#10003;
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

        {/* PIN Modal */}
        <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Transaction Pin or Use Fingerprint</Text>
            <TextInput
              style={styles.pinInput}
              placeholder="PIN"
              keyboardType="numeric"
              secureTextEntry
              maxLength={6}
              value={pin}
              onChangeText={setPin}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
      </View>
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
    paddingBottom: 100,
  },
topMainContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 25,
    marginBottom: 20,
    elevation: 1,
    zIndex: 1, // Keeps the dropdown on top
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginRight: 10,
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#aaa",
  },
  inputDropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative", // Ensures the dropdown is positioned within this container
  },
  mobileInput: {
    flex: 1,
    padding: 12,
    borderRadius: 0,
  },
  divider: {
    marginHorizontal: 8,
    color: "#333",
    fontSize: 18,
  },
  dropdownModalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  dropdownModalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  dropdownOptionImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  currencyText: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 10,
    marginBottom: 15,
    fontWeight: "bold",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
    zIndex: 0,
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
  wrapper: {
    flex: 1,
  },
});
