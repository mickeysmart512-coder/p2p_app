// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Modal,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { FIREBASE_DB } from "../../firebaseConfig"; 
// import { collection, getDocs } from "firebase/firestore";

// export default function P2PWithdraw() {
//   const navigation = useNavigation();
//   const [showPopup, setShowPopup] = useState(true);
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const usersCollection = collection(FIREBASE_DB, "users");
//         const querySnapshot = await getDocs(usersCollection);
//         const fetchedUsers = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setUsers(fetchedUsers);
//       } catch (error) {
//         console.error("Error fetching users: ", error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleSearch = () => {
//     if (!searchTerm) return;
//     const filteredUsers = users.filter((user) =>
//       user.name?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setUsers(filteredUsers);
//   };

//   const handleProfileNavigation = (user) => {
//     navigation.navigate("Profile", { user });
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <ScrollView contentContainerStyle={styles.contentContainer}>
//         {/** Search Row */}
//         <View style={styles.searchRow}>
//           <TextInput
//             placeholder="Search"
//             style={styles.searchInput}
//             value={searchTerm}
//             onChangeText={(text) => setSearchTerm(text)}
//           />
//           <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
//             <Text style={styles.searchButtonText}>Search</Text>
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.sectionHeading}>Users</Text>
//         <View style={styles.profileContainer}>
//           {users.map((user) => (
//             <TouchableOpacity
//               key={user.id}
//               style={styles.profileRow}
//               onPress={() => handleProfileNavigation(user)}
//             >
//               <Image
//                 source={{ uri: user.profileImage || "https://via.placeholder.com/150" }}
//                 style={styles.profileImage}
//               />
//               <View style={styles.profileTextContainer}>
//                 <Text style={styles.profileName}>{user.name}</Text>
//                 <Text style={styles.bankName}>{user.email || "No Bank Info"}</Text>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </ScrollView>

//       {/** Bottom Popup */}
//       <Modal
//         transparent={true}
//         visible={showPopup}
//         animationType="slide"
//         onRequestClose={() => setShowPopup(false)}
//       >
//         <View style={styles.popupContainer}>
//           <View style={styles.popup}>
//             <Image
//               source={require("../images/Artwork.png")}
//               style={styles.popupImage}
//             />
//             <View style={styles.popupTextContainer}>
//               <Text style={styles.popupHeading}>Enable Location Services</Text>
//               <Text style={styles.popupDescription}>
//                 To find nearby users and provide better service, we need access
//                 to your location.
//               </Text>
//             </View>
//             <TouchableOpacity
//               style={styles.enableButton}
//               onPress={() => setShowPopup(false)}
//             >
//               <Text style={styles.buttonText}>Enable</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.laterButton}
//               onPress={() => setShowPopup(false)}
//             >
//               <Text style={styles.laterButtonText}>Enable Later</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </KeyboardAvoidingView>
//   );
// }











import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_DB } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function P2PWithdraw() {
  const navigation = useNavigation();
  const [showPopup, setShowPopup] = useState(true);
  const [offers, setOffers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch offers from Firestore
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offersCollection = collection(FIREBASE_DB, "offers");
        const querySnapshot = await getDocs(offersCollection);
        const fetchedOffers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOffers(fetchedOffers);
      } catch (error) {
        console.error("Error fetching offers: ", error);
      }
    };

    fetchOffers();
  }, []);

  const handleSearch = () => {
    if (!searchTerm) return;
    const filteredOffers = offers.filter((offer) =>
      offer.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setOffers(filteredOffers);
  };

  const handleOfferNavigation = (offer) => {
    navigation.navigate("OfferDetails", { offer });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Search Row */}
        <View style={styles.searchRow}>
          <TextInput
            placeholder="Search by Username"
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeading}>Available Offers</Text>
        <View style={styles.profileContainer}>
          {offers.map((offer) => (
            <TouchableOpacity
              key={offer.id}
              style={styles.profileRow}
              onPress={() => handleOfferNavigation(offer)}
            >
              {/* Profile Image */}
              <Image
                source={{
                  uri: offer.profileImage || "https://via.placeholder.com/150",
                }}
                style={styles.profileImage}
              />
              <View style={styles.profileTextContainer}>
                {/* Username */}
                <Text style={styles.profileName}>{offer.username}</Text>
                {/* Email or Placeholder */}
                <Text style={styles.email}>
                  {offer.email || "No Email Provided"}
                </Text>
                {/* <Text> {offer.timestamp}</Text> */}

                {/* Status Indicator */}
                <View style={styles.statusContainer}>
                  <View
                    style={[
                      styles.statusIndicator,
                      { backgroundColor: offer.isActive ? "green" : "gray" },
                    ]}
                  />
                  <Text style={styles.statusText}>
                    {offer.isActive ? "Active" : "Inactive"}
                  </Text>
                </View>
                {/* Offer Details */}
                <Text style={styles.offerText}>
                  Offer: N{offer.amountOffered || "0"}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Popup */}
      <Modal
        transparent={true}
        visible={showPopup}
        animationType="slide"
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <Image
              source={require("../images/Artwork.png")}
              style={styles.popupImage}
            />
            <View style={styles.popupTextContainer}>
              <Text style={styles.popupHeading}>Enable Location Services</Text>
              <Text style={styles.popupDescription}>
                To find nearby users and provide better service, we need access
                to your location.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.enableButton}
              onPress={() => setShowPopup(false)}
            >
              <Text style={styles.buttonText}>Enable</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.laterButton}
              onPress={() => setShowPopup(false)}
            >
              <Text style={styles.laterButtonText}>Enable Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "red",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  searchButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  sectionHeading: {
    fontSize: 14,
    color: "#777",
    fontWeight: "bold",
    marginVertical: 10,
  },
  profileContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  bankName: {
    fontSize: 14,
    color: "#666",
  },
  popupContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
    width: "100%",
  },
  popupImage: {
    width: 380,
    height: 380,
    marginBottom: 10,
  },
  popupTextContainer: {
    alignItems: "center",
  },
  popupHeading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
  },
  popupDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 5,
    fontWeight: "bold",
  },
  enableButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    width: "100%",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  laterButton: {
    backgroundColor: "transparent",
    borderRadius: 12,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red",
    marginTop: 15,
  },
  laterButtonText: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  statusText: {
    fontSize: 12,
    color: "#666",
  },
  offerText: {
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 5,
  },
});
