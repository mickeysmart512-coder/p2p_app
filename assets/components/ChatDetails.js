// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";

// export default function ChatDetail({ route }) {
//   const navigation = useNavigation();
//   const { message } = route.params;

//   return (
//     <View style={styles.container}>
//       {/* Header Section */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
//           <Ionicons name="arrow-back" size={24} color="#333" />
//         </TouchableOpacity>
//         <View style={styles.imageContainer}>
//           <Image
//             source={require("../images/person-1.jpg")}
//             style={styles.profileImage}
//           />
//           <View
//             style={[
//               styles.statusDot,
//               { backgroundColor: message.isActive ? "green" : "gray" },
//             ]}
//           />
//         </View>
//         <View style={styles.headerInfo}>
//           <Text style={styles.fullName}>{message.name}</Text>
//           <Text style={styles.statusText}>
//             {message.isActive ? "Active now" : "Last seen recently"}
//           </Text>
//         </View>
//         <TouchableOpacity style={styles.callIcon}>
//           <Ionicons name="call" size={24} color="#34A853" />
//         </TouchableOpacity>
//       </View>

//       {/* Date Indicator */}
//       <View style={styles.dateContainer}>
//         <Text style={styles.dateText}>Today</Text>
//       </View>

//       <View style={styles.chatArea}>
//         {/* Sender Messages */}
//         {message.senderMessages.map((msg, index) => (
//           <View key={index} style={styles.messageRowSender}>
//             <View style={styles.senderBubble}>
//               <Text style={styles.messageText}>{msg.text}</Text>
//             </View>
//             <Text style={styles.messageTime}>{msg.time}</Text>
//           </View>
//         ))}

//         {/* Receiver Messages */}
//         {message.receiverMessages.map((msg, index) => (
//           <View>
//             <View key={index} style={styles.messageRowReceiver}>
//               <Image
//                 source={require("../images/person-1.jpg")}
//                 style={styles.messageProfileImage}
//               />
//               <View style={styles.receiverBubble}>
//                 <Text style={styles.messageText}>{msg.text}</Text>
//               </View>
//               <Text style={styles.recieverMessageTime}>{msg.time}</Text>
//             </View>
//           </View>
//         ))}
//       </View>

//       {/* Input Section */}
//       <View style={styles.inputContainer}>
//         <TextInput style={styles.input} placeholder="Type a message..." />
//         <TouchableOpacity style={styles.sendIcon}>
//           <Ionicons name="send" size={24} color="#007AFF" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F2F2F7",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     paddingTop: 30,
//     backgroundColor: "#fff",
//     borderBottomWidth: 1,
//     borderBottomColor: "#E0E0E0",
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     position: "relative",
//   },
//   headerInfo: {
//     flex: 1,
//     marginLeft: 15,
//   },
//   statusDot: {
//     position: "absolute",
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     borderWidth: 2,
//     borderColor: "#fff",
//     bottom: 2, // Adjusts vertical positioning near the bottom
//     right: 2, // Adjusts horizontal positioning near the right side
//   },
//   fullName: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   statusText: {
//     fontSize: 14,
//     color: "#888",
//   },
//   callIcon: {
//     padding: 10,
//   },
//   dateContainer: {
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   dateText: {
//     backgroundColor: "#E5E5EA",
//     borderRadius: 15,
//     paddingVertical: 4,
//     paddingHorizontal: 12,
//     fontSize: 12,
//     color: "#333",
//   },
//   chatArea: {
//     flex: 1,
//     paddingHorizontal: 15,
//     paddingBottom: 10,
//   },
//   messageRowSender: {
//     alignSelf: "flex-end",
//     marginBottom: 15,
//     marginLeft: 30,
//   },
//   senderBubble: {
//     backgroundColor: "#FF3B30",
//     borderTopRightRadius: 0,
//     borderTopLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     padding: 12,
//     maxWidth: "75%",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//   },
//   messageRowReceiver: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//     marginBottom: 25,
//     marginRight: 30,
//   },
//   messageProfileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   receiverBubble: {
//     backgroundColor: "#FFFFFF",
//     borderColor: "#E0E0E0",
//     borderWidth: 1,
//     borderTopLeftRadius: 0,
//     borderTopRightRadius: 20,
//     borderBottomRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     padding: 12,
//     maxWidth: "75%",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//   },
//   messageText: {
//     fontSize: 16,
//     color: "#333",
//   },
//   messageTime: {
//     fontSize: 12,
//     color: "#888",
//     marginTop: 5,
//     alignSelf: "flex-end",
//   },
//   recieverMessageTime: {
//     fontSize: 12,
//     color: "#888",
//     marginTop: 5,
//     alignSelf: "flex-start",
//     marginLeft: 10,
//     position: "absolute", 
//     bottom: -16,
//     left: 50,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     backgroundColor: "#fff",
//     borderTopWidth: 1,
//     borderTopColor: "#E0E0E0",
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     paddingHorizontal: 15,
//     fontSize: 16,
//     backgroundColor: "#F2F2F7",
//     borderRadius: 20,
//   },
//   sendIcon: {
//     marginLeft: 10,
//   },
//   backIcon: {
//     marginLeft: 5,
//     marginRight: 20,
//   },
// });













import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
} from "firebase/firestore";

