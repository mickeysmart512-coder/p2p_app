import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

import SignUp from "./components/SignUp";
import VerifyPhoneNumber from "./components/VerifyPhoneNumber";
import SuccessPage from "./components/SuccessPage";
import SecureYourTransactions from "./components/SecureYourTransactions";
import SignIn from "./components/SignIn";
import ForgotPassword from "./components/ForgotPassword";
import ForgotPasswordOtp from "./components/ForgotPasswordOtp";
import ChangePassword from "./components/ChangePassword";
import PasswordSuccess from "./components/PasswordSuccess";
import App from "./components/App";
import Exchange from "./components/Exchange";
import P2PWithdraw from "./components/P2PWithdraw";
import Search from "./components/Search";
import Profile from "./components/Profile";
import Transfer from "./components/Transfer";
import ConfirmTransfer from "./components/ConfirmTransfer";
import SettingsPage, {
  AppInformation,
  CustomerCare,
  PasswordSettings,
} from "./components/SettingsPage";
import Withdraw from "./components/Withdraw";
import PaymentHistory from "./components/PaymentHistory";
import Payment from "./components/ElectricPayment";
import PayTheBill from "./components/PayBill";
import TransferSuccess from "./components/TransferSuccess";
import TransactionDetails from "./components/TransactionDetails";
import Deposit from "./components/Deposit";
import OfferCash from "./components/OfferCash";
import OfferSuccess from "./components/OfferSuccess";
import CollectCash from "./components/CollectCash";
import CollectSuccess from "./components/CollectSuccess";
import Inbox from "./components/Inbox";
import ChatDetail from "./components/ChatDetails";
import ElectricBill from "./components/ElectricBill";
import ElectricBillDetails from "./components/ElectricBillDetails";
import Airtime from "./components/Airtime";
import MobileData from "./components/MobileData";
import Subcription from "./components/Subcription";
import Beneficiary from "./components/Beneficiary";
import OfferDetails from "./components/OfferDetails";
import OfferProfile from "./components/OfferProfile";
import Location, {SavedLocation} from "./components/Location";


const Stack = createStackNavigator();

export default function AppNavigation() {
  const handleLogout = async (navigation) => {
    try {
      // Clear user session or any authentication token
      await AsyncStorage.removeItem("userSession");
      // Navigate back to the SignIn screen
      navigation.reset({
        index: 0,
        routes: [{ name: "Sign In" }],
      });
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="Sign In"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Verify Phone Number"
          component={VerifyPhoneNumber}
        />
        <Stack.Screen
          name="Success Page"
          component={SuccessPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main App"
          component={App}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => handleLogout(navigation)}
                style={{ marginRight: 10 }}
              >
                <Ionicons name="log-out-outline" size={24} color="black" />
              </TouchableOpacity>
            ),
            headerShown: false,
          })}
        />
        
        <Stack.Screen name="Transaction History" component={PaymentHistory} />
        <Stack.Screen
          name="Secure Your Transactions"
          component={SecureYourTransactions}
        />
        <Stack.Screen name="Forgot Password Null" component={ForgotPassword} />
        <Stack.Screen name="Forgot Password" component={ForgotPasswordOtp} />
        <Stack.Screen name="Change Password" component={ChangePassword} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen
          name="Password Success"
          component={PasswordSuccess}
          options={{
            headerShown: false,
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="P2P Cash Exchange" component={Exchange} />
        <Stack.Screen name="P2P Withdraw" component={P2PWithdraw} />
        <Stack.Screen name="Deposit" component={Deposit} />
        <Stack.Screen name="Offer Cash" component={OfferCash} />
        <Stack.Screen name="Collect Cash" component={CollectCash} />
        <Stack.Screen name="OfferDetails" component={OfferDetails} />
        <Stack.Screen name="OfferProfile" component={OfferProfile} />
        <Stack.Screen
          name="Collect Cash Success"
          component={CollectSuccess}
          options={{
            headerShown: false,
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Offer Success"
          component={OfferSuccess}
          options={{
            headerShown: false,
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Transfer" component={Transfer} />
        <Stack.Screen name="Confirm" component={ConfirmTransfer} />
        <Stack.Screen
          name="Settings Page"
          component={SettingsPage}
          options={{
            headerStyle: { backgroundColor: "white" }, // Customize the header background color
            headerTintColor: "black", // Change the color of the back button and title
            headerTitleStyle: { color: "red" }, // Change the title color
          }}
        />
        <Stack.Screen
          name="App Information"
          component={AppInformation}
          options={{
            headerStyle: { backgroundColor: "white" },
            headerTintColor: "black",
            headerTitleStyle: { color: "red" },
          }}
        />
        <Stack.Screen
          name="Password Settings"
          component={PasswordSettings}
          options={{
            headerStyle: { backgroundColor: "white" },
            headerTintColor: "black",
            headerTitleStyle: { color: "red" },
          }}
        />
        <Stack.Screen name="Customer Care" component={CustomerCare} />
        <Stack.Screen name="Saved Location" component={SavedLocation} />
        <Stack.Screen name="Withdraw" component={Withdraw} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Pay the bill" component={PayTheBill} />
        <Stack.Screen name="Inbox" component={Inbox} />
        <Stack.Screen
          name="Chat Detail"
          component={ChatDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Electricity" component={ElectricBill} />
        <Stack.Screen
          name="Electricity Details"
          component={ElectricBillDetails}
          options={({ navigation }) => ({
            headerBackTitleVisible: false,
            headerBackVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() =>
                  navigation.reset({ index: 0, routes: [{ name: "Main App" }] })
                }
                style={{ marginRight: 20, marginLeft: 5 }} // Add margin here
              >
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Airtime" component={Airtime} />
        <Stack.Screen name="Mobile Data" component={MobileData} />
        <Stack.Screen
          name="Subscription"
          component={Subcription}
          options={({ navigation }) => ({
            headerBackTitleVisible: false,
            headerBackVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() =>
                  navigation.reset({ index: 0, routes: [{ name: "Main App" }] })
                }
                style={{ marginRight: 20, marginLeft: 5 }} // Add margin here
              >
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Beneficiary" component={Beneficiary} />
        <Stack.Screen
          name="Transfer Success"
          component={TransferSuccess}
          options={{
            headerLeft: null,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerBackVisible: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Transaction Details"
          component={TransactionDetails}
          options={({ navigation }) => ({
            headerBackTitleVisible: false,
            headerBackVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() =>
                  navigation.reset({ index: 0, routes: [{ name: "Main App" }] })
                }
                style={{ marginRight: 20, marginLeft: 5 }} // Add margin here
              >
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignUp}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
