// import React, { useState } from "react";
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
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";

// const SignUp = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [usernameExists, setUsernameExists] = useState(false);
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const auth = FIREBASE_AUTH;
//   const db = FIREBASE_DB;

//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(String(email).toLowerCase());
//   };

//   const validateInputs = () => {
//     if (!username || !firstName || !lastName || !email || !password || !mobileNumber) {
//       Alert.alert("Error", "Please fill out all fields.");
//       return false;
//     }
//     if (!validateEmail(email)) {
//       Alert.alert("Error", "Please enter a valid email address.");
//       return false;
//     }
//     if (isNaN(mobileNumber)) {
//       Alert.alert("Error", "Please enter a valid mobile number.");
//       return false;
//     }
//     if (!termsAccepted) {
//       Alert.alert("Error", "You must accept the terms and conditions.");
//       return false;
//     }
//     if (usernameExists) {
//       Alert.alert("Error", "Username already exists.");
//       return false;
//     }
//     return true;
//   };

//   const checkUsernameExists = async (username) => {
//     const usersRef = collection(db, "users");
//     const q = query(usersRef, where("username", "==", username));
//     const querySnapshot = await getDocs(q);
//     return !querySnapshot.empty;
//   };

//   const handleUsernameChange = async (text) => {
//     setUsername(text);
//     if (text.length > 0) {
//       const exists = await checkUsernameExists(text);
//       setUsernameExists(exists);
//     } else {
//       setUsernameExists(false);
//     }
//   };

//   const signUp = async () => {
//     if (!validateInputs()) return;

//     setLoading(true);
//     try {
//       const response = await createUserWithEmailAndPassword(auth, email, password);
//       const userId = response.user.uid;

//       await setDoc(doc(db, "users", userId), {
//         username,
//         firstName,
//         lastName,
//         email,
//         mobile: parseInt(mobileNumber),
//         accountBalance: 0.00, // Initialize account balance to 0.00
//       });
      

//       console.log("User registered and details saved to Firestore");
//        navigation.navigate("Sign In");
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Sign up failed", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isFormValid = username && email && mobileNumber && password && termsAccepted;

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <Ionicons name="chevron-back" size={24} color="white" />
//         </TouchableOpacity>
//         <Text style={styles.title}>Sign Up</Text>
//       </View>

//       <View style={styles.formWrapper}>
//         <ScrollView contentContainerStyle={styles.formContainer}>
//           <View style={styles.topText}>
//             <Text style={styles.subTitle}>Welcome To Us,</Text>
//             <Text style={styles.smallText}>Hello there, create a new account</Text>
//           </View>

//           <Image source={require("../images/Illustration.png")} style={styles.image} />

//           <TextInput
//             style={styles.input}
//             placeholder="Username"
//             onChangeText={handleUsernameChange}
//             value={username}
//           />
//           {usernameExists && <Text style={styles.errorText}>Username already exists</Text>}
//           <TextInput
//             style={styles.input}
//             placeholder="First Name"
//             onChangeText={setFirstName}
//             value={firstName}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Last Name"
//             onChangeText={setLastName}
//             value={lastName}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             autoCapitalize="none"
//             onChangeText={setEmail}
//             value={email}
//             keyboardType="email-address"
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Mobile Number"
//             onChangeText={setMobileNumber}
//             value={mobileNumber}
//             keyboardType="phone-pad"
//           />
//           <View style={styles.passwordContainer}>
//             <TextInput
//               style={styles.passwordInput}
//               placeholder="Password"
//               keyboardType="numeric"
//               secureTextEntry={!passwordVisible}
//               value={password}
//               onChangeText={setPassword}
//             />
//             <TouchableOpacity
//               style={styles.eyeIcon}
//               onPress={() => setPasswordVisible(!passwordVisible)}
//             >
//               <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={24} color="gray" />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.termsContainer}>
//             <TouchableOpacity style={styles.checkbox} onPress={() => setTermsAccepted(!termsAccepted)}>
//               <View style={[styles.checkboxInner, termsAccepted && styles.checkboxChecked]} />
//             </TouchableOpacity>
//             <Text style={styles.termsText}>
//               By creating an account, you agree to our{" "}
//               <Text style={styles.link} onPress={() => Alert.alert("Terms and Conditions")}>
//                 Terms and Conditions
//               </Text>
//               .
//             </Text>
//           </View>

//           <TouchableOpacity
//             style={[styles.button, { backgroundColor: isFormValid ? "red" : "#d3d3d3" }]}
//             onPress={signUp}
//             disabled={!isFormValid}
//           >
//             <Text style={styles.buttonText}>Sign Up</Text>
//           </TouchableOpacity>

//           <View style={styles.footerContainer}>
//             <Text style={styles.footerText}>Already have an account? </Text>
//             <TouchableOpacity onPress={() => navigation.navigate("Sign In")}>
//               <Text style={styles.link}>Sign In</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };







import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator
} from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";


