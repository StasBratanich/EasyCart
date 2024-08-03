import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Pressable,
  Alert,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          navigation.replace("Main");
        }
      } catch (error) {
        console.log("Error message", error);
      }
    };
    checkLoginStatus();
  });

  const handleLogin = () => {
    const user = { email: email, password: password };

    axios
      .post("http://MYIP:5000/login", user)
      .then((response) => {
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        navigation.replace("Main");
      })
      .catch((error) => {
        Alert.alert("Login error", "Invalid Email");
        console.log(error);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 50,
      }}
    >
      <View>
        <Image
          style={{
            width: 150,
            height: 150,
          }}
          source={require("../assets/EasyCartTitleLogo.png")}
        />
      </View>

      <KeyboardAvoidingView>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>Login Account</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <MaterialIcons
              style={styles.icon}
              name="email"
              size={24}
              color="white"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              placeholder="Enter Email"
              placeholderTextColor="gray"
            ></TextInput>
          </View>
          <View>
            <View style={styles.inputWrapper}>
              <FontAwesome
                style={styles.icon}
                name="lock"
                size={24}
                color="white"
              />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Enter Password"
                placeholderTextColor="gray"
                secureTextEntry
              ></TextInput>
            </View>
          </View>
          <View style={styles.displayTextWrapperRow}>
            <Text>Keep me logged in</Text>
            <Text style={{ color: "#6d7abf", fontWeight: "bold" }}>
              Forgot passowrd?
            </Text>
          </View>
        </View>
        <Pressable onPress={handleLogin} style={styles.loginBTN}>
          <Text style={styles.loginText}>Login</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={styles.displayTextWrapperColumn}
        >
          <Text style={styles.textColorGray}>Don't have an account?</Text>
          <Text style={styles.textColorGray}>Sign up</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 50,
  },
  logo: {
    width: 150,
    height: 150,
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: "#070e39",
  },
  inputContainer: {
    marginTop: 15,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#070e39",
    padding: 5,
    borderRadius: 10,
    marginTop: 15,
  },
  icon: {
    marginStart: 5,
  },
  input: {
    color: "white",
    fontSize: 16,
    marginVertical: 10,
    width: 250,
  },
  displayTextWrapperRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  displayTextWrapperColumn: {
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  loginBTN: {
    width: 200,
    backgroundColor: "#64c725",
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    marginTop: 70,
  },
  loginText: {
    color: "white",
    padding: 5,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  textColorGray: {
    color: "gray",
  },
});
