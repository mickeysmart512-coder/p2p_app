// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// export default function CollectCash() {
//   const [inputValue, setInputValue] = useState("");
//   const navigation = useNavigation();

//   const handleSubmit = () => {
//     if (inputValue) {
//       navigation.navigate("Collect Cash Success");
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <ScrollView contentContainerStyle={styles.formWrapper}>
//         {/* Top Image */}
//         <Image
//         source={require("../images/Illustration 2.png")}
//         style={styles.topImage}
//       />

//         {/* Input Field */}
//         <TextInput
//           style={styles.input}
//           placeholder="Enter amount"
//           value={inputValue}
//           onChangeText={setInputValue}
//           keyboardType="numeric"
//         />

//         {/* Submit Button */}
//         <TouchableOpacity
//           style={[
//             styles.submitButton,
//             { backgroundColor: inputValue ? "red" : "#ccc" },
//           ]}
//           onPress={handleSubmit}
//           disabled={!inputValue}
//         >
//           <Text style={styles.buttonText}>Confirm</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   formWrapper: {
//     padding: 16,
//     alignItems: "center",
//   },
//   topImage: {
//     width: "100%",
//     height: 200,
//     marginBottom: 40,
//     marginTop: 40,
//     borderRadius: 8,
//   },
//   input: {
//     width: "100%",
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 15,
//     marginBottom: 20,
//     backgroundColor: "#fff",
//   },
//   submitButton: {
//     width: "100%",
//     padding: 15,
//     borderRadius: 15,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });



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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function CollectCash() {
  const navigation = useNavigation();

  // State management
  const [accountNo, setAccountNo] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [saveBeneficiary, setSaveBeneficiary] = useState(false);
  const [isBankModalVisible, setBankModalVisible] = useState(false);
  const [isBeneficiaryModalVisible, setBeneficiaryModalVisible] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [name, setName] = useState("");

  const isFormValid = accountNo && selectedBank && amount && remark;

  const images = {
    "person-1": require("../images/person-1.jpg"),
    "person-3": require("../images/person-3.jpg"),
    "person-6": require("../images/person-6.jpg"),
  };

  // Sample beneficiaries
  const beneficiaries = [
    {
      id: 1,
      name: "John Doe",
      accountNo: "1234567890",
      bank: "Bank A",
      profileImage: "person-1",
    },
    {
      id: 2,
      name: "Jane Smith",
      accountNo: "0987654321",
      bank: "Bank B",
      profileImage: "person-6",
    },
    {
      id: 3,
      name: "Alice Brown",
      accountNo: "1122334455",
      bank: "Bank C",
      profileImage: "person-3",
    },
  ];

  // Sample banks
  const banks = [
    { id: 1, name: "Bank A" },
    { id: 2, name: "Bank B" },
    { id: 3, name: "Bank C" },
  ];

  const handleCardSelect = (beneficiary) => {
    setSelectedCard(beneficiary.id);
    setName(beneficiary.name);
    setAccountNo(beneficiary.accountNo);
    setSelectedBank(beneficiary.bank);
  };

  const handleBankSelect = (bank) => {
    setSelectedBank(bank.name);
    setBankModalVisible(false);
  };

  const handleNext = () => {
    if (isFormValid) {
      navigation.navigate("Confirm", {
        name,
        accountNo,
        selectedBank,
        amount,
        remark,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.headerRow}>
          <Text style={styles.smallText}>Choose Beneficiary</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Beneficiary")}>
            <Text style={styles.viewAllButton}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardRow}>
          {beneficiaries.slice(0, 3).map((beneficiary) => (
            <TouchableOpacity
              key={beneficiary.id}
              style={[
                styles.card,
                selectedCard === beneficiary.id && styles.activeCard,
              ]}
              onPress={() => handleCardSelect(beneficiary)}
            >
              <Image
                source={images[beneficiary.profileImage]}
                style={styles.profileImage}
              />
              <Text style={styles.cardName}>{beneficiary.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Account No."
            value={accountNo}
            onChangeText={setAccountNo}
          />
          <TouchableOpacity
            style={styles.input}
            onPress={() => setBankModalVisible(true)}
          >
            <Text style={styles.inputText}>
              {selectedBank || "Select Bank"}
            </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <TextInput
            style={styles.input}
            placeholder="Remark"
            value={remark}
            onChangeText={setRemark}
          />
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              onPress={() => setSaveBeneficiary(!saveBeneficiary)}
            >
              <Ionicons
                name={saveBeneficiary ? "checkbox" : "square-outline"}
                size={28}
                color="red"
              />
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>
              Save to Directory of Beneficiaries
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.nextButton,
              isFormValid ? styles.buttonActive : styles.buttonDisabled,
            ]}
            onPress={handleNext}
            disabled={!isFormValid}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>

        {/* Beneficiary Modal */}
        <Modal
          visible={isBeneficiaryModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalBackground}>
            <TouchableOpacity onPress={() => setBeneficiaryModalVisible(false)}>
              <Ionicons
                name="close"
                size={28}
                color="red"
                style={{
                  alignSelf: "flex-end",
                  marginRight: 20,
                  marginTop: 20,
                  marginBottom: 20,
                }}
              />
            </TouchableOpacity>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Select a Beneficiary</Text>
              {beneficiaries.map((beneficiary) => (
                <TouchableOpacity
                  key={beneficiary.id}
                  onPress={() => {
                    handleCardSelect(beneficiary);
                    setBeneficiaryModalVisible(false);
                  }}
                >
                  <View style={styles.modalItemContainer}>
                    <Text style={styles.modalItemText}>{beneficiary.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

        {/* Bank Modal */}
        <Modal
          visible={isBankModalVisible}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalBackground}>
            <TouchableOpacity onPress={() => setBankModalVisible(false)}>
              <Ionicons
                name="close"
                size={28}
                color="red"
                style={{
                  alignSelf: "flex-end",
                  marginRight: 20,
                  marginTop: 20,
                  marginBottom: 20,
                }}
              />
            </TouchableOpacity>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Select a Bank</Text>
              {banks.map((bank) => (
                <TouchableOpacity
                  key={bank.id}
                  onPress={() => {
                    handleBankSelect(bank);
                  }}
                >
                  <View style={styles.modalItemContainer}>
                    <Text style={styles.modalItemText}>{bank.name}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  scrollView: { padding: 20 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  smallText: { fontSize: 14, color: "gray" },
  viewAllButton: { fontSize: 15, color: "red", fontWeight: "bold" },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  card: {
    alignItems: "center",
    padding: 20,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 1,
  },
  activeCard: { backgroundColor: "red" },
  profileImage: { width: 80, height: 80, borderRadius: 50, marginBottom: 5 },
  cardName: { fontSize: 16, color: "black", fontWeight: "bold" },
  formContainer: {
    marginBottom: 20,
    marginTop: 20,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 15,
    paddingVertical: 30,
    elevation: 1,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    marginBottom: 20,
  },
  inputText: { color: "black" },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 15,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "gray",
    marginLeft: 10,
    fontWeight: "bold",
  },
  nextButton: {
    padding: 15,
    borderRadius: 15,
    paddingVertical: 18,
    marginTop: 20,
  },
  buttonActive: { backgroundColor: "red" },
  buttonDisabled: { backgroundColor: "gray" },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "white",
    height: "90%",
    width: "95%",
    padding: 30,
    borderRadius: 15,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  modalItemContainer: {
    backgroundColor: "white",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalItemText: { fontSize: 16, fontWeight: "bold", color: "black" },
});