const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  const validateInputs = () => {
    if (!username || !firstName || !lastName || !email || !password || !mobileNumber) {
      Alert.alert("Error", "Please fill out all fields.");
      return false;
    }
    if (!termsAccepted) {
      Alert.alert("Error", "You must accept the terms and conditions.");
      return false;
    }
    return true;
  };

  const generateMonnifyToken = async () => {
    try {
      const apiKey = "MK_TEST_J4GP3QDA1B";
      const secretKey = "W8QELN7P7UH5U1RCH3YGN81PZGM2LWVG";
      const authHeaders = {
        Authorization: `Basic ${btoa(`${apiKey}:${secretKey}`)}`,
        "Content-Type": "application/json",
      };
      const response = await axios.post("https://sandbox.monnify.com/api/v1/auth/login", {}, { headers: authHeaders });
      return response.data.responseBody.accessToken;
    } catch (error) {
      console.error("Error generating Monnify token:", error);
      throw new Error("Failed to generate Monnify token");
    }
  };

  const createMonnifyAccount = async (userId, token) => {
    try {
      const monnifyUrl = "https://sandbox.monnify.com/api/v2/bank-transfer/reserved-accounts";
      const monnifyData = {
        accountReference: `USER_${userId}`,
        accountName: `${firstName} ${lastName}`,
        currencyCode: "NGN",
        contractCode: "4255165929", // Ensure this matches your Monnify sandbox contract code
        customerEmail: email,
        customerName: `${firstName} ${lastName}`,
        getAllAvailableBanks: false,
        preferredBanks: ["035", "232"], // Verify these are correct
      };
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
  
      console.log("Requesting Monnify account creation:", monnifyData);
  
      const response = await axios.post(monnifyUrl, monnifyData, { headers });
      console.log("Monnify Response:", response.data);
  
      return response.data.responseBody.accounts;
    } catch (error) {
      console.error("Error creating Monnify virtual account:", error.response?.data || error.message);
      throw new Error("Failed to create Monnify virtual account");
    }
  };
  
  const createTransactionCollection = async (userId) => {
    try {
      const transactionRef = doc(collection(db, "transactions"), userId);
      await setDoc(transactionRef, { transactions: [] });
    } catch (error) {
      console.error("Error initializing transaction collection:", error);
    }
  };

  const signUp = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const userId = response.user.uid;

      const token = await generateMonnifyToken();
      const accounts = await createMonnifyAccount(userId, token);
      const accountInfo = accounts.map((acc) => ({
        bankName: acc.bankName,
        accountNumber: acc.accountNumber,
        accountName: acc.accountName,
        reference: `USER_${userId}`,
      }));

      await setDoc(doc(db, "users", userId), {
        username,
        firstName,
        lastName,
        email,
        mobile: parseInt(mobileNumber),
        monnifyAccounts: accountInfo,
        accountBalance: 0.0,
      });

      await createTransactionCollection(userId);

      Alert.alert(
        "Account created successfully",
        "Your virtual account has been created. You can now deposit funds."
      );
      navigation.navigate("Sign In");
    } catch (error) {
      console.error("Sign up error:", error);
      Alert.alert("Sign up failed", error.message);
    } finally {
      setLoading(false);
    }
  };

    const isFormValid = username && email && mobileNumber && password && termsAccepted;

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        style={styles.input}
      />
          <View style={styles.passwordContainer}>
       <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              keyboardType="numeric"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <View style={styles.termsContainer}>
            <TouchableOpacity style={styles.checkbox} onPress={() => setTermsAccepted(!termsAccepted)}>
              <View style={[styles.checkboxInner, termsAccepted && styles.checkboxChecked]} />
            </TouchableOpacity>
            <Text style={styles.termsText}>
              By creating an account, you agree to our{" "}
              <Text style={styles.link} onPress={() => Alert.alert("Terms and Conditions")}>
                Terms and Conditions
              </Text>
              .
            </Text>
          </View>

         <TouchableOpacity
              style={[styles.button, { backgroundColor: isFormValid ? "red" : "#d3d3d3" }]}
              onPress={signUp}
              disabled={!isFormValid || loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Sign In")}>
                <Text style={styles.link}>Sign In</Text>
              </TouchableOpacity>
            </View>

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  // ... existing styles ...
  termsCheckbox: {
    marginLeft: 10,
  },
  termsCheckboxText: {
    fontSize: 14,
    marginTop: -15  },
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  header: {
    width: "100%",
    paddingTop: 60,
    paddingBottom: 15,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
  },
  signUpText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 10,
  },
  formWrapper: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  formContainer: {
    padding: 20,
    alignItems: "center",
  },
  topText: {
    alignItems: "flex-start",
    marginTop: 10,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  subTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "red",
  },
  smallText: {
    fontSize: 16,
    color: "gray",
    marginTop: 5,
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 20,
    alignSelf: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 25,
    width: "100%",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  termsText: {
    fontSize: 14,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 15,
    height: 15,
    backgroundColor: "white",
  },
  checkboxChecked: {
    backgroundColor: "red",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    marginBottom: 25,
    width: "100%",
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
  },
  link: {
    color: "red",
    textDecorationLine: "none",
    marginLeft: 5,
    fontWeight: "bold",
  },
});

export default SignUp;