export default function ChatDetail({ route }) {
  const navigation = useNavigation();
  const { message } = route.params || {}; // Ensure route.params exists
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserData, setCurrentUserData] = useState({});
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // Check if message is undefined or null
  if (!message) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No chat data available.
        </Text>
      </View>
    );
  }

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userId = FIREBASE_AUTH.currentUser?.uid;

        if (userId) {
          setCurrentUser(userId);
          const userDoc = await getDoc(doc(FIREBASE_DB, "users", userId));
          if (userDoc.exists()) {
            setCurrentUserData(userDoc.data());
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (message.chatId) {
      const messageQuery = query(
        collection(FIREBASE_DB, "chats", message.chatId, "messages"),
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(messageQuery, (querySnapshot) => {
        const fetchedMessages = querySnapshot.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
      });

      return () => unsubscribe();
    }
  }, [message.chatId]);

  const handleSend = async () => {
    if (text.trim() === "") return;

    try {
      await addDoc(collection(FIREBASE_DB, "chats", message.chatId, "messages"), {
        text,
        createdAt: new Date(), // Using JS Date for createdAt
        senderId: currentUser,
      });
      setText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const renderMessage = ({ item }) => {
    const isSender = item.senderId === currentUser;
    const time = item.createdAt
      ? new Date(item.createdAt.seconds * 1000).toLocaleTimeString()
      : "";

    return (
      <View
        style={isSender ? styles.messageRowSender : styles.messageRowReceiver}
      >
        {!isSender && (
          <Image
            source={
              message.profileImage
                ? { uri: message.profileImage }
                : require("../images/person-1.jpg")
            }
            style={styles.messageProfileImage}
          />
        )}
        <View style={isSender ? styles.senderBubble : styles.receiverBubble}>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
        <Text
          style={isSender ? styles.messageTime : styles.recieverMessageTime}
        >
          {time}
        </Text>
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backIcon}
      >
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image
          source={
            message.profileImage
              ? { uri: message.profileImage }
              : require("../images/person-1.jpg")
          }
          style={styles.profileImage}
        />
        <View
          style={[
            styles.statusDot,
            { backgroundColor: message.isActive ? "green" : "gray" },
          ]}
        />
      </View>
      <View style={styles.headerInfo}>
        <Text style={styles.fullName}>{message.name}</Text>
        <Text style={styles.statusText}>
          {message.isActive ? "Active now" : "Last seen recently"}
        </Text>
      </View>
      <TouchableOpacity style={styles.callIcon}>
        <Ionicons name="call" size={24} color="#34A853" />
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={90}
    >
      {renderHeader()}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item._id}
        inverted
        style={styles.chatArea}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.sendIcon} onPress={handleSend}>
          <Ionicons name="send" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingTop: 30,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: "relative",
  },
  headerInfo: {
    flex: 1,
    marginLeft: 15,
  },
  statusDot: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#fff",
    bottom: 2,
    right: 2,
  },
  fullName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statusText: {
    fontSize: 14,
    color: "#888",
  },
  chatArea: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  messageRowSender: {
    alignSelf: "flex-end",
    marginBottom: 10,
    maxWidth: "70%",
    flexDirection: "row",
    alignItems: "center",
  },
  messageRowReceiver: {
    alignSelf: "flex-start",
    marginBottom: 10,
    maxWidth: "70%",
    flexDirection: "row",
    alignItems: "center",
  },
  senderBubble: {
    backgroundColor: "#DCF8C6",
    borderRadius: 15,
    padding: 10,
  },
  receiverBubble: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
  recieverMessageTime: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#F2F2F7",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  sendIcon: {
    marginLeft: 10,
  },
}); 







