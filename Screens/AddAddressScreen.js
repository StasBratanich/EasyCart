import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState, useCallback } from "react";
import Feather from "@expo/vector-icons/Feather";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";
import Entypo from "@expo/vector-icons/Entypo";

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://MYIP:5000/addresses/${userId}`);
      const { addresses } = response.data;
      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 50 }}>
      <View style={styles.searchView}>
        <Pressable style={styles.searchBarPressable}>
          <Feather
            name="search"
            size={22}
            color="#070e39"
            style={{ paddingStart: 10 }}
          />
          <TextInput placeholder="Search in EasyCart" />
        </Pressable>
        <Feather
          name="mic"
          size={24}
          color="white"
          style={{ paddingEnd: 5, paddingStart: 5 }}
        />
      </View>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Addresses</Text>
        <Pressable
          onPress={() => navigation.navigate("Add")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            borderColor: "#070e39",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 7,
            paddingHorizontal: 5,
          }}
        >
          <Text>Add new address</Text>
          <Feather name="arrow-right" size={24} color="black" />
        </Pressable>
        <Pressable>
          {addresses?.map((item, index) => (
            <Pressable
              key={index}
              style={{
                borderWidth: 1,
                borderColor: "#070e39",
                padding: 10,
                flexDirection: "column",
                gap: 5,
                marginVertical: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Text style={styles.boldTextDesign}>{item?.name}</Text>
                <Entypo name="location-pin" size={24} color="#6d7abf" />
              </View>
              <Text style={styles.notBoldTextDesign}>
                {item?.street} , {item.houseNumber}
              </Text>
              <Text style={styles.notBoldTextDesign}>{item?.city}</Text>
              <Text style={styles.notBoldTextDesign}>Israel</Text>
              <Text style={styles.notBoldTextDesign}>{item?.mobileNumber}</Text>
              <Text style={styles.notBoldTextDesign}>{item?.postalCode}</Text>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 7,
                }}
              >
                <Pressable style={styles.editBtnDesign}>
                  <Text style={styles.whiteboldTextDesign}>Edit</Text>
                </Pressable>
                <Pressable style={styles.editBtnDesign}>
                  <Text style={styles.whiteboldTextDesign}>Remove</Text>
                </Pressable>
                <Pressable style={styles.editBtnDesign}>
                  <Text style={styles.whiteboldTextDesign}>Set as default</Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({
  searchBarPressable: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: "white",
    borderRadius: 10,
    height: 38,
    flex: 1,
  },

  searchView: {
    backgroundColor: "#070e39",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  boldTextDesign: {
    fontSize: 15,
    fontWeight: "bold",
  },

  notBoldTextDesign: {
    fontSize: 15,
  },

  whiteboldTextDesign: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },

  editBtnDesign: {
    flex: 1,
    backgroundColor: "#6d7abf",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    borderWidth: 1,
    borderBlockColor: "black",
  },
});
