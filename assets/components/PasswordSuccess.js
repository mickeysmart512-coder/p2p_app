import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PasswordSuccess() {
  const navigation = useNavigation();

  const handleOkPress = () => {
    navigation.navigate("Main App"); // Replace with your desired page name
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../images/Illustration 1.png")} // Replace with your image path
        style={styles.image}
      />
      <Text style={styles.heading}>Change password successfully!</Text>
      <Text style={styles.text}>
        You have successfully change password. Please use the new password when
        Sign in.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleOkPress}>
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
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
  image: {
    width: "100%",
    height: 300,
    marginBottom: 20,
    resizeMode: "contain",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
