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

export default function PayTheBIll() {
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
            title: "Electric Bill",
            imageUrl: require("../images/Group 547.png"),
            description: "Pay your electricy bills.",
            route: "Electricity",
          },
          {
            title: "Airtime",
            imageUrl: require("../images/Group 552.png"),
            description: "Buy Airtime for yourself and others.",
            route: "Airtime",
          },
          {
            title: "Mobile Data",
            imageUrl: require("../images/Group 551.png"),
            description: "Buy Mobile Data from your internet service providers.",
            route: "Mobile Data",
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