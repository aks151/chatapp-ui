import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthContext from "../context/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ChatListScreen from "../screens/ChatListScreen";
import { View, ActivityIndicator } from "react-native";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const {user, isLoading} = useContext(AuthContext);

    if(isLoading){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
            {user ? (
          // User is logged in, show main app screens
          <Stack.Screen name="ChatList" component={ChatListScreen} options={{ title: 'Chats' }} />
          // Add other screens like ChatScreen, ProfileScreen here
        ) : (
          // No user, show auth screens
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
          </>
        )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;