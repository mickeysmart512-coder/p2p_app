import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function VerifyPhoneNumber({ route }) {
  const { mobileNumber, generatedOtp } = route.params; // Extract mobile number and OTP from route params
  const navigation = useNavigation();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  // Validate the OTP
  const handleNext = () => {
    if (otp === generatedOtp.toString()) {
      setError("");
      navigation.navigate("Secure Your Transactions");
    } else {
      setError("Invalid OTP");
    }
  };

  // Enable the button when OTP is filled
  useEffect(() => {
    setIsButtonActive(otp.length > 0);
  }, [otp]);

  const handleResendOtp = () => {
    alert(`OTP Resent: ${generatedOtp}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Type a code</Text>

        <View style={styles.otpContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            keyboardType="numeric"
            value={otp}
            onChangeText={(text) => setOtp(text)}
          />
          <TouchableOpacity
            onPress={handleResendOtp}
            style={styles.resendButton}
          >
            <Text style={styles.resendText}>Resend</Text>
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Text style={styles.subTitle}>
          We texted you a code to verify your phone number{" "}
          <Text style={styles.mobileNumberText}>{mobileNumber}</Text>.
        </Text>

        <Text style={styles.subTitle}>
          This code will expire in 10 minutes. After this if you don't receive
          the OTP, please click Resend.
        </Text>

        <TouchableOpacity
          style={[styles.button, !isButtonActive && styles.buttonInactive]}
          onPress={handleNext}
          disabled={!isButtonActive}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#777",
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    lineHeight: 24,
  },
  otpContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    height: 50,
  },
  mobileNumberText: {
    color: "red",
    fontWeight: "bold",
  },
  resendButton: {
    marginLeft: 10,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: "center",
  },
  resendText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
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
