import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../Redux/CartReducer";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const dispatch = useDispatch();

  const increaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };

  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };

  const deleteItemFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <ScrollView style={styles.cartScreebBackground}>
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
      <View style={styles.cartPricesView}>
        <Text style={styles.subTotalTextDesign}>Subtotal : </Text>
        <Text style={styles.totalTextDesign}>{total}</Text>
      </View>
      <Text style={{ marginHorizontal: 10 }}>EMI details available</Text>
      <Pressable
        style={styles.proceedToBuyBtnDesign}
        onPress={() => navigation.navigate("Confirm")}
      >
        <Text style={styles.proceedToBuyText}>
          Proceed to buy {cart.length} items
        </Text>
      </Pressable>
      <Text style={styles.borderDesign}></Text>
      <View style={{ marginHorizontal: 10 }}>
        {cart.map((item, index) => (
          <View style={styles.viewBottomBorder} key={index}>
            <Pressable style={styles.itemPressableDesign}>
              <View>
                <Image
                  style={styles.itemImageDesign}
                  source={{ uri: item?.image }}
                ></Image>
              </View>
              <View>
                <Text numberOfLines={3} style={styles.itemTitleDesign}>
                  {item?.title}
                </Text>
                <Text style={[styles.totalTextDesign, { marginTop: 6 }]}>
                  {item?.price}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                    }}
                    source={require("../assets/EasyCartTitleLogo.png")}
                  />
                  <Text style={{ color: "green", marginTop: 3 }}>In Stock</Text>
                </View>
              </View>
            </Pressable>
            <Pressable
              style={{
                marginTop: 15,
                marginBottom: 15,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 7,
                }}
              >
                <Pressable
                  style={styles.deletePlusBtnDesign}
                  onPress={() => decreaseQuantity(item)}
                >
                  <Feather name="minus" size={24} color="white" />
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 18,
                    paddingVertical: 6,
                  }}
                >
                  <Text>{item?.quantity}</Text>
                </Pressable>
                <Pressable
                  style={styles.deletePlusBtnDesign}
                  onPress={() => increaseQuantity(item)}
                >
                  <Feather name="plus" size={24} color="white" />
                </Pressable>
              </View>
              <Pressable
                style={styles.secondaryBtnDesign}
                onPress={() => deleteItemFromCart(item)}
              >
                <Text>Delete</Text>
              </Pressable>
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <Pressable style={styles.secondaryBtnDesign}>
                <Text>Save for later</Text>
              </Pressable>
              <Pressable style={styles.secondaryBtnDesign}>
                <Text>See more like this</Text>
              </Pressable>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cartScreebBackground: {
    marginTop: 55,
    backgroundColor: "white",
  },

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
  cartPricesView: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  subTotalTextDesign: {
    fontSize: 18,
    fontWeight: "400",
  },
  totalTextDesign: {
    fontSize: 20,
    fontWeight: "bold",
  },
  proceedToBuyText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  proceedToBuyBtnDesign: {
    backgroundColor: "#6d7abf",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  borderDesign: {
    height: 1,
    borderColor: "#070e39",
    borderWidth: 3,
    marginTop: 15,
    marginBottom: 15,
  },
  itemImageDesign: {
    width: 140,
    height: 140,
    resizeMode: "contain",
  },
  viewBottomBorder: {
    backgroundColor: "white",
    marginVertical: 5,
    borderBottomColor: "#6d7abf",
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  itemPressableDesign: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemTitleDesign: {
    width: 150,
    marginTop: 10,
  },
  deletePlusBtnDesign: {
    backgroundColor: "#070e39",
    padding: 7,
    borderRadius: 6,
  },
  secondaryBtnDesign: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
});
