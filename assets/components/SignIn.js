import React, { useEffect, useState } from "react";
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
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";


const storeUserDetails = (user) => {
  console.log("User details saved:", user);
};

const SignIn = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  // Load last used mobile number if it exists
  useEffect(() => {
    const loadMobileNumber = async () => {
      const savedMobileNumber = await AsyncStorage.getItem("lastMobileNumber");
      if (savedMobileNumber) {
        setMobileNumber(savedMobileNumber);
      }
    };
    loadMobileNumber();
  }, []);

  const validateForm = () => {
    if (!mobileNumber || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return false;
    }
    if (isNaN(mobileNumber) || mobileNumber.length < 10) {
      Alert.alert("Error", "Please enter a valid mobile number");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

 
const handleSignIn = async () => {
  if (!validateForm()) return;

  setLoading(true); // Start loading
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("mobile", "==", parseInt(mobileNumber)));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      if (userData.email) {
        await signInWithEmailAndPassword(auth, userData.email, password);

        // Save the mobile number for autofill if the user doesn't log out
        await AsyncStorage.setItem("lastMobileNumber", mobileNumber);

        // Navigate to dashboard (main app)
        navigation.navigate("Main App");
      } else {
        Alert.alert("Sign in failed", "No email associated with this mobile number.");
      }
    } else {
      Alert.alert("Sign in failed", "Mobile number not found.");
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Sign in failed", error.message);
  } finally {
    setLoading(false); // Stop loading
  }
};

  const handleForgotPassword = () => {
    if (!mobileNumber) {
      Alert.alert("Error", "Please enter your mobile number to reset the password");
      return;
    }
    const generatedOtp = Math.floor(100000 + Math.random() * 900000);
    const user = { mobileNumber, generatedOtp };
    storeUserDetails(user);
    Alert.alert("OTP Sent", `Your OTP is: ${generatedOtp}`, [
      {
        text: "OK",
        onPress: () =>
          navigation.navigate("Forgot Password", {
            mobileNumber,
            generatedOtp,
          }),
      },
    ]);
  };

  const isFormValid = mobileNumber.length >= 10 && password.length >= 6;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Sign In</Text>
      </View>

      <View style={styles.formWrapper}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <View style={styles.topText}>
            <Text style={styles.subTitle}>Welcome Back,</Text>
            <Text style={styles.smallText}>Hello there, Sign in to continue</Text>
          </View>

          <Image
            source={require("../images/Illustration.png")}
            style={styles.image}
          />

          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            keyboardType="numeric"
            value={mobileNumber}
            onChangeText={(number) => setMobileNumber(number)}
            maxLength={12}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              secureTextEntry={!passwordVisible}
              keyboardType="numeric"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Ionicons
                name={passwordVisible ? "eye-off" : "eye"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: isFormValid && !loading ? "red" : "#d3d3d3" },
                ]}
                onPress={handleSignIn}
                disabled={!isFormValid || loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Sign In</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.fingerprintContainer}>
                <Ionicons name="finger-print" size={70} color="red" />
              </TouchableOpacity>

              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Do not have an account yet? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
                  <Text style={styles.link}>Sign Up</Text>
                </TouchableOpacity>
              </View>

        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};



const styles = StyleSheet.create({
  // ... existing styles ...
  container: {
    flex: 1,
    backgroundColor: "red",
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
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
  forgotPasswordContainer: {
    alignItems: "flex-end",
    width: "100%",
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#ccc",
    textDecorationLine: "none",
  },
  button: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  fingerprintContainer: {
    marginTop: 20,
    alignItems: "center",
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

export default SignIn;

