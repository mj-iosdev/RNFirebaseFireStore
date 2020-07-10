/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { checkAuthState } from "./src/service/FireAuthHelper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import StudentListScreen from "./src/screens/StudentListScreen";
import TeacherListScreen from "./src/screens/TeacherListScreen";
import ClassListScreen from "./src/screens/ClassListScreen";
import SubjectListScreen from "./src/screens/SubjectListScreen";
import AddClassScreen from "./src/screens/AddClassScreen";
import AddSubjectScreen from "./src/screens/AddSubjectScreen";
import AddStudentScreen from "./src/screens/AddStudentScreen";
import StudentDetailScreen from "./src/screens/StudentDetailScreen";

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  checkAuthState()
    .then((user) => {
      console.log("checkOnAuthStateChanged =>", user);
      setUser(user);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setUser(null);
      setIsLoading(false);
    });

  const Loader = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  const Navigate = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator
          headerMode="none"
          initialRouteName={user ? "ProfileScreen" : "LoginScreen"}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen
            name="StudentListScreen"
            component={StudentListScreen}
          />
          <Stack.Screen
            name="TeacherListScreen"
            component={TeacherListScreen}
          />
          <Stack.Screen name="ClassListScreen" component={ClassListScreen} />
          <Stack.Screen
            name="SubjectListScreen"
            component={SubjectListScreen}
          />
          <Stack.Screen name="AddClassScreen" component={AddClassScreen} />
          <Stack.Screen name="AddSubjectScreen" component={AddSubjectScreen} />
          <Stack.Screen name="AddStudentScreen" component={AddStudentScreen} />
          <Stack.Screen
            name="StudentDetailScreen"
            component={StudentDetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  const CheckUser = () => {
    if (isLoading) {
      return <Loader />;
    } else {
      return <Navigate />;
    }
  };

  return (
    <CheckUser />
    // {user ? return (<View> </View>): return(<NavigationContainer>
    //   <Stack.Navigator headerMode="none" initialRouteName="LoginScreen">
    //     <Stack.Screen name="LoginScreen" component={LoginScreen} />
    //     <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    //     <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>)}
  );
};

export default App;
