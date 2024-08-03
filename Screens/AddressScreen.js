import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { UserType } from "../UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const AddressScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  const [houseNumber, sethouseNumber] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [city, setCity] = useState("");
  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  const handleAddAddress = () => {
    if (!name || !mobileNumber || !houseNumber || !street || !postalCode) {
      Alert.alert("Validation Error", "Please fill out all fields.");
      return;
    }

    const address = {
      name,
      mobileNumber,
      houseNumber,
      street,
      postalCode,
      city,
    };

    axios
      .post("http://MYIP:5000/addresses", { userId, address })
      .then((response) => {
        Alert.alert("Success", "Address added successfully");
        setName("");
        setmobileNumber("");
        sethouseNumber("");
        setStreet("");
        setpostalCode("");

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View style={{ height: 50, backgroundColor: "#64c725" }}></View>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
          Add new address
        </Text>
        <TextInput
          placeholder="Israel"
          placeholderTextColor={"black"}
          style={{
            padding: 10,
            borderColor: "#6d7abf",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        ></TextInput>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Full name</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Enter full name"
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#6d7abf",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          ></TextInput>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Mobile number
          </Text>
          <TextInput
            value={mobileNumber}
            onChangeText={(text) => setmobileNumber(text)}
            placeholder="Enter mobile number"
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#6d7abf",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          ></TextInput>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>House number</Text>
          <TextInput
            value={houseNumber}
            onChangeText={(text) => sethouseNumber(text)}
            placeholder="Enter house number"
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#6d7abf",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          ></TextInput>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Street</Text>
          <TextInput
            value={street}
            onChangeText={(text) => setStreet(text)}
            placeholder="Enter street"
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#6d7abf",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          ></TextInput>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>City</Text>
          <TextInput
            value={city}
            onChangeText={(text) => setCity(text)}
            placeholder="Enter city"
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#6d7abf",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          ></TextInput>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Postal code</Text>
          <TextInput
            value={postalCode}
            onChangeText={(text) => setpostalCode(text)}
            placeholder="Enter postal code"
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#6d7abf",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          ></TextInput>
        </View>
        <Pressable
          onPress={handleAddAddress}
          style={{
            backgroundColor: "#070e39",
            padding: 19,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
              color: "white",
            }}
          >
            Add address
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
