import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function TransferSuccess() {
  const navigation = useNavigation();

  const handleOkPress = () => {
    navigation.navigate("Main App");
  };

  const handleViewReceiptPress = () => {
    navigation.navigate("Transaction Details");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../images/Illustration 5.png")}
        style={styles.image}
      />
      <Text style={styles.heading}>Transfer successful!</Text>
      <Text style={styles.text}>
        You have successfully transferred.
        <Text style={styles.redText}> $1,000 </Text>
        to
        <Text style={styles.redText}> Full Name</Text>
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleOkPress}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.doneButton}
        onPress={handleViewReceiptPress}
      >
        <Text style={styles.doneButtonText}>View Receipt</Text>
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
  redText: {
    color: "red",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  doneButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  doneButtonText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});
