import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ConfirmTransfer() {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, accountNo, selectedBank, amount, remark } = route.params;

  const [isPinModalVisible, setPinModalVisible] = useState(false);
  const [pin, setPin] = useState("");
  const isPinValid = pin.length === 6;

  const handleConfirm = () => {
    if (isPinValid) {
      navigation.navigate("Transfer Success");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Confirm Transanction information</Text>
      <Text style={styles.label}>Name:</Text>
      <TextInput style={styles.input} value={name} editable={false} />
      <Text style={styles.label}>Account No:</Text>
      <TextInput style={styles.input} value={accountNo} editable={false} />
      <Text style={styles.label}>Bank:</Text>
      <TextInput style={styles.input} value={selectedBank} editable={false} />
      <Text style={styles.label}>Amount:</Text>
      <TextInput style={styles.input} value={amount} editable={false} />
      <Text style={styles.label}>Remark:</Text>
      <TextInput style={styles.input} value={remark} editable={false} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => setPinModalVisible(true)}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.navigate("Main App")}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isPinModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Enter Transaction PIN or Use Fingerprint
            </Text>
            <TextInput
              style={styles.pinInput}
              placeholder="Enter 6-digit PIN"
              keyboardType="numeric"
              maxLength={6}
              value={pin}
              onChangeText={setPin}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.nextButton,
                  isPinValid ? styles.buttonActive : styles.buttonDisabled,
                ]}
                onPress={handleConfirm}
                disabled={!isPinValid}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setPinModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "gray",
  },
  label: { fontSize: 16, marginBottom: 5, color: "gray", fontWeight: "bold" },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    color: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
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
    fontSize: 18,
    marginBottom: 20,
    color: "gray",
    fontWeight: "bold",
  },
  pinInput: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    width: "100%",
    borderRadius: 15,
    textAlign: "center",
    fontSize: 18,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  nextButton: { padding: 15, borderRadius: 15, flex: 1, marginRight: 10 },
  buttonActive: { backgroundColor: "red" },
  buttonDisabled: { backgroundColor: "gray" },
  cancelButton: {
    padding: 15,
    borderRadius: 15,
    flex: 1,
    marginLeft: 10,
    backgroundColor: "gray",
  },
  cancelButtonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
