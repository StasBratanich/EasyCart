import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserType } from "../UserContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
import { cleanCart } from "../Redux/CartReducer";
import { useNavigation } from "@react-navigation/native";

const ConfirmationScreen = () => {
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary Form" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

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

  const handlePressOrder = async () => {
    try {
      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: selectedOption,
      };

      const response = await axios.post("http://MYIP:5000/orders", orderData);

      if (response.status === 200) {
        navigation.navigate("Order");
        dispatch(cleanCart());
        console.log("Order created successfully");
      } else {
        console.log("Error crerating order", error);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <ScrollView style={{ marginTop: 55 }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          {steps?.map((step, index) => (
            <View
              key={index}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              {index > 0 && (
                <View
                  style={[
                    { flex: 1, height: 2, backgroundColor: "#64c725" },
                    index <= currentStep && { backgroundColor: "#64c725" },
                  ]}
                />
              )}
              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  index < currentStep && { backgroundColor: "#64c725" },
                ]}
              >
                {index < currentStep ? (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={{ textAlign: "center", marginTop: 8 }}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>
      {currentStep == 0 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={styles.boldTextDesign}>Select delivery address</Text>
          <Pressable style={{ marginTop: 20 }}>
            {addresses?.map((item, index) => (
              <Pressable
                ///
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 20,
                  margin: 10,
                  borderColor: "#070e39",
                  borderWidth: 2,
                  borderRadius: 20,
                  paddingStart: 15,
                  padding: 5,
                }}
              >
                {selectedAddress && selectedAddress._id === item?._id ? (
                  <FontAwesome
                    onPress={() => setSelectedAddress(item)}
                    name="circle"
                    size={24}
                    color="black"
                  />
                ) : (
                  <FontAwesome
                    onPress={() => setSelectedAddress(item)}
                    name="circle-o"
                    size={24}
                    color="black"
                  />
                )}
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Text style={styles.boldTextDesign}>{item?.name}</Text>
                    <Entypo name="location-pin" size={24} color="#6d7abf" />
                  </View>
                  <Text style={styles.notBoldTextDesign}>
                    {item?.street} , {item.houseNumber}
                  </Text>
                  <Text style={styles.notBoldTextDesign}>{item?.city}</Text>
                  <Text style={styles.notBoldTextDesign}>Israel</Text>
                  <Text style={styles.notBoldTextDesign}>
                    {item?.mobileNumber}
                  </Text>
                  <Text style={styles.notBoldTextDesign}>
                    {item?.postalCode}
                  </Text>
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
                      <Text style={styles.whiteboldTextDesign}>
                        Set as default
                      </Text>
                    </Pressable>
                  </View>
                  <View>
                    {selectedAddress && selectedAddress._id == item?._id && (
                      <Pressable
                        onPress={() => setCurrentStep(1)}
                        style={{
                          backgroundColor: "#64c725",
                          padding: 10,
                          borderRadius: 20,
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 10,
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          Deliver to this address
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      )}
      {currentStep == 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={styles.boldTextDesign}>
            Choose youe delivery options
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: 8,
              gap: 7,
              borderColor: "#070e39",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 20,
            }}
          >
            {option ? (
              <FontAwesome name="circle" size={24} color="black" />
            ) : (
              <FontAwesome
                onPress={() => setOption(!option)}
                name="circle-o"
                size={24}
                color="black"
              />
            )}

            <Text style={{ flex: 1 }}>
              <Text style={{ color: "green", fontWeight: "500" }}>
                Tomorrow by 10pm
              </Text>{" "}
              - FREE delivery with your Prime membership
            </Text>
          </View>
          <Pressable
            onPress={() => setCurrentStep(2)}
            style={{
              backgroundColor: "#64c725",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text style={styles.whiteboldTextDesign}>Continue</Text>
          </Pressable>
        </View>
      )}
      {currentStep == 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={styles.boldTextDesign}>Select payment method</Text>
          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#070e39",
              borderWidth: 1,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 12,
            }}
          >
            {selectedOption === "cash" ? (
              <FontAwesome
                onPress={() => setSelectedOption("cash")}
                name="circle"
                size={24}
                color="black"
              />
            ) : (
              <FontAwesome
                onPress={() => setSelectedOption("cash")}
                name="circle-o"
                size={24}
                color="black"
              />
            )}

            <Text>Cash on delivery</Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#070e39",
              borderWidth: 1,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 12,
            }}
          >
            {selectedOption === "credit" ? (
              <FontAwesome
                onPress={() => {
                  setSelectedOption("credit");
                }}
                name="circle"
                size={24}
                color="black"
              />
            ) : (
              <FontAwesome
                onPress={() => setSelectedOption("credit")}
                name="circle-o"
                size={24}
                color="black"
              />
            )}
            <Text>Credir or debit card</Text>
          </View>
          <Pressable
            onPress={() => setCurrentStep(3)}
            style={{
              backgroundColor: "#64c725",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text style={styles.whiteboldTextDesign}>Continue</Text>
          </Pressable>
        </View>
      )}
      {currentStep === 3 && selectedOption === "cash" && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={styles.boldTextDesign}>Order now</Text>
          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#070e39",
              borderWidth: 1,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 12,
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Save 5% and never run out
              </Text>
              <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
                Turn on auto deliveries
              </Text>
            </View>

            <Entypo name="triangle-right" size={24} color="black" />
          </View>
          <View
            style={{
              backgroundColor: "#6d7abf",
              padding: 8,
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "white" }}>
              Shipping to : {selectedAddress?.name}
            </Text>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Text style={styles.whiteboldTextDesign}>Items</Text>
              <Text style={styles.whiteboldTextDesign}>${total}</Text>
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Text style={styles.whiteboldTextDesign}>Delivery</Text>
              <Text style={styles.whiteboldTextDesign}>$0</Text>
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Text style={[styles.whiteboldTextDesign, { fontSize: 20 }]}>
                Order total
              </Text>
              <Text style={[styles.whiteboldTextDesign, { fontSize: 20 }]}>
                ${total}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#6d7abf",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text style={styles.notBoldTextDesign}>Pay with</Text>
            <Text style={[styles.boldTextDesign, { marginTop: 10 }]}>
              Pay on delivery (cash)
            </Text>
          </View>
          <Pressable
            onPress={handlePressOrder}
            style={{
              backgroundColor: "#64c725",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text style={styles.whiteboldTextDesign}>Place order</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  editBtnDesign: {
    backgroundColor: "#6d7abf",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    borderWidth: 1,
    borderBlockColor: "black",
  },
  whiteboldTextDesign: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  boldTextDesign: {
    fontSize: 16,
    fontWeight: "bold",
  },

  notBoldTextDesign: {
    fontSize: 15,
  },
});
