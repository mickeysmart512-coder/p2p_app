import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Importing icon library

export default function SecureYourTransactions() {
  const navigation = useNavigation();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isSecure, setIsSecure] = useState(true); // State to control visibility of PIN

  // Validate the PIN
  const handleNext = () => {
    if (pin.length >= 4 && pin.length <= 6) {
      setError("");
      navigation.navigate("Success Page");
    } else {
      setError("Invalid PIN Format");
    }
  };

  useEffect(() => {
    setIsButtonActive(pin.length >= 4 && pin.length <= 6);
  }, [pin]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create a 4-6 digit transaction PIN</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter PIN"
            keyboardType="numeric"
            secureTextEntry={isSecure} // Show or hide PIN based on isSecure
            maxLength={6}
            value={pin}
            onChangeText={(text) => setPin(text)}
          />
          <TouchableOpacity
            onPress={() => setIsSecure(!isSecure)} // Toggle secureTextEntry state
            style={styles.eyeIcon}
          >
            <Ionicons
              name={isSecure ? "eye-off" : "eye"} // Show different icon based on isSecure state
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  inputContainer: {
    position: "relative",
    width: "100%",
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
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 15,
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
