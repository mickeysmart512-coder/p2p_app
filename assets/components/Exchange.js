import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Exchange() {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {/** Card layout */}
        {[
          {
            title: "P2P Withdraw Cash",
            imageUrl: require("../images/withdraw image.png"),
            description: "Get the cash you need instantly from nearby agents.",
            route: "P2P Withdraw",
          },
          {
            title: "P2P Deposit Cash",
            imageUrl: require("../images/deposit image.png"),
            description: "Collect cash from users looking to deposit and transfer to them.",
            route: "Collect Cash",
          },
        ].map((card, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(card.route)}
            style={styles.card}
          >
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardDescription}>{card.description}</Text>
            </View>
            <Image source={card.imageUrl} style={styles.cardImage} />
          </TouchableOpacity>
        ))}

        <Text style={styles.agentText}>Agent Functionalities</Text>

        {[
          {
            title: "Offer Cash",
            imageUrl: require("../images/offer image.png"),
            description: "Have cash to spare? Offer it to those in need and get it transferred to your account.",
            route: "Offer Cash"
          },
          {
            title: "Deposit Into Your Account",
            imageUrl: require("../images/collect image.png"),
            description: "Easily deposit your cash with local banks and watch your account grow!",
            route: "Deposit",
            
          },
        ].map((card, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(card.route)}
            style={styles.card}
          >
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardDescription}>{card.description}</Text>
            </View>
            <Image source={card.imageUrl} style={styles.cardImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  cardsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 1,
  },
  cardTextContainer: {
    flex: 2,
    paddingRight: 15,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
  },
  cardDescription: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
    lineHeight: 18,
  },
  agentText: {
    fontSize: 12,
    color: "gray",
    marginBottom: 10,
    alignSelf: "flex-start",
    paddingLeft: 5,
  },
});