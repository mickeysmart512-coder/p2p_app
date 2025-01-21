import React, { useState, useCallback } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function Inbox() {
  const [activeFooterItem, setActiveFooterItem] = useState("Chat");
  const navigation = useNavigation();
  const MAX_MESSAGE_LENGTH = 20;

  const handleFooterItemPress = (item) => {
    setActiveFooterItem(item);
    navigation.navigate(item);
  };

  useFocusEffect(
    useCallback(() => {
      setActiveFooterItem("Chat");
    }, [])
  );

  // Sample data for each message
  const messages = [
    {
      id: 1,
      name: "User Name",
      isActive: true,
      unreadCount: 2,
      senderMessages: [
        { text: "Hello!", time: "10:00 AM" },
        { text: "How are you?", time: "10:01 AM" },
      ],
      receiverMessages: [
        { text: "Hi there!", time: "10:02 AM" },
        { text: "I'm good, thanks!", time: "10:03 AM" },
      ],
    },
    {
      id: 2,
      name: "Another User",
      isActive: false,
      unreadCount: 0,
      senderMessages: [],
      receiverMessages: [
        { text: "Hey!", time: "10:02 AM" },
        { text: "What’s up?", time: "10:03 AM" },
      ],
    },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.formWrapper}>
        {messages.map((msg) => {
          const lastSenderMessage =
            msg.senderMessages[msg.senderMessages.length - 1]?.text || "";
          const lastReceiverMessage =
            msg.receiverMessages[msg.receiverMessages.length - 1]?.text || "";
          const lastMessage = lastSenderMessage || lastReceiverMessage;

          return (
            <TouchableOpacity
              key={msg.id}
              style={styles.messageRow}
              onPress={() =>
                navigation.navigate("Chat Detail", { message: msg })
              }
            >
              <View style={styles.profileContainer}>
                <Image
                  source={require("../images/person-3.jpg")}
                  style={styles.profileImage}
                />
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: msg.isActive ? "green" : "gray" },
                  ]}
                />
              </View>
              <View style={styles.messageContent}>
                <Text style={styles.fullName}>{msg.name}</Text>
                <Text style={styles.lastMessage}>
                  {lastMessage.length > MAX_MESSAGE_LENGTH
                    ? `${lastMessage.substring(0, MAX_MESSAGE_LENGTH)}...`
                    : lastMessage}
                </Text>
              </View>
              <View style={styles.messageInfo}>
                <Text style={styles.messageTime}>
                  {msg.receiverMessages.length > 0
                    ? msg.receiverMessages[msg.receiverMessages.length - 1].time
                    : ""}
                </Text>
                {msg.unreadCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{msg.unreadCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Footer Section */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.footerItem,
            activeFooterItem === "Home" && styles.activeFooterItem,
          ]}
          onPress={() => handleFooterItemPress("Main App")}
        >
          <Ionicons name="home" size={28} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.footerItem,
            activeFooterItem === "Chat" && styles.activeFooterItem,
          ]}
          onPress={() => handleFooterItemPress("Inbox")}
        >
          <View style={styles.messageIconContainer}>
            <Ionicons name="chatbubbles" size={20} color="white" />
            <View style={styles.badge2}>
              <Text style={styles.badgeText2}>3</Text>
            </View>
          </View>
          <Text style={[styles.footerText, { color: "white" }]}>Inbox</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.footerItem,
            activeFooterItem === "Settings" && styles.activeFooterItem,
          ]}
          onPress={() => handleFooterItemPress("Settings Page")}
        >
          <Ionicons name="settings" size={28} color="grey" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formWrapper: {
    flexGrow: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
    paddingTop: 10,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  profileContainer: {
    position: "relative",
    marginRight: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  statusDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  messageContent: {
    flex: 1,
  },
  fullName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  lastMessage: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  messageInfo: {
    alignItems: "flex-end",
  },
  messageTime: {
    fontSize: 12,
    color: "#999",
  },
  badge: {
    marginTop: 4,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
  badge2: {
    position: "absolute",
    right: -8,
    top: -5,
    backgroundColor: "white",
    borderRadius: 10,
    width: 15,
    height: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText2: {
    fontSize: 12,
    color: "red",
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    backgroundColor: "#fff",
    width: "100%",
    paddingHorizontal: 50,
    position: "absolute",
    bottom: 0,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  footerText: {
    fontSize: 14,
    color: "grey",
    marginLeft: 5,
  },
  activeFooterItem: {
    backgroundColor: "red",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 25,
  },
});
