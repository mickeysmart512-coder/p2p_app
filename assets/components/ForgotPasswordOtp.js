import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ForgotPasswordOtp({ route }) {
  const { mobileNumber, generatedOtp } = route.params;
  const navigation = useNavigation();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  // Validate the OTP
  const handleNext = () => {
    if (otp === generatedOtp.toString()) {
      setError("");
      navigation.navigate("Change Password"); // Navigate to success page
    } else {
      setError("Invalid OTP");
    }
  };

  // Enable the button when OTP is filled
  useEffect(() => {
    setIsButtonActive(otp.length > 0);
  }, [otp]);

  const handleResendOtp = () => {
    alert(`OTP Resent: ${generatedOtp}`); // In real app, resend logic would be implemented
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Enter the OTP sent to {mobileNumber}</Text>

        <View style={styles.otpContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            keyboardType="numeric"
            maxLength={6}
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

        <Text style={styles.infoText}>
          We texted you a code to verify your phone number{" "}
          <Text style={styles.mobileNumberText}>{mobileNumber}</Text>.
        </Text>

        <Text style={styles.infoText}>
          This code will expire 10 minutes after this message. If you don't get
          a message.
        </Text>

        <TouchableOpacity
          style={[styles.button, !isButtonActive && styles.buttonInactive]}
          onPress={handleNext}
          disabled={!isButtonActive}
        >
          <Text style={styles.buttonText}>Change password</Text>
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
  mobileNumberText: {
    color: "red",
    fontWeight: "bold",
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
  otpContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
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
