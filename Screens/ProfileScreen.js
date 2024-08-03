import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#070e39",
      },
      headerLeft: () => (
        <Image
          style={{ width: 70, height: 60, resizeMode: "contain" }}
          source={require("../assets/EasyCartTitleLogo.png")}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 12,
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="white" />

          <AntDesign name="search1" size={24} color="white" />
        </View>
      ),
    });
  }, []);

  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://MYIP:5000/profile/${userId}`);
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUserProfile();
  }, []);

  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    navigation.replace("Login");
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://MYIP:5000/orders/${userId}`);
        const orders = response.data.orders;
        setOrders(orders);

        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        Welcome {user?.email}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}
      >
        <Pressable
          onPress={logout}
          style={{
            padding: 10,
            backgroundColor: "#070e39",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              color: "white",
              fontWeight: "bold",
            }}
          >
            Logout Account
          </Text>
        </Pressable>
      </View>

      <Text style={{ marginTop: 10 }}>Browse through your past orders :</Text>

      <ScrollView>
        {loading ? (
          <Text>Loading...</Text>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <View
              key={order._id}
              style={{
                marginTop: 20,
                padding: 15,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: "#6d7abf",
                marginHorizontal: 10,
              }}
            >
              <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                Order ID: {order._id}
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {order.products.length > 0 ? (
                  order.products.slice(0, 5).map(
                    (
                      product // Limit number of products if needed
                    ) => (
                      <View
                        style={{
                          marginHorizontal: 10,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        key={product._id}
                      >
                        <Image
                          source={{ uri: product.image }}
                          style={{
                            width: 100,
                            height: 100,
                            resizeMode: "contain",
                          }}
                        />
                      </View>
                    )
                  )
                ) : (
                  <Text>No products found</Text>
                )}
              </ScrollView>
            </View>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
