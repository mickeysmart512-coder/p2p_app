import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ForgotPassword() {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  // Validate the phone number
  const handleNext = () => {
    const phoneRegex = /^[0-9]{10,11}$/;
    if (phoneRegex.test(phoneNumber)) {
      setError("");
      const generatedOtp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
      alert(`OTP Sent: ${generatedOtp}`); // Replace this with actual OTP sending logic
      navigation.navigate("Forgot Password OTP", {
        mobileNumber: phoneNumber,
        generatedOtp: generatedOtp,
      });
    } else {
      setError("Invalid phone number format. Please enter a 10 or 11-digit number.");
    }
  };

  useEffect(() => {
    setIsButtonActive(phoneNumber.length >= 10 && phoneNumber.length <= 11);
  }, [phoneNumber]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Type your phone number</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Phone Number"
            keyboardType="numeric"
            maxLength={11}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Text style={styles.infoText}>We will send you an OTP to verify your phone number</Text>

        <TouchableOpacity
          style={[styles.button, !isButtonActive && styles.buttonInactive]}
          onPress={handleNext}
          disabled={!isButtonActive}
        >
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ccc",
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    height: 50,
    width: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 15,
  },
  infoText: {
    color: "#666",
    fontSize: 16,
    paddingBottom: 10,
  },
  button: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonInactive: {
    backgroundColor: "#d3d3d3",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
