import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function ChangePassword() {
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [isNewPasswordSecure, setIsNewPasswordSecure] = useState(true); // Toggle new password visibility
  const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true); // Toggle confirm password visibility
  const [error, setError] = useState("");

  const handleChangePassword = () => {
    if (newPassword === confirmPassword && newPassword.length >= 6) {
      setError("");
      navigation.navigate("Password Success"); // Navigate to success page
    } else {
      setError("Passwords do not match or are too short (min 6 characters)");
    }
  };

  // Enable the button if both fields have content and passwords match
  React.useEffect(() => {
    setIsButtonActive(newPassword.length >= 6 && confirmPassword.length >= 6);
  }, [newPassword, confirmPassword]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Change Password</Text>

        <View style={styles.inputContainer}>
        <Text style={styles.tinyLabel}>Type your new password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter New Password"
            secureTextEntry={isNewPasswordSecure} // Toggle secure text
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
          />
          <TouchableOpacity
            onPress={() => setIsNewPasswordSecure(!isNewPasswordSecure)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={isNewPasswordSecure ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
        <Text style={styles.tinyLabel}>Confirmpassword</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            secureTextEntry={isConfirmPasswordSecure} // Toggle secure text
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <TouchableOpacity
            onPress={() => setIsConfirmPasswordSecure(!isConfirmPasswordSecure)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={isConfirmPasswordSecure ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, !isButtonActive && styles.buttonInactive]}
          onPress={handleChangePassword}
          disabled={!isButtonActive}
        >
          <Text style={styles.buttonText}>Change Password</Text>
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  tinyLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
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
    top: 35,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 15,
    textAlign: "center",
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
