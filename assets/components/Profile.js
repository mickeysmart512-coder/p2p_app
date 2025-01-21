// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   ScrollView,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// export default function Profile() {
//   const navigation = useNavigation();

//   return (
//     <ScrollView
//       contentContainerStyle={styles.container}
//       showsVerticalScrollIndicator={false} // Optional: Hide vertical scroll indicator
//     >
//       {/* Profile Image */}
//       <View style={styles.imageContainer}>
//         {/* Dashed Circle Background */}
//         <View style={styles.dashedCircle}>
//           <View style={styles.dashedCircle2}>
//             {/* Profile Image */}
//             <Image
//               source={require("../images/person-6.jpg")}
//               style={styles.profileImage}
//             />
//             {/* Colored Circles Overlay */}
//             {Array.from({ length: 10 }).map((_, index) => {
//               // Calculate angle for even distribution
//               const angle = (index / 10) * (2 * Math.PI);
//               const radius = 140;
//               const circleSize = Math.random() * 10 + 5;

//               return (
//                 <View
//                   key={index}
//                   style={[
//                     styles.circleOverlay,
//                     {
//                       width: circleSize,
//                       height: circleSize,
//                       backgroundColor: getRandomColor(),
//                       // Calculate position based on angle and radius
//                       top: 128 + radius * Math.sin(angle) - circleSize / 2,
//                       left: 128 + radius * Math.cos(angle) - circleSize / 2,
//                     },
//                   ]}
//                 />
//               );
//             })}
//           </View>
//         </View>
//       </View>

//       {/* User Info */}
//       <View style={styles.userInfo}>
//         <Text style={styles.profileName}>John Doe</Text>
//         <View style={styles.accountInfo}>
//           <Text style={styles.profileDetails}>123456789</Text>
//           <Text style={styles.profileDetails}>Example Bank</Text>
//         </View>
//       </View>

//       {/* Action Buttons */}
//       <View style={styles.actionButtons}>
//         <TouchableOpacity
//           style={[styles.actionButton, styles.buttonLeft]}
//           onPress={() => navigation.navigate("")}
//         >
//           <Text style={styles.buttonText}>Message</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.actionButton, styles.buttonRight]}>
//           <Text style={styles.buttonText}>Send Money</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Recent Transactions */}
//       <Text style={styles.sectionHeading}>Recent Transactions</Text>
//       <View style={styles.transactionContainer}>
//         {[1, 2, 3].map((item, index) => (
//           <View key={index} style={styles.transactionRow}>
//             <View style={styles.transactionDateContainer}>
//               <Text style={styles.transactionMonth}>October</Text>
//               <Text style={styles.transactionDate}>25/10/2019</Text>
//             </View>
//             <View style={styles.transactionDetails}>
//               <Text style={styles.transactionTitle}>To:</Text>
//               <Text style={styles.transactionRecipient}>Recipient Name</Text>
//               <Text style={styles.transactionTitle}>Amount:</Text>
//               <Text style={styles.transactionAmount}>$100.00</Text>
//             </View>
//             <View style={styles.transactionStatus}>
//               <Text style={styles.transactionTitle}>Status:</Text>
//               <Text style={styles.transactionAmount}>Completed</Text>
//             </View>
//           </View>
//         ))}
//       </View>
//     </ScrollView>
//   );
// }

// const getRandomColor = () => {
//   const colors = ["#FF6347", "#FFD700", "#ADFF2F", "#00FA9A", "#1E90FF"];
//   return colors[Math.floor(Math.random() * colors.length)];
// };















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

export default function Profile() {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Retrieve user details from navigation params
  const user = route.params?.user || {};

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
        <Text style={styles.profileName}>{user.username || "N/A"}</Text>
        <View style={styles.accountInfo}>
          <Text style={styles.profileDetails}>
            {user.mobile || "No Account Info"}
          </Text>
          
          <Text style={styles.profileDetails}>
            {user.email || "No Bank Info"}
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

      {/* Recent Transactions */}
      <Text style={styles.sectionHeading}>Recent Transactions</Text>
      <View style={styles.transactionContainer}>
        {(user.transactions || []).map((transaction, index) => (
          <View key={index} style={styles.transactionRow}>
            <View style={styles.transactionDateContainer}>
              <Text style={styles.transactionMonth}>{transaction.month}</Text>
              <Text style={styles.transactionDate}>
                {transaction.date || "N/A"}
              </Text>
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>To:</Text>
              <Text style={styles.transactionRecipient}>
                {transaction.recipient || "N/A"}
              </Text>
              <Text style={styles.transactionTitle}>Amount:</Text>
              <Text style={styles.transactionAmount}>
                ${transaction.amount || "0.00"}
              </Text>
            </View>
            <View style={styles.transactionStatus}>
              <Text style={styles.transactionTitle}>Status:</Text>
              <Text style={styles.transactionAmount}>
                {transaction.status || "Pending"}
              </Text>
            </View>
          </View>
        ))}
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
  },
  transactionContainer: {
    padding: 10,
  },
  transactionRow: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    overflow: "hidden", // Optional: Prevents content from overflowing
  },
  transactionDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  transactionMonth: { fontSize: 20, fontWeight: "bold", color: "#333" },
  transactionDate: { fontSize: 16, fontWeight: "bold", color: "#777" },
  transactionDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  transactionStatus: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 30,
  },
  transactionTitle: { fontSize: 16, fontWeight: "bold", color: "#777" },
  transactionRecipient: { fontSize: 16, color: "red", fontWeight: "bold" },
  transactionAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
});
