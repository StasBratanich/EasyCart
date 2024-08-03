import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Pressable,
  ImageBackground,
  Dimensions,
  Text,
} from "react-native";
import React, { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/CartReducer";

const ProductInfoScreen = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const height = (width * 100) / 100;

  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  return (
    <ScrollView
      style={styles.viewCarouselDesign}
      showsVerticalScrollIndicator={false}
    >
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item, index) => (
          <ImageBackground
            style={{ width, height, marginTop: 25, resizeMode: "contain" }}
            source={{ uri: item }}
            key={index}
          >
            <View style={styles.offerViewWrapperDesign}>
              <View style={styles.offerTextViewDesign}>
                <Text style={styles.offerTextDesign}>20% off</Text>
              </View>
              <View style={styles.offerTextViewDesign}>
                <Feather name="share-2" size={24} color="white" />
              </View>
            </View>
            <View
              style={[
                styles.offerTextViewDesign,
                { marginTop: "auto", marginBottom: 20, marginStart: 10 },
              ]}
            >
              <Feather name="heart" size={24} color="white" />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>
      <View style={styles.offerTextDesign}>
        <Text style={styles.productTitleTextDesign}>
          {route?.params?.title}
        </Text>
        <Text style={styles.productPriceTextDesign}>
          ${route?.params?.price}
        </Text>
      </View>
      <Text style={styles.borderDesign}></Text>
      <View style={styles.itemAttributesDesign}>
        <Text>Color: </Text>
        <Text style={styles.colorTextDesign}>{route?.params?.color}</Text>
      </View>
      <View style={styles.itemAttributesDesign}>
        <Text>Size: </Text>
        <Text style={styles.colorTextDesign}>{route?.params?.size}</Text>
      </View>
      <Text style={styles.borderDesign}></Text>
      <View style={{ paddingStart: 10 }}>
        <Text style={styles.colorTextDesign}>
          Total: ${route?.params?.price}
        </Text>
        <Text style={styles.deliveryMessageDesign}>
          Free delivery if you order TODAY!
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
            alignItems: "center",
            gap: 5,
          }}
        >
          <Feather name="map-pin" size={24} color="black" />
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            Deliver to ISRAEL
          </Text>
        </View>
      </View>

      <Text
        style={{ color: "#6d7abf", marginHorizontal: 10, fontWeight: "500" }}
      >
        In Stock
      </Text>
      <Pressable
        style={styles.addToCartBtn}
        onPress={() => addItemToCart(route?.params?.item)}
      >
        {addedToCart ? (
          <View>
            <Text style={styles.addBuyBtns}>Added To cart</Text>
          </View>
        ) : (
          <Text style={styles.addBuyBtns}>Add To cart</Text>
        )}
      </Pressable>
      <Pressable style={styles.addToCartBtn}>
        <Text style={styles.addBuyBtns}>Buy now</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({
  viewCarouselDesign: {
    marginTop: 45,
    flex: 1,
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

  offerViewWrapperDesign: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  offerTextViewDesign: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6d7abf",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  offerTextDesign: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 12,
  },

  productTitleTextDesign: {
    fontSize: 15,
    padding: 10,
  },

  productPriceTextDesign: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 5,
    padding: 10,
  },
  borderDesign: {
    height: 1,
    borderColor: "#6d7abf",
    borderWidth: 3,
    marginTop: 15,
    marginBottom: 15,
  },

  colorTextDesign: {
    fontSize: 15,
    fontWeight: "bold",
  },

  itemAttributesDesign: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    paddingLeft: 10,
  },

  deliveryMessageDesign: {
    color: "#6d7abf",
    paddingTop: 5,
    fontSize: 15,
    textAlign: "center",
  },

  addToCartBtn: {
    backgroundColor: "#64c725",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignContent: "center",
    margin: 10,
  },

  addBuyBtns: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});
