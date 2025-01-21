
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";


export default function OfferProfile() {
    const route = useRoute();
    const navigation = useNavigation();
  
    const { offer } = route.params;
  
  

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Image */}
      <View style={styles.imageContainer}>
        <View style={styles.dashedCircle}>
          <View style={styles.dashedCircle2}>
            <Image
              source={{
                uri: user.profileImage || "https://via.placeholder.com/150",
              }}
              style={styles.profileImage}
            />
            {Array.from({ length: 10 }).map((_, index) => {
              const angle = (index / 10) * (2 * Math.PI);
              const radius = 140;
              const circleSize = Math.random() * 10 + 5;

              return (
                <View
                  key={index}
                  style={[
                    styles.circleOverlay,
                    {
                      width: circleSize,
                      height: circleSize,
                      backgroundColor: getRandomColor(),
                      top: 128 + radius * Math.sin(angle) - circleSize / 2,
                      left: 128 + radius * Math.cos(angle) - circleSize / 2,
                    },
                  ]}
                />
              );
            })}
          </View>
        </View>
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <Text style={styles.profileName}>{offer.username}</Text>
        
        <View style={styles.accountInfo}>
          <Text style={styles.profileDetails}>
            {user.mobile || "No Account Info"}
          </Text>
          
          <Text style={styles.profileDetails}>
          {offer.email || "No Email Info"}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.buttonLeft]}
          onPress={() => navigation.navigate("Chat Detail", { user, chatId: user.chatId || "defaultChatId" })
  }
        >
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.buttonRight]}
          onPress={() => navigation.navigate("SendMoneyScreen", { user })}
        >
          <Text style={styles.buttonText}>Send Money</Text>
        </TouchableOpacity>
      </View>
       </ScrollView>
  );
}
    const getRandomColor = () => {
        const colors = ["#FF6347", "#FFD700", "#ADFF2F", "#00FA9A", "#1E90FF"];
        return colors[Math.floor(Math.random() * colors.length)];
      };
      
 const styles = StyleSheet.create({
        container: {
          flexGrow: 1,
          backgroundColor: "#f9f9f9",
          padding: 20,
        },
        imageContainer: {
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 20,
          position: "relative",
          width: 240,
          height: 240,
          alignSelf: "center",
        },
        dashedCircle: {
          width: 200,
          height: 200,
          borderRadius: 100,
          borderWidth: 2,
          borderStyle: "dashed",
          borderColor: "#ccc",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        },
        dashedCircle2: {
          width: 260,
          height: 260,
          borderRadius: 130,
          borderWidth: 2,
          borderStyle: "dashed",
          borderColor: "#aaa",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        },
        profileImage: {
          width: 150,
          height: 150,
          borderRadius: 75,
        },
        circleOverlay: {
          position: "absolute",
          borderRadius: 50,
        },
        userInfo: {
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 10,
        },
        profileName: { fontSize: 22, fontWeight: "bold", color: "#333" },
        accountInfo: {
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
        },
        profileDetails: { fontSize: 16, color: "#666", marginHorizontal: 5 },
        actionButtons: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 20,
        },
        actionButton: {
          flex: 1,
          paddingVertical: 15,
          marginHorizontal: 5,
          borderRadius: 12,
        },
        buttonLeft: {
          backgroundColor: "red",
        },
        buttonRight: {
          backgroundColor: "green",
        },
        buttonText: { color: "white", fontWeight: "bold", textAlign: "center" },
        sectionHeading: {
          fontSize: 14,
          fontWeight: "bold",
          color: "#777",
          marginBottom: 10,
        },});
