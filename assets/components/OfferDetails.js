import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function OfferDetails() {
  const route = useRoute();
  const navigation = useNavigation();

  const { offer } = route.params;

  const handleMessageUser = () => {
    // Navigate to chat screen or messaging logic
    navigation.navigate("OfferProfile", { userId: offer.userId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Text style={styles.text}>Username: {offer.username}</Text>
      <Text style={styles.text}>Email: {offer.email}</Text>
      <Text style={styles.text}>Amount Offered: ${offer.amountOffered}</Text>
      <Text style={styles.text}>
        Offer Status: {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
      </Text>

      <Button title="Continue" onPress={handleMessageUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    marginVertical: 4,
  },
});
