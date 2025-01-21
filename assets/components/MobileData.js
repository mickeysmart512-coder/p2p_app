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
import { LinearGradient } from "expo-linear-gradient";

const dropdownOptions = [
  { label: "Option 1", image: require("../images/Frame 35.png") },
  { label: "Option 2", image: require("../images/Frame 35.png") },
  { label: "Option 3", image: require("../images/Frame 35.png") },
];

export default function MobileData() {
  const navigation = useNavigation();

  const [activeButton, setActiveButton] = useState("prepaid");
  const [selectedCard, setSelectedCard] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pin, setPin] = useState("");
  const [selectedDropdown, setSelectedDropdown] = useState(dropdownOptions[0]);
  const [isDropdownModalVisible, setIsDropdownModalVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "Daily",
    "Weekly",
    "2-weeks",
    "Monthly",
    "3 Months",
    "4 Months",
    "Yearly",
  ];

  const handleCardSelection = (value) => {
    setSelectedCard(value);
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
    setPin("");
  };

  const isVerifyButtonDisabled = !mobileNumber || !selectedCard;

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

          {/* New Gradient Container with Sliding Cards */}
          <LinearGradient
            colors={["#FFCCCC", "#FF5F6D"]}
            style={styles.gradientContainer}
          >
            <Text style={styles.sectionTitle}>Recommended Data Offers</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[
                { label: "750MB/7Days/50%off", value: "200", oldValue: "250" },
                { label: "750MB/7Days/50%off", value: "300", oldValue: "350" },
              ].map((item, index) => (
                <View key={index} style={styles.packageCard}>
                  <View style={styles.packageInfo}>
                    <Text style={styles.packageLabel}>{item.label}</Text>
                    <View style={styles.packagePriceContainer}>
                      <Text style={styles.packagePrice}>${item.value}</Text>
                      <Text style={styles.packageOldPrice}>
                        ${item.oldValue}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.getButton}>
                    <Text style={styles.getButtonText}>Get</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </LinearGradient>

          {/* Filter and Card Section with Elevation */}
          <View style={styles.filterCardsContainer}>
            {/* Filter Options */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {filters.map((filter, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.filterButton,
                    activeFilter === filter && styles.activeFilterButton,
                  ]}
                  onPress={() => setActiveFilter(filter)}
                >
                  <Text
                    style={[
                      styles.filterText,
                      activeFilter === filter && styles.activeFilterText,
                    ]}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Card Packages */}
            <View style={styles.cardsContainer}>
              {[
                { gb: "750MB", days: "7 Days", price: "200" },
                { gb: "1GB", days: "1 Day", price: "100" },
                { gb: "2GB", days: "7 Days", price: "300" },
                { gb: "5GB", days: "30 Days", price: "1000" },
              ].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.card,
                    selectedCard === item.price && styles.activeCard,
                  ]}
                  onPress={() => handleCardSelection(item.price)}
                >
                  <Text
                    style={[
                      styles.cardTextGb,
                      selectedCard === item.price && styles.activeCardText,
                    ]}
                  >
                    {item.gb}
                  </Text>
                  <Text
                    style={[
                      styles.cardText,
                      selectedCard === item.price && styles.activeCardText,
                    ]}
                  >
                    {item.days}
                  </Text>
                  <Text
                    style={[
                      styles.cardText,
                      selectedCard === item.price && styles.activeCardText,
                    ]}
                  >
                    ${item.price}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Verify Button */}
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
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
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
    zIndex: 1,
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
    position: "relative",
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
  gradientContainer: {
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  packageCard: {
    width: 220,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  packageInfo: {
    flex: 1,
  },
  packageLabel: {
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
    fontWeight: "bold",
  },
  packagePriceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  packagePrice: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  packageOldPrice: {
    fontSize: 14,
    color: "#aaa",
    textDecorationLine: "line-through",
  },
  getButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "red",
    borderRadius: 15,
  },
  getButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  filterCardsContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 15,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginBottom: 20,
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
    padding: 20,
    borderRadius: 15,
    backgroundColor: "#fff",
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
  cardTextGb: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
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
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginBottom: 20,
  },
  activeFilterButton: {
    borderBottomWidth: 2,
    borderBottomColor: "red",
  },
  filterText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  activeFilterText: {
    color: "red",
    fontWeight: "bold",
  },
});
