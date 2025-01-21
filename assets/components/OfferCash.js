// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// export default function OfferCash() {
//   const [inputValue, setInputValue] = useState("");
//   const navigation = useNavigation();

//   const handleSubmit = () => {
//     if (inputValue) {
//       navigation.navigate("Offer Success");
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <ScrollView contentContainerStyle={styles.formWrapper}>
//         {/* Top Image */}
//         <Image
//         source={require("../images/Illustration 5.png")}
//         style={styles.topImage}
//       />

//         {/* Input Field */}
//         <TextInput
//           style={styles.input}
//           placeholder="Enter amount"
//           value={inputValue}
//           onChangeText={setInputValue}
//           keyboardType="numeric"
//         />

//         {/* Submit Button */}
//         <TouchableOpacity
//           style={[
//             styles.submitButton,
//             { backgroundColor: inputValue ? "red" : "#ccc" },
//           ]}
//           onPress={handleSubmit}
//           disabled={!inputValue}
//         >
//           <Text style={styles.buttonText}>Confirm</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   formWrapper: {
//     padding: 16,
//     alignItems: "center",
//   },
//   topImage: {
//     width: "100%",
//     height: 200,
//     marginBottom: 40,
//     marginTop: 40,
//     borderRadius: 8,
//   },
//   input: {
//     width: "100%",
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 15,
//     marginBottom: 20,
//     backgroundColor: "#fff",
//   },
//   submitButton: {
//     width: "100%",
//     padding: 15,
//     borderRadius: 15,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });





import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_DB, FIREBASE_AUTH } from "../../firebaseConfig";
import { doc, setDoc, deleteDoc, collection, query, where, getDocs, serverTimestamp } from "firebase/firestore";

export default function OfferCash() {
  const [inputValue, setInputValue] = useState("");
  const [offers, setOffers] = useState([]);
  const navigation = useNavigation();

  // Fetch user offers
  const fetchOffers = async () => {
    try {
      const user = FIREBASE_AUTH.currentUser;
      if (!user) {
        Alert.alert("Error", "You must be logged in to view offers.");
        return;
      }

      const offersQuery = query(
        collection(FIREBASE_DB, "offers"),
        where("userId", "==", user.uid)
      );

      const querySnapshot = await getDocs(offersQuery);
      const userOffers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOffers(userOffers);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleSubmit = async () => {
    if (inputValue) {
      try {
        const user = FIREBASE_AUTH.currentUser;
        if (!user) {
          Alert.alert("Error", "You must be logged in to offer cash.");
          return;
        }

        const userDetails = {
          userId: user.uid,
          email: user.email || "No email provided",
          username: user.displayName || "Anonymous User",
        };

        const offerId = `${user.uid}-${Date.now()}`;
        await setDoc(doc(FIREBASE_DB, "offers", offerId), {
          ...userDetails,
          amountOffered: parseFloat(inputValue),
          timestamp: serverTimestamp(),
          status: "active",
        });

        setInputValue(""); // Clear input
        fetchOffers(); // Refresh the list
        Alert.alert("Success", "Your offer has been submitted.");
      } catch (error) {
        console.error("Error submitting offer:", error);
        Alert.alert("Error", "Failed to submit the offer. Please try again.");
      }
    }
  };

  const handleDelete = async (offerId) => {
    try {
      await deleteDoc(doc(FIREBASE_DB, "offers", offerId));
      fetchOffers(); // Refresh the list
      Alert.alert("Success", "Offer deleted successfully.");
    } catch (error) {
      console.error("Error deleting offer:", error);
      Alert.alert("Error", "Failed to delete the offer. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.formWrapper}>
        {/* Top Image */}
        <Image
          source={require("../images/Illustration 5.png")}
          style={styles.topImage}
        />

        {/* Input Field */}
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          value={inputValue}
          onChangeText={setInputValue}
          keyboardType="numeric"
        />

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: inputValue ? "red" : "#ccc" },
          ]}
          onPress={handleSubmit}
          disabled={!inputValue}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>

        <View style={styles.offersList}>
          <Text style={styles.offersHeader}>Your Offers:</Text>
          {offers.length === 0 ? (
            <Text>No offers available.</Text>
          ) : (
            offers.map((offer) => (
              <View key={offer.id} style={styles.offerItem}>
                <Text>Amount: ${offer.amountOffered}</Text>
                <Text>Status: {offer.status}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(offer.id)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  formWrapper: {
    padding: 16,
    alignItems: "center",
  },
  topImage: {
    width: "100%",
    height: 200,
    marginBottom: 40,
    marginTop: 40,
    borderRadius: 8,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  submitButton: {
    width: "100%",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  offersList: {
    width: "100%",
    marginTop: 30,
  },
  offersHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  offerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
  },
});